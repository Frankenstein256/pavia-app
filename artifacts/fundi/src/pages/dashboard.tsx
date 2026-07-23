import { useEffect } from "react";
import { Link, useLocation } from "wouter";
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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, useLogoutAction } from "@/hooks/use-auth";

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
    description: "Browse verified gigs and jobs. Get paid instantly when you complete work.",
    stat: "0",
    statLabel: "Applications",
    cta: "Find Work",
    inverted: false,
  },
  {
    icon: BookOpen,
    title: "Learn",
    href: "/learn",
    description: "Free certified courses to help you build new skills and earn more.",
    stat: "0",
    statLabel: "Courses started",
    cta: "Explore Courses",
    inverted: false,
  },
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();
  const logout = useLogoutAction();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PaviaLogo />
            <span className="font-display font-bold text-xl text-primary tracking-tight">Pavia</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-display text-primary mb-1">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-muted-foreground">Here's your Pavia overview.</p>
        </motion.div>

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Total Saved", value: "GHS 0.00", icon: TrendingUp },
            { label: "Rent Finance", value: "None active", icon: HomeIcon },
            { label: "Active Gigs", value: "0", icon: Briefcase },
            { label: "Certificates", value: "0", icon: Award },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4">
              <item.icon className="w-4 h-4 text-secondary mb-2" />
              <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
              <p className="text-base font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {FEATURE_CARDS.map((card) => (
            <Link key={card.title} href={card.href}>
              <div
                className={`group rounded-2xl border p-6 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  card.inverted
                    ? "bg-primary border-primary text-secondary"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      card.inverted ? "bg-secondary/10" : "bg-primary/8"
                    }`}
                  >
                    <card.icon className={`w-5 h-5 ${card.inverted ? "text-secondary" : "text-primary"}`} />
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 mt-1 opacity-40 group-hover:opacity-100 transition-opacity ${
                      card.inverted ? "text-secondary" : "text-primary"
                    }`}
                  />
                </div>
                <h3 className={`font-bold text-lg font-display mb-1 ${card.inverted ? "text-secondary" : "text-primary"}`}>
                  {card.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${card.inverted ? "text-secondary/70" : "text-muted-foreground"}`}>
                  {card.description}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className={`text-xl font-bold font-display ${card.inverted ? "text-secondary" : "text-primary"}`}>
                      {card.stat}
                    </p>
                    <p className={`text-xs ${card.inverted ? "text-secondary/60" : "text-muted-foreground"}`}>
                      {card.statLabel}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={
                      card.inverted
                        ? "bg-secondary text-primary hover:bg-secondary/90 rounded-full text-xs font-bold"
                        : "bg-primary text-secondary hover:bg-primary/90 rounded-full text-xs font-bold"
                    }
                  >
                    {card.cta} <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
