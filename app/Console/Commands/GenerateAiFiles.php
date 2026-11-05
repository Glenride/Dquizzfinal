<?php

namespace App\Console\Commands;

use App\Support\MarkdownRegistry;
use Illuminate\Console\Command;

/**
 * Regenerate the AI-readable files that must live on disk.
 *
 * robots.txt is served from public/ by the web server before Laravel
 * sees the request, so it cannot be a route — this command rewrites
 * public/robots.txt from the registry. llms.txt, llms-full.txt, ai.txt
 * and sitemap.xml are served by routes and are always generated live,
 * so they need no file. Run after any route/quiz change, or in deploy:
 *
 *   php artisan ai:generate
 *
 * --check exits non-zero when public/robots.txt has drifted from the
 * registry (use it in CI / as a dev check).
 */
class GenerateAiFiles extends Command
{
    protected $signature = 'ai:generate {--check : Fail if public/robots.txt differs from the registry output}';

    protected $description = 'Regenerate public/robots.txt from the AI-readable site registry';

    public function handle(): int
    {
        $expected = MarkdownRegistry::renderRobotsTxt();
        $path = public_path('robots.txt');

        if ($this->option('check')) {
            $current = is_file($path) ? file_get_contents($path) : null;

            if ($current !== $expected) {
                $this->error('public/robots.txt has drifted from the registry. Run: php artisan ai:generate');

                return self::FAILURE;
            }

            $this->info('public/robots.txt is in sync with the registry.');

            return self::SUCCESS;
        }

        file_put_contents($path, $expected);
        $this->info('Wrote public/robots.txt from the registry.');

        return self::SUCCESS;
    }
}
