import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Wallet,
  Home as HomeIcon,
  Briefcase,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Star,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const STATS = [
  { value: "50,000+", label: "Young Ghanaians", icon: Users },
  { value: "GHS 2M+", label: "Saved on Pavia", icon: TrendingUp },
  { value: "1,200+", label: "Freelancers", icon: Briefcase },
  { value: "8", label: "Free Courses", icon: BookOpen },
];

const PILLARS = [
  {
    icon: Wallet,
    title: "Save with Purpose",
    href: "/save",
    inverted: false,
    description:
      "Create goal-based stashes, earn competitive returns, and build financial discipline — whether you save GHS 10 or GHS 10,000 a month.",
    cta: "Start Saving",
  },
  {
    icon: HomeIcon,
    title: "Rent Finance",
    href: "/rent",
    inverted: true,
    description:
      "Done with the 2-year advance burden? We pay your landlord upfront and you repay us in manageable monthly instalments. Quality housing, yours now.",
    cta: "Finance My Rent",
  },
  {
    icon: Briefcase,
    title: "Find Skilled Work",
    href: "/work",
    inverted: false,
    description:
      "Connect with vetted gigs and remote opportunities. Get paid directly into your Pavia wallet with zero hidden fees. Built for freelancers and creators.",
    cta: "Find Work",
  },
  {
    icon: BookOpen,
    title: "Learn & Get Certified",
    href: "/learn",
    inverted: false,
    description:
      "Free courses on budgeting, investing, entrepreneurship, and more. Complete a course and earn a verified certificate for GHS 50–150.",
    cta: "Browse Courses",
  },
];

const TESTIMONIALS = [
  {
    name: "Abena Mensah",
    role: "Graphic Designer, Kumasi",
    avatar: "AM",
    quote:
      "Pavia changed how I think about money. I started saving for my rent with the stash feature and hit my goal in 4 months. The rent finance option is a lifesaver — no more begging family for advance.",
    rating: 5,
  },
  {
    name: "Kofi Asante",
    role: "Freelance Developer, Accra",
    avatar: "KA",
    quote:
      "I found two long-term clients through Pavia Work. They pay straight into my wallet, no middleman stress. The financial courses taught me how to actually manage the income I'm now making.",
    rating: 5,
  },
  {
    name: "Ama Boateng",
    role: "Marketing Consultant, Takoradi",
    avatar: "AB",
    quote:
      "I completed the Personal Finance course and got my certificate in a week. The real difference though? I actually applied what I learned. My savings tripled in three months. I tell everyone about Pavia.",
    rating: 5,
  },
];

const PaviaLogo = () => (
  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
    <svg viewBox="0 0 36 36" className="w-7 h-7 text-secondary" fill="currentColor">
      <circle cx="9" cy="12" r="2.8" />
      <path d="M 5,17.5 A 4,4 0 0 0 13,17.5 Z" />
      <circle cx="18" cy="9" r="3.5" />
      <path d="M 13,15.5 A 5,5 0 0 0 23,15.5 Z" />
      <circle cx="27" cy="12" r="2.8" />
      <path d="M 23,17.5 A 4,4 0 0 0 31,17.5 Z" />
    </svg>
  </div>
);

