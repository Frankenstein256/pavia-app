import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  Play,
  TrendingUp,
  BarChart2,
  Briefcase,
  Wallet,
  Home as HomeIcon,
  Share2,
  Users,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTWUNdmslspAxFN5p-olxLxdcLgOWBIcaRv208FDqrErRCtA/viewform";

function openWaitlist() {
  window.open(WAITLIST_URL, "_blank", "noopener,noreferrer");
}

const CATEGORIES = ["All", "Finance", "Business", "Marketing", "Design", "Real Estate"];

const COURSES = [
  {
    id: 1,
    title: "Financial Management for Young Professionals",
    category: "Finance",
    type: "Diploma",
    level: "Beginner",
    lessons: 24,
    duration: "6 hrs",
    certCost: 150,
    progress: 0,
    rating: 4.9,
    students: 8320,
    icon: TrendingUp,
    description: "Master personal and business financial management — budgeting, cash flow, financial statements, and smart decision-making for the Ghanaian context.",
  },
  {
    id: 2,
    title: "Personal Finance & Wealth Building",
    category: "Finance",
    type: "Certificate",
    level: "Beginner",
    lessons: 12,
    duration: "3 hrs",
    certCost: 50,
    progress: 0,
    rating: 5.0,
    students: 12400,
    icon: Wallet,
    description: "Build a solid money foundation — savings habits, debt management, investing basics, and creating your first financial plan in GHS.",
  },
  {
    id: 3,
    title: "Accounting Basics for Entrepreneurs",
    category: "Finance",
    type: "Certificate",
    level: "Beginner",
    lessons: 15,
    duration: "4 hrs",
    certCost: 75,
    progress: 0,
    rating: 4.8,
    students: 5640,
    icon: BarChart2,
    description: "Understand profit & loss, balance sheets, bookkeeping, and VAT compliance — everything a Ghanaian small business owner needs to know.",
  },
  {
    id: 4,
    title: "Entrepreneurship & Business Development",
    category: "Business",
    type: "Diploma",
    level: "Intermediate",
    lessons: 30,
    duration: "8 hrs",
    certCost: 150,
    progress: 0,
    rating: 4.9,
    students: 7210,
    icon: Briefcase,
    description: "From idea to registered business — market research, business models, funding options, and scaling a venture in the West African market.",
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    category: "Marketing",
    type: "Certificate",
    level: "Beginner",
    lessons: 18,
    duration: "5 hrs",
    certCost: 75,
    progress: 0,
    rating: 4.7,
    students: 9880,
    icon: Share2,
    description: "SEO, email marketing, Google Ads, and analytics — everything you need to market a business or yourself online and get results in Ghana.",
  },
  {
    id: 6,
    title: "Social Media Marketing & Content Creation",
    category: "Marketing",
    type: "Certificate",
    level: "Beginner",
    lessons: 14,
    duration: "3.5 hrs",
    certCost: 50,
    progress: 0,
    rating: 4.8,
    students: 15200,
    icon: Users,
    description: "Grow an audience, create scroll-stopping content, run paid campaigns on Instagram, TikTok, and Facebook — built for Ghanaian creators and brands.",
  },
  {
    id: 7,
    title: "Graphic Design for Business",
    category: "Design",
    type: "Certificate",
    level: "Beginner",
    lessons: 16,
    duration: "4.5 hrs",
    certCost: 75,
    progress: 0,
    rating: 4.9,
    students: 6730,
    icon: BookOpen,
    description: "Canva to professional design — brand identity, social media visuals, pitch decks, and print materials. No prior design experience needed.",
  },
  {
    id: 8,
    title: "Real Estate Basics in Ghana",
    category: "Real Estate",
    type: "Diploma",
    level: "Intermediate",
    lessons: 20,
    duration: "5.5 hrs",
    certCost: 150,
    progress: 0,
    rating: 4.7,
    students: 3940,
    icon: HomeIcon,
    description: "Navigate Ghana's property market — land documentation, title deeds, rental law, investing in real estate, and avoiding common fraud.",
  },
];

const TYPE_STYLE: Record<string, string> = {
  Diploma: "bg-secondary text-primary",
  Certificate: "bg-primary/10 text-primary border border-primary/20",
};

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "text-secondary",
  Intermediate: "text-primary",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } },
};

