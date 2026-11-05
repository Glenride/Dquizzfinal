<?php

namespace App\Http\Controllers;

use App\Support\Markdown;
use App\Support\MarkdownRegistry;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Serves the AI-readable site (Prompt 1): .md versions, content
 * negotiation is handled by NegotiateMarkdown, /api/md/*, llms.txt,
 * llms-full.txt, ai.txt and sitemap.xml.
 *
 * Nothing here touches private data. Quiz markdown comes only from
 * MarkdownRegistry::renderQuiz(), which loads published quizzes only,
 * with the same public fields the HTML quiz page shows — and, unlike
 * PublicQuizController::show(), it does NOT record a QuizView row, so
 * an AI fetch never pollutes quiz analytics.
 */
class MarkdownController extends Controller
{
    /** GET /index.md — the homepage's markdown version. */
    public function index(): Response
    {
        return $this->page('index');
    }

    /** GET /{page}.md and /index.md */
    public function page(string $page): Response
    {
        $path = $page === 'index' ? '/' : '/'.$page;

        $rendered = MarkdownRegistry::render($path);

        if ($rendered === null) {
            return Markdown::notFound($path);
        }

        return Markdown::response(
            $rendered['body'],
            $rendered['canonical'],
            $rendered['last_modified'],
        );
    }

    /** GET /q/{slug}.md — published quizzes only. */
    public function quiz(string $slug): Response
    {
        $rendered = MarkdownRegistry::renderQuiz($slug);

        if ($rendered === null) {
            return Markdown::notFound('/q/'.$slug);
        }

        return Markdown::response(
            $rendered['body'],
            $rendered['canonical'],
            $rendered['last_modified'],
        );
    }

    /** GET /q/{slug}/results/{token}.md — results are token-gated and private: always a markdown 404. */
    public function quizResults(string $slug, string $token): Response
    {
        return Markdown::notFound('/q/'.$slug.'/results/'.$token);
    }

    /** GET /api/md/{path} — always markdown, even for unknown paths. */
    public function apiMd(Request $request, string $path): Response
    {
        if ($request->isMethod('options')) {
            return Markdown::preflight();
        }

        $htmlPath = $path === 'index' ? '/' : '/'.$path;

        $rendered = MarkdownRegistry::render($htmlPath);

        if ($rendered === null) {
            return Markdown::notFound($htmlPath);
        }

        return Markdown::response(
            $rendered['body'],
            $rendered['canonical'],
            $rendered['last_modified'],
        );
    }

    /** GET /api/md/_catalog */
    public function catalog(): Response
    {
        $routes = MarkdownRegistry::listMarkdownRoutes();
        $base = rtrim((string) config('app.url'), '/');

        $items = [];
        foreach ($routes as $htmlPath => $mdPath) {
            $items[] = [
                'html' => $base.$htmlPath,
                'markdown' => $base.$mdPath,
            ];
        }

        return new Response(
            json_encode(['routes' => $items], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)."\n",
            200,
            ['Content-Type' => 'application/json; charset=utf-8', 'Cache-Control' => 'public, s-maxage=3600, stale-while-revalidate=86400'],
        );
    }

    /** GET /llms.txt — generated from the registry, never hand-written. */
    public function llms(): Response
    {
        return new Response(
            MarkdownRegistry::renderLlmsTxt(),
            200,
            ['Content-Type' => 'text/plain; charset=utf-8', 'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800'],
        );
    }

    /** GET /llms-full.txt */
    public function llmsFull(): Response
    {
        return new Response(
            MarkdownRegistry::renderLlmsFull(),
            200,
            ['Content-Type' => 'text/plain; charset=utf-8', 'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800'],
        );
    }

    /** GET /ai.txt */
    public function ai(): Response
    {
        return new Response(
            MarkdownRegistry::renderAiTxt(),
            200,
            ['Content-Type' => 'text/plain; charset=utf-8', 'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800'],
        );
    }

    /** GET /sitemap.xml — HTML URLs only, never .md URLs. */
    public function sitemap(): Response
    {
        return new Response(
            MarkdownRegistry::renderSitemapXml(),
            200,
            ['Content-Type' => 'application/xml; charset=utf-8', 'Cache-Control' => 'public, s-maxage=3600, stale-while-revalidate=86400'],
        );
    }
}
