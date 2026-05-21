import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Home as HomeIcon,
  Banknote,
  CalendarCheck,
  UserCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTWUNdmslspAxFN5p-olxLxdcLgOWBIcaRv208FDqrErRCtA/viewform";

function openWaitlist() {
  window.open(WAITLIST_URL, "_blank", "noopener,noreferrer");
}

const HOW_IT_WORKS = [
  {
    icon: HomeIcon,
    step: "01",
    title: "Find your home",
    desc: "Find your ideal rental property and agree on terms with your landlord as normal.",
  },
  {
    icon: Banknote,
    step: "02",
    title: "Pavia pays upfront",
    desc: "We pay your landlord the full advance — 1 or 2 years — directly and immediately.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "You pay monthly",
    desc: "Repay Pavia in simple, fixed monthly instalments in GHS. No surprises.",
  },
];

const ELIGIBILITY = [
  { icon: UserCheck, text: "Ghanaian resident aged 18 – 45" },
  { icon: Banknote, text: "Verified income source (employed, freelance, or business)" },
  { icon: ShieldCheck, text: "No active loan defaults" },
  { icon: Clock, text: "Rental agreement of at least 12 months" },
];

const FAQS = [
  {
    q: "How quickly can Pavia pay my landlord?",
    a: "Once your application is approved and your documents verified, we can pay your landlord within 48 hours.",
  },
  {
    q: "Is there a minimum or maximum rent amount?",
    a: "We currently support rent financing from GHS 500 to GHS 5,000 per month, covering most rental markets across Ghana.",
  },
  {
    q: "What happens if I miss a monthly payment?",
    a: "We offer a 7-day grace period. If you're struggling, reach out early — our team will work with you on a solution before any penalties apply.",
  },
  {
    q: "Do I need a guarantor?",
    a: "Not always. Depending on your income verification and profile, you may qualify without a guarantor.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } },
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-primary hover:bg-primary/5 transition-colors"
      >
        {q}
        {open ? <ChevronUp className="w-5 h-5 shrink-0 text-secondary" /> : <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm border-t border-border pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Rent() {
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [months, setMonths] = useState(12);

  const totalAdvance = monthlyRent * months;
  const serviceFee = Math.round(totalAdvance * 0.05);
  const totalRepayable = totalAdvance + serviceFee;
  const monthlyRepayment = Math.round(totalRepayable / months);

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
            <Link href="/save" className="hover:text-secondary transition-colors">Save</Link>
            <Link href="/rent" className="text-secondary font-semibold">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/learn" className="hover:text-secondary transition-colors">Learn</Link>
          </div>
          <Button
            data-testid="button-apply-rent-nav"
            onClick={openWaitlist}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
          >
            Apply Now
          </Button>
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
              Rent Finance — available across Ghana
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Stop paying<br />
              <span className="text-secondary">2 years upfront.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Pavia pays your landlord the full advance. You pay us back in simple monthly instalments. Move into your home without breaking your savings.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                data-testid="button-apply-rent-hero"
                size="lg"
                onClick={openWaitlist}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg"
              >
                Apply for Rent Finance
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

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "48 hrs", label: "Landlord paid in" },
              { value: "GHS 0", label: "Upfront from you" },
              { value: "Monthly", label: "Repayment schedule" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-card rounded-2xl border border-border">
                <p className="text-3xl font-bold font-display text-secondary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-primary/3">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">Simple. Fast. Fair.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              We handle the landlord. You keep your cash.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-border z-0" />
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-9 h-9 text-secondary" />
                  </div>
                  <p className="text-secondary font-bold text-sm mb-2 tracking-widest uppercase">Step {step.step}</p>
                  <h3 className="text-xl font-bold font-display text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Repayment Calculator */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">Calculate your repayment.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              See exactly what your monthly payments would look like before you apply.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-3xl p-8 space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-semibold text-primary">Monthly Rent</label>
                  <span className="font-bold font-display text-secondary text-lg">GHS {monthlyRent.toLocaleString()}</span>
                </div>
                <input
                  data-testid="slider-monthly-rent"
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-primary h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>GHS 500</span><span>GHS 5,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-semibold text-primary">Advance Period</label>
                  <span className="font-bold font-display text-secondary text-lg">{months} months</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[6, 12, 24].map((m) => (
                    <button
                      key={m}
                      data-testid={`button-months-${m}`}
                      onClick={() => setMonths(m)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${
                        months === m
                          ? "bg-primary text-secondary shadow-md"
                          : "bg-muted border border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {m} months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-primary rounded-3xl p-8 text-primary-foreground space-y-5">
              <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-4">Your repayment summary</p>

              {[
                { label: "Total advance paid to landlord", value: `GHS ${totalAdvance.toLocaleString()}` },
                { label: "Pavia service fee (5%)", value: `GHS ${serviceFee.toLocaleString()}` },
                { label: "Total repayable", value: `GHS ${totalRepayable.toLocaleString()}` },
              ].map((row, i) => (
                <div key={row.label} className={`flex justify-between items-center py-3 ${i < 2 ? "border-b border-white/10" : ""}`}>
                  <span className="text-primary-foreground/70 text-sm">{row.label}</span>
                  <span className="font-bold font-display text-primary-foreground">{row.value}</span>
                </div>
              ))}

              <div className="mt-4 bg-secondary/20 rounded-2xl p-5 text-center">
                <p className="text-primary-foreground/70 text-sm mb-1">Your monthly repayment</p>
                <p className="text-4xl font-bold font-display text-secondary">GHS {monthlyRepayment.toLocaleString()}</p>
                <p className="text-primary-foreground/60 text-xs mt-1">for {months} months</p>
              </div>

              <Button
                data-testid="button-apply-rent-calculator"
                onClick={openWaitlist}
                className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-13 mt-2"
              >
                Apply for Rent Finance
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">Do you qualify?</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                We've kept eligibility simple. If you have a steady income and a rental agreement, you're most of the way there.
              </p>
              <Button
                data-testid="button-apply-rent-eligibility"
                size="lg"
                onClick={openWaitlist}
                className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-14 px-8 text-lg"
              >
                Check My Eligibility
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {ELIGIBILITY.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-white/10 rounded-2xl px-6 py-4 border border-secondary/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-primary-foreground font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold font-display text-primary mb-4">Common questions.</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know before you apply.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
            Move in without<br />
            <span className="text-secondary">emptying your account.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the waitlist and be among the first to access Pavia Rent Finance.
          </p>
          <Button
            data-testid="button-apply-rent-cta"
            size="lg"
            onClick={openWaitlist}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-16 px-12 text-xl"
          >
            Apply for Rent Finance
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
