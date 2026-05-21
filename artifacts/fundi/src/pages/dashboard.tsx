import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Wallet,
  Home as HomeIcon,
  Briefcase,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Bell,
  Settings,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const FEATURE_CARDS = [
  {
    icon: Wallet,
    title: "Save",
    href: "/save",
    description: "Set savings goals, build stashes, and earn competitive returns on every cedi you save.",
    stat: "GHS 0.00",
    statLabel: "Total saved",
    cta: "Start Saving",
    inverted: false,
  },
  {
    icon: HomeIcon,
    title: "Rent Finance",
    href: "/rent",
    description: "We pay your landlord the 2-year advance. You repay us monthly — no lump sum needed.",
    stat: "GHS 0",
    statLabel: "Rent financed",
    cta: "Apply Now",
    inverted: true,
  },
  {
    icon: Briefcase,
    title: "Work",
    href: "/work",
    description: "Browse vetted jobs and freelance gigs. Get paid directly into your Pavia wallet.",
    stat: "0",
    statLabel: "Active applications",
    cta: "Find Work",
    inverted: false,
  },
  {
    icon: BookOpen,
    title: "Learn",
    href: "/learn",
    description: "Free courses in finance, business, marketing and more. Earn a certificate from GHS 50.",
    stat: "0 / 8",
    statLabel: "Courses completed",
    cta: "Browse Courses",
    inverted: false,
  },
];

const QUICK_TIPS = [
  { icon: TrendingUp, text: "Set up your first savings goal — it takes 2 minutes." },
  { icon: Award, text: "Complete the Personal Finance course to earn your first certificate." },
  { icon: HomeIcon, text: "See if you qualify for rent financing in under 5 minutes." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } },
};

export default function Dashboard() {
  const [name, setName] = useState("there");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const n = localStorage.getItem("pavia_user_name");
    const fn = localStorage.getItem("pavia_user_full_name");
    if (n) setName(n);
    if (fn) setFullName(fn);
  }, []);

  const initials = fullName
    ? fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : name.slice(0, 2).toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PaviaLogo />
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Pavia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/save" className="hover:text-secondary transition-colors text-sm">Save</Link>
            <Link href="/rent" className="hover:text-secondary transition-colors text-sm">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors text-sm">Work</Link>
            <Link href="/learn" className="hover:text-secondary transition-colors text-sm">Learn</Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">{initials}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Welcome header */}
      <section className="bg-primary px-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <p className="text-primary-foreground/60 font-medium mb-1">{greeting},</p>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-secondary">
                {name} 👋
              </h1>
              <p className="text-primary-foreground/70 mt-3 text-lg">
                Your financial home is ready. Where do you want to start?
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl px-7 py-5 text-center">
              <p className="text-primary-foreground/50 text-xs font-medium mb-1">Account status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-bold">Active</span>
              </div>
              <p className="text-primary-foreground/40 text-xs mt-1">Joined today</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold font-display text-primary">Your Pavia Features</h2>
            <span className="text-sm text-muted-foreground">All features are available to you</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURE_CARDS.map(({ icon: Icon, title, href, description, stat, statLabel, cta, inverted }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className={`rounded-[1.75rem] border p-7 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  inverted ? "bg-primary border-primary" : "bg-card border-border"
                }`}
              >
                <div className={`w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${inverted ? "bg-secondary/20" : "bg-primary/10"}`}>
                  <Icon className={`w-6 h-6 ${inverted ? "text-secondary" : "text-primary"}`} />
                </div>
                <h3 className={`text-lg font-bold font-display mb-2 ${inverted ? "text-secondary" : "text-primary"}`}>{title}</h3>
                <p className={`text-sm leading-relaxed mb-5 flex-1 ${inverted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{description}</p>

                {/* Stat */}
                <div className={`rounded-xl px-4 py-3 mb-5 ${inverted ? "bg-white/10" : "bg-primary/5"}`}>
                  <p className={`text-xl font-bold font-display ${inverted ? "text-secondary" : "text-primary"}`}>{stat}</p>
                  <p className={`text-xs font-medium ${inverted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{statLabel}</p>
                </div>

                <Link href={href}>
                  <Button
                    className={`w-full rounded-full font-bold h-10 text-sm ${
                      inverted
                        ? "bg-secondary text-primary hover:bg-secondary/90"
                        : "bg-primary text-secondary hover:bg-primary/90"
                    }`}
                  >
                    {cta} <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick start tips */}
      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl font-bold font-display text-primary mb-6">Recommended next steps</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {QUICK_TIPS.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground leading-snug">{text}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 border-t border-primary/20">
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