function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = course.icon;

  return (
    <motion.div
      variants={cardVariants}
      data-testid={`card-course-${course.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-card rounded-[1.75rem] border border-border flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Coloured header strip */}
      <div className="bg-primary px-7 pt-7 pb-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-secondary" />
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${TYPE_STYLE[course.type]}`}>
            {course.type}
          </span>
        </div>
        <h3 className="text-lg font-bold font-display text-secondary leading-snug">{course.title}</h3>
      </div>

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">{course.description}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-5">
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
          <span className={`flex items-center gap-1 font-semibold ${LEVEL_COLOR[course.level]}`}>{course.level}</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-secondary text-secondary" /> {course.rating}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-1.5 flex justify-between text-xs font-medium">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-primary">{course.progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted mb-5">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-700"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        {/* Certificate cost */}
        <div className="flex items-center gap-2 mb-6 bg-secondary/10 rounded-xl px-4 py-2.5">
          <Award className="w-4 h-4 text-secondary shrink-0" />
          <span className="text-xs text-primary font-semibold">
            Certificate — <span className="text-secondary">GHS {course.certCost}</span> · Course is free
          </span>
        </div>

        {/* CTA */}
        <Button
          data-testid={`button-start-course-${course.id}`}
          onClick={openWaitlist}
          className="mt-auto w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-11"
        >
          <Play className="w-4 h-4 mr-2 fill-current" />
          Start Learning
        </Button>
      </div>
    </motion.div>
  );
}

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

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
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/3" />

        <div className="container mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Free courses · Paid certificates · Real skills
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.05] text-primary mb-6">
              Learn Free.<br />
              <span className="text-secondary">Certify Your Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Every course on Pavia Learn is completely free. Earn a recognised certificate to prove your skills — and unlock better jobs, clients, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                data-testid="button-browse-courses-hero"
                size="lg"
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg"
              >
                Browse Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={openWaitlist}
                className="rounded-full h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5"
              >
                Get Certified
                <Award className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: "8", label: "Free courses" },
              { value: "GHS 50", label: "Certificates from" },
              { value: "60k+", label: "Learners enrolled" },
              { value: "100%", label: "Online & self-paced" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-5 bg-card rounded-2xl border border-border">
                <p className="text-2xl font-bold font-display text-secondary mb-0.5">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Free vs Paid explainer */}
      <section className="py-16 px-6 bg-primary/3 border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl p-8 border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-primary mb-3">Courses are free. Always.</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every lesson, video, quiz, and resource is available at zero cost. No subscription, no credit card, no catch.
              </p>
              <ul className="space-y-2">
                {["Unlimited access to all lessons", "Self-paced — learn at your speed", "Available on any device"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary rounded-3xl p-8 border border-primary">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-secondary mb-3">Certificates cost GHS 50–150.</h3>
              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                Once you complete a course, pay a small fee to receive a verified digital certificate — shareable on LinkedIn, usable with employers and clients.
              </p>
              <ul className="space-y-2">
                {["Certificate courses from GHS 50", "Diploma courses from GHS 150", "Verified & shareable certificate"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course catalog */}
      <section id="courses" className="py-24 pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-4">Course Catalog</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Diplomas and certificates covering the skills young Ghanaians actually need.
            </p>
          </div>

          {/* Filters */}
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
            <span className="ml-auto text-sm text-muted-foreground font-medium">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-bold font-display text-primary mb-2">No courses in this category yet</p>
              <p className="text-muted-foreground">More coming soon. Try another filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Get Certified CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">
            Your certificate is waiting.
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-3 max-w-xl mx-auto">
            Complete any course, pay GHS 50–150, and receive a verified certificate that opens doors with employers, clients, and lenders.
          </p>
          <p className="text-primary-foreground/50 text-sm mb-10">Courses are always free. Only certification carries a fee.</p>
          <Button
            data-testid="button-get-certified-cta"
            size="lg"
            onClick={openWaitlist}
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-14 px-10 text-lg"
          >
            Get Certified
            <Award className="ml-2 w-5 h-5" />
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
