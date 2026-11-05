import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnswerOption {
    id: number;
    label: string;
    value: string;
    order: number;
}

interface Question {
    id: number;
    type: 'single_choice' | 'multiple_choice' | 'scale' | 'open_text';
    question_text: string;
    help_text: string | null;
    order: number;
    required: boolean;
    answer_options: AnswerOption[];
}

interface Quiz {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: string;
    lead_capture_mode: 'required' | 'optional' | 'disabled';
    brand_settings: {
        primary_color?: string;
        secondary_color?: string;
    } | null;
    cta_settings: {
        label?: string;
        url?: string;
    } | null;
    questions: Question[];
}

interface QuizPageProps {
    quiz: Quiz;
    already_completed?: boolean;
}

const CircularProgress = ({ current, total, color }: { current: number; total: number; color: string }) => {
    const radius = 60;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (current / total) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] transform">
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: 0 }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-slate-100 dark:text-slate-800"
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center font-bold text-slate-700 dark:text-slate-200">
                <span className="text-3xl">{current}</span>
                <span className="h-[2px] w-8 bg-slate-300 dark:bg-slate-600 my-1"></span>
                <span className="text-xl text-muted-foreground">{total}</span>
            </div>
        </div>
    );
};

export default function PublicQuiz({ quiz, already_completed = false }: QuizPageProps) {
    const primaryColor = quiz.brand_settings?.primary_color || '#E97451';

    if (already_completed) {
        return (
            <>
                <Head title={quiz.title} />
                <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-r from-teal-400/20 to-emerald-400/20 blur-3xl filter dark:from-teal-900/20 dark:to-emerald-900/20" />
                        <div className="absolute -bottom-[10%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-l from-[#F48D5C]/20 to-[#E9C46A]/20 blur-3xl filter dark:from-[#E97451]/20 dark:to-[#E9C46A]/20" />
                    </div>
                    <div className="container relative z-10 mx-auto max-w-2xl px-4 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div className="rounded-2xl bg-white/70 p-12 shadow-2xl backdrop-blur-xl dark:bg-slate-900/70">
                                <div className="mb-6 flex justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        <Check className="h-10 w-10" />
                                    </div>
                                </div>
                                <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    Quiz Already Completed
                                </h1>
                                <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
                                    You have already taken this quiz. Thank you for your participation!
                                </p>
                                <Button
                                    size="lg"
                                    onClick={() => window.location.reload()}
                                    style={{ backgroundColor: primaryColor }}
                                    className="rounded-full px-8 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
                                >
                                    Refresh Page
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, { answer_option_ids: number[]; answer_value: string }>>({});
    const [lead, setLead] = useState({ email: '', first_name: '', last_name: '', phone: '', website: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [direction, setDirection] = useState(0);

    const isIntro = currentStep === 0;
    const isLeadCapture = currentStep === quiz.questions.length + 1 && quiz.lead_capture_mode !== 'disabled';
    const currentQuestion = !isIntro && !isLeadCapture ? quiz.questions[currentStep - 1] : null;

    // Handle keypress for navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && canProceed() && !isSubmitting) {
                // Prevent interfering with textareas
                if (document.activeElement?.tagName === 'TEXTAREA') return;
                
                if (currentStep < quiz.questions.length || (quiz.lead_capture_mode !== 'disabled' && !isLeadCapture)) {
                    handleNext();
                } else if (isLeadCapture || currentStep === quiz.questions.length) {
                    handleSubmit();
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentStep, answers, lead, isSubmitting]);

    const handleAnswerSelect = (questionId: number, optionId: number, isMultiple: boolean) => {
        setAnswers((prev) => {
            const current = prev[questionId] || { answer_option_ids: [], answer_value: '' };
            let newOptionIds: number[];

            if (isMultiple) {
                if (current.answer_option_ids.includes(optionId)) {
                    newOptionIds = current.answer_option_ids.filter((id) => id !== optionId);
                } else {
                    newOptionIds = [...current.answer_option_ids, optionId];
                }
            } else {
                newOptionIds = [optionId];
            }

            return {
                ...prev,
                [questionId]: { ...current, answer_option_ids: newOptionIds },
            };
        });
    };

    const handleTextAnswer = (questionId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { answer_option_ids: [], answer_value: value },
        }));
    };

    const handleScaleSelect = (questionId: number, value: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: { answer_option_ids: [], answer_value: value.toString() },
        }));
    };

    const canProceed = () => {
        if (isIntro) return true;
        if (isLeadCapture) {
            return quiz.lead_capture_mode !== 'required' || lead.email.trim() !== '';
        }
        if (currentQuestion) {
            if (!currentQuestion.required) return true;
            const answer = answers[currentQuestion.id];
            if (!answer) return false;
            if (currentQuestion.type === 'open_text' || currentQuestion.type === 'scale') {
                return answer.answer_value.trim() !== '';
            }
            return answer.answer_option_ids.length > 0;
        }
        return true;
    };

    const handleNext = () => {
        setDirection(1);
        if (currentStep <= quiz.questions.length) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        setDirection(-1);
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        const formattedAnswers = quiz.questions.map((q) => ({
            question_id: q.id,
            answer_option_ids: answers[q.id]?.answer_option_ids || [],
            answer_value: answers[q.id]?.answer_value || null,
        }));

        router.post(
            `/q/${quiz.slug}/submit`,
            {
                answers: formattedAnswers,
                lead: quiz.lead_capture_mode !== 'disabled' ? lead : { website: lead.website },
                website: lead.website,
            },
            {
                onError: () => setIsSubmitting(false),
            }
        );
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <>
            <Head title={quiz.title}>
                <meta
                    name="ai-summary"
                    content={`Take the ${quiz.title} quiz on D'Quizz. ${quiz.description ?? 'Answer the questions and get a personalised result.'}`}
                />
                <link rel="alternate" type="text/markdown" href={`/q/${quiz.slug}.md`} />
            </Head>
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-[#ED9665]/20 blur-3xl filter mix-blend-screen" />
                    <div className="absolute -bottom-[10%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-[#E9C46A]/20 blur-3xl filter mix-blend-screen" />
                </div>

                <div className="container relative z-10 mx-auto max-w-5xl px-4 py-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        {isIntro && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <div className="mb-8 rounded-2xl bg-white/70 p-12 shadow-2xl backdrop-blur-xl dark:bg-slate-900/70">
                                    <h1 className="mb-6 bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl dark:from-teal-400 dark:to-emerald-400">
                                        {quiz.title}
                                    </h1>
                                    {quiz.description && (
                                        <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                                            {quiz.description}
                                        </p>
                                    )}
                                    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
                                        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
                                            <Timer className="h-4 w-4" />
                                            Approx. {Math.max(1, Math.ceil(quiz.questions.length * 0.5))} min
                                        </span>
                                        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
                                            <Check className="h-4 w-4" />
                                            {quiz.questions.length} Questions
                                        </span>
                                    </div>
                                    <div className="mt-10">
                                        <Button
                                            size="lg"
                                            onClick={handleNext}
                                            style={{ backgroundColor: primaryColor }}
                                            className="h-14 rounded-full px-10 text-lg font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
                                        >
                                            {quiz.cta_settings?.label || 'Start Quiz'}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {!isIntro && !isLeadCapture && currentQuestion && (
                            <motion.div
                                key={`question-${currentQuestion.id}`}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="w-full"
                            >
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    {/* Question Card */}
                                    <div className="lg:col-span-8">
                                        <Card className="overflow-hidden border-0 bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80">
                                            <CardContent className="p-8 sm:p-12">
                                                <div className="mb-6 flex items-center justify-between lg:hidden">
                                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                        Question {currentStep} of {quiz.questions.length}
                                                    </span>
                                                </div>
                                                
                                                <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-800 dark:text-slate-100">
                                                    {currentQuestion.question_text}
                                                </h2>
                                                {currentQuestion.help_text && (
                                                    <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
                                                        {currentQuestion.help_text}
                                                    </p>
                                                )}

                                                <div className="space-y-4">
                                                    {/* Options Logic */}
                                                    {(currentQuestion.type === 'single_choice' || currentQuestion.type === 'multiple_choice') && (
                                                        <div className="grid gap-4">
                                                            {currentQuestion.answer_options.map((option, index) => {
                                                                const isSelected = answers[currentQuestion.id]?.answer_option_ids.includes(option.id);
                                                                return (
                                                                    <motion.button
                                                                        key={option.id}
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: index * 0.1 }}
                                                                        onClick={() =>
                                                                            handleAnswerSelect(
                                                                                currentQuestion.id,
                                                                                option.id,
                                                                                currentQuestion.type === 'multiple_choice'
                                                                            )
                                                                        }
                                                                        className={`group relative flex w-full items-center overflow-hidden rounded-xl border-2 p-5 text-left transition-all hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 ${
                                                                            isSelected
                                                                                ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/30'
                                                                                : 'border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50'
                                                                        }`}
                                                                        style={isSelected ? { borderColor: primaryColor } : {}}
                                                                    >
                                                                        <div
                                                                            className={`mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                                                                isSelected
                                                                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                                                                    : 'border-slate-300 text-transparent group-hover:border-emerald-400 dark:border-slate-600'
                                                                            }`}
                                                                            style={isSelected ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                                                                        >
                                                                            <Check className="h-4 w-4" />
                                                                        </div>
                                                                        <span className="text-lg font-medium">{option.label}</span>
                                                                        {isSelected && (
                                                                            <motion.div
                                                                                layoutId="outline"
                                                                                className="absolute inset-0 z-0 border-2 border-emerald-500"
                                                                                initial={false}
                                                                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                                                style={{ borderColor: primaryColor, borderRadius: '0.75rem' }}
                                                                            />
                                                                        )}
                                                                    </motion.button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {currentQuestion.type === 'scale' && (
                                                        <div className="flex flex-wrap justify-center gap-3">
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                                                                const isSelected = answers[currentQuestion.id]?.answer_value === value.toString();
                                                                return (
                                                                    <motion.button
                                                                        key={value}
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => handleScaleSelect(currentQuestion.id, value)}
                                                                        className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all ${
                                                                            isSelected
                                                                                ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                                                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                                                        }`}
                                                                        style={isSelected ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                                                                    >
                                                                        {value}
                                                                    </motion.button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {currentQuestion.type === 'open_text' && (
                                                        <textarea
                                                            value={answers[currentQuestion.id]?.answer_value || ''}
                                                            onChange={(e) => handleTextAnswer(currentQuestion.id, e.target.value)}
                                                            placeholder="Type your answer here..."
                                                            className="min-h-[160px] w-full rounded-xl border-2 border-slate-200 bg-white/50 p-4 text-lg outline-none transition-all focus:border-emerald-500 focus:ring-0 dark:border-slate-700 dark:bg-slate-800/50"
                                                            style={{ borderColor: answers[currentQuestion.id]?.answer_value ? primaryColor : undefined }}
                                                            autoFocus
                                                        />
                                                    )}
                                                </div>

                                                <div className="mt-10 flex items-center justify-between">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={handlePrev}
                                                        className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                                                    >
                                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                                        Previous
                                                    </Button>
                                                    <Button
                                                        size="lg"
                                                        onClick={handleNext}
                                                        disabled={!canProceed()}
                                                        style={{ backgroundColor: canProceed() ? primaryColor : undefined }}
                                                        className="rounded-full px-8 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40 disabled:opacity-50"
                                                    >
                                                        Next Question
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Sidebar / Progress */}
                                    <div className="hidden lg:col-span-4 lg:block">
                                        <div className="sticky top-8">
                                            <Card className="border-0 bg-white/60 shadow-xl backdrop-blur-md dark:bg-slate-900/60">
                                                <CardContent className="flex flex-col items-center p-8">
                                                    <CircularProgress
                                                        current={currentStep}
                                                        total={quiz.questions.length}
                                                        color={primaryColor}
                                                    />
                                                    <div className="mt-6 text-center">
                                                        <h3 className="text-lg font-semibold">Your Progress</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            You are doing great! Keep going.
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {isLeadCapture && (
                            <motion.div
                                key="lead-capture"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mx-auto max-w-xl"
                            >
                                <Card className="overflow-hidden border-0 bg-white/80 shadow-2xl backdrop-blur-xl dark:bg-slate-900/80">
                                    <CardContent className="p-8 sm:p-12">
                                        <div className="mb-8 text-center">
                                            <h2 className="text-3xl font-bold">Almost there!</h2>
                                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                                {quiz.lead_capture_mode === 'required'
                                                    ? 'Enter your details to see your personalized results.'
                                                    : 'Optionally enter your details to receive your results via email.'}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Honeypot field - hidden from humans */}
                                            <div className="hidden">
                                                <Label htmlFor="website">Website</Label>
                                                <Input
                                                    id="website"
                                                    value={lead.website}
                                                    onChange={(e) => setLead({ ...lead, website: e.target.value })}
                                                    autoComplete="off"
                                                    tabIndex={-1}
                                                />
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="first_name">First Name</Label>
                                                    <Input
                                                        id="first_name"
                                                        value={lead.first_name}
                                                        onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
                                                        placeholder="John"
                                                        className="h-12 border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="last_name">Last Name</Label>
                                                    <Input
                                                        id="last_name"
                                                        value={lead.last_name}
                                                        onChange={(e) => setLead({ ...lead, last_name: e.target.value })}
                                                        placeholder="Doe"
                                                        className="h-12 border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email {quiz.lead_capture_mode === 'required' && <span className="text-red-500">*</span>}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={lead.email}
                                                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    required={quiz.lead_capture_mode === 'required'}
                                                    className="h-12 border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone (optional)</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={lead.phone}
                                                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                                                    placeholder="(513) 555-0100"
                                                    className="h-12 border-slate-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50"
                                                />
                                            </div>

                                            <div className="flex justify-between pt-6">
                                                <Button variant="ghost" onClick={handlePrev}>
                                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                                    Back
                                                </Button>
                                                <Button
                                                    size="lg"
                                                    onClick={handleSubmit}
                                                    disabled={!canProceed() || isSubmitting}
                                                    style={{ backgroundColor: primaryColor }}
                                                    className="rounded-full px-8 shadow-lg shadow-emerald-500/20 hover:scale-105 hover:shadow-emerald-500/40"
                                                >
                                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    See Results
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}
