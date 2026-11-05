<?php

return [

    /*
    |--------------------------------------------------------------------------
    | D'Quizz site identity — single source of truth for AI-readable files
    |--------------------------------------------------------------------------
    |
    | The name, URL, description and contact details below feed llms.txt,
    | llms-full.txt, ai.txt, robots.txt, sitemap.xml and the JSON-LD on the
    | homepage. Never hardcode them in several places.
    |
    | The live URL is NOT confirmed in this repo: config/app.php and
    | .env.example both default APP_URL to http://localhost, and no
    | production URL appears anywhere in the code. The candidate
    | https://app.dvaughnhouse.com (linked from the gateway's project list)
    | is unconfirmed. Set APP_URL in production .env to the real URL;
    | every canonical URL in the AI-readable files is built from it.
    |
    */

    'name' => "D'Quizz by Glenride",

    'description' => 'D\'Quizz by Glenride is a quiz funnel and scorecard platform. '
        .'Businesses create interactive quizzes, assessments, scorecards, profile quizzes, '
        .'waitlists and surveys that ask visitors the right questions, score their answers '
        .'by fixed deterministic rules, and hand over qualified leads with a personalised result.',

    'founded' => 2024,

    'operator' => "D'Vaughn House, a sole proprietorship doing business as Glenride",

    'contact_email' => 'dvaughn@dvaughnhouse.com',

    'support_email' => 'support@dquizz.com',

    'postal_address' => 'Glenride, East 5th St, Cincinnati, OH 45202',

    'logo' => '/dquizz-logo.png',

    // No social profiles are published anywhere on this site. Do not invent
    // sameAs links: the JSON-LD intentionally has no sameAs entries.
    'socials' => [],

];
