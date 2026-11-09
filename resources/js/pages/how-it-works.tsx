import { login } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MarketingLayout from '@/layouts/marketing-layout';
import {
    BarChart3,
    LayoutTemplate,
    LineChart,
    Mail,
    Users,
    Zap
} from 'lucide-react';

export default function HowItWorks() {
    return (
        <MarketingLayout>
            <Head title="How it works - D'Quizz" />

            {/* Intro */}
            <section className="relative pt-20 pb-12 lg:pt-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900">
                        How D'Quizz works
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        You bring the questions. D'Quizz handles the scoring, the follow-up,
                        and the handoff to your sales process.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="relative py-16 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 rounded-[2rem] bg-white border border-slate-100 p-10 relative overflow-hidden group hover:border-[#E97451]/30 transition-all shadow-sm hover:shadow-md">
                            <div className="absolute top-0 right-0 p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-48 h-48 bg-[#FCEEEA] rounded-full blur-3xl" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#FCEEEA] flex items-center justify-center mb-6">
                                    <LayoutTemplate className="w-7 h-7 text-[#E97451]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">Visual Builder</h3>
                                <p className="text-slate-500 max-w-md text-lg leading-relaxed">
                                    Launch your first quiz this afternoon. No developer, no designer, no code — 
                                    if you can drag, you can build.
                                </p>
                            </div>
                        </div>
                        
                        <div className="rounded-[2rem] bg-[#E97451] border border-[#C75B32] p-10 relative overflow-hidden group shadow-xl shadow-[#E97451]/20">
                            <div className="absolute inset-0 bg-[#B84A2B]" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Smart Scoring</h3>
                                <p className="text-white/90 text-lg leading-relaxed">
                                    Your best prospects raise their own hands. Scores sort them automatically, 
                                    so you call the right people first.
                                </p>
                            </div>
                        </div>

                        <FeatureCard
                            icon={<Users />}
                            title="Lead Capture"
                            description="Every completion hands you a name, an email, and exactly what they want — organized in your dashboard, ready when you are."
                        />
                        <FeatureCard
                            icon={<BarChart3 />}
                            title="Analytics"
                            description="See where people drop off and fix it. Watch completions turn into conversations."
                        />
                        <FeatureCard
                            icon={<Mail />}
                            title="Campaigns & Export"
                            description="Follow up automatically with built-in email campaigns, and export every lead to CSV whenever you want. Your list stays yours."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 px-6 bg-white/40">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">From visitor to customer <br />in three steps.</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            You bring the questions. D'Quizz handles the scoring, the follow-up, 
                            and the handoff to your sales process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6 min-w-0">
                            <StepItem 
                                number="01" 
                                title="Ask what matters"
                                description="Find out budget, timeline, and fit before you ever get on a call."
                                active
                            />
                            <StepItem 
                                number="02" 
                                title="Let scores do the sorting"
                                description="Hot prospects float to the top. Tire-kickers filter themselves out."
                            />
                            <StepItem 
                                number="03" 
                                title="Give them their answer"
                                description="Each quiz taker gets a personalized result that makes your offer the obvious next step."
                            />
                        </div>
                        <div className="relative min-w-0">
                            <div className="absolute inset-0 bg-[#FCEEEA] blur-3xl rounded-full opacity-60" />
                            <div className="relative bg-white border border-slate-100 rounded-3xl p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#FCEEEA] flex items-center justify-center">
                                                <LineChart className="w-5 h-5 text-[#E97451]" />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-900">Conversion Rate</div>
                                        </div>
                                        <div className="h-2.5 w-12 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#FCEEEA] flex items-center justify-center">
                                                <Users className="w-5 h-5 text-[#E97451]" />
                                            </div>
                                            <div className="text-sm font-semibold text-slate-900">New Leads</div>
                                        </div>
                                        <div className="h-2.5 w-12 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                                
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Total Revenue</div>
                                            <div className="h-8 w-32 bg-slate-100 rounded-lg" />
                                        </div>
                                        <div className="h-16 flex items-end gap-1.5">
                                            {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                                <div key={i} className="w-4 bg-[#E97451] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="relative py-24 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="mb-6 text-3xl font-bold lg:text-5xl text-slate-900">Built for Every Use Case</h2>
                        <p className="mx-auto max-w-2xl text-slate-500 text-lg">
                            From assessments to surveys, D'Quizz adapts to your needs
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <UseCaseCard title="Scorecards" description="Show prospects where they stand — and why they need you to go further." />
                        <UseCaseCard title="Assessments" description="Let people qualify themselves before they ever book your calendar." />
                        <UseCaseCard title="Lead Magnets" description="Trade a personalized result for their email. Everybody wins." />
                        <UseCaseCard title="Surveys" description="Ask your market what it wants, in its own words." />
                        <UseCaseCard title="Waitlists" description="Launch to a line of people already waiting, not an empty room." />
                        <UseCaseCard title="Qualifiers" description="Walk into every sales call knowing budget, need, and timeline." />
                    </div>
                </div>
            </section>

            {/* Why quizzes beat forms */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Why quizzes beat forms</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">
                            A form asks for an email. A quiz earns it — and tells you exactly who you're talking to.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-xl font-bold mb-3 text-slate-900">They tell you what they want</h3>
                            <p className="text-slate-500 leading-relaxed">Every answer is a buying signal. You stop guessing what prospects need and start knowing.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-xl font-bold mb-3 text-slate-900">They convince themselves</h3>
                            <p className="text-slate-500 leading-relaxed">Answering the right questions sells your prospect on your offer before you say a word.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <h3 className="text-xl font-bold mb-3 text-slate-900">You get a segmented list</h3>
                            <p className="text-slate-500 leading-relaxed">No more one-size-fits-all follow-up. Every lead arrives tagged by need and readiness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 lg:p-16 text-center bg-[#E97451] shadow-2xl shadow-[#E97451]/20">
                        <div className="absolute inset-0 bg-[#B84A2B]" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">Your next customer is one quiz away.</h2>
                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Build your first quiz today. Your future customers are already clicking.
                            </p>
                            <Link href={login()}>
                                <Button size="lg" className="h-14 px-10 text-lg bg-white text-[#C75B32] hover:bg-white/90 shadow-xl border-none rounded-xl font-bold">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-[#E97451]/30 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#FCEEEA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-[#E97451]">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
            <p className="text-slate-500 leading-relaxed">{description}</p>
        </div>
    );
}

function StepItem({ number, title, description, active }: { number: string, title: string, description: string, active?: boolean }) {
    return (
        <div className={`flex gap-6 group cursor-default`}>
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${active ? 'bg-[#E97451] text-slate-900 shadow-lg shadow-[#E97451]/30' : 'bg-slate-100 text-slate-400 group-hover:bg-[#E97451]/10 group-hover:text-[#E97451]'}`}>
                    {number}
                </div>
                {!active && <div className="w-px h-full bg-slate-200 my-4" />}
            </div>
            <div className="pb-12 pt-1">
                <h3 className={`text-xl font-bold mb-2 transition-colors ${active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}>{title}</h3>
                <p className={`text-base transition-colors ${active ? 'text-slate-600' : 'text-slate-400 group-hover:text-slate-500'}`}>{description}</p>
            </div>
        </div>
    );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-[#E97451]/30 hover:shadow-md cursor-default">
            <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
    );
}
