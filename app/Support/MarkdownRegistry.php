<?php

namespace App\Support;

use App\Models\Quiz;
use Illuminate\Support\Collection;

/**
 * The ONE renderer registry for the AI-readable site (Prompt 1 §1, §7).
 *
 * Every public route maps to a renderer here. llms.txt, llms-full.txt,
 * ai.txt, robots.txt, sitemap.xml and /api/md/_catalog are all generated
 * from this registry, so they can never drift apart. Adding a page takes
 * exactly one step: register a renderer below.
 *
 * Excluded, by design — never in this registry, never in llms.txt:
 * dashboard, quizzes/* (create/edit/analytics), leads/*, submissions/*,
 * campaigns/*, billing/*, subscription, settings/*, login, authenticate,
 * logout, and /q/{slug}/results/{token} (token-gated private results).
 * Draft / archived quizzes are never exposed: only status = 'published'
 * quizzes render, through the same public fields the HTML quiz page
 * shows (title, description, type, questions and answer-option labels).
 * Score values and result outcomes are NOT part of the HTML quiz page
 * payload, so they are not in the markdown either.
 */
class MarkdownRegistry
{
    /**
     * Static public pages: path => definition.
     *
     * `updated` is the last content change, not the rebuild date:
     * 2026-10-21 is the honesty-scrub commit that last touched the
     * marketing pages; 2026-10-25 is the effective date printed on the
     * privacy policy and terms themselves.
     */
    public static function staticPages(): array
    {
        return [
            '/' => [
                'title' => "D'Quizz - Turn Visitors into Customers",
                'summary' => "D'Quizz asks your visitors the right questions, scores their answers, and hands you people who already want what you sell.",
                'ai_summary' => "D'Quizz by Glenride is a quiz funnel and scorecard platform. Creators build interactive quizzes that score answers by fixed rules and capture qualified leads with a personalised result.",
                'description' => "D'Quizz asks your visitors the right questions, scores their answers, and hands you people who already want what you sell. Build your first quiz this afternoon.",
                'updated' => '2026-10-21',
                'section' => 'Core pages',
                'render' => 'renderHome',
            ],
            '/about' => [
                'title' => "About - D'Quizz",
                'summary' => "D'Quizz is on a mission to revolutionise lead generation: marketing that provides value, understands the audience, and builds relationships.",
                'ai_summary' => "D'Quizz was founded in 2024 after traditional lead magnets — PDFs and checklists — stopped engaging audiences. It builds interactive assessments and scorecards instead.",
                'description' => "Founded in 2024, D'Quizz helps businesses turn passive visitors into engaged prospects through quiz funnels.",
                'updated' => '2026-10-21',
                'section' => 'Core pages',
                'render' => 'renderAbout',
            ],
            '/pricing' => [
                'title' => "Pricing - D'Quizz",
                'summary' => 'Simple, transparent pricing: Starter $29/mo, Pro $99/mo, Agency $399/mo, with annual billing at 27% off.',
                'ai_summary' => "D'Quizz pricing: Starter $29 per month, Pro $99 per month, Agency $399 per month. Annual billing saves 27%: $21, $72 and $291 per month respectively.",
                'description' => 'Simple, transparent pricing. Starter $29/mo, Pro $99/mo, Agency $399/mo. Annual billing saves 27%.',
                'updated' => '2026-10-21',
                'section' => 'Core pages',
                'render' => 'renderPricing',
            ],
            '/contact' => [
                'title' => "Contact - D'Quizz",
                'summary' => 'Questions about your account or the product? Email is the fastest way to reach us: support@dquizz.com.',
                'ai_summary' => "Contact D'Quizz by email at support@dquizz.com for account help or product feedback.",
                'description' => 'Get in touch with D\'Quizz. Email support@dquizz.com for account help or product feedback.',
                'updated' => '2026-10-21',
                'section' => 'Core pages',
                'render' => 'renderContact',
            ],
            '/privacy' => [
                'title' => "Privacy Policy - D'Quizz",
                'summary' => 'Version 1.0, effective October 25, 2026. How D\'Quizz handles Creator and Quiz Taker information, who owns quiz data, and your rights.',
                'ai_summary' => "D'Quizz privacy policy, version 1.0, effective October 25, 2026. Creators own their quiz data; D'Quizz is the Data Processor for Quiz Taker information, uses no AI, and runs no advertising trackers.",
                'description' => "D'Quizz privacy policy (v1.0, effective October 25, 2026): creators own their data, quiz results are calculated by fixed rules with no AI, and no advertising trackers are used.",
                'updated' => '2026-10-25',
                'section' => 'Optional',
                'render' => 'renderPrivacy',
            ],
            '/terms' => [
                'title' => "Terms of Service - D'Quizz",
                'summary' => 'Version 1.0, effective October 25, 2026. The binding agreement for Creators and Quiz Takers using D\'Quizz.',
                'ai_summary' => "D'Quizz terms of service, version 1.0, effective October 25, 2026. Starter $29/mo, Pro $99/mo, Agency $399/mo; all fees non-refundable; governed by Ohio law.",
                'description' => "D'Quizz terms of service (v1.0, effective October 25, 2026): plans, billing, creator responsibilities, and Ohio governing law.",
                'updated' => '2026-10-25',
                'section' => 'Optional',
                'render' => 'renderTerms',
            ],
        ];
    }

