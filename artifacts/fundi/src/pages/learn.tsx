import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  BookOpen, Clock, Award, ArrowRight, Users, ChevronRight, Search, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useListCourses } from "@/api-client";
import type { CourseListItem } from "@/api-client";

const CATEGORIES = ["All", "Finance", "Marketing", "Business", "Design", "Real Estate"];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
};

const CATEGORY_ICONS: Record<string, string> = {
  Finance: "💰",
  Marketing: "📣",
  Business: "🏢",
  Design: "🎨",
  "Real Estate": "🏠",
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 90 } },
};

function CourseCard({ course }: { course: CourseListItem }) {
  const [, navigate] = useLocation();
  return (
    <motion.div
      variants={cardVariants}
      onClick={() => navigate(`/learn/${course.id}`)}
      className="bg-card rounded-[1.75rem] border border-border overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={course.coverImageUrl ?? FALLBACK_COVER}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-3xl">{CATEGORY_ICONS[course.category] ?? "📚"}</span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[course.level] ?? "bg-muted text-muted-foreground"}`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{course.category}</p>
        <h3 className="font-bold font-display text-primary text-lg leading-tight mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-secondary" />
            {course.lessonCount} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            {course.durationHours}h
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-secondary" />
            {course.instructor}
          </span>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Certificate</p>
            <p className="font-bold text-primary text-sm flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-secondary" />
              GHS {course.certificatePriceGhs}
            </p>
          </div>
          <Button
            size="sm"
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-5 group-hover:bg-secondary group-hover:text-primary transition-colors"
          >
            Start Learning
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Learn() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, isLoading, isError } = useListCourses();
  const allCourses = data?.courses ?? [];

  const filtered = allCourses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-7 h-7 text-secondary" fill="currentColor">
                <circle cx="9" cy="12" r="2.8" /><path d="M 5,17.5 A 4,4 0 0 0 13,17.5 Z" />
                <circle cx="18" cy="9" r="3.5" /><path d="M 13,15.5 A 5,5 0 0 0 23,15.5 Z" />
                <circle cx="27" cy="12" r="2.8" /><path d="M 23,17.5 A 4,4 0 0 0 31,17.5 Z" />
              </svg>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Pavia</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/save" className="hover:text-secondary transition-colors">Save</Link>
            <Link href="/rent" className="hover:text-secondary transition-colors">Rent</Link>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/learn" className="text-secondary font-semibold">Learn</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors hidden md:block text-sm">Log In</Link>
            <Button onClick={() => navigate("/signup")} className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Verified Certificates. Real Skills.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Learn Skills That Pay.<br />
              <span className="text-secondary">Earn Certificates.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Expert-led courses built for Ghana's economy. Complete lessons, pass the quiz, and earn a Pavia-verified certificate — recognised by employers across West Africa.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-8 md:gap-16 mb-10"
          >
            {[
              { label: "Courses", value: `${allCourses.length}+` },
              { label: "Ghanaian instructors", value: "3" },
              { label: "Certificate price", value: "GHS 75+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold font-display text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 pl-14 pr-10 rounded-2xl text-base border-border shadow-md focus:border-primary"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
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
            {isLoading ? "Loading courses…" : `${filtered.length} course${filtered.length !== 1 ? "s" : ""} available`}
          </p>

          {isError && (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-primary mb-2">Couldn't load courses</p>
              <p className="text-muted-foreground">Please refresh to try again.</p>
            </div>
          )}

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-[1.75rem] border border-border overflow-hidden animate-pulse">
                  <div className="h-44 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl font-bold font-display text-primary mb-2">No courses found</p>
              <p className="text-muted-foreground">Try a different category or clear your search.</p>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <motion.div
              key={activeCategory + search}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-primary/5 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-12">
            How Pavia Learn works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "📚", title: "Pick a course", desc: "Choose from expert-led courses built for the Ghanaian economy." },
              { step: "02", icon: "✅", title: "Complete lessons", desc: "Read through each lesson at your own pace. No time pressure." },
              { step: "03", icon: "🎯", title: "Pass the quiz", desc: "Score 70% or above on the end-of-course quiz to qualify." },
              { step: "04", icon: "🏆", title: "Get your certificate", desc: "Pay and download a verified Pavia certificate to share and display." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-4xl mb-3">{s.icon}</div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{s.step}</p>
                <p className="font-bold text-primary mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
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
