<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\PublicQuizController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\ValidateAuthSession;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/how-it-works', function () {
    return Inertia::render('how-it-works');
})->name('how-it-works');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

// Public Quiz Routes (no auth required)
Route::get('/q/{slug}', [PublicQuizController::class, 'show'])->name('public.quiz.show');
Route::post('/q/{slug}/submit', [PublicQuizController::class, 'submit'])
    ->name('public.quiz.submit')
    ->middleware('throttle:6,1'); // Limit to 6 submissions per minute
Route::get('/q/{slug}/results/{token}', [PublicQuizController::class, 'results'])->name('public.quiz.results');

Route::middleware(
    ['auth', ValidateAuthSession::class]
)->group(function () {
    // Billing
    Route::get('billing', [BillingController::class, 'index'])->name('billing.index');
    Route::get('subscription', [BillingController::class, 'subscriptionPage'])->name('subscription');
    Route::get('billing/subscribe', [BillingController::class, 'subscribe'])->name('billing.subscribe');
    Route::post('billing/checkout', [BillingController::class, 'checkout'])->name('billing.checkout');
    Route::get('billing/success', [BillingController::class, 'success'])->name('billing.success');
    Route::get('billing/portal', [BillingController::class, 'portal'])->name('billing.portal');

    // Dashboard (accessible without subscription to show upgrade prompt)
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Routes protected by subscription paywall
    Route::middleware(['subscribed'])->group(function () {
        // Quizzes
        Route::get('quizzes', [QuizController::class, 'index'])->name('quizzes.index');
        Route::get('quizzes/create', [QuizController::class, 'create'])->name('quizzes.create');
        Route::post('quizzes', [QuizController::class, 'store'])->name('quizzes.store');
        Route::get('quizzes/{quiz}/edit', [QuizController::class, 'edit'])->name('quizzes.edit');
        Route::put('quizzes/{quiz}', [QuizController::class, 'update'])->name('quizzes.update');
        Route::patch('quizzes/{quiz}/status', [QuizController::class, 'updateStatus'])->name('quizzes.status');
        Route::delete('quizzes/{quiz}', [QuizController::class, 'destroy'])->name('quizzes.destroy');
        Route::post('quizzes/{quiz}/duplicate', [QuizController::class, 'duplicate'])->name('quizzes.duplicate');
        Route::get('quizzes/{quiz}/analytics', [QuizController::class, 'analytics'])->name('quizzes.analytics');

        // Quiz Questions
        Route::post('quizzes/{quiz}/questions', [QuizController::class, 'storeQuestion'])->name('quizzes.questions.store');
        Route::put('quizzes/{quiz}/questions/{question}', [QuizController::class, 'updateQuestion'])->name('quizzes.questions.update');
        Route::delete('quizzes/{quiz}/questions/{question}', [QuizController::class, 'destroyQuestion'])->name('quizzes.questions.destroy');
        Route::post('quizzes/{quiz}/questions/reorder', [QuizController::class, 'reorderQuestions'])->name('quizzes.questions.reorder');

        // Quiz Result Outcomes
        Route::post('quizzes/{quiz}/outcomes', [QuizController::class, 'storeOutcome'])->name('quizzes.outcomes.store');
        Route::put('quizzes/{quiz}/outcomes/{outcome}', [QuizController::class, 'updateOutcome'])->name('quizzes.outcomes.update');
        Route::delete('quizzes/{quiz}/outcomes/{outcome}', [QuizController::class, 'destroyOutcome'])->name('quizzes.outcomes.destroy');

        // Leads
        Route::get('leads', [LeadController::class, 'index'])->name('leads.index');
        Route::get('leads/export', [LeadController::class, 'export'])->name('leads.export');
        Route::get('leads/{lead}', [LeadController::class, 'show'])->name('leads.show');
        Route::delete('leads/{lead}', [LeadController::class, 'destroy'])->name('leads.destroy');

        // Submissions/Responses
        Route::get('submissions', [SubmissionController::class, 'index'])->name('submissions.index');
        Route::get('submissions/export', [SubmissionController::class, 'export'])->name('submissions.export');
        Route::get('submissions/{submission}', [SubmissionController::class, 'show'])->name('submissions.show');

        // Campaigns
        Route::get('campaigns', [CampaignController::class, 'index'])->name('campaigns.index');
        Route::get('campaigns/create', [CampaignController::class, 'create'])->name('campaigns.create');
        Route::post('campaigns', [CampaignController::class, 'store'])->name('campaigns.store');
        Route::get('campaigns/{campaign}/edit', [CampaignController::class, 'edit'])->name('campaigns.edit');
        Route::put('campaigns/{campaign}', [CampaignController::class, 'update'])->name('campaigns.update');
        Route::patch('campaigns/{campaign}/status', [CampaignController::class, 'updateStatus'])->name('campaigns.status');
        Route::delete('campaigns/{campaign}', [CampaignController::class, 'destroy'])->name('campaigns.destroy');
        Route::get('campaigns/{campaign}/analytics', [CampaignController::class, 'analytics'])->name('campaigns.analytics');

        // Campaign Steps
        Route::post('campaigns/{campaign}/steps', [CampaignController::class, 'storeStep'])->name('campaigns.steps.store');
        Route::put('campaigns/{campaign}/steps/{step}', [CampaignController::class, 'updateStep'])->name('campaigns.steps.update');
        Route::delete('campaigns/{campaign}/steps/{step}', [CampaignController::class, 'destroyStep'])->name('campaigns.steps.destroy');
        Route::post('campaigns/{campaign}/steps/reorder', [CampaignController::class, 'reorderSteps'])->name('campaigns.steps.reorder');

        // Campaign Subscriptions
        Route::get('campaigns/{campaign}/subscriptions', [CampaignController::class, 'subscriptions'])->name('campaigns.subscriptions');
        Route::post('campaigns/{campaign}/subscriptions', [CampaignController::class, 'addSubscriber'])->name('campaigns.subscriptions.store');
        Route::delete('campaigns/{campaign}/subscriptions/{subscription}', [CampaignController::class, 'removeSubscriber'])->name('campaigns.subscriptions.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
