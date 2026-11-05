import MarketingLayout from '@/layouts/marketing-layout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <MarketingLayout>
            <Head title="Privacy Policy - D'Quizz" />
            <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-28 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-[2rem] bg-white border border-slate-100 p-8 lg:p-12 shadow-xl shadow-slate-200/50">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Version 1.0 &middot; Effective October 25, 2026</p>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>Operator: D'Vaughn House, a sole proprietorship doing business as ("DBA") Glenride ("Glenride", "D'Quizz", "we", "us", or "our"), operates the D'Quizz quiz-funnel platform and service.</p>
                            <p>Questions about this policy or your information: Email: dvaughn@dvaughnhouse.com — Postal Address: Glenride, East 5th St, Cincinnati, OH 45202</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">1. WHO THIS POLICY COVERS</h2>
                            <p>D'Quizz is a quiz-funnel platform. Businesses and individuals use it to build quizzes, scorecards, assessments, surveys, and waitlists, capture leads, and follow up by email. We monetize the platform strictly by selling premium subscription access to our software; we do not run advertisements or sell user or lead data. Two different groups of people are affected by this policy, and the policy treats them separately throughout:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Creators: People who open a D'Quizz account, build quizzes, view the leads and responses those quizzes collect, and pay for premium access to the platform.</li>
                                <li>Quiz Takers: People who open, answer, or submit someone else's quiz. A Quiz Taker does not need a D'Quizz account.</li>
                            </ul>
                            <p>If you are a Quiz Taker, the Creator who published the quiz you took has their own legal responsibilities—and may have their own privacy policy—for the information you provided to them through that quiz.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">2. OUR ROLE IN HANDLING QUIZ TAKER INFORMATION</h2>
                            <p>For a Creator's own account and billing information, we act as the Data Controller: we decide how and why it is used, and we are responsible for it under this policy.</p>
                            <p>For Quiz Taker information—the contact details, answers, and scores collected through a quiz—the Creator is the sole owner and Data Controller. The Creator decides what to ask, why to ask it, and what to do with the responses. We act strictly as a Data Processor on the Creator's behalf. We do not claim ownership over any leads, we do not store or retain leads for our own independent use, we do not use Quiz Taker information for our own marketing, and we never sell it. Our system only holds and processes Quiz Taker submissions on the Creator's behalf so the software functions: to record the submission, calculate the result, display it to the Quiz Taker, and deliver it to the Creator. Our processing of this data is governed by the Data Processing Agreement (Appendix C).</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">3. INFORMATION WE COLLECT FROM CREATORS</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Account: Name, email address, account role, and the date your email was verified. Collected to create and operate your account.</li>
                                <li>Sign-in (via WorkOS): A WorkOS user identifier and your profile avatar, as provided by our authentication provider. Collected to sign you in securely; we do not store your password.</li>
                                <li>Billing (via Stripe): Stripe customer identifier, payment method type and last four digits only, trial end date, subscription status, plan, and price. Collected to process subscriptions and payments for premium site access. Full payment card numbers go directly to Stripe and never touch our database.</li>
                                <li>Your Content: Quizzes, questions, answer options, result outcomes, templates, branding and call-to-action settings, email campaigns, and campaign steps you create. Collected to provide the service you configured.</li>
                                <li>Session Data: Session identifier, IP address, and browser (user agent) recorded with your signed-in session. Collected for security, abuse prevention, and keeping you signed in.</li>
                            </ul>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">4. INFORMATION PROCESSED ON BEHALF OF CREATORS FROM QUIZ TAKERS</h2>
                            <p>What a quiz asks for is set entirely by its Creator. Lead capture on a quiz can be required, optional, or switched off entirely, so not every quiz collects every item below. All such data belongs strictly to the Creator:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact Details: Email address, first name, last name, and phone number, where the quiz asks for them, stored against the specific quiz that collected them.</li>
                                <li>Custom Fields: Additional fields a Creator adds to a quiz—for example, company or job role—stored with the lead record for the Creator. These are chosen by the Creator, not by us (see Section 13 regarding sensitive information).</li>
                                <li>Answers: Your answer to every question, including selected options, scale values, and free-text answers. Free-text answers can contain anything you choose to type; please do not enter sensitive information.</li>
                                <li>Results: Total score, scores by scoring dimension, the result outcome you were shown, and the times you started and submitted. Calculated automatically from your answers (see Section 9).</li>
                                <li>Technical Data: IP address, browser (user agent), referring page, and a session identifier, recorded when a quiz is viewed and when it is submitted. Used for security, abuse prevention, and the view and response counts Creators see.</li>
                                <li>Visitor Identifier: A random identifier attached to a lead record so repeat visits and submissions can be recognized as the same visitor.</li>
                            </ul>
                            <p>Your result page is reached through a long, unguessable link token rather than a sequential number, so results cannot be browsed by guessing addresses. Anyone who has that link can view the result it points to, so treat it like a private link.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">5. COOKIES, ANALYTICS, AND TRACKING TECHNOLOGY</h2>
                            <p>D'Quizz is free of advertising cookies, third-party analytics, and tracking pixels. We do not install Google Analytics, Meta Pixels, or any third-party behavioral trackers on the platform, and we do not permit Creators to embed third-party tracking pixels or scripts into their quizzes.</p>
                            <p>To the extent our core application framework uses strictly necessary browser storage or functional session tokens to operate the site (such as keeping a Creator logged into their dashboard, protecting forms against cross-site request forgery for up to 120 minutes of inactivity, remembering dashboard sidebar display preferences, or preventing a quiz from being submitted twice), these are used solely to deliver the requested software functionality and never to track you across other websites. You can clear or block browser storage and cookies in your browser settings at any time.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">6. HOW WE USE INFORMATION</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide the service: Create accounts, publish quizzes, record submissions on behalf of Creators, calculate scores and results, and display them.</li>
                                <li>To deliver Creator results: Display quiz view counts, submissions, leads, and per-quiz analytics to the Creator who owns those quizzes—and only to that Creator.</li>
                                <li>To bill Creators: Manage premium subscriptions, trials, and payments through Stripe, and handle failed payments.</li>
                                <li>To send email: Deliver transactional service messages (such as sign-in, billing, and result-related emails) and, where a Creator has configured a campaign, deliver the Creator's campaign emails described in Section 7.</li>
                                <li>To keep the service safe: Detect spam and abuse (including a hidden anti-spam field and a rate limit of six quiz submissions per minute per source), prevent fraud, and enforce our terms.</li>
                                <li>To support and improve the service: Answer support requests and fix software faults.</li>
                                <li>To meet legal duties: Comply with tax and accounting requirements, respond to lawful requests, and protect our legal rights.</li>
                            </ul>
                            <p>We do not use Quiz Taker answers or contact details to advertise our own products to Quiz Takers, and we do not build advertising profiles from them.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">7. EMAIL CAMPAIGNS AND MARKETING EMAIL</h2>
                            <p>Creators can build automated email campaigns in D'Quizz. If a Creator has set a campaign to start from one of their quizzes, submitting that quiz can subscribe the submitted email address to that campaign, and campaign messages are then sent in the steps the Creator configured. Those messages are the Creator's messages, sent through our email delivery provider (Resend) on the Creator's behalf.</p>
                            <p>We record whether a campaign message was sent, failed, opened, or clicked, and when, so the Creator can see how their campaign performed.</p>
                            <p>Every campaign email includes a mandatory, working unsubscribe link. If you unsubscribe, the Creator's subsequent messages to you from that campaign stop immediately, and submitting another of that Creator's quizzes will not automatically subscribe you again.</p>
                            <p>D'Quizz Marketing Emails: We may send our own product updates, newsletters, and promotional emails strictly to Creators (who may opt out at any time using the unsubscribe link in those emails). We never send D'Quizz marketing emails to Quiz Takers. Transactional service and billing emails sent to Creators are not marketing and cannot be switched off while an account is open, because the account cannot operate without them.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">8. WHO WE SHARE INFORMATION WITH</h2>
                            <p>We do not sell personal information, we do not sell leads, and we do not share personal information for cross-context behavioral advertising. We only disclose information to the following parties to operate the platform:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The Creator Who Owns the Quiz: Receives the leads, answers, scores, and results collected through their quizzes, including CSV exports that the Creator can download.</li>
                                <li>Stripe: Receives Creator billing details and payment information to process subscriptions. Stripe handles full card numbers; we receive only the card type and last four digits.</li>
                                <li>WorkOS: Receives Creator sign-in and identity information for authentication and secure sign-in.</li>
                                <li>Resend: Receives email addresses and message content to deliver transactional and campaign emails, and logs delivery, open, and click status.</li>
                                <li>Hosting Infrastructure: All platform data and databases are hosted on proprietary servers operated by Glenride in the United States.</li>
                                <li>Destinations a Creator Configures (Webhooks): Lead and submission data sent by webhook to an external web address configured by the Creator; we keep a log of each delivery, its payload, and the response received. Those destinations are controlled by the Creator, not by us.</li>
                                <li>Authorities and Advisers: Information disclosed where the law requires it, or to protect our rights, users, or the public.</li>
                                <li>A Buyer or Successor: Information connected with the service if the business or the service is sold, merged, or transferred, in which case we will notify users via an update to this policy.</li>
                            </ul>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">9. SCORING AND AUTOMATION (NO AI)</h2>
                            <p>Quiz results are calculated strictly by fixed, deterministic rules in our software: each selected answer carries a score set by the Creator, scale answers count at their numeric value, free-text answers are not scored, and the total is matched to the result outcome whose score range it falls into. No result is produced by a human reviewing your answers, and no result on its own produces a legal or similarly significant decision about you—a Creator who uses results to make such a decision is solely responsible for that use.</p>
                            <p>D'Quizz does not use artificial intelligence (AI) or machine-learning providers, makes no calls to external AI models, will not add AI features to process your data, and never uses Creator or Quiz Taker information to train AI models.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">10. HOW LONG WE KEEP INFORMATION</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Creator Account and Content: Kept while the Creator's account remains open, so the service can run.</li>
                                <li>Leads, Submissions, and Answers: Held on the Creator's behalf while the Creator's account and quiz exist, or until the Creator deletes them or a Quiz Taker's deletion request is actioned under Section 12.</li>
                                <li>Soft-Delete and Permanent Purge Schedule: When a quiz, lead, or campaign is deleted in the dashboard, it is initially marked as soft-deleted (hidden from view) and is permanently erased from the live database 60 days later.</li>
                                <li>Campaign Unsubscribe Records: Kept with the campaign so an unsubscribed email address is not added back by mistake.</li>
                                <li>Stripe Billing Records: Kept for a maximum of seven (7) years after a transaction or subscription ends to comply with tax and accounting laws.</li>
                                <li>Database Backups and Logs: Managed database backups follow standard backup rotation schedules, and encrypted archival backups may survive for a maximum of three (3) years before being permanently overwritten or destroyed.</li>
                            </ul>
                            <p>We may retain specific information for longer where the law requires it, or where it is legally required to resolve an active dispute or enforce our terms.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">11. SECURITY AND ENCRYPTION</h2>
                            <p>We implement technical and organizational measures to protect your information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Proprietary Hardware &amp; Encryption: Our database is housed on proprietary hardware owned and operated by Glenride in the United States. All data stored in our database is encrypted at rest (using industry-standard AES-256 encryption) and encrypted in transit over networks using Transport Layer Security (TLS/HTTPS).</li>
                                <li>Owner-Scoped Access: Creator data is strictly owner-scoped; a signed-in Creator can only access the quizzes, leads, submissions, and campaigns attached to their own account.</li>
                                <li>Unguessable Result Links: Quiz result pages use long, unguessable per-submission tokens instead of sequential numbers.</li>
                                <li>Credential Isolation: Passwords are held by WorkOS, not in our database, and full payment card numbers are held by Stripe, not by us.</li>
                                <li>Abuse Protection: Quiz submissions are rate-limited and protected by automated anti-spam checks.</li>
                                <li>Strict Access Control: Physical and logical access to production systems and proprietary hardware is restricted strictly to authorized Glenride personnel.</li>
                            </ul>
                            <p>No system is completely secure. If we become aware of a data breach affecting your personal information, we will notify affected individuals and any required regulatory authorities within the timeframe mandated by applicable law.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">12. YOUR CHOICES AND PRIVACY RIGHTS</h2>
                            <p>Depending on where you live, you may have the right to request access to your personal information, receive a copy of it in a portable format, correct inaccurate information, request deletion of your information, restrict or object to how it is processed, and withdraw consent where consent is the legal basis for processing. You will not be discriminated against or treated worse for exercising a privacy right.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">If You Are a Creator:</h3>
                            <p>You can view and update your account information in your account settings, download your leads and submissions as CSV files, delete individual leads, quizzes, and campaigns from your dashboard, and manage or cancel your subscription through the billing portal. To close your account and request deletion of your account data, contact us at dvaughn@dvaughnhouse.com.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">If You Are a Quiz Taker:</h3>
                            <p>Your information was collected through a specific Creator's quiz, and that Creator is the Data Controller. The fastest route is to contact that Creator directly to action your request. You may also contact us at dvaughn@dvaughnhouse.com; we will forward the request to the Creator who owns the quiz and assist them in fulfilling it, or action it directly where required by law. Please provide the name or URL of the quiz you took and the email address you submitted so we can locate the record.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">Email Opt-Out:</h3>
                            <p>Use the one-click unsubscribe link at the bottom of any campaign email, or contact the Creator. Unsubscribing stops campaign emails from that Creator; if you also want your lead record deleted, please submit a deletion request as described above.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">Response Timeframe:</h3>
                            <p>We will respond to and fulfill verified requests to access or delete data within 30 business days. For complex or high-volume requests, we may extend this period by an additional 30 days, in which case we will notify you of the extension and the reason for it.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">13. AGE RESTRICTIONS AND PROHIBITION ON CHILDREN'S DATA</h2>
                            <p>D'Quizz is strictly a business-to-business tool intended for adults. You must be at least 18 years of age or older to create a Creator account or use the D'Quizz platform.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">Strict Bar on Children Under 18 (and Under 13 / COPPA):</h3>
                            <p>We do not knowingly collect, solicit, or process personal information from anyone under the age of 18, and specifically prohibit the use of D'Quizz to collect information from children under the age of 13 (or the applicable age of digital consent in your jurisdiction, such as 16 in the EEA/UK). Creators are strictly prohibited from building, targeting, or administering quizzes to children under 18, including in K-12 schools or youth programs. If we discover that a Creator has used D'Quizz to collect personal information from a minor under 18 (or a child under 13), we will immediately terminate the quiz and purge the associated records from our database. If you believe a child has submitted personal information through a quiz on our platform, please contact us immediately at dvaughn@dvaughnhouse.com.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">Sensitive Information:</h3>
                            <p>We do not ask Quiz Takers for sensitive personal information on our own behalf. Creators are prohibited by our terms from using quizzes to collect sensitive categories of data (such as medical or health records, government ID numbers, financial account numbers, or biometric data) without lawful authority. If a quiz asks you for information you consider sensitive, please do not submit it.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">14. WHERE INFORMATION IS HELD AND INTERNATIONAL TRANSFERS</h2>
                            <p>All D'Quizz servers and databases are located on proprietary Glenride hardware in the United States. If you access the service from outside the United States (including from the European Economic Area, the United Kingdom, or Canada), please be aware that your information will be transferred to, stored, and processed in the United States. If you are located in the EEA, UK, or Switzerland, please see Appendix B (GDPR / UK GDPR Addendum) and Appendix C (Data Processing Agreement) below for details on your specific rights and our international data transfer safeguards.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">15. CHANGES TO THIS POLICY</h2>
                            <p>We will update this policy when our data practices change, and we will update the Effective Date at the top when we do. For material changes affecting how personal information is used, we will notify Creators by email or via a notice in the dashboard before the change takes effect.</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">16. CONTACT US</h2>
                            <p>D'Vaughn House DBA Glenride</p>
                            <p>Email: dvaughn@dvaughnhouse.com</p>
                            <p>Postal Address: East 5th St, Cincinnati, OH 45202</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">APPENDIX B — GDPR AND UK GDPR PRIVACY ADDENDUM</h2>
                            <p>This Addendum applies if you are located in the European Economic Area ("EEA"), the United Kingdom ("UK"), or Switzerland, and supplements the D'Quizz Privacy Policy above.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">1. DATA CONTROLLER AND PROCESSOR ROLES</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Creator Data: D'Vaughn House DBA Glenride is the "Data Controller" (as defined in the EU General Data Protection Regulation 2016/679 ("GDPR") and the UK Data Protection Act 2018 ("UK GDPR")) with respect to personal data collected directly from Creators for account management and billing.</li>
                                <li>Quiz Taker Data: The Creator who publishes a quiz is the "Data Controller" of all personal data collected from Quiz Takers via that quiz. Glenride acts exclusively as a "Data Processor" acting on the instructions of the Creator pursuant to our Data Processing Agreement (Appendix C).</li>
                            </ul>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">2. LEGAL BASES FOR PROCESSING CREATOR DATA</h3>
                            <p>Where Glenride acts as a Data Controller for Creator personal data, we process your personal data under the following legal bases (Article 6 of the GDPR / UK GDPR):</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Performance of a Contract (Art. 6(1)(b)): To register your account, provide access to the D'Quizz platform, host your quizzes, and process subscription payments via Stripe.</li>
                                <li>Legal Obligation (Art. 6(1)(c)): To maintain tax, accounting, and billing records for seven (7) years as required by law, and to respond to lawful data protection requests.</li>
                                <li>Legitimate Interests (Art. 6(1)(f)): To secure our proprietary servers, prevent spam and fraud, maintain session security, and send product updates to Creators (from which you may opt out at any time).</li>
                                <li>Consent (Art. 6(1)(a)): Where we expressly ask for your consent for a specific purpose, which you may withdraw at any time.</li>
                            </ul>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">3. INTERNATIONAL DATA TRANSFERS</h3>
                            <p>Glenride is established in the United States, and our proprietary servers are located in Ohio, United States. When personal data of EEA, UK, or Swiss individuals is transferred to Glenride in the United States, such transfers are governed by:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The European Commission's Standard Contractual Clauses ("SCCs") (Commission Implementing Decision (EU) 2021/914), incorporated into our Data Processing Agreement (Appendix C); and</li>
                                <li>The UK International Data Transfer Addendum ("UK Addendum") issued by the UK Information Commissioner's Office ("ICO"), as applicable.</li>
                            </ul>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">4. YOUR EEA / UK DATA PROTECTION RIGHTS</h3>
                            <p>In addition to the rights listed in Section 12 of the Privacy Policy, individuals in the EEA and UK have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request access to and rectification or erasure of your personal data;</li>
                                <li>Restrict or object to the processing of your personal data;</li>
                                <li>Exercise the right to data portability;</li>
                            </ul>
                            <p>Lodge a formal complaint with a supervisory authority—specifically, the Data Protection Authority in the EU Member State of your habitual residence or place of work, or the Information Commissioner's Office (ICO) in the United Kingdom (<a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-slate-900 underline">https://ico.org.uk</a>).</p>
                            <h2 className="text-xl font-bold text-slate-900 pt-6">APPENDIX C — DATA PROCESSING AGREEMENT (DPA)</h2>
                            <p>This Data Processing Agreement ("DPA") forms part of the Terms of Service and Privacy Policy between D'Vaughn House DBA Glenride ("Processor" or "Glenride") and the Creator using the D'Quizz platform ("Controller" or "Creator") to reflect the parties' agreement with regard to the Processing of Quiz Taker Personal Data.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">1. DEFINITIONS</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>"Data Protection Laws" means all applicable privacy and data protection laws, including the EU GDPR, the UK GDPR, the Swiss Federal Act on Data Protection, and applicable US state privacy laws (such as the CCPA/CPRA).</li>
                                <li>"Personal Data" means any information relating to an identified or identifiable Quiz Taker that is processed by Glenride on behalf of the Creator through the D'Quizz service.</li>
                                <li>"Processing", "Controller", "Processor", "Data Subject", and "Personal Data Breach" shall have the meanings given to them in the GDPR.</li>
                            </ul>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">2. ROLES AND SCOPE OF PROCESSING</h3>
                            <p>2.1 Role of the Parties: The parties acknowledge and agree that with regard to the Processing of Quiz Taker Personal Data, Creator is the Controller and Glenride is the Processor. Glenride does not own, claim rights to, or independently use Creator's leads or Quiz Taker Personal Data.</p>
                            <p>2.2 Creator Instructions: Glenride shall process Quiz Taker Personal Data only on the documented instructions of the Creator (which include the Creator's configuration of quizzes, webhooks, and email campaigns within the D'Quizz dashboard), unless required to do otherwise by applicable law.</p>
                            <p>2.3 Creator Responsibilities: Creator warrants that it has all necessary lawful bases, notices, and consents required under Data Protection Laws to collect Quiz Taker Personal Data via D'Quizz and to instruct Glenride to send campaign emails on Creator's behalf. Creator agrees not to collect Personal Data from individuals under the age of 18.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">3. DETAILS OF DATA PROCESSING</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Subject Matter: Provision of the D'Quizz quiz-funnel and email campaign software platform.</li>
                                <li>Duration: For the duration of Creator's active account, plus 60 days following soft-deletion of records in the dashboard (and up to 3 years in encrypted archival backups).</li>
                                <li>Nature and Purpose: Hosting quizzes, recording Quiz Taker responses, calculating deterministic quiz scores, delivering webhook payloads configured by the Creator, and sending Creator-configured email campaigns with mandatory unsubscribe links.</li>
                                <li>Categories of Data Subjects: Quiz Takers (end users who view or submit a Creator's quiz).</li>
                                <li>Types of Personal Data: Name, email address, phone number, custom fields configured by Creator, quiz answers, calculated scores, IP address, user agent, and email delivery/engagement statuses.</li>
                            </ul>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">4. CONFIDENTIALITY AND SECURITY (TECHNICAL &amp; ORGANIZATIONAL MEASURES)</h3>
                            <p>4.1 Confidentiality: Glenride ensures that any personnel authorized to process Personal Data are bound by strict confidentiality obligations.</p>
                            <p>4.2 Security Measures: Taking into account the state of the art and the nature of processing, Glenride implements the following security measures (Annex II for SCC purposes):</p>
                            <p>(a) Encryption at Rest and in Transit: All databases containing Personal Data are stored on Glenride's proprietary hardware in the United States with full disk/database encryption at rest (AES-256) and encryption in transit (TLS 1.2/1.3).</p>
                            <p>(b) Access Control: Strict logical isolation ("owner-scoped" queries) ensuring Creators can only access their own leads, paired with strict physical and administrative access controls limiting server access solely to Glenride's principal operator.</p>
                            <p>(c) Pseudonymization / Tokenization: Quiz result URLs utilize cryptographic/unguessable tokens rather than sequential IDs.</p>
                            <p>(d) Abuse Prevention: Rate limiting on public submission endpoints and automated anti-spam filtering.</p>
                            <p>(e) Availability and Backups: Managed database backup routines with encrypted backups retained for up to three (3) years to ensure resilience and recovery.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">5. SUBPROCESSORS</h3>
                            <p>5.1 General Authorization: Creator grants Glenride general written authorization to engage the following third-party Subprocessors required to deliver the core functionality of the platform:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Resend (United States): Transactional and campaign email delivery.</li>
                                <li>WorkOS (United States): Authentication and identity management (Creator accounts).</li>
                                <li>Stripe (United States): Subscription billing and payment processing (Creator accounts).</li>
                            </ul>
                            <p>5.2 Subprocessor Obligations: Glenride shall ensure that any Subprocessor is bound by written data protection terms no less protective than those in this DPA. Glenride will notify Creators of any intended changes concerning the addition or replacement of Subprocessors by updating the Privacy Policy.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">6. DATA SUBJECT RIGHTS AND ASSISTANCE</h3>
                            <p>6.1 Assistance: Taking into account the nature of the Processing, Glenride shall assist the Creator by providing dashboard tools (including CSV exports and lead deletion controls) to enable the Creator to respond to Data Subject requests under Data Protection Laws.</p>
                            <p>6.2 Direct Requests from Quiz Takers: If a Quiz Taker contacts Glenride directly to request access to, correction of, or deletion of their Personal Data, Glenride will notify the Creator and fulfills or assists with verified requests within 30 business days (with up to an additional 30 days for complex requests).</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">7. PERSONAL DATA BREACH NOTIFICATION</h3>
                            <p>Glenride shall notify the Creator without undue delay after becoming aware of a Personal Data Breach affecting Quiz Taker Personal Data hosted on Glenride's systems, and shall provide reasonable information and cooperation to assist the Creator in meeting any breach notification obligations under Data Protection Laws.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">8. DELETION OR RETURN OF DATA</h3>
                            <p>Creator may export Quiz Taker Personal Data via CSV at any time during an active subscription. Upon deletion of a lead, quiz, or Creator account, Glenride places the records in a soft-deleted state and permanently purges them from the live production database after 60 days. Encrypted backup archives are overwritten or destroyed within a maximum of three (3) years.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">9. AUDITS AND COMPLIANCE</h3>
                            <p>Upon reasonable written request by a Creator (no more than once annually), Glenride shall make available information reasonably necessary to demonstrate compliance with the obligations laid down in this DPA.</p>
                            <h3 className="text-lg font-bold text-slate-900 pt-4">10. INTERNATIONAL TRANSFERS (STANDARD CONTRACTUAL CLAUSES)</h3>
                            <p>To the extent Creator's use of D'Quizz involves the transfer of Personal Data from the EEA, UK, or Switzerland to Glenride in the United States, the parties agree that:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Module Two (Controller to Processor) of the EU Standard Contractual Clauses (Decision (EU) 2021/914) is hereby incorporated by reference, with Creator as the "data exporter" and Glenride as the "data importer."</li>
                                <li>For purposes of Clause 9 of the SCCs, Option 2 (General Written Authorization) applies with a 15-day notice period via policy update.</li>
                                <li>For purposes of Clause 17 and 18 of the SCCs, the governing law and forum shall be the Republic of Ireland (for EEA transfers) or England and Wales (for UK transfers under the UK International Data Transfer Addendum, which is also incorporated by reference).</li>
                                <li>Annex I and Annex II of the SCCs are populated with the details set forth in Sections 3, 4, and 5 of this DPA.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
