import MarketingLayout from '@/layouts/marketing-layout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <MarketingLayout>
            <Head title="Terms of Service - D'Quizz" />
            <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 lg:p-12 shadow-xl shadow-slate-200/50">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Version 1.0 &middot; Effective October 25, 2026</p>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>Operator: D'Vaughn House, a sole proprietorship doing business as ("DBA") Glenride ("Glenride", "D'Quizz", "we", "us", or "our"), operates the D'Quizz quiz-funnel platform and service.</p>
                            <p>Contact:</p>
                            <p>Email: dvaughn@dvaughnhouse.com</p>
                            <p>Postal Address: Glenride, East 5th St, Cincinnati, OH 45202</p>
                            <p>Please read these Terms together with our Privacy Policy, which explains what information the service collects and how it is handled. If these Terms and the Privacy Policy ever conflict about how information is handled, the Privacy Policy controls for that subject.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">1. THE AGREEMENT AND WHO IT COVERS</h2>
                            <p>These Terms of Service (the "Terms") are a binding legal agreement between you and D'Vaughn House DBA Glenride for use of the D'Quizz service. Two different groups of people use D'Quizz, and different parts of these Terms apply to each:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Creators: People who open a D'Quizz account, build and publish quizzes, view the leads and responses those quizzes collect, run email campaigns, and pay for a subscription to access platform features. Sections 1 to 11 and 13 to 23 apply to Creators.</li>
                                <li>Quiz Takers: People who open, answer, or submit someone else's quiz. A Quiz Taker does not need a D'Quizz account. Section 12 applies to Quiz Takers, together with Sections 13, 17, and 20 to 22.</li>
                            </ul>
                            <p>By opening an account, subscribing, or using the Creator dashboard, a Creator accepts these Terms. By submitting a quiz, a Quiz Taker accepts the parts of these Terms that apply to Quiz Takers. If you are accepting on behalf of a business, you confirm you are authorized to bind that business, and "you" in these Terms means that business as well as you.</p>
                            <p>If you do not agree to these Terms, do not use the service.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">2. THE SERVICE</h2>
                            <p>D'Quizz is a quiz-funnel platform. Creators use it to build and publish quizzes, scorecards, assessments, profile quizzes, waitlists, and surveys; to set questions (single choice, multiple choice, scale, and free text), scoring, and result outcomes; to apply their own branding and calls to action; to capture leads; to view analytics; to use built-in templates; to download leads and submissions as CSV files; to send lead and submission data to web addresses (webhooks) they configure; and to run automated email campaigns to people collected through their quizzes.</p>
                            <p>Scores and results are calculated strictly by fixed, deterministic rules set by the Creator: each selected answer carries the score given by the Creator, scale answers count at their numeric value, free-text answers are not scored, and the total score is matched to the result outcome whose score range it falls into. The service does not use artificial intelligence or machine-learning providers, makes no calls to external AI models, and involves zero automated AI processing.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">3. ACCOUNTS AND SIGN-IN</h2>
                            <p>Sign-in is authenticated securely via WorkOS. We do not store your password. Losing access to your WorkOS sign-in may mean losing access to your D'Quizz account, so keep your sign-in details secure and notify us promptly if you believe your account has been compromised.</p>
                            <p>You are solely responsible for your account. Everything done while signed in to your account is treated as done by you or with your authority, including quizzes published, campaigns sent, exports downloaded, and webhooks configured.</p>
                            <p>Account information must be accurate. The name and email address on your account must be correct and kept up to date, because billing, service notices, and account recovery depend on them.</p>
                            <p>Eligibility: You must be at least 18 years of age or older to create a Creator account or hold a subscription. Minors under 18 are strictly prohibited from creating accounts (see Section 13).</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">4. SUBSCRIPTIONS, PLANS, AND BILLING</h2>
                            <p>Creating a free user account does not unlock Creator publishing tools. The dashboard can be viewed without a subscription to check account status, but building and publishing quizzes, viewing leads and submissions, exporting data, configuring webhooks, and running campaigns require an active paid subscription. If a subscription lapses or is cancelled past its grace period, access to those premium features pauses until the subscription is renewed.</p>
                            <p>The plans offered on our pricing page are:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Starter: $29 per month ($21 per month billed annually) — 1 published quiz; 100 leads per month; basic analytics; standard templates; email support.</li>
                                <li>Pro: $99 per month ($72 per month billed annually) — Unlimited quizzes; 1,000 leads per month; advanced analytics; premium templates; remove branding; priority support.</li>
                                <li>Agency: $399 per month ($291 per month billed annually) — Everything in Pro; unlimited leads; team collaboration; client management; custom domain; dedicated success manager.</li>
                            </ul>
                            <p>Prices are in US dollars and exclude any applicable taxes. The plan, price, and billing interval you select at checkout apply to your subscription.</p>
                            <p>Payment Processing via Stripe: Payment is handled securely through Stripe Checkout. Full credit card details go directly to Stripe and never touch our servers. By subscribing, you agree to Stripe's terms of service.</p>
                            <p>Renewal: Subscriptions renew automatically at the end of each billing period at the then-current price for your selected plan and interval, charged to the payment method on file, until cancelled under Section 5.</p>
                            <p>Managing Billing: Payment methods, invoices, and cancellations are managed directly through the Stripe Customer Portal, accessed from your dashboard billing pages.</p>
                            <p>Failed Payments: If a recurring charge fails, Stripe may retry it, and your subscription may be suspended or terminated if payment is not successfully recovered. We are not responsible for overdraft or processing fees charged by your card issuer.</p>
                            <p>Price Changes: We may change plan prices from time to time. Any price increase will be notified to Creators in writing (via email or dashboard notice) at least thirty (30) days before taking effect, and will apply only to subsequent billing periods.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">5. CANCELLATION, REFUNDS, AND SUBSCRIPTION END</h2>
                            <p>How to Cancel: You may cancel your subscription at any time through the Stripe Customer Portal from your billing settings, or by emailing us at dvaughn@dvaughnhouse.com. Cancellation stops future automatic renewals.</p>
                            <p>When Cancellation Takes Effect: A cancelled subscription remains active until the end of the current paid billing period (its grace period), after which subscriber features require a new subscription.</p>
                            <p>Refund Policy: All fees and subscription charges are strictly non-refundable. We do not provide refunds, partial billing credits, or prorated refunds for unused subscription periods, mid-term cancellations, or downgrade requests, except where required by applicable mandatory law. Chargebacks filed fraudulently will result in immediate account termination.</p>
                            <p>Your Data After Subscription Ends: Quizzes, leads, and campaigns are not automatically deleted the moment a subscription ends. Data retention and deletion schedules follow our Privacy Policy and Section 16.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">6. TRIALS, FREE USE, AND TEST MODE</h2>
                            <p>Where a trial or free tier is offered at checkout, a valid payment method is required to start. Unless cancelled before the trial period expires, the trial automatically converts into a paid recurring subscription.</p>
                            <p>Until live Stripe keys are connected, our billing pages operate in a clearly labeled test mode where checkout is disabled and no charges can occur. Test mode is a pre-launch environment and creates no binding subscription.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">7. CREATOR CONTENT AND THE LICENCE YOU GIVE US</h2>
                            <p>Ownership: As between you and us, you retain full ownership of the content you create in the service—your quizzes, questions, answers, result outcomes, branding, call-to-action settings, email campaigns, and the leads and submissions collected through your quizzes.</p>
                            <p>Licence to Us: You grant us a non-exclusive, worldwide, royalty-free licence to store, copy, display, transmit, and process your content strictly as necessary to operate the service you configured: showing quizzes to Quiz Takers, calculating scores, displaying submissions, sending your configured campaign emails, executing your webhooks, providing support, and maintaining security. This licence terminates when you permanently delete the content from our live systems, subject to archival backups.</p>
                            <p>Your Warranties: You warrant that you own or have all necessary legal rights to everything you upload, publish, or configure (including logos, images, text, and mailing lists), and that using them in the service does not infringe or violate any third-party rights.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">8. OUR INTELLECTUAL PROPERTY</h2>
                            <p>The D'Quizz platform, its software, architecture, user interface design, brand names, logos, and proprietary templates belong exclusively to D'Vaughn House DBA Glenride. These Terms grant you a limited, revocable, non-exclusive right to use the software while your account and subscription are active.</p>
                            <p>You may not copy, scrape, or mirror the platform or its templates to build a competing product, resell or sublicense access to the software, remove proprietary notices, or use our brand name in any manner that falsely implies corporate endorsement.</p>
                            <p>Feedback: If you provide suggestions or feature feedback, we may use them freely without restriction or compensation to you.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">9. CREATOR RESPONSIBILITIES FOR QUIZZES, LEADS, AND RESULTS</h2>
                            <p>A quiz is solely the Creator's publication. You—not D'Quizz—are entirely responsible for your quizzes, campaigns, and how you use lead data. Specifically, you agree that you will:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Establish a lawful basis for collecting Quiz Taker information, maintain your own privacy notice where required by law, and respond directly to data subject requests.</li>
                                <li>Only request information you genuinely need, and strictly avoid collecting sensitive information (such as health records, financial data, or government IDs) unless legally authorized.</li>
                                <li>Ensure all questions, scores, and outcomes are accurate, lawful, non-deceptive, and do not present quiz results as professional medical, legal, or financial diagnoses.</li>
                                <li>Securely handle downloaded CSV leads and comply with all applicable telemarketing, spam, and privacy laws.</li>
                                <li>Never publish quizzes or content you lack the rights to use.</li>
                            </ul>
                            <p>We do not review quizzes prior to publication, and publishing a quiz does not constitute our endorsement or legal approval of its contents.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">10. EMAIL CAMPAIGNS</h2>
                            <p>Creators can build automated email campaigns triggered by quiz submissions. Campaign messages are sent through our email delivery provider (Resend) using the sender details and copy you configured. Those messages are your messages, not ours.</p>
                            <p>Compliance: You are solely responsible for ensuring you have a lawful basis to email every recipient, for the contents of your messages, and for complying with anti-spam laws (such as CAN-SPAM).</p>
                            <p>Mandatory Unsubscribe Links: Every campaign email sent through the platform must and will include a working, automated one-click unsubscribe mechanism. The service tracks unsubscribe statuses automatically.</p>
                            <p>No Scraped Lists: Manually uploading purchased, rented, or scraped email lists is strictly prohibited. You may only email individuals who have opted in or with whom you have a recognized lawful relationship.</p>
                            <p>Suspension of Sending: We reserve the right to immediately pause or terminate email campaign sending for any account that generates excessive spam complaints, bounce rates, or threatens the email reputation of our infrastructure.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">11. WEBHOOKS, EXPORTS, AND EXTERNAL DESTINATIONS</h2>
                            <p>You may configure webhooks to transmit lead events to external URLs or download leads as CSV files. We do not control or monitor external webhook endpoints or third-party databases where CSV exports are stored, and we bear no liability for how those external systems handle your data. You are solely responsible for maintaining webhook secret security and notifying Quiz Takers in your privacy policy where their data may be sent.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">12. TERMS FOR QUIZ TAKERS</h2>
                            <p>If you are taking a quiz published by a Creator:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The quiz belongs to the Creator, not D'Quizz. Questions, data collection, and results are managed by the Creator. Direct inquiries about a quiz to the publishing business.</li>
                                <li>Your result link is a private cryptographic link. Do not share it publicly if you wish to keep your results confidential.</li>
                                <li>Results are informational calculations based on fixed rules, not professional medical, legal, or financial advice.</li>
                                <li>Answer honestly for yourself only. Do not impersonate others or submit unauthorized information.</li>
                                <li>Submitting a quiz may subscribe your email address to the Creator's automated campaign, as managed by the Creator under Section 10.</li>
                            </ul>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">13. ACCEPTABLE USE</h2>
                            <p>You agree that you will not:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use the service for any unlawful, fraudulent, defamatory, harassing, or deceptive purpose.</li>
                                <li>Send unsolicited spam or harvest unauthorized contact details.</li>
                                <li>Attempt unauthorized access, probe for vulnerabilities, or bypass rate limits (capped at six quiz submissions per minute per source) or anti-spam security fields.</li>
                                <li>Circumvent subscription requirements or use automated scraping tools against the platform.</li>
                                <li>Reverse-engineer, decompile, or disrupt the platform infrastructure.</li>
                            </ul>
                            <p>We reserve the right to investigate breaches, remove violating content, or suspend accounts immediately.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">14. THIRD-PARTY SERVICES</h2>
                            <p>The platform relies on third-party infrastructure providers: Stripe for payments, WorkOS for authentication, and Resend for email delivery. We are not liable for outages, errors, or policy changes enacted by these third-party services.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">15. AVAILABILITY AND MODIFICATIONS</h2>
                            <p>We strive to maintain high availability but do not guarantee uninterrupted, error-free operation. We may modify, update, or retire platform features or plan inclusions over time. Material feature deprecations will be communicated to active Creators with reasonable advance notice.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">16. SUSPENSION AND TERMINATION</h2>
                            <p>Termination by Us: We may suspend or terminate your account or unpublish quizzes immediately if you breach these Terms, fail to pay subscription fees, or expose the platform or users to legal or security risks.</p>
                            <p>Termination by You: You may cancel your subscription via Stripe and request account closure by emailing us.</p>
                            <p>Effect of Termination: Upon termination, access to subscriber features ceases immediately. Data deletion and archival backup removal proceed in accordance with our Privacy Policy (with live records purged 60 days after soft deletion).</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">17. DISCLAIMERS</h2>
                            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS PROVIDED ON an "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR GENERATE SPECIFIC BUSINESS REVENUE OR LEADS.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">18. LIMITATION OF LIABILITY</h2>
                            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, D'VAUGHN HOUSE DBA GLENRIDE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE USE OF THE SERVICE.</p>
                            <p>TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING UNDER OR RELATED TO THESE TERMS SHALL BE STRICTLY CAPPED AT THE TOTAL SUBSCRIPTION FEES ACTUALLY PAID BY YOU TO US IN THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">19. INDEMNIFICATION</h2>
                            <p>You agree to defend, indemnify, and hold harmless D'Vaughn House DBA Glenride from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or connected with: (a) your quizzes, content, or campaigns; (b) your collection, handling, or misuse of Quiz Taker data; (c) your violation of these Terms or any applicable law; or (d) any dispute between you and a Quiz Taker or third party.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">20. GOVERNING LAW AND DISPUTES</h2>
                            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, without regard to conflict of law principles. Any legal action or proceeding arising under these Terms must be brought exclusively in the state or federal courts located within the Cincinnati, Ohio metropolitan area, and you consent to the personal jurisdiction of such courts.</p>
                            <p>Informal Resolution: Before initiating formal legal proceedings, both parties agree to attempt in good faith to resolve any dispute informally by sending written notice to dvaughn@dvaughnhouse.com and cooperating to reach a resolution.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">21. CHANGES TO THESE TERMS</h2>
                            <p>We may update these Terms from time to time. For material changes, we will notify Creators via email or dashboard notification at least thirty (30) days before they take effect. Continued use of the platform after changes become effective constitutes acceptance of the updated Terms.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">22. GENERAL PROVISIONS</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Entire Agreement: These Terms, our Privacy Policy, and your selected checkout plan constitute the entire agreement between you and us regarding D'Quizz.</li>
                                <li>Assignment: You may not assign or transfer these Terms without our prior written consent. We may freely assign our rights in connection with a merger, acquisition, or sale of assets.</li>
                                <li>Severability: If any provision of these Terms is found to be unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will remain in full force and effect.</li>
                                <li>Notices: Formal notices to us must be sent to dvaughn@dvaughnhouse.com.</li>
                            </ul>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">23. CONTACT US</h2>
                            <p>D'Vaughn House DBA Glenride</p>
                            <p>Email: dvaughn@dvaughnhouse.com</p>
                            <p>Postal Address: East 5th St, Cincinnati, OH 45202</p>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