    /** Markdown path for a static page path ('/' => '/index.md'). */
    public static function mdPath(string $path): string
    {
        return $path === '/' ? '/index.md' : rtrim($path, '/').'.md';
    }

    /** Canonical HTML URL for a registry path. */
    public static function canonical(string $path): string
    {
        return Markdown::absoluteUrl($path);
    }

    /**
     * Published quizzes only, ordered by slug. Never draft/archived.
     * Returns an empty collection if the quizzes table is unavailable
     * (e.g. before migrations run), so generation never hard-fails.
     */
    public static function publishedQuizzes(): Collection
    {
        try {
            return Quiz::published()->orderBy('slug')->get(['id', 'slug', 'title', 'description', 'type', 'updated_at']);
        } catch (\Throwable) {
            return collect();
        }
    }

    /** Every addressable markdown route: path => md path. */
    public static function listMarkdownRoutes(): array
    {
        $routes = [];

        foreach (self::staticPages() as $path => $page) {
            $routes[$path] = self::mdPath($path);
        }

        foreach (self::publishedQuizzes() as $quiz) {
            $routes['/q/'.$quiz->slug] = '/q/'.$quiz->slug.'.md';
        }

        return $routes;
    }

    /**
     * Render a markdown page by its HTML path, or null if the path is
     * not public / does not exist. $path is '/' , '/about', ... or
     * '/q/{slug}'.
     */
    public static function render(string $path): ?array
    {
        $pages = self::staticPages();

        if (isset($pages[$path])) {
            $page = $pages[$path];
            $body = self::{$page['render']}();

            return [
                'title' => $page['title'],
                'summary' => $page['summary'],
                'canonical' => self::canonical($path),
                'updated' => $page['updated'],
                'last_modified' => gmdate('D, d M Y H:i:s', strtotime($page['updated'].' 00:00:00 UTC')).' GMT',
                'body' => Markdown::page(
                    $page['title'],
                    $page['summary'],
                    self::canonical($path),
                    $page['updated'],
                    $body,
                    self::relatedLinks($path),
                ),
            ];
        }

        if (preg_match('#^/q/([A-Za-z0-9\-_]+)$#', $path, $m)) {
            return self::renderQuiz($m[1]);
        }

        return null;
    }

    /** Render a published quiz's markdown, or null if not published. */
    public static function renderQuiz(string $slug): ?array
    {
        try {
            $quiz = Quiz::published()
                ->where('slug', $slug)
                ->with(['questions.answerOptions'])
                ->first();
        } catch (\Throwable) {
            return null;
        }

        if ($quiz === null) {
            return null;
        }

        $canonical = self::canonical('/q/'.$quiz->slug);
        $updated = $quiz->updated_at ? $quiz->updated_at->format('Y-m-d') : date('Y-m-d');
        $questionCount = $quiz->questions->count();

        $body = "## At a glance\n\n";
        $body .= "| Fact | Value |\n| --- | --- |\n";
        $body .= '| Type | '.Markdown::esc($quiz->type ?? 'quiz')." |\n";
        $body .= '| Questions | '.$questionCount." |\n";
        $body .= '| Lead capture | '.Markdown::esc($quiz->lead_capture_mode ?? 'optional')." |\n";
        $body .= "\n";

        if ($quiz->description) {
            $body .= Markdown::esc($quiz->description)."\n\n";
        }

        $body .= "## Questions\n\n";
        if ($questionCount === 0) {
            $body .= "This quiz has no questions published yet.\n";
        } else {
            foreach ($quiz->questions as $index => $question) {
                $body .= '### '.($index + 1).'. '.Markdown::esc($question->question_text)."\n\n";
                if ($question->help_text) {
                    $body .= Markdown::esc($question->help_text)."\n\n";
                }
                foreach ($question->answerOptions as $option) {
                    $body .= '- '.Markdown::esc($option->label)."\n";
                }
                $body .= "\n";
            }
        }

        // Deliberately absent: score values and result outcomes. The HTML
        // quiz page does not show them before taking the quiz, so the
        // markdown version must not reveal them either.

        return [
            'title' => $quiz->title,
            'summary' => $quiz->description
                ? mb_substr($quiz->description, 0, 160)
                : "Take the {$quiz->title} quiz on D'Quizz.",
            'canonical' => $canonical,
            'updated' => $updated,
            'last_modified' => $quiz->updated_at
                ? $quiz->updated_at->copy()->setTimezone('GMT')->format('D, d M Y H:i:s').' GMT'
                : null,
            'body' => Markdown::page(
                $quiz->title,
                $quiz->description ? mb_substr($quiz->description, 0, 160) : "Take the {$quiz->title} quiz on D'Quizz.",
                $canonical,
                $updated,
                $body,
                self::relatedLinks('/q/'.$quiz->slug),
            ),
        ];
    }

    /** Related links for a page (absolute HTML URLs, never .md ones). */
    private static function relatedLinks(string $path): array
    {
        $base = rtrim((string) config('app.url'), '/');
        $links = [
            'Home' => $base.'/',
            'Pricing' => $base.'/pricing',
            'About' => $base.'/about',
        ];

        // The current page is filtered out below; every other link points
        // at the absolute HTML URL, never the .md one.
        return array_filter($links, fn ($url) => $url !== $base.$path);
    }