export default function Home() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-secondary selection:text-primary">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PaviaLogo />
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Pavia</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/save" className="hover:text-secondary transition-colors">Save</Link>
            <Link href="/rent" className="hover:text-secondary transition-colors">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/learn" className="hover:text-secondary transition-colors">Learn</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors hidden md:block text-sm">Log In</Link>
            <Button
              data-testid="button-get-started-nav"
              onClick={() => navigate("/signup")}
              className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-28 px-6 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Now live across Ghana
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.07] text-primary mb-6">
                Your Financial Home.<br />
                <span className="text-secondary">Built for Young Ghanaians.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Save with purpose, finance your rent, find high-paying work, and master your money — all in one place, built for the Ghanaian hustle.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button
                  data-testid="button-get-started-hero"
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
                >
                  See how it works
                </Button>
              </motion.div>

              {/* Social proof row */}
              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-5">
                <div className="flex -space-x-3">
                  {["bg-secondary/40", "bg-primary/30", "bg-secondary/60", "bg-primary/20"].map((bg, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-background ${bg} flex items-center justify-center text-xs font-bold text-primary`}>
                      {["AK", "MO", "EQ", "SA"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-tight">
                  <strong className="text-primary">50,000+ Ghanaians</strong><br />already saving & growing with Pavia
                </p>
              </motion.div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:flex justify-center"
            >
              <div className="relative w-[300px]">
                {/* Phone shell */}
                <div className="relative z-10 rounded-[2.5rem] border-[8px] border-primary shadow-2xl overflow-hidden bg-primary w-full aspect-[9/19] flex flex-col">
                  {/* Status bar */}
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center shrink-0">
                    <span className="text-secondary/60 text-xs font-medium">9:41</span>
                    <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-secondary/40" />)}
                    </div>
                  </div>
                  {/* App content */}
                  <div className="flex-1 bg-background mx-2 mb-2 rounded-[1.75rem] p-5 flex flex-col gap-4 overflow-hidden">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Good morning,</p>
                      <p className="text-lg font-bold font-display text-primary">Abena ✦</p>
                    </div>
                    {/* Balance card */}
                    <div className="bg-primary rounded-2xl p-4">
                      <p className="text-primary-foreground/60 text-xs mb-1">Total Savings</p>
                      <p className="text-secondary text-2xl font-bold font-display">GHS 4,250.00</p>
                      <p className="text-primary-foreground/50 text-xs mt-1">↑ GHS 340 this month</p>
                    </div>
                    {/* Stash goals */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-primary">My Stashes</p>
                      {[
                        { label: "Rent Fund", pct: 78, amount: "1,950" },
                        { label: "Emergency", pct: 45, amount: "900" },
                        { label: "New Laptop", pct: 22, amount: "440" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground font-medium">{s.label}</span>
                            <span className="text-primary font-bold">GHS {s.amount}</span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${s.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Nav bar */}
                    <div className="mt-auto flex justify-around pt-2 border-t border-border">
                      {[
                        { Icon: Wallet, label: "Save" },
                        { Icon: HomeIcon, label: "Rent" },
                        { Icon: Briefcase, label: "Work" },
                        { Icon: BookOpen, label: "Learn" },
                      ].map(({ Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-0.5">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-[9px] text-muted-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute top-16 -left-20 bg-white p-3.5 rounded-2xl shadow-xl border border-border z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-secondary/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-secondary w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-medium">Rent Target</p>
                      <p className="text-primary font-bold text-sm">GHS 1,500 <span className="text-secondary">hit!</span></p>
                    </div>
                  </div>
                </div>

                {/* Second badge */}
                <div className="absolute bottom-24 -right-16 bg-white p-3 rounded-2xl shadow-xl border border-border z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="text-primary w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Certificate earned</p>
                      <p className="text-primary font-bold text-xs">Personal Finance</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-6 bg-primary">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl font-bold font-display text-secondary">{value}</p>
                <p className="text-primary-foreground/60 text-sm font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS (4 Pillars) ── */}
      <section id="pillars" className="py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-5">
              <Zap className="w-4 h-4 text-secondary" />
              Everything in one app
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-5">
              Everything you need to build.<br />Nothing you don't.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We ripped apart the traditional banking model and rebuilt it for the reality of young Ghanaians.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PILLARS.map(({ icon: Icon, title, href, inverted, description, cta }) => (
              <motion.div
                key={title}
                whileHover={{ y: -8 }}
                className={`p-10 rounded-[2rem] border group hover:shadow-xl transition-all duration-300 flex flex-col ${
                  inverted
                    ? "bg-primary border-primary shadow-lg"
                    : "bg-card border-border shadow-sm"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-7 group-hover:scale-110 transition-transform ${inverted ? "bg-secondary/20" : "bg-primary/10"}`}>
                  <Icon className={`w-8 h-8 ${inverted ? "text-secondary" : "text-primary"}`} />
                </div>
                <h3 className={`text-2xl font-bold font-display mb-4 ${inverted ? "text-secondary" : "text-primary"}`}>
                  {title}
                </h3>
                <p className={`leading-relaxed mb-8 flex-1 ${inverted ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                  {description}
                </p>
                <Link href={href}>
                  <span className={`inline-flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all ${inverted ? "text-secondary" : "text-primary"}`}>
                    {cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PAVIA STRIP ── */}
      <section className="py-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 0%, transparent 55%)" }} />
        <div className="container mx-auto max-w-5xl relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-6">
                Designed for the reality of Ghana.
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                We didn't copy a western fintech app. We built Pavia from the ground up for the hustle, the ambition, and the unique financial challenges of building a life in Ghana today.
              </p>
              <ul className="space-y-4">
                {[
                  "Bank-grade security & encryption",
                  "Instant Mobile Money integration",
                  "Zero maintenance or hidden fees",
                  "Available in English & Twi",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-primary-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Avg. monthly savings", value: "GHS 340", sub: "per active user" },
                { label: "Rent applications", value: "3,800+", sub: "approved this year" },
                { label: "Course completions", value: "18,000+", sub: "certificates issued" },
                { label: "Jobs posted on Pavia", value: "620+", sub: "in the last 30 days" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-2xl p-5">
                  <p className="text-secondary font-bold text-xl font-display">{item.value}</p>
                  <p className="text-primary-foreground/70 text-xs mt-1 font-medium">{item.label}</p>
                  <p className="text-primary-foreground/40 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-5">
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              Real stories, real results
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">
              What young Ghanaians say.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-[1.75rem] border border-border p-8 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed flex-1 mb-8 text-[15px]">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-secondary font-bold text-sm">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6 leading-tight">
              Start Building Your<br />
              <span className="text-secondary">Future Today.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Save smarter, rent easier, work better, and learn faster — everything you need to take control of your financial life is right here.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                data-testid="button-get-started-cta"
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-16 px-10 text-xl w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full h-16 px-10 text-xl font-bold border-primary text-primary hover:bg-primary/5 w-full sm:w-auto"
              >
                See how it works
              </Button>
            </div>
            <p className="text-muted-foreground text-sm mt-6">Free to join. No credit card required.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-primary-foreground py-16 border-t border-primary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-7 h-7 text-secondary" fill="currentColor">
                    <circle cx="9" cy="12" r="2.8" />
                    <path d="M 5,17.5 A 4,4 0 0 0 13,17.5 Z" />
                    <circle cx="18" cy="9" r="3.5" />
                    <path d="M 13,15.5 A 5,5 0 0 0 23,15.5 Z" />
                    <circle cx="27" cy="12" r="2.8" />
                    <path d="M 23,17.5 A 4,4 0 0 0 31,17.5 Z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-secondary">Pavia</span>
              </div>
              <p className="text-primary-foreground/60 max-w-sm leading-relaxed">
                The financial home for a new generation of ambitious young Ghanaians.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-secondary mb-4">Product</h4>
              <ul className="space-y-3 text-primary-foreground/60">
                <li><Link href="/save" className="hover:text-secondary transition-colors">Save</Link></li>
                <li><Link href="/rent" className="hover:text-secondary transition-colors">Rent Finance</Link></li>
                <li><Link href="/work" className="hover:text-secondary transition-colors">Find Work</Link></li>
                <li><Link href="/learn" className="hover:text-secondary transition-colors">Learn</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary mb-4">Company</h4>
              <ul className="space-y-3 text-primary-foreground/60">
                <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Legal</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
            <p>© {new Date().getFullYear()} Pavia Financial Technologies. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary transition-colors">Twitter</a>
              <a href="#" className="hover:text-secondary transition-colors">Instagram</a>
              <a href="#" className="hover:text-secondary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
