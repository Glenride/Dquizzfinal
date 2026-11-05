<?php

use App\Models\AnswerOption;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\ResultOutcome;
use App\Models\Submission;
use App\Support\MarkdownRegistry;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| AI-readable site (ScrollLaunch Prompt 1 + Prompt 2)
|--------------------------------------------------------------------------
|
| The production URL is UNCONFIRMED in this repo (APP_URL defaults to
| http://localhost; the candidate https://app.dvaughnhouse.com comes
| from the gateway's project list). Tests pin the candidate URL via
| config so canonical URLs are deterministic; verify APP_URL before
| deploying.
|
*/

beforeEach(function () {
    config(['app.url' => 'https://app.dvaughnhouse.com']);
});

function makeQuiz(array $overrides = []): Quiz
{
    $owner = \App\Models\User::factory()->create();

    return Quiz::create(array_merge([
        'owner_id' => $owner->id,
        'title' => 'Readiness Scorecard',
        'slug' => 'readiness-scorecard',
        'description' => 'Find out how ready your business is to turn visitors into customers.',
        'status' => 'published',
        'type' => 'scorecard',
        'lead_capture_mode' => 'optional',
    ], $overrides));
}

test('static page .md returns markdown with the required headers', function () {
    $this->get('/pricing.md')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8')
        ->assertHeader('X-Robots-Tag', 'noindex, follow')
        ->assertHeader('Content-Location', 'https://app.dvaughnhouse.com/pricing')
        ->assertSee('Starter', false)
        ->assertSee('$29', false)
        ->assertSee('$99', false)
        ->assertSee('$399', false)
        ->assertSee('Canonical: https://app.dvaughnhouse.com/pricing', false);
});

test('home .md is served at /index.md', function () {
    $this->get('/index.md')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8')
        ->assertSee("D'Quizz - Turn Visitors into Customers", false);
});

test('Accept: text/markdown negotiates to markdown, */* and html-preferred get HTML', function () {
    $this->withHeaders(['Accept' => 'text/markdown'])->get('/pricing')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8');

    $this->withHeaders(['Accept' => 'text/markdown;q=0.9, text/html;q=0.5'])->get('/pricing')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8');

    $this->withHeaders(['Accept' => 'text/html;q=0.9, text/markdown;q=0.5'])->get('/pricing')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/html; charset=utf-8');

    $this->withHeaders(['Accept' => '*/*'])->get('/pricing')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/html; charset=utf-8');

    $this->get('/pricing')->assertOk();
});

test('unknown .md returns a markdown 404, never HTML', function () {
    $this->get('/does-not-exist.md')
        ->assertNotFound()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8')
        ->assertSee('Not found', false);
});

test('api/md serves markdown and the catalog lists every route', function () {
    $this->get('/api/md/pricing')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8')
        ->assertSee('$29', false);

    $this->get('/api/md/nope')
        ->assertNotFound()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8');

    $this->get('/api/md/_catalog')
        ->assertOk()
        ->assertJsonPath('routes.0.html', 'https://app.dvaughnhouse.com/')
        ->assertJsonFragment(['markdown' => 'https://app.dvaughnhouse.com/pricing.md']);
});

test('llms.txt, llms-full.txt and ai.txt are generated and consistent', function () {
    $this->get('/llms.txt')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=utf-8')
        ->assertSee("# D'Quizz by Glenride", false)
        ->assertSee('/pricing.md', false)
        ->assertSee('Cite this site for', false)
        ->assertSee('https://app.dvaughnhouse.com/llms-full.txt', false);

    $this->get('/llms-full.txt')
        ->assertOk()
        ->assertSee('<!-- source: https://app.dvaughnhouse.com/pricing -->', false)
        ->assertSee('Starter', false);

    $this->get('/ai.txt')
        ->assertOk()
        ->assertSee('[identity]', false)
        ->assertSee('[permissions]', false)
        ->assertSee('[restrictions]', false)
        ->assertSee('[scope]', false)
        ->assertSee('no fabricated quotes', false);
});

test('sitemap lists public routes with real lastmod and no .md URLs', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertSee('<loc>https://app.dvaughnhouse.com/pricing</loc>', false)
        ->assertSee('<lastmod>2026-10-21</lastmod>', false)
        ->assertDontSee('.md');
});

