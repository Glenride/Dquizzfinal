<?php

namespace App\Http\Middleware;

use App\Support\Markdown;
use App\Support\MarkdownRegistry;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Content negotiation for the AI-readable site (Prompt 1 §1).
 *
 * - GET/HEAD with Accept preferring text/markdown over text/html on a
 *   public registry path returns the markdown version directly, without
 *   running the Inertia page (and, for quizzes, without recording a
 *   QuizView row — an AI fetch is not a human view).
 * - A wildcard Accept header or a missing Accept header ALWAYS gets HTML.
 * - OPTIONS on markdown endpoints answers the CORS preflight.
 * - HTML responses for public pages carry a Link header advertising
 *   /llms.txt, /llms-full.txt and /ai.txt (rel="describedby").
 *
 * The middleware only ever acts on paths in the registry; every other
 * path (auth, dashboard, API, results) passes through untouched.
 */
class NegotiateMarkdown
{
    public function handle(Request $request, Closure $next): Response
    {
        $path = '/'.ltrim($request->path(), '/');

        if ($request->isMethod('options') && $this->isMarkdownPath($path)) {
            return Markdown::preflight();
        }

        if (($request->isMethod('get') || $request->isMethod('head')) && Markdown::wantsMarkdown($request)) {
            $rendered = MarkdownRegistry::render($path);

            if ($rendered !== null) {
                return Markdown::response(
                    $rendered['body'],
                    $rendered['canonical'],
                    $rendered['last_modified'],
                    200,
                    true,
                );
            }
        }

        $response = $next($request);

        if ($this->isPublicHtmlPath($path) && str_contains((string) $response->headers->get('Content-Type', ''), 'text/html')) {
            $base = rtrim((string) config('app.url'), '/');
            $response->headers->set(
                'Link',
                '<'.$base.'/llms.txt>; rel="describedby", <'.$base.'/llms-full.txt>; rel="describedby", <'.$base.'/ai.txt>; rel="describedby"',
            );
        }

        return $response;
    }

    private function isMarkdownPath(string $path): bool
    {
        return str_ends_with($path, '.md') || str_starts_with($path, '/api/md/');
    }

    private function isPublicHtmlPath(string $path): bool
    {
        if (MarkdownRegistry::render($path) !== null) {
            return true;
        }

        return false;
    }
}
