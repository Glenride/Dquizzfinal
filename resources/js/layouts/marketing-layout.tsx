import { Button } from '@/components/ui/button';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Globe2, ShieldCheck } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-[#FDF8F4] text-slate-900 selection:bg-[#E97451]/30 overflow-x-hidden font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#F9DCD3] rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#F9DCD3] rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F4]/80 backdrop-blur-md border-b border-[#E97451]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    <div className="flex shrink-0 items-center gap-2">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/dquizz-logo.png" alt="D'Quizz" className="h-8 sm:h-10 w-auto" />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-[#E97451] transition-colors">Home</Link>
                        <Link href="/how-it-works" className="hover:text-[#E97451] transition-colors">How it works</Link>
                        <Link href="/about" className="hover:text-[#E97451] transition-colors">About</Link>
                        <Link href="/pricing" className="hover:text-[#E97451] transition-colors">Pricing</Link>
                        <Link href="/contact" className="hover:text-[#E97451] transition-colors">Contact</Link>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                        {auth.user ? (
                            <Link href={dashboard.url()}>
                                <Button className="bg-[#F9DCD3] text-[#B84A2B] hover:bg-[#E97451] hover:text-slate-900 border-none shadow-none font-semibold transition-all">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login.url()}>
                                    <Button className="bg-[#F9DCD3] text-[#B84A2B] hover:bg-[#E97451] hover:text-slate-900 border-none shadow-none font-semibold transition-all">
                                        Dashboard
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-16 sm:pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#E97451]/10 bg-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/dquizz-logo.png" alt="D'Quizz" className="h-9 w-auto" />
                        </div>
                        <p className="text-slate-500 max-w-sm">
                            Transforming passive visitors into engaged prospects through the power of quiz funnels.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-slate-900">Company</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link href="/about" className="hover:text-[#E97451] transition-colors">About Us</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#E97451] transition-colors">Pricing</Link></li>
                            <li><Link href="/contact" className="hover:text-[#E97451] transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 text-slate-900">Legal</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><Link href="/privacy" className="hover:text-[#E97451] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-[#E97451] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#E97451]/10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} D'Quizz. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Globe2 className="w-5 h-5 cursor-pointer hover:text-[#E97451] transition-colors" />
                        <ShieldCheck className="w-5 h-5 cursor-pointer hover:text-[#E97451] transition-colors" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