test('public/robots.txt matches the registry and names search bots, not training bots', function () {
    $expected = MarkdownRegistry::renderRobotsTxt();

    expect(file_get_contents(public_path('robots.txt')))->toBe($expected);

    expect($expected)
        ->toContain('OAI-SearchBot')
        ->toContain('ChatGPT-User')
        ->toContain('Claude-SearchBot')
        ->toContain('PerplexityBot')
        ->toContain('Disallow: /dashboard')
        ->toContain('Disallow: /api/')
        ->toContain('Disallow: /q/*/results/')
        ->toContain('Sitemap: https://app.dvaughnhouse.com/sitemap.xml')
        ->not->toContain('GPTBot')
        ->not->toContain('ClaudeBot')
        ->not->toContain('Google-Extended')
        ->not->toContain('Bytespider');
});

test('published quiz .md shows public questions and options, never scores or outcomes', function () {
    $quiz = makeQuiz();

    $question = Question::create([
        'quiz_id' => $quiz->id,
        'type' => 'single_choice',
        'question_text' => 'What is your monthly marketing budget?',
        'order' => 1,
        'required' => true,
    ]);

    AnswerOption::create([
        'question_id' => $question->id,
        'label' => 'Under $1,000',
        'value' => 'under-1000',
        'score_value' => 987,
        'order' => 1,
    ]);

    ResultOutcome::create([
        'quiz_id' => $quiz->id,
        'name' => 'Hidden Outcome XYZ',
        'description' => 'This outcome is only shown after taking the quiz.',
        'score_min' => 0,
        'score_max' => 100,
        'order' => 1,
    ]);

    $this->get('/q/readiness-scorecard.md')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8')
        ->assertSee('Readiness Scorecard', false)
        ->assertSee('What is your monthly marketing budget?', false)
        ->assertSee('Under $1,000', false)
        ->assertDontSee('987')
        ->assertDontSee('Hidden Outcome XYZ');

    // And the catalog + sitemap pick the published quiz up.
    $this->get('/api/md/_catalog')->assertOk()
        ->assertJsonFragment(['markdown' => 'https://app.dvaughnhouse.com/q/readiness-scorecard.md']);

    $this->get('/sitemap.xml')->assertOk()
        ->assertSee('<loc>https://app.dvaughnhouse.com/q/readiness-scorecard</loc>', false);
});

test('draft quiz .md is a markdown 404', function () {
    makeQuiz(['slug' => 'draft-quiz', 'status' => 'draft']);

    $this->get('/q/draft-quiz.md')
        ->assertNotFound()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
});

test('token-gated results .md is a markdown 404', function () {
    $quiz = makeQuiz();

    $submission = Submission::create([
        'quiz_id' => $quiz->id,
        'view_token' => Str::random(40),
        'total_score' => 5,
        'ip_address' => '127.0.0.1',
        'user_agent' => 'Pest',
        'started_at' => now(),
        'submitted_at' => now(),
    ]);

    $this->get("/q/{$quiz->slug}/results/{$submission->view_token}.md")
        ->assertNotFound()
        ->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
});

test('every public route has a markdown renderer (coverage check)', function () {
    $routes = MarkdownRegistry::listMarkdownRoutes();

    foreach (['/', '/about', '/pricing', '/contact', '/privacy', '/terms'] as $path) {
        expect($routes)->toHaveKey($path);
        expect(MarkdownRegistry::render($path))->not->toBeNull();
    }

    // Nothing auth-gated or private is in the registry.
    foreach (array_keys($routes) as $path) {
        expect($path)->not->toContain('/results/')
            ->not->toStartWith('/dashboard')
            ->not->toStartWith('/leads')
            ->not->toStartWith('/submissions')
            ->not->toStartWith('/campaigns')
            ->not->toStartWith('/settings');
    }
});

test('homepage HTML carries ai-summary, the markdown alternate and JSON-LD', function () {
    $this->get('/')
        ->assertOk()
        ->assertSee('name="ai-summary"', false)
        ->assertSee('rel="alternate" type="text/markdown"', false)
        ->assertSee('"@type":"Organization"', false)
        ->assertSee('"@type":"WebSite"', false);
});

test('HEAD and OPTIONS work on markdown endpoints', function () {
    $this->call('HEAD', '/pricing.md')->assertOk();
    $this->call('OPTIONS', '/api/md/pricing')->assertNoContent(204);
});