    // ------------------------------------------------------------------
    // Static page bodies. Copy is condensed from the matching TSX page
    // (resources/js/pages/*.tsx); facts, prices and dates are verbatim.
    // No statistics are claimed anywhere: the landing page's mock stats
    // were removed in the 2026-10-21 honesty scrub, and this registry
    // does not reintroduce any.
    // ------------------------------------------------------------------

    private static function renderHome(): string
    {
        return <<<'MD'
Stop chasing cold leads. D'Quizz asks your visitors the right questions, scores their answers, and hands you people who already want what you sell. Build your first quiz this afternoon.

## What you get

- **Qualified** — Leads scored before they reach you.
- **Segmented** — Every answer tags itself.
- **Yours** — Your list, your data, no middleman.

## Features

### Visual Builder

Launch your first quiz this afternoon. No developer, no designer, no code — if you can drag, you can build.

### Smart Scoring

Your best prospects raise their own hands. Scores sort them automatically, so you call the right people first.

### Lead Capture

Every completion hands you a name, an email, and exactly what they want — organized in your dashboard, ready when you are.

### Analytics

See where people drop off and fix it. Watch completions turn into conversations.

### Campaigns & Export

Follow up automatically with built-in email campaigns, and export every lead to CSV whenever you want. Your list stays yours.

## From visitor to customer in three steps

1. **Ask what matters** — Find out budget, timeline, and fit before you ever get on a call.
2. **Let scores do the sorting** — Hot prospects float to the top. Tire-kickers filter themselves out.
3. **Give them their answer** — Each person gets a personalized result that makes your offer the obvious next step.

## Built for every use case

- **Scorecards** — Show prospects where they stand — and why they need you to go further.
- **Assessments** — Let people qualify themselves before they ever book your calendar.
- **Lead Magnets** — Trade a personalized result for their email. Everybody wins.
- **Surveys** — Ask your market what it wants, in its own words.
- **Waitlists** — Launch to a line of people already waiting, not an empty room.
- **Qualifiers** — Walk into every sales call knowing budget, need, and timeline.

## Why quizzes beat forms

A form asks for an email. A quiz earns it — and tells you exactly who you're talking to.

- **They tell you what they want** — Every answer is a buying signal. You stop guessing what prospects need and start knowing.
- **They convince themselves** — Answering the right questions sells your prospect on your offer before you say a word.
- **You get a segmented list** — No more one-size-fits-all follow-up. Every lead arrives tagged by need and readiness.

Your next customer is one quiz away.
MD;
    }

    private static function renderAbout(): string
    {
        return <<<'MD'
We believe that marketing shouldn't just be about capturing emails — it should be about providing value, understanding your audience, and building relationships.

## Our values

- **Customer First** — We prioritize our customers' success above all else.
- **Impact Focused** — We measure our success by the results we drive.
- **Empathy** — We build tools that help you understand your audience.
- **Excellence** — We strive for the highest quality in everything we do.

## Our story

Founded in 2024, D'Quizz started with a simple observation: traditional lead magnets were losing their effectiveness. PDFs and checklists were gathering digital dust, and marketers were struggling to engage their audience.

We realized that people love to learn about themselves. They want personalized feedback, not generic advice. That's why we built a platform that makes it easy to create interactive assessments and scorecards.

Today, D'Quizz helps businesses transform their lead generation strategy, turning passive visitors into engaged prospects through the power of quiz funnels.
MD;
    }

    private static function renderPricing(): string
    {
        // Monthly prices are from resources/js/pages/pricing.tsx
        // (MONTHLY_PRICES). Annual prices are the same page's 27% discount
        // applied and rounded — and they match the figures printed in the
        // terms of service: $21, $72 and $291 per month billed annually.
        return <<<'MD'
Choose the plan that works best for you.

## Plans

| Plan | Monthly | Annual (per month, billed annually) | What it is for |
| --- | --- | --- | --- |
| Starter | $29/mo | $21/mo | Perfect for getting started |
| Pro | $99/mo | $72/mo | For serious marketers |
| Agency | $399/mo | $291/mo | Scale your operations |

Annual billing saves 27%.

### Starter — $29/mo

- 1 Published Quiz
- 100 Leads / month
- Basic Analytics
- Standard Templates
- Email Support

### Pro — $99/mo (Most Popular)

- Unlimited Quizzes
- 1,000 Leads / month
- Advanced Analytics
- Premium Templates
- Remove Branding
- Priority Support

### Agency — $399/mo

- Everything in Pro
- Unlimited Leads
- Team Collaboration
- Client Management
- Custom Domain
- Dedicated Success Manager

Prices are in US dollars and exclude any applicable taxes. Creating a free user account does not unlock Creator publishing tools: building and publishing quizzes, viewing leads and submissions, exporting data, configuring webhooks, and running campaigns require an active paid subscription.
MD;
    }

    private static function renderContact(): string
    {
        return <<<'MD'
Have questions? We'd love to hear from you.

## Talk to a human

Questions about your account or the product? Email is the fastest way to reach us.

- **Email support** — Get help with your account: support@dquizz.com
- **Product feedback** — Tell us what would make D'Quizz work better for you: support@dquizz.com

Operator: D'Vaughn House, a sole proprietorship doing business as Glenride. Email: dvaughn@dvaughnhouse.com. Postal address: Glenride, East 5th St, Cincinnati, OH 45202.
MD;
    }

