import { login } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MarketingLayout from '@/layouts/marketing-layout';
import {
    Sparkles,
    Target
} from 'lucide-react';

export default function Welcome() {
    return (
        <MarketingLayout>
            <Head title="D'Quizz - Turn Visitors into Customers" />
            
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Hero Content */}
                        <div className="relative z-10 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
                                Turn Curious Visitors <br />
                                <span className="text-[#B84A2B]">
                                    Into Ready Buyers
                                </span>
                            </h1>
                            <div className="mb-6"><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E97451]/30 bg-[#FCEEEA] text-[#E97451] text-xs font-bold mb-8 uppercase tracking-wider shadow-sm">
                                <Sparkles className="w-3 h-3" />
                                <span>Turn Clicks into Customers</span>
                            </div></div>
                            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Stop chasing cold leads. D'Quizz asks your visitors the right questions, 
                                scores their answers, and hands you people who already want what you sell.
                                <span className="text-slate-900 font-semibold"> Build your first quiz this afternoon.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                                <Link href={login.url()}>
                                    <Button size="lg" className="h-12 px-8 text-base bg-[#E97451] text-slate-900 hover:bg-[#B84A2B] hover:text-white shadow-lg shadow-[#E97451]/25 border-none rounded-xl">
                                        Start Building Free
                                    </Button>
                                </Link>
                            </div>

                            {/* Why it works */}
                            <div className="flex flex-col items-center gap-6 border-t border-slate-200 pt-8 max-w-lg mx-auto text-center sm:grid sm:grid-cols-3 sm:gap-8 sm:items-start sm:text-left lg:mx-0">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Qualified</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Leads scored before they reach you</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Segmented</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Every answer tags itself</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Yours</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Your list, your data, no middleman</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual - Clean Stack */}
                        <div className="relative z-10 lg:h-[600px] flex items-center justify-center perspective-[1000px]">
                            <div className="relative w-full max-w-md aspect-[4/5] lg:aspect-square transform-style-3d rotate-y-[-12deg] rotate-x-[5deg]">
                                
                                {/* Decor Elements */}
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-[#FFE4D6] rounded-full blur-3xl opacity-60" />
                                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 bg-[#FFF0E0] rounded-full blur-3xl opacity-60" />

                                {/* Card 1 (Back) */}
                                <div className="absolute inset-0 bg-white rounded-3xl border border-slate-100 transform translate-z-[-40px] translate-y-[-30px] translate-x-[20px] scale-[0.9] shadow-xl shadow-slate-200/50"></div>
                                
                                {/* Card 2 (Middle) */}
                                <div className="absolute inset-0 bg-white rounded-3xl border border-slate-100 transform translate-z-[-20px] translate-y-[-15px] translate-x-[10px] scale-[0.95] shadow-xl shadow-slate-200/50"></div>
                                
                                {/* Card 3 (Front - Main) */}
                                <div className="absolute inset-0 bg-white rounded-3xl border border-slate-100 p-8 shadow-2xl shadow-[#E97451]/10 transform translate-z-[0]">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-[#FCEEEA] flex items-center justify-center">
                                            <Target className="w-6 h-6 text-[#E97451]" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="h-2.5 w-24 bg-slate-100 rounded-full" />
                                            <div className="h-10 w-full bg-slate-50 rounded-xl border border-slate-100" />
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="h-2.5 w-32 bg-slate-100 rounded-full" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-28 rounded-xl bg-[#FCEEEA] border border-[#E97451]/20 p-5 flex flex-col justify-end relative overflow-hidden group cursor-pointer transition-all hover:shadow-md">
                                                    <div className="w-8 h-8 rounded-full bg-[#E97451] text-slate-900 flex items-center justify-center text-xs font-bold mb-3 shadow-sm">A</div>
                                                    <div className="h-2 w-16 bg-[#E97451]/30 rounded-full" />
                                                </div>
                                                <div className="h-28 rounded-xl bg-slate-50 border border-slate-100 p-5 flex flex-col justify-end relative overflow-hidden group cursor-pointer transition-all hover:bg-slate-100">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold mb-3">B</div>
                                                    <div className="h-2 w-16 bg-slate-200 rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The deal, one line */}
            <section className="relative px-6 pb-16 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg text-slate-600">
                        Plans from $29 a month. <Link href="/pricing" className="font-semibold text-[#B84A2B] hover:underline">See pricing</Link>
                    </p>
                </div>
            </section>

            {/* How It Works — three steps, one line each */}
            <section className="py-16 px-6 bg-white/40">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900">From visitor to customer <br />in three steps.</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            You bring the questions. D'Quizz handles the scoring, the follow-up, 
                            and the handoff to your sales process.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-6">
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
                </div>
            </section>

            {/* Why quizzes beat forms — one line */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xl text-slate-600 leading-relaxed">
                        A form asks for an email. A quiz earns it — and tells you exactly who you're talking to.
                    </p>
                    <p className="text-slate-500 mt-6">
                        Lead-generation software like ScoreApp. Your list stays yours.
                    </p>
                </div>
            </section>

            {/* Journey links */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-medium">
                    <Link href="/how-it-works" className="text-[#B84A2B] hover:underline">How it works</Link>
                    <Link href="/q/drug-shortage-demo" className="text-[#B84A2B] hover:underline">Try the demo quiz</Link>
                    <Link href="/pricing" className="text-[#B84A2B] hover:underline">Pricing</Link>
                    <Link href="/about" className="text-[#B84A2B] hover:underline">About</Link>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 pt-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden p-12 lg:p-16 text-center bg-[#E97451] shadow-2xl shadow-[#E97451]/20">
                        <div className="absolute inset-0 bg-[#B84A2B]" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-white tracking-tight">Your next customer is one quiz away.</h2>
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
