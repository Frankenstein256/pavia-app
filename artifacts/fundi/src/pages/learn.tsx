import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  TrendingUp,
  Home as HomeIcon,
  Wallet,
  Briefcase,
  BarChart2,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTWUNdmslspAxFN5p-olxLxdcLgOWBIcaRv208FDqrErRCtA/viewform";

function openWaitlist() {
  window.open(WAITLIST_URL, "_blank", "noopener,noreferrer");
}

const CATEGORIES = ["All", "Budgeting", "Saving", "Rent", "Investing", "Hustling"];

const COURSES = [
  {
    id: 1,
    title: "Your First Budget in 30 Minutes",
    category: "Budgeting",
    level: "Beginner",
    lessons: 5,
    duration: "28 min",
    students: 4120,
    rating: 4.9,
    icon: Wallet,
    color: "bg-primary",
    textColor: "text-secondary",
    featured: true,
    description:
      "Learn a budgeting method built for variable incomes — perfect for young Ghanaians juggling gigs, side hustles, and monthly expenses.",
    tags: ["Budgeting", "Money basics"],
  },
  {
    id: 2,
    title: "The Ghana Rent System — What You Need to Know",
    category: "Rent",
    level: "Beginner",
    lessons: 4,
    duration: "22 min",
    students: 3870,
    rating: 4.8,
    icon: HomeIcon,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "Understand the 2-year advance system, your tenant rights, how to negotiate with landlords, and smarter alternatives now available.",
    tags: ["Rent", "Rights"],
  },
  {
    id: 3,
    title: "Save Like You Mean It",
    category: "Saving",
    level: "Beginner",
    lessons: 6,
    duration: "35 min",
    students: 5340,
    rating: 5.0,
    icon: TrendingUp,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "Set up savings goals that actually work. Automate contributions, resist impulse spending, and build an emergency fund in 90 days.",
    tags: ["Saving", "Goals"],
  },
  {
    id: 4,
    title: "Investing 101 for Ghanaians",
    category: "Investing",
    level: "Intermediate",
    lessons: 8,
    duration: "52 min",
    students: 2910,
    rating: 4.7,
    icon: BarChart2,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "From Treasury Bills to stocks — understand your options on the Ghana Stock Exchange and how to start with as little as GHS 100.",
    tags: ["Investing", "Stocks", "T-Bills"],
  },
  {
    id: 5,
    title: "Turn Your Skill Into GHS",
    category: "Hustling",
    level: "Beginner",
    lessons: 7,
    duration: "40 min",
    students: 6200,
    rating: 4.9,
    icon: Zap,
    color: "bg-primary",
    textColor: "text-secondary",
    featured: false,
    description:
      "Price your services confidently, find clients online and offline, and build a freelance income that supports your financial goals.",
    tags: ["Hustling", "Freelance", "Income"],
  },
  {
    id: 6,
    title: "Building a Business on a Budget",
    category: "Hustling",
    level: "Intermediate",
    lessons: 9,
    duration: "58 min",
    students: 2340,
    rating: 4.8,
    icon: Briefcase,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "From idea to first sale with minimal capital. Covers registration, pricing, marketing on social media, and reinvesting profits.",
    tags: ["Business", "Hustling"],
  },
  {
    id: 7,
    title: "Understanding Interest & Loans",
    category: "Budgeting",
    level: "Intermediate",
    lessons: 5,
    duration: "30 min",
    students: 1980,
    rating: 4.6,
    icon: BarChart2,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "Know when debt is a tool and when it's a trap. Understand APR, compound interest, and how to borrow without regret.",
    tags: ["Debt", "Budgeting"],
  },
  {
    id: 8,
    title: "Emergency Fund: Your Financial Safety Net",
    category: "Saving",
    level: "Beginner",
    lessons: 4,
    duration: "20 min",
    students: 3450,
    rating: 4.9,
    icon: TrendingUp,
    color: "bg-card",
    textColor: "text-primary",
    featured: false,
    description:
      "Why you need one, how big it should be, and exactly how to build it even on a tight income. Start with GHS 50 a week.",
    tags: ["Saving", "Emergency fund"],
  },
];

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "bg-secondary/20 text-primary",
  Intermediate: "bg-primary/10 text-primary",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } },
};

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  const featured = COURSES.find((c) => c.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-secondary font-bold text-xl">P</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Pavia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/save" className="hover:text-secondary transition-colors">Save</Link>
            <Link href="/rent" className="hover:text-secondary transition-colors">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/learn" className="text-secondary font-semibold">Learn</Link>
          </div>
          <Button
            data-testid="button-start-learning-nav"
            onClick={openWaitlist}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
          >
            Start Learning
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/3" />

        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Financial education built for Ghana
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Master your <span className="text-secondary">money.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Bite-sized lessons on budgeting, saving, renting, investing, and building income — taught in a way that actually makes sense for young Ghanaians.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                data-testid="button-start-learning-hero"
                size="lg"
                onClick={openWaitlist}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg"
              >
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "8+", label: "Free courses" },
              { value: "20k+", label: "Learners" },
              { value: "5 min", label: "Avg lesson length" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-card rounded-2xl border border-border">
                <p className="text-3xl font-bold font-display text-secondary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured course */}
      {featured && (
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Featured this week</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-secondary/20 text-secondary`}>
                    {featured.level}
                  </span>
                  <span className="text-primary-foreground/60 text-sm">{featured.category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-secondary mb-4">{featured.title}</h2>
                <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">{featured.description}</p>
                <div className="flex items-center gap-6 text-primary-foreground/60 text-sm mb-8">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {featured.lessons} lessons</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featured.duration}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {featured.students.toLocaleString()} learners</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-secondary text-secondary" /> {featured.rating}</span>
                </div>
                <Button
                  data-testid="button-start-featured-course"
                  size="lg"
                  onClick={openWaitlist}
                  className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-13 px-8 text-base"
                >
                  Start This Course
                  <Play className="ml-2 w-4 h-4 fill-current" />
                </Button>
              </div>
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl bg-secondary/20 flex items-center justify-center shrink-0">
                <Wallet className="w-24 h-24 text-secondary opacity-80" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Course grid */}
      <section className="py-16 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Category filters */}
          <div className="flex items-center gap-3 flex-wrap mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-secondary shadow-md"
                    : "bg-card border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-8 font-medium">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((course) => {
                const Icon = course.icon;
                const isInverted = course.color === "bg-primary";

                return (
                  <motion.div
                    key={course.id}
                    variants={cardVariants}
                    data-testid={`card-course-${course.id}`}
                    className={`${course.color} rounded-[1.75rem] border ${isInverted ? "border-primary" : "border-border"} p-7 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isInverted ? "bg-secondary/20" : "bg-primary/10"} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${isInverted ? "text-secondary" : "text-primary"}`} />
                    </div>

                    {/* Level + category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isInverted ? "bg-secondary/20 text-secondary" : LEVEL_COLOR[course.level]}`}>
                        {course.level}
                      </span>
                      <span className={`text-xs font-medium ${isInverted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{course.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold font-display mb-3 leading-snug ${isInverted ? "text-secondary" : "text-primary"}`}>
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-5 flex-1 line-clamp-3 ${isInverted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${isInverted ? "border-secondary/30 text-secondary/80" : "border-primary/20 text-primary/70"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta + CTA */}
                    <div className={`flex items-center justify-between pt-4 border-t ${isInverted ? "border-white/10" : "border-border"}`}>
                      <div className={`flex items-center gap-4 text-xs ${isInverted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.lessons} lessons</span>
                        <span className="flex items-center gap-1"><Star className={`w-3.5 h-3.5 ${isInverted ? "fill-secondary text-secondary" : "fill-secondary text-secondary"}`} />{course.rating}</span>
                      </div>
                      <button
                        data-testid={`button-start-course-${course.id}`}
                        onClick={openWaitlist}
                        className={`flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all ${isInverted ? "text-secondary" : "text-primary"}`}
                      >
                        Start <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-bold font-display text-primary mb-2">No courses here yet</p>
              <p className="text-muted-foreground">Try a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-4xl text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">Knowledge is your first investment.</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join the Pavia community and get access to all courses — free, on your phone, at your pace.
          </p>
          <Button
            data-testid="button-start-learning-cta"
            size="lg"
            onClick={openWaitlist}
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-14 px-10 text-lg"
          >
            Join the Waitlist
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