    private static function renderPrivacy(): string
    {
        return <<<'MD'
Version 1.0 · Effective October 25, 2026

Operator: D'Vaughn House, a sole proprietorship doing business as ("DBA") Glenride ("Glenride", "D'Quizz", "we", "us", or "our"), operates the D'Quizz quiz-funnel platform and service. Questions about this policy or your information: dvaughn@dvaughnhouse.com. Postal address: Glenride, East 5th St, Cincinnati, OH 45202.

## 1. Who this policy covers

D'Quizz is a quiz-funnel platform. Businesses and individuals use it to build quizzes, scorecards, assessments, surveys, and waitlists, capture leads, and follow up by email. We monetize the platform strictly by selling premium subscription access; we do not run advertisements or sell user or lead data. Two groups are affected, and the policy treats them separately: Creators (people who open an account, build quizzes, view leads, and pay for premium access) and Quiz Takers (people who open, answer, or submit someone else's quiz, with no account needed). The Creator who published a quiz has their own legal responsibilities for the information provided through that quiz.

## 2. Our role in handling Quiz Taker information

For a Creator's own account and billing information, we act as Data Controller. For Quiz Taker information — contact details, answers, and scores collected through a quiz — the Creator is the sole owner and Data Controller, and we act strictly as Data Processor on the Creator's behalf. We do not claim ownership over any leads, do not store or retain leads for our own independent use, do not use Quiz Taker information for our own marketing, and never sell it.

## 3. Information we collect from Creators

Account (name, email, role, email-verified date); sign-in via WorkOS (WorkOS user identifier and profile avatar; we do not store your password); billing via Stripe (Stripe customer identifier, payment method type and last four digits only, trial end date, subscription status, plan, and price — full card numbers never touch our database); your content (quizzes, questions, answer options, result outcomes, templates, branding and call-to-action settings, email campaigns, campaign steps); session data (session identifier, IP address, browser user agent).

## 4. Information processed on behalf of Creators from Quiz Takers

What a quiz asks for is set entirely by its Creator; lead capture can be required, optional, or switched off. It can include contact details (email, first name, last name, phone), custom fields the Creator adds, answers (selected options, scale values, free-text answers), results (total score, scores by dimension, the result outcome shown, start and submit times), technical data (IP address, browser, referring page, session identifier), and a random visitor identifier. Result pages use a long, unguessable link token rather than a sequential number, so results cannot be browsed by guessing addresses.

## 5. Cookies, analytics, and tracking technology

D'Quizz is free of advertising cookies, third-party analytics, and tracking pixels. We do not install Google Analytics, Meta Pixels, or any third-party behavioral trackers, and we do not permit Creators to embed third-party tracking pixels or scripts into their quizzes. Only strictly necessary browser storage and functional session tokens are used (keeping a Creator signed in, CSRF protection for up to 120 minutes of inactivity, dashboard sidebar preferences, preventing a quiz from being submitted twice).

## 6. How we use information

To provide the service; to deliver Creator results (view counts, submissions, leads, and per-quiz analytics to the owning Creator only); to bill Creators; to send email (transactional messages, and Creator-configured campaign emails); to keep the service safe (including a hidden anti-spam field and a rate limit of six quiz submissions per minute per source); to support and improve the service; and to meet legal duties. We do not use Quiz Taker answers or contact details to advertise our own products to Quiz Takers, and we do not build advertising profiles from them.

## 7. Email campaigns and marketing email

Creators can build automated email campaigns triggered by quiz submissions; those messages are the Creator's messages, sent through Resend. Every campaign email includes a mandatory, working unsubscribe link. We may send our own product updates and newsletters strictly to Creators (who may opt out); we never send D'Quizz marketing emails to Quiz Takers.

## 8. Who we share information with

We do not sell personal information, we do not sell leads, and we do not share personal information for cross-context behavioral advertising. Disclosures only to operate the platform: the Creator who owns the quiz; Stripe (billing); WorkOS (authentication); Resend (email delivery); hosting infrastructure (proprietary Glenride servers in the United States); destinations a Creator configures (webhooks); authorities and advisers where the law requires; and a buyer or successor if the business is sold, merged, or transferred.

## 9. Scoring and automation (no AI)

Quiz results are calculated strictly by fixed, deterministic rules: each selected answer carries a score set by the Creator, scale answers count at their numeric value, free-text answers are not scored, and the total is matched to the result outcome whose score range it falls into. D'Quizz does not use artificial intelligence or machine-learning providers, makes no calls to external AI models, will not add AI features to process your data, and never uses Creator or Quiz Taker information to train AI models.

## 10. How long we keep information

Creator account and content: kept while the account remains open. Leads, submissions, and answers: held on the Creator's behalf while the account and quiz exist, or until the Creator deletes them or a Quiz Taker's deletion request is actioned. Soft-deleted quizzes, leads, or campaigns are permanently erased from the live database 60 days later. Stripe billing records: kept for a maximum of seven (7) years. Encrypted archival backups may survive for a maximum of three (3) years.

## 11. Security and encryption

Data is encrypted at rest (AES-256) and in transit (TLS/HTTPS) on proprietary Glenride hardware in the United States. Creator data is strictly owner-scoped. Quiz result pages use long, unguessable per-submission tokens instead of sequential numbers. Passwords are held by WorkOS and full payment card numbers by Stripe, not in our database. Quiz submissions are rate-limited and protected by automated anti-spam checks.

## 12. Your choices and privacy rights

Depending on where you live, you may have the right to request access to your personal information, receive a copy in a portable format, correct inaccurate information, request deletion, restrict or object to processing, and withdraw consent. Creators can manage account information, download leads and submissions as CSV, and delete leads, quizzes, and campaigns from the dashboard; to close an account, contact dvaughn@dvaughnhouse.com. Quiz Takers should contact the Creator directly first; we will forward requests to the Creator and assist, or action them directly where required by law. Verified requests are answered within 30 business days, with up to an additional 30 days for complex requests.

## 13. Age restrictions

D'Quizz is a business-to-business tool intended for adults. You must be at least 18 to create a Creator account or use the platform. Creators are strictly prohibited from building, targeting, or administering quizzes to children under 18, including in K-12 schools or youth programs. Creators are prohibited from using quizzes to collect sensitive categories of data (such as medical or health records, government ID numbers, financial account numbers, or biometric data) without lawful authority.

## 14. Where information is held

All D'Quizz servers and databases are located on proprietary Glenride hardware in the United States. If you access the service from outside the United States, your information will be transferred to, stored, and processed in the United States.

## 15. Changes to this policy

We will update this policy when our data practices change, and update the Effective Date at the top when we do. For material changes affecting how personal information is used, Creators will be notified by email or via a notice in the dashboard before the change takes effect.

## 16. Contact us

D'Vaughn House DBA Glenride. Email: dvaughn@dvaughnhouse.com. Postal address: East 5th St, Cincinnati, OH 45202.

The full policy also includes Appendix B (GDPR and UK GDPR Privacy Addendum) and Appendix C (Data Processing Agreement), including the EU Standard Contractual Clauses (Decision (EU) 2021/914) for transfers from the EEA, UK, or Switzerland to the United States. See the HTML version for the full appendix text.
MD;
    }

    private static function renderTerms(): string
    {
        return <<<'MD'
Version 1.0 · Effective October 25, 2026

Operator: D'Vaughn House, a sole proprietorship doing business as ("DBA") Glenride ("Glenride", "D'Quizz", "we", "us", or "our"). Contact: dvaughn@dvaughnhouse.com. Postal address: Glenride, East 5th St, Cincinnati, OH 45202. Read these Terms together with the Privacy Policy; if they ever conflict about how information is handled, the Privacy Policy controls for that subject.

## 1. The agreement and who it covers

These Terms are a binding legal agreement between you and D'Vaughn House DBA Glenride. Two groups use D'Quizz: Creators (people who open an account, build and publish quizzes, view leads and responses, run email campaigns, and pay for a subscription) and Quiz Takers (people who open, answer, or submit someone else's quiz, with no account needed). By opening an account, subscribing, or using the Creator dashboard, a Creator accepts these Terms. By submitting a quiz, a Quiz Taker accepts the parts that apply to Quiz Takers.

## 2. The service

D'Quizz is a quiz-funnel platform. Creators build and publish quizzes, scorecards, assessments, profile quizzes, waitlists, and surveys; set questions (single choice, multiple choice, scale, and free text), scoring, and result outcomes; apply their own branding and calls to action; capture leads; view analytics; use built-in templates; download leads and submissions as CSV files; send lead and submission data to webhooks they configure; and run automated email campaigns. Scores and results are calculated strictly by fixed, deterministic rules set by the Creator. The service does not use artificial intelligence or machine-learning providers, makes no calls to external AI models, and involves zero automated AI processing.

## 3. Accounts and sign-in

Sign-in is authenticated securely via WorkOS. We do not store your password. You are solely responsible for your account. You must be at least 18 years of age or older to create a Creator account or hold a subscription.

## 4. Subscriptions, plans, and billing

Creating a free user account does not unlock Creator publishing tools. Building and publishing quizzes, viewing leads and submissions, exporting data, configuring webhooks, and running campaigns require an active paid subscription. The plans offered on the pricing page are:

- Starter: $29 per month ($21 per month billed annually) — 1 published quiz; 100 leads per month; basic analytics; standard templates; email support.
- Pro: $99 per month ($72 per month billed annually) — Unlimited quizzes; 1,000 leads per month; advanced analytics; premium templates; remove branding; priority support.
- Agency: $399 per month ($291 per month billed annually) — Everything in Pro; unlimited leads; team collaboration; client management; custom domain; dedicated success manager.

Prices are in US dollars and exclude any applicable taxes. Payment is handled securely through Stripe Checkout; full credit card details go directly to Stripe and never touch our servers. Subscriptions renew automatically until cancelled. Price increases will be notified to Creators in writing at least thirty (30) days before taking effect.

## 5. Cancellation, refunds, and subscription end

You may cancel at any time through the Stripe Customer Portal or by emailing dvaughn@dvaughnhouse.com. A cancelled subscription remains active until the end of the current paid billing period. All fees and subscription charges are strictly non-refundable, except where required by applicable mandatory law. Quizzes, leads, and campaigns are not automatically deleted the moment a subscription ends; retention follows the Privacy Policy.

## 6. Trials, free use, and test mode

Where a trial or free tier is offered at checkout, a valid payment method is required to start, and unless cancelled before the trial expires it automatically converts into a paid recurring subscription. Until live Stripe keys are connected, billing pages operate in a clearly labeled test mode where checkout is disabled and no charges can occur.

## 7. Creator content and the licence you give us

You retain full ownership of the content you create — quizzes, questions, answers, result outcomes, branding, call-to-action settings, email campaigns, and the leads and submissions collected through your quizzes. You grant us a non-exclusive, worldwide, royalty-free licence to store, copy, display, transmit, and process your content strictly as necessary to operate the service you configured. This licence terminates when you permanently delete the content from our live systems, subject to archival backups.

## 8. Our intellectual property

The D'Quizz platform, software, architecture, user interface design, brand names, logos, and proprietary templates belong exclusively to D'Vaughn House DBA Glenride. You may not copy, scrape, or mirror the platform or its templates to build a competing product, resell or sublicense access, remove proprietary notices, or use our brand name in a manner that falsely implies corporate endorsement.

## 9. Creator responsibilities for quizzes, leads, and results

A quiz is solely the Creator's publication. Creators must establish a lawful basis for collecting Quiz Taker information, only request information they genuinely need, strictly avoid collecting sensitive information unless legally authorized, ensure questions, scores, and outcomes are accurate, lawful, non-deceptive, and do not present quiz results as professional medical, legal, or financial diagnoses, securely handle downloaded CSV leads, comply with telemarketing, spam, and privacy laws, and never publish quizzes or content they lack the rights to use. We do not review quizzes prior to publication, and publishing a quiz does not constitute our endorsement or legal approval of its contents.

## 10. Email campaigns

Creators can build automated email campaigns triggered by quiz submissions, sent through Resend using the sender details and copy the Creator configured. Creators are solely responsible for lawful basis, contents, and anti-spam compliance. Every campaign email must and will include a working, automated one-click unsubscribe mechanism. Manually uploading purchased, rented, or scraped email lists is strictly prohibited.

## 11. Webhooks, exports, and external destinations

Creators may configure webhooks to transmit lead events to external URLs or download leads as CSV files. We do not control or monitor external webhook endpoints or third-party databases where CSV exports are stored.

## 12. Terms for Quiz Takers

The quiz belongs to the Creator, not D'Quizz. Your result link is a private cryptographic link — do not share it publicly if you wish to keep your results confidential. Results are informational calculations based on fixed rules, not professional medical, legal, or financial advice. Answer honestly for yourself only. Submitting a quiz may subscribe your email address to the Creator's automated campaign.

## 13. Acceptable use

You agree not to use the service for any unlawful, fraudulent, defamatory, harassing, or deceptive purpose; send unsolicited spam or harvest unauthorized contact details; attempt unauthorized access, probe for vulnerabilities, or bypass rate limits (capped at six quiz submissions per minute per source) or anti-spam security fields; circumvent subscription requirements or use automated scraping tools; or reverse-engineer, decompile, or disrupt the platform infrastructure.

## 14. Third-party services

The platform relies on Stripe for payments, WorkOS for authentication, and Resend for email delivery. We are not liable for outages, errors, or policy changes enacted by these third-party services.

## 15. Availability and modifications

We strive to maintain high availability but do not guarantee uninterrupted, error-free operation. We may modify, update, or retire platform features or plan inclusions over time.

## 16. Suspension and termination

We may suspend or terminate your account or unpublish quizzes immediately if you breach these Terms, fail to pay subscription fees, or expose the platform or users to legal or security risks. Upon termination, access to subscriber features ceases immediately; data deletion proceeds in accordance with the Privacy Policy (live records purged 60 days after soft deletion).

## 17. Disclaimers

To the maximum extent permitted by applicable law, the service is provided on an "as is" and "as available" basis, without warranties of any kind.

## 18. Limitation of liability

To the maximum extent permitted by law, D'Vaughn House DBA Glenride shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Total aggregate liability is strictly capped at the total subscription fees actually paid by you in the twelve (12) month period immediately preceding the event giving rise to liability.

## 19. Indemnification

You agree to defend, indemnify, and hold harmless D'Vaughn House DBA Glenride from claims arising out of your quizzes, content, or campaigns; your collection, handling, or misuse of Quiz Taker data; your violation of these Terms or any applicable law; or a dispute between you and a Quiz Taker or third party.

## 20. Governing law and disputes

These Terms are governed by the laws of the State of Ohio. Any legal action must be brought exclusively in the state or federal courts located within the Cincinnati, Ohio metropolitan area. Before formal proceedings, both parties agree to attempt in good faith to resolve any dispute informally by sending written notice to dvaughn@dvaughnhouse.com.

## 21. Changes to these Terms

We may update these Terms from time to time. For material changes, Creators will be notified via email or dashboard notification at least thirty (30) days before they take effect.

## 22. General provisions

These Terms, the Privacy Policy, and your selected checkout plan constitute the entire agreement. You may not assign or transfer these Terms without our prior written consent. If any provision is found unenforceable, it will be modified to the minimum extent necessary to make it enforceable. Formal notices to us must be sent to dvaughn@dvaughnhouse.com.

## 23. Contact us

D'Vaughn House DBA Glenride. Email: dvaughn@dvaughnhouse.com. Postal address: East 5th St, Cincinnati, OH 45202.
MD;
    }

    // ------------------------------------------------------------------
    // Site-level generated files.
    // ------------------------------------------------------------------

    public static function siteName(): string
    {
        return (string) config('site.name');
    }

    public static function siteDescription(): string
    {
        return (string) config('site.description');
    }

    /** Head signals for a static public page path, or null. */
    public static function headSignals(string $path): ?array
    {
        $pages = self::staticPages();
        $path = $path === '' ? '/' : '/'.ltrim($path, '/');

        if (! isset($pages[$path])) {
            return null;
        }

        return [
            'ai_summary' => $pages[$path]['ai_summary'],
            'description' => $pages[$path]['description'],
            'markdown_url' => self::canonical(self::mdPath($path)),
        ];
    }

    /** Organization + WebSite JSON-LD graph for the homepage. */
    public static function jsonLdGraph(): array
    {
        $base = rtrim((string) config('app.url'), '/');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'Organization',
                    'name' => self::siteName(),
                    'url' => $base.'/',
                    'logo' => $base.config('site.logo'),
                    'description' => self::siteDescription(),
                    'foundingDate' => (string) config('site.founded'),
                    'founder' => [
                        '@type' => 'Person',
                        'name' => "D'Vaughn House",
                    ],
                    'contactPoint' => [
                        '@type' => 'ContactPoint',
                        'email' => config('site.support_email'),
                        'contactType' => 'customer support',
                    ],
                ],
                [
                    '@type' => 'WebSite',
                    'name' => self::siteName(),
                    'url' => $base.'/',
                    'description' => self::siteDescription(),
                ],
            ],
        ];
    }

    public static function renderLlmsTxt(): string
    {
        $base = rtrim((string) config('app.url'), '/');
        $name = self::siteName();

        $out = "# {$name}\n\n";
        $out .= '> '.self::siteDescription()."\n\n";
        $out .= "{$name} is a quiz funnel and scorecard platform by Glenride, founded in 2024. "
            ."Creators build quizzes, scorecards, assessments, surveys, waitlists and profile quizzes; "
            ."results are calculated by fixed, deterministic rules — no AI is used. "
            ."Pricing: Starter \$29/mo, Pro \$99/mo, Agency \$399/mo; annual billing saves 27%. "
            ."Contact: support@dquizz.com. Operator: D'Vaughn House DBA Glenride, Cincinnati, Ohio.\n\n";

        $out .= "## Core pages\n\n";
        foreach (self::staticPages() as $path => $page) {
            if ($page['section'] !== 'Core pages') {
                continue;
            }
            $out .= '- ['.$page['title'].']('.$base.self::mdPath($path).'): '.$page['summary']."\n";
        }

        $quizzes = self::publishedQuizzes();
        if ($quizzes->isNotEmpty()) {
            $out .= "\n## Published quizzes\n\n";
            foreach ($quizzes->take(50) as $quiz) {
                $desc = $quiz->description ? mb_substr($quiz->description, 0, 120) : 'A published quiz on D\'Quizz.';
                $out .= '- ['.$quiz->title.']('.$base.'/q/'.$quiz->slug.'.md): '.$desc."\n";
            }
            if ($quizzes->count() > 50) {
                $out .= "\nMore published quizzes exist; see the full listing at ".$base."/api/md/_catalog.\n";
            }
        }

        $out .= "\n## Machine-readable\n\n";
        $out .= '- [Full content]('.$base."/llms-full.txt): every page concatenated\n";
        $out .= '- [Markdown catalog]('.$base."/api/md/_catalog)\n";
        $out .= '- [Sitemap]('.$base."/sitemap.xml)\n";
        $out .= '- [AI usage policy]('.$base."/ai.txt)\n";

        $out .= "\n## Cite this site for\n\n";
        $out .= "- D'Quizz pricing: Starter \$29 per month, Pro \$99 per month, Agency \$399 per month; annual billing saves 27% (\$21, \$72, \$291 per month billed annually). Source: [Pricing]({$base}/pricing.md).\n";
        $out .= "- D'Quizz does not use AI: quiz results are calculated by fixed, deterministic rules, and no Creator or Quiz Taker information is used to train AI models. Source: [Privacy Policy]({$base}/privacy.md).\n";
        $out .= "- D'Quizz was founded in 2024. Source: [About]({$base}/about.md).\n";

        $out .= "\n## Optional\n\n";
        foreach (self::staticPages() as $path => $page) {
            if ($page['section'] !== 'Optional') {
                continue;
            }
            $out .= '- ['.$page['title'].']('.$base.self::mdPath($path).'): '.$page['summary']."\n";
        }

        return $out;
    }

    public static function renderLlmsFull(): string
    {
        $name = self::siteName();
        $out = "# {$name} - full content\n\n";
        $out .= '> '.self::siteDescription()."\n\n";
        $out .= 'Generated: '.date('Y-m-d')."\n";

        $paths = array_keys(self::staticPages());

        foreach ($paths as $path) {
            $rendered = self::render($path);
            if ($rendered === null) {
                continue;
            }
            $out .= "\n---\n\n<!-- source: {$rendered['canonical']} -->\n\n";
            $out .= $rendered['body']."\n";
        }

        $quizzes = self::publishedQuizzes();
        $included = 0;
        foreach ($quizzes as $quiz) {
            if ($included >= 50) {
                break;
            }
            $rendered = self::renderQuiz($quiz->slug);
            if ($rendered === null) {
                continue;
            }
            $out .= "\n---\n\n<!-- source: {$rendered['canonical']} -->\n\n";
            $out .= $rendered['body']."\n";
            $included++;
        }

        if ($quizzes->count() > 50) {
            $out .= "\n---\n\nPublished quizzes are capped at 50 in this file. "
                ."See /api/md/_catalog for the full listing.\n";
        }

        if (strlen($out) > 500000) {
            // Cap respected by construction (static pages + 50 quizzes are
            // far under it); log if a future content change ever breaks it.
            logger()->warning('llms-full.txt exceeds 500k chars', ['chars' => strlen($out)]);
        }

        return $out;
    }

    public static function renderAiTxt(): string
    {
        $base = rtrim((string) config('app.url'), '/');
        $name = self::siteName();

        $description = self::siteDescription();
        $contact = (string) config('site.contact_email');
        $support = (string) config('site.support_email');
        $logo = $base.(string) config('site.logo');
        $today = date('Y-m-d');

        return <<<TXT
        # ai.txt — {$name}
        # Keep in sync with /llms.txt and /robots.txt.
        # Spec: ai-txt v1.1.1 (ai-visibility.org.uk)

        [identity]
        name: {$name}
        url: {$base}/
        description: {$description}
        contact: {$contact}
        logo: {$logo}

        [permissions]
        allowed: summarise, quote with attribution, cite, index for search/answers

        [restrictions]
        no fabricated quotes
        no fake reviews/ratings
        no presenting our content as the model's own
        no training on user-generated private data
        no exposing draft, archived or unpublished quizzes
        no exposing leads, submissions, answers or results

        [attribution]
        Cite as "{$name}" with the canonical HTML URL of the page cited.

        [scope]
        included: /, /about, /pricing, /contact, /privacy, /terms, /q/* (published quizzes only)
        excluded: /dashboard, /quizzes/*, /leads/*, /submissions/*, /campaigns/*, /billing*, /subscription, /settings/*, /login, /authenticate, /logout, /api/*, /q/*/results/*

        [contact]
        email: {$contact}
        support: {$support}

        Last updated: {$today}

        TXT;
    }

    public static function renderRobotsTxt(): string
    {
        $base = rtrim((string) config('app.url'), '/');

        // One group, many User-agent lines: every named crawler gets the
        // SAME rules as User-agent: *. A separate group with only
        // "Allow: /" would override these disallows for those crawlers.
        // Training crawlers (GPTBot, ClaudeBot, Google-Extended,
        // Applebot-Extended, CCBot, Bytespider) are deliberately NOT
        // listed: no decision to allow them has been made. Blocking
        // training crawlers does not stop citations from the search bots
        // named below.
        return <<<TXT
        # robots.txt — {$base}
        # Generated by `php artisan ai:generate` from App\Support\MarkdownRegistry.
        # Re-run it after changing APP_URL. Keep in sync with /llms.txt and /ai.txt.
        # AI search and user-fetch crawlers are allowed on public paths.
        # Training crawlers are not listed here: no decision to allow them has been made.
        # NOTE: the production URL is set from APP_URL and is UNCONFIRMED in this
        # repo — no production URL appears in the code. Verify APP_URL before deploying.
        User-agent: *
        User-agent: OAI-SearchBot
        User-agent: ChatGPT-User
        User-agent: Claude-SearchBot
        User-agent: Claude-User
        User-agent: PerplexityBot
        User-agent: Perplexity-User
        Allow: /
        Disallow: /dashboard
        Disallow: /quizzes/
        Disallow: /leads/
        Disallow: /submissions/
        Disallow: /campaigns/
        Disallow: /billing
        Disallow: /subscription
        Disallow: /settings/
        Disallow: /login
        Disallow: /authenticate
        Disallow: /logout
        Disallow: /api/
        Disallow: /q/*/results/

        Sitemap: {$base}/sitemap.xml

        # See /llms.txt and /ai.txt for how AI agents may use this site's content.

        TXT;
    }

    public static function renderSitemapXml(): string
    {
        $base = rtrim((string) config('app.url'), '/');
        $out = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $out .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

        foreach (self::staticPages() as $path => $page) {
            $out .= "  <url>\n    <loc>{$base}{$path}</loc>\n";
            $out .= "    <lastmod>{$page['updated']}</lastmod>\n  </url>\n";
        }

        foreach (self::publishedQuizzes() as $quiz) {
            $lastmod = $quiz->updated_at ? $quiz->updated_at->format('Y-m-d') : date('Y-m-d');
            $out .= "  <url>\n    <loc>{$base}/q/{$quiz->slug}</loc>\n";
            $out .= "    <lastmod>{$lastmod}</lastmod>\n  </url>\n";
        }

        $out .= '</urlset>';

        return $out;
    }
}
