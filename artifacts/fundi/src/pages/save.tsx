import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Home as HomeIcon,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Lock,
  Zap,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GOALS = [
  {
    id: 1,
    label: "Rent Savings",
    icon: HomeIcon,
    target: 6000,
    saved: 4320,
    color: "bg-primary",
    barColor: "bg-secondary",
    months: 2,
    interest: "Competitive returns",
  },
  {
    id: 2,
    label: "Education Fund",
    icon: GraduationCap,
    target: 12000,
    saved: 5800,
    color: "bg-card",
    barColor: "bg-primary",
    months: 5,
    interest: "Earn as you save",
  },
  {
    id: 3,
    label: "Business Capital",
    icon: Briefcase,
    target: 20000,
    saved: 8500,
    color: "bg-card",
    barColor: "bg-primary",
    months: 8,
    interest: "Earn as you save",
  },
  {
    id: 4,
    label: "Emergency Fund",
    icon: ShieldCheck,
    target: 5000,
    saved: 5000,
    color: "bg-card",
    barColor: "bg-secondary",
    months: 0,
    interest: "Competitive returns",
    complete: true,
  },
];

const STEPS = [
  {
    step: "01",
    icon: Target,
    title: "Set your goal",
    desc: "Pick a savings goal — rent, education, business, or emergency fund. Give it a name and a target amount in GHS.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Save automatically",
    desc: "Set a daily, weekly, or monthly contribution. We'll move money from your Pavia wallet to your stash automatically.",
  },
  {
    step: "03",
    icon: Lock,
    title: "Earn as you save",
    desc: "Your savings earn competitive returns from day one. Lock your stash to stay disciplined, or keep it flexible — your choice.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 90 } },
};

function ProgressBar({ pct, barColor }: { pct: number; barColor: string }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-black/10">
      <motion.div
        className={`h-full rounded-full ${barColor}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

export default function Save() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-7 h-7 text-secondary" fill="currentColor">
                <circle cx="9" cy="12" r="2.8" />
                <path d="M 5,17.5 A 4,4 0 0 0 13,17.5 Z" />
                <circle cx="18" cy="9" r="3.5" />
                <path d="M 13,15.5 A 5,5 0 0 0 23,15.5 Z" />
                <circle cx="27" cy="12" r="2.8" />
                <path d="M 23,17.5 A 4,4 0 0 0 31,17.5 Z" />
              </svg>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Pavia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/save" className="text-secondary font-semibold">Save</Link>
            <Link href="/rent" className="hover:text-secondary transition-colors">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/learn" className="hover:text-secondary transition-colors">Learn</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors hidden md:block text-sm">Log In</Link>
            <Button
              data-testid="button-start-saving-nav"
              onClick={() => navigate("/signup")}
              className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
            >
              Start Saving
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/3" />

        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Earn as you save — no hidden fees
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Save with <span className="text-secondary">Purpose.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Create goal-based savings stashes, automate your contributions, and watch your money grow — all in one place built for young Ghanaians.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                data-testid="button-start-saving-hero"
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg"
              >
                Start Saving Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5"
              >
                See how it works
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "Returns", label: "Competitive on savings" },
              { value: "GHS 0", label: "Maintenance fee" },
              { value: "24 hrs", label: "Withdrawal time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-card rounded-2xl border border-border">
                <p className="text-2xl font-bold font-display text-secondary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Savings Goal Cards */}
      <section className="py-24 px-6 bg-primary/3">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">Your savings, your goals.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Every goal gets its own stash. Watch your progress in real time and stay motivated.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {GOALS.map((goal) => {
              const pct = Math.round((goal.saved / goal.target) * 100);
              const Icon = goal.icon;
              const isInverted = goal.color === "bg-primary";

              return (
                <motion.div
                  key={goal.id}
                  variants={itemVariants}
                  data-testid={`card-goal-${goal.id}`}
                  className={`${goal.color} p-8 rounded-[2rem] border ${isInverted ? "border-primary" : "border-border"} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isInverted ? "bg-secondary/20" : "bg-primary/10"}`}>
                      <Icon className={`w-7 h-7 ${isInverted ? "text-secondary" : "text-primary"}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      {goal.complete ? (
                        <span className="flex items-center gap-1.5 bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Goal reached
                        </span>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isInverted ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primary"}`}>
                          {goal.months}m left
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold font-display mb-1 ${isInverted ? "text-secondary" : "text-primary"}`}>{goal.label}</h3>
                  <p className={`text-sm mb-5 ${isInverted ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {goal.interest} · Auto-save enabled
                  </p>

                  <ProgressBar pct={pct} barColor={goal.barColor} />

                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <p className={`text-xs font-medium mb-0.5 ${isInverted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>Saved</p>
                      <p className={`text-2xl font-bold font-display ${isInverted ? "text-secondary" : "text-primary"}`}>
                        GHS {goal.saved.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium mb-0.5 ${isInverted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>Target</p>
                      <p className={`text-lg font-semibold ${isInverted ? "text-primary-foreground/70" : "text-foreground/60"}`}>
                        GHS {goal.target.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-bold font-display text-secondary`}>{pct}%</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">Simple as 1, 2, 3.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              No complicated forms. No branch visits. Start saving in under 3 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-border z-0" />

            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-9 h-9 text-secondary" />
                  </div>
                  <p className="text-secondary font-bold text-sm mb-2 tracking-widest uppercase">Step {s.step}</p>
                  <h3 className="text-xl font-bold font-display text-primary mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Returns callout */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">
                Your money works while you sleep.
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                Every cedi in your savings stash earns competitive returns from day one. No minimums, no lock-in periods unless you choose them. Just consistent, compounding growth.
              </p>
              <ul className="space-y-3 text-primary-foreground">
                {[
                  "Competitive returns on your savings",
                  "Flexible stashes — earn as you save, withdraw anytime",
                  "Returns calculated daily, credited monthly",
                  "Zero hidden charges or maintenance fees",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-3xl p-8 border border-secondary/20">
              <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-6">Savings example</p>
              {[
                { label: "You save monthly", value: "GHS 500" },
                { label: "Savings period", value: "12 months" },
                { label: "Your total saved", value: "GHS 6,000" },
                { label: "Plus returns earned", value: "+ GHS varies" },
              ].map((row, i) => (
                <div key={row.label} className={`flex justify-between items-center py-3 ${i < 3 ? "border-b border-white/10" : ""}`}>
                  <span className="text-primary-foreground/70 text-sm">{row.label}</span>
                  <span className={`font-bold font-display ${i === 3 ? "text-secondary text-lg" : "text-primary-foreground"}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
            Your first goal is<br />
            <span className="text-secondary">waiting for you.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the waitlist and be among the first Ghanaians to start saving with Pavia.
          </p>
          <Button
            data-testid="button-start-saving-cta"
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-16 px-12 text-xl"
          >
            Start Saving
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 border-t border-primary/20">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
          <p>© {new Date().getFullYear()} Pavia Financial Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">Twitter</a>
            <a href="#" className="hover:text-secondary transition-colors">Instagram</a>
            <a href="#" className="hover:text-secondary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
