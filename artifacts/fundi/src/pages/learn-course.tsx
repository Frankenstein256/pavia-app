import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCourse, getCourseProgress, updateCourseProgress,
  submitQuiz, claimCertificate,
} from "@workspace/api-client-react";
import type { CourseDetail, Lesson, QuizQuestion } from "@workspace/api-client-react";
import { useGetMe } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ChevronLeft, ChevronRight, BookOpen, Award,
  Loader2, AlertCircle, ArrowLeft, Clock, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ─── Certificate print helper ───────────────────────────────────────── */
function printCertificate(data: {
  certificateId: string;
  courseTitle: string;
  recipientName: string;
  instructor: string;
  issuedAt: string;
}) {
  const date = new Date(data.issuedAt).toLocaleDateString("en-GH", {
    day: "numeric", month: "long", year: "numeric",
  });
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Pavia Certificate — ${data.courseTitle}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px; }
    .cert { width: 900px; border: 12px double #1B3A2D; padding: 60px 80px; text-align: center; position: relative; }
    .cert::before { content: ''; position: absolute; inset: 20px; border: 2px solid #C8952A; pointer-events: none; }
    .logo { font-size: 48px; font-weight: 900; color: #1B3A2D; letter-spacing: -2px; margin-bottom: 4px; font-family: 'Georgia', serif; }
    .logo span { color: #C8952A; }
    .brand-sub { font-size: 13px; color: #1B3A2D; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; }
    .cert-title { font-size: 36px; font-weight: 700; color: #1B3A2D; margin-bottom: 16px; letter-spacing: 2px; text-transform: uppercase; }
    .cert-subtitle { font-size: 14px; color: #888; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 32px; }
    .certifies { font-size: 16px; color: #555; margin-bottom: 12px; }
    .recipient { font-size: 48px; color: #C8952A; border-bottom: 2px solid #C8952A; display: inline-block; padding-bottom: 8px; margin-bottom: 32px; font-style: italic; }
    .course-label { font-size: 14px; color: #888; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
    .course-title { font-size: 24px; font-weight: 700; color: #1B3A2D; margin-bottom: 40px; }
    .footer-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; }
    .sig-block { text-align: center; }
    .sig-name { font-size: 16px; font-weight: 700; color: #1B3A2D; border-top: 1px solid #1B3A2D; padding-top: 8px; margin-top: 32px; }
    .sig-title { font-size: 11px; color: #888; letter-spacing: 2px; text-transform: uppercase; }
    .cert-id { font-size: 10px; color: #aaa; letter-spacing: 1px; }
  </style>
</head>
<body>
<div class="cert">
  <div class="logo">Pa<span>v</span>ia</div>
  <div class="brand-sub">Financial Technologies</div>
  <div class="cert-title">Certificate of Completion</div>
  <div class="cert-subtitle">This is to certify that</div>
  <div class="recipient">${data.recipientName}</div>
  <div class="course-label">has successfully completed</div>
  <div class="course-title">${data.courseTitle}</div>
  <div class="footer-row">
    <div class="sig-block">
      <div class="sig-name">${data.instructor}</div>
      <div class="sig-title">Course Instructor</div>
    </div>
    <div style="text-align:center">
      <div class="cert-id">Certificate ID: ${data.certificateId}</div>
      <div class="cert-id">Issued: ${date}</div>
    </div>
    <div class="sig-block">
      <div class="sig-name">Pavia Learn</div>
      <div class="sig-title">Verified by Pavia</div>
    </div>
  </div>
</div>
<script>window.onload=()=>{window.print();}</script>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

/* ─── Quiz Component ─────────────────────────────────────────────────── */
function Quiz({
  questions,
  courseId,
  onResult,
}: {
  questions: QuizQuestion[];
  courseId: number;
  onResult: (r: { score: number; total: number; passed: boolean }) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  const mutation = useMutation({
    mutationFn: (ans: { questionId: number; answer: string }[]) =>
      submitQuiz(courseId, { answers: ans }),
    onSuccess: (data) => {
      setShowResult(data.result);
      onResult(data.result);
    },
  });

  const allAnswered = questions.every((q) => answers[q.id]);

  function handleSubmit() {
    const ans = Object.entries(answers).map(([qId, answer]) => ({
      questionId: parseInt(qId, 10),
      answer,
    }));
    mutation.mutate(ans);
  }

  function handleRetry() {
    setAnswers({});
    setShowResult(null);
    mutation.reset();
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 ${showResult.passed ? "bg-secondary/20" : "bg-red-100"}`}>
          <span className="text-5xl font-bold font-display text-primary">
            {Math.round((showResult.score / showResult.total) * 100)}%
          </span>
        </div>
        <h2 className={`text-2xl font-bold font-display mb-2 ${showResult.passed ? "text-primary" : "text-red-600"}`}>
          {showResult.passed ? "🎉 You Passed!" : "Not quite — try again"}
        </h2>
        <p className="text-muted-foreground mb-6">
          You answered {showResult.score} out of {showResult.total} questions correctly.
          {showResult.passed
            ? " Scroll down to claim your certificate."
            : " You need 70% to pass. Review the lessons and retry."}
        </p>
        {!showResult.passed && (
          <Button onClick={handleRetry} variant="outline" className="rounded-full font-bold px-8">
            Retry Quiz
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      <div className="text-center mb-8">
        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Course Quiz</p>
        <h2 className="text-2xl font-bold font-display text-primary">Test your knowledge</h2>
        <p className="text-muted-foreground text-sm mt-1">Score 70% or above to earn your certificate.</p>
      </div>

      {questions.map((q, idx) => (
        <div key={q.id} className="bg-card rounded-2xl border border-border p-6">
          <p className="font-semibold text-primary mb-4">
            <span className="text-secondary mr-2">{idx + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2.5">
            {(["a", "b", "c", "d"] as const).map((opt) => {
              const label = opt === "a" ? q.optionA : opt === "b" ? q.optionB : opt === "c" ? q.optionC : q.optionD;
              const selected = answers[q.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    selected
                      ? "border-secondary bg-secondary/10 text-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <span className={`inline-block w-6 h-6 rounded-full border-2 text-xs font-bold text-center leading-5 mr-3 ${selected ? "border-secondary bg-secondary text-primary" : "border-border"}`}>
                    {opt.toUpperCase()}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {mutation.isError && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!allAnswered || mutation.isPending}
        className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-12"
      >
        {mutation.isPending ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</>
        ) : !allAnswered ? (
          `Answer all ${questions.length} questions to submit`
        ) : (
          "Submit Quiz"
        )}
      </Button>
    </div>
  );
}

/* ─── Certificate Claim ──────────────────────────────────────────────── */
function CertificateClaim({
  courseId,
  courseName,
  priceGhs,
  instructor,
  defaultName,
  existingCertId,
  existingCertName,
}: {
  courseId: number;
  courseName: string;
  priceGhs: number;
  instructor: string;
  defaultName: string;
  existingCertId: string | null;
  existingCertName: string | null;
}) {
  const [step, setStep] = useState<"form" | "payment" | "done">(
    existingCertId ? "done" : "form",
  );
  const [name, setName] = useState(existingCertName ?? defaultName);
  const [payRef, setPayRef] = useState("");
  const [certData, setCertData] = useState<{
    certificateId: string;
    courseTitle: string;
    recipientName: string;
    instructor: string;
    issuedAt: string;
  } | null>(
    existingCertId
      ? {
          certificateId: existingCertId,
          courseTitle: courseName,
          recipientName: existingCertName ?? defaultName,
          instructor,
          issuedAt: new Date().toISOString(),
        }
      : null,
  );

  const mutation = useMutation({
    mutationFn: () =>
      claimCertificate(courseId, { name: name.trim(), paymentReference: payRef.trim() }),
    onSuccess: (data) => {
      setCertData(data.certificate);
      setStep("done");
    },
  });

  if (step === "done" && certData) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold font-display text-primary mb-2">Certificate Ready!</h2>
        <p className="text-muted-foreground mb-2">
          Your Pavia-verified certificate for <span className="font-semibold text-primary">{certData.courseTitle}</span> is ready.
        </p>
        <p className="text-xs text-muted-foreground mb-8 font-mono bg-muted px-3 py-1.5 rounded-lg inline-block">
          Certificate ID: {certData.certificateId}
        </p>
        <Button
          onClick={() => printCertificate(certData)}
          className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-12 text-lg"
        >
          🖨️ Download / Print Certificate
        </Button>
      </div>
    );
  }

  if (step === "payment") {
    const ref = `PAVIA-CERT-${courseId}-${Date.now()}`;
    return (
      <div className="max-w-lg mx-auto py-6 space-y-5">
        <div className="text-center">
          <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 2 of 2</p>
          <h2 className="text-xl font-bold font-display text-primary">Complete Payment</h2>
          <p className="text-muted-foreground text-sm mt-1">Your certificate will be unlocked after payment.</p>
        </div>

        <div className="bg-primary rounded-2xl p-6 text-primary-foreground space-y-3">
          <p className="font-bold text-secondary text-2xl text-center">GHS {priceGhs}</p>
          <div className="space-y-1 text-sm text-primary-foreground/80">
            <p>Send <span className="text-secondary font-bold">GHS {priceGhs}</span> to:</p>
            <div className="bg-primary-foreground/10 rounded-xl px-4 py-3 space-y-1">
              <p><span className="font-semibold">MTN MoMo:</span> 0244-PAVIA1 (0244728421)</p>
              <p><span className="font-semibold">Vodafone Cash:</span> 0504-PAVIA2 (0504728422)</p>
            </div>
            <p>Reference: <span className="font-mono font-bold text-secondary">{ref}</span></p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-semibold text-sm text-primary">Your Transaction ID / Reference</Label>
          <Input
            placeholder="Enter the transaction ID from your mobile money app"
            value={payRef}
            onChange={(e) => setPayRef(e.target.value)}
            className="rounded-xl border-border focus:border-primary"
            disabled={mutation.isPending}
          />
        </div>

        {mutation.isError && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Could not verify. Please check your reference and try again.</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep("form")} disabled={mutation.isPending} className="flex-1 rounded-full font-semibold">
            Back
          </Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={!payRef.trim() || mutation.isPending}
            className="flex-1 bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full"
          >
            {mutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying…</> : "Confirm & Get Certificate"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-6 space-y-5">
      <div className="text-center">
        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Step 1 of 2</p>
        <h2 className="text-xl font-bold font-display text-primary">Claim Your Certificate</h2>
        <p className="text-muted-foreground text-sm mt-1">Enter your full name exactly as it should appear on the certificate.</p>
      </div>

      <div className="bg-secondary/10 rounded-2xl p-5 flex items-center gap-4">
        <Award className="w-10 h-10 text-secondary shrink-0" />
        <div>
          <p className="font-bold text-primary">{courseName}</p>
          <p className="text-sm text-muted-foreground">Certificate of Completion · GHS {priceGhs}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="certName" className="font-semibold text-sm text-primary">Full Name (for certificate)</Label>
        <Input
          id="certName"
          placeholder="e.g. Abena Kwame Mensah"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border-border focus:border-primary"
        />
      </div>

      <Button
        onClick={() => setStep("payment")}
        disabled={!name.trim()}
        className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-12"
      >
        Continue to Payment
        <ChevronRight className="ml-1.5 w-4 h-4" />
      </Button>
    </div>
  );
}

/* ─── Lesson Content ─────────────────────────────────────────────────── */
function LessonContent({ lesson }: { lesson: Lesson }) {
  const paragraphs = lesson.content.split(/\n\n+/);
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="text-2xl font-bold font-display text-primary mb-6">{lesson.title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base text-foreground leading-relaxed mb-5 last:mb-0">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function LearnCourse() {
  const { courseId: courseIdStr } = useParams<{ courseId: string }>();
  const courseId = parseInt(courseIdStr ?? "0", 10);
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<"lessons" | "quiz" | "certificate">("lessons");
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  /* ── data fetching ── */
  const { data: meData } = useGetMe();
  const user = meData?.user ?? null;

  const { data: courseData, isLoading: courseLoading, isError: courseError } =
    useQuery({
      queryKey: ["course", courseId],
      queryFn: () => getCourse(courseId),
      enabled: !!courseId,
    });

  const { data: progressData } = useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId && !!user,
    retry: false,
  });

  /* ── init completed IDs from DB progress ── */
  useEffect(() => {
    const ids = progressData?.progress?.completedLessonIds;
    if (ids) {
      const parsed = ids
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0);
      setCompletedIds(new Set(parsed));
    }
    if (progressData?.progress?.quizPassed) {
      setQuizResult({
        score: progressData.progress.quizScore ?? 0,
        total: courseData?.course.quizQuestions.length ?? 5,
        passed: true,
      });
    }
  }, [progressData, courseData]);

  /* ── progress save mutation ── */
  const progressMutation = useMutation({
    mutationFn: (ids: Set<number>) =>
      updateCourseProgress(courseId, {
        completedLessonIds: [...ids].join(","),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-progress", courseId] });
    },
  });

  const markComplete = useCallback(
    (lessonId: number) => {
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.add(lessonId);
        if (user) progressMutation.mutate(next);
        return next;
      });
    },
    [user, progressMutation],
  );

  const course: CourseDetail | undefined = courseData?.course;
  const lessons = course?.lessons ?? [];
  const quizQuestions = course?.quizQuestions ?? [];
  const activeLesson = lessons[activeLessonIdx];
  const totalLessons = lessons.length;
  const completedCount = lessons.filter((l) => completedIds.has(l.id)).length;
  const allLessonsComplete = completedCount === totalLessons && totalLessons > 0;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const existingProgress = progressData?.progress;

  /* ── loading / error states ── */
  if (courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }
  if (courseError || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-primary">Course not found</p>
        <Button onClick={() => navigate("/learn")} variant="outline" className="rounded-full">
          Back to courses
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/learn")}
            className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </button>
          <div className="h-5 w-px bg-border" />
          <p className="font-semibold text-primary text-sm truncate flex-1">{course.title}</p>
          <div className="shrink-0 flex items-center gap-2">
            <div className="hidden sm:block w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-secondary">{progressPct}%</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-border bg-card h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          {/* Course info */}
          <div className="p-5 border-b border-border">
            <p className="font-bold font-display text-primary text-sm leading-tight mb-1">{course.title}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.durationHours}h</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{totalLessons} lessons</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{completedCount}/{totalLessons} complete</span>
                <span className="font-bold text-secondary">{progressPct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lesson list */}
          <nav className="flex-1 p-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-3">Lessons</p>
            {lessons.map((lesson, idx) => {
              const done = completedIds.has(lesson.id);
              const active = activeLessonIdx === idx && mode === "lessons";
              return (
                <button
                  key={lesson.id}
                  onClick={() => { setActiveLessonIdx(idx); setMode("lessons"); }}
                  className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                    active
                      ? "bg-primary text-secondary"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    done ? "border-secondary bg-secondary" : active ? "border-secondary" : "border-border"
                  }`}>
                    {done && <CheckCircle2 className={`w-3 h-3 ${active ? "text-primary" : "text-primary"}`} />}
                  </div>
                  <span className="text-xs font-semibold leading-tight line-clamp-2">{lesson.title}</span>
                </button>
              );
            })}

            {/* Quiz entry */}
            <button
              onClick={() => allLessonsComplete ? setMode("quiz") : undefined}
              className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl mt-2 transition-all ${
                mode === "quiz"
                  ? "bg-primary text-secondary"
                  : allLessonsComplete
                  ? "hover:bg-muted text-foreground"
                  : "opacity-40 cursor-not-allowed text-muted-foreground"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                quizResult?.passed ? "border-secondary bg-secondary" : "border-border"
              }`}>
                {quizResult?.passed
                  ? <CheckCircle2 className="w-3 h-3 text-primary" />
                  : !allLessonsComplete
                  ? <Lock className="w-3 h-3" />
                  : null}
              </div>
              <span className="text-xs font-semibold leading-tight">End-of-Course Quiz</span>
            </button>

            {/* Certificate entry */}
            {quizResult?.passed && (
              <button
                onClick={() => setMode("certificate")}
                className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl mt-1 transition-all ${
                  mode === "certificate" ? "bg-secondary text-primary" : "hover:bg-secondary/10 text-foreground"
                }`}
              >
                <Award className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-xs font-semibold leading-tight">Get Certificate</span>
              </button>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="container mx-auto px-6 py-10 max-w-3xl">

            {/* Not logged in notice */}
            {!user && (
              <div className="mb-6 flex items-center gap-3 bg-secondary/10 border border-secondary/30 rounded-2xl px-5 py-3">
                <Lock className="w-4 h-4 text-secondary shrink-0" />
                <p className="text-sm text-primary">
                  <Link href="/login" className="font-bold underline underline-offset-2 hover:text-secondary">Sign in</Link>
                  {" "}to save your progress, take the quiz, and earn a certificate.
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {mode === "lessons" && activeLesson && (
                <motion.div
                  key={`lesson-${activeLesson.id}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">
                    Lesson {activeLessonIdx + 1} of {totalLessons}
                  </p>
                  <LessonContent lesson={activeLesson} />

                  {/* Actions */}
                  <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                    {!completedIds.has(activeLesson.id) && (
                      <Button
                        onClick={() => markComplete(activeLesson.id)}
                        disabled={!user}
                        className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full px-8 sm:mr-auto"
                        title={!user ? "Sign in to save progress" : undefined}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </Button>
                    )}
                    {completedIds.has(activeLesson.id) && (
                      <span className="flex items-center gap-2 text-sm font-semibold text-secondary sm:mr-auto">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                      </span>
                    )}

                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="outline"
                        onClick={() => setActiveLessonIdx((i) => Math.max(0, i - 1))}
                        disabled={activeLessonIdx === 0}
                        className="rounded-full font-semibold"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                      </Button>

                      {activeLessonIdx < totalLessons - 1 ? (
                        <Button
                          onClick={() => {
                            if (!completedIds.has(activeLesson.id) && user) markComplete(activeLesson.id);
                            setActiveLessonIdx((i) => i + 1);
                          }}
                          className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full"
                        >
                          Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : allLessonsComplete ? (
                        <Button
                          onClick={() => setMode("quiz")}
                          className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full"
                        >
                          Take Quiz <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            if (!completedIds.has(activeLesson.id) && user) markComplete(activeLesson.id);
                          }}
                          disabled={completedIds.has(activeLesson.id) || !user}
                          className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full"
                        >
                          Mark &amp; Finish <CheckCircle2 className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mobile: quiz prompt */}
                  {allLessonsComplete && (
                    <div className="mt-6 bg-secondary/10 rounded-2xl p-5 text-center">
                      <p className="font-bold text-primary mb-1">🎉 All lessons complete!</p>
                      <p className="text-sm text-muted-foreground mb-3">You're ready to take the quiz and earn your certificate.</p>
                      <Button
                        onClick={() => setMode("quiz")}
                        className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-8"
                      >
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {mode === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  {!user ? (
                    <div className="text-center py-20">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl font-bold text-primary mb-2">Sign in to take the quiz</p>
                      <p className="text-muted-foreground mb-6">You need a Pavia account to submit answers and earn a certificate.</p>
                      <Link href="/login">
                        <Button className="bg-primary text-secondary font-bold rounded-full px-10">Sign In</Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Quiz
                        questions={quizQuestions}
                        courseId={courseId}
                        onResult={(r) => {
                          setQuizResult(r);
                          queryClient.invalidateQueries({ queryKey: ["course-progress", courseId] });
                          if (r.passed) setTimeout(() => setMode("certificate"), 1500);
                        }}
                      />
                      {quizResult?.passed && (
                        <div className="mt-8 text-center">
                          <Button
                            onClick={() => setMode("certificate")}
                            className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full px-10 h-12 text-base"
                          >
                            <Award className="w-5 h-5 mr-2" />
                            Get My Certificate
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}

              {mode === "certificate" && (
                <motion.div
                  key="certificate"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  {!user ? (
                    <div className="text-center py-20">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl font-bold text-primary mb-2">Sign in to claim your certificate</p>
                      <Link href="/login">
                        <Button className="bg-primary text-secondary font-bold rounded-full px-10">Sign In</Button>
                      </Link>
                    </div>
                  ) : (
                    <CertificateClaim
                      courseId={courseId}
                      courseName={course.title}
                      priceGhs={course.certificatePriceGhs}
                      instructor={course.instructor}
                      defaultName={user.fullName}
                      existingCertId={existingProgress?.certificateId ?? null}
                      existingCertName={existingProgress?.certificateName ?? null}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
