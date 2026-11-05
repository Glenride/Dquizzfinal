<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Shared markdown formatting + HTTP helpers for the AI-readable site.
 *
 * One place for: the markdown page shell, absolute URLs, the token
 * estimate, Accept-header negotiation, and the response headers every
 * markdown response must carry (Prompt 1 §1).
 */
class Markdown
{
    /**
     * Does this request prefer markdown over HTML?
     *
     * Parses Accept properly, including q-values. Markdown wins only when
     * text/markdown has a higher q than text/html. A missing Accept header
     * or a wildcard Accept ALWAYS gets HTML, so curl, link previews and
     * normal browsers don't break.
     */
    public static function wantsMarkdown(Request $request): bool
    {
        $accept = $request->header('Accept');

        if ($accept === null || trim($accept) === '') {
            return false;
        }

        $markdownQ = 0.0;
        $htmlQ = 0.0;

        foreach (explode(',', $accept) as $part) {
            $segments = explode(';', trim($part));
            $type = strtolower(trim($segments[0] ?? ''));
            $q = 1.0;

            foreach (array_slice($segments, 1) as $param) {
                $param = trim($param);
                if (str_starts_with($param, 'q=')) {
                    $q = (float) substr($param, 2);
                }
            }

            if ($type === 'text/markdown') {
                $markdownQ = max($markdownQ, $q);
            } elseif ($type === 'text/html') {
                $htmlQ = max($htmlQ, $q);
            } elseif ($type === 'text/*' || $type === '*/*') {
                $htmlQ = max($htmlQ, $q);
            }
        }

        return $markdownQ > 0 && $markdownQ > $htmlQ;
    }

    /** Absolute URL for a site path, from config('app.url'). */
    public static function absoluteUrl(string $path): string
    {
        return rtrim((string) config('app.url'), '/').'/'.ltrim($path, '/');
    }

    /** Approx tokens = chars / 4, as used by the X-Markdown-Tokens header. */
    public static function tokens(string $body): int
    {
        return max(1, (int) ceil(strlen($body) / 4));
    }

    /** Escape text so it renders literally in markdown, not as markup. */
    public static function esc(?string $text): string
    {
        if ($text === null || $text === '') {
            return '';
        }

        return str_replace(
            ['\\', '`', '*', '_', '[', ']', '<', '>', '#'],
            ['\\\\', '\\`', '\\*', '\\_', '\\[', '\\]', '\\<', '\\>', '\\#'],
            $text,
        );
    }

    /**
     * The standard page shell every markdown page uses.
     *
     * @param  string  $body  Main content, in reading order, as real markdown.
     */
    public static function page(
        string $title,
        string $summary,
        string $canonical,
        string $updated,
        string $body,
        array $related = [],
    ): string {
        $out = "# {$title}\n\n> {$summary}\n\n";
        $out .= "Canonical: {$canonical}\n\n";
        $out .= "Last updated: {$updated}\n\n";
        $out .= trim($body)."\n";

        if ($related !== []) {
            $out .= "\n## Related\n\n";
            foreach ($related as $label => $url) {
                $out .= "- [{$label}]({$url})\n";
            }
        }

        return $out;
    }

    /** Build a markdown response with the headers Prompt 1 requires. */
    public static function response(
        string $body,
        string $canonical,
        ?string $lastModified = null,
        int $status = 200,
        bool $negotiated = false,
    ): Response {
        $headers = [
            'Content-Type' => 'text/markdown; charset=utf-8',
            'X-Markdown-Tokens' => (string) self::tokens($body),
            'X-Robots-Tag' => 'noindex, follow',
            'Content-Location' => $canonical,
            'Link' => '<'.$canonical.'>; rel="canonical"',
            'Cache-Control' => 'public, s-maxage=3600, stale-while-revalidate=86400',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers' => 'Accept',
        ];

        if ($negotiated) {
            $headers['Vary'] = 'Accept';
        }

        if ($lastModified !== null) {
            $headers['Last-Modified'] = $lastModified;
        }

        return new Response($body, $status, $headers);
    }

    /** The markdown 404 body: never HTML, always status 404. */
    public static function notFound(string $path): Response
    {
        $canonical = self::absoluteUrl($path);

        $body = "# Not found\n\n> The page you asked for does not exist on this site.\n\n";
        $body .= "Canonical: {$canonical}\n\n";
        $body .= "Last updated: ".date('Y-m-d')."\n\n";
        $body .= "The page may have been moved or unpublished. See the [home page](";
        $body .= self::absoluteUrl('/').") or the [full content listing](";
        $body .= self::absoluteUrl('/llms.txt').").\n";

        return self::response($body, $canonical, null, 404);
    }

    /** 204 preflight response for markdown endpoints. */
    public static function preflight(): Response
    {
        return new Response('', 204, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers' => 'Accept',
            'Access-Control-Max-Age' => '86400',
        ]);
    }
}
