import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Search, MapPin, SlidersHorizontal, ArrowRight,
  X, Phone, Mail, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useListFreelancers, useCreateFreelancer } from "@workspace/api-client-react";
import type { Freelancer } from "@workspace/api-client-react";

const CATEGORIES = [
  "All Skills",
  "Graphic Design",
  "Motion & Video",
  "Illustration",
  "Brand Identity",
  "UI / UX",
  "Photography",
];

const FALLBACK_PORTFOLIO = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 90 } },
};

/* ─── Contact Modal ─────────────────────────────────────────────────── */
function ContactModal({
  freelancer,
  onClose,
}: {
  freelancer: Freelancer | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!freelancer} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        {freelancer && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-primary">
                Contact {freelancer.name}
              </DialogTitle>
              <DialogDescription>
                Reach out directly to discuss your project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {/* Portfolio thumb */}
              {freelancer.portfolioImageUrl && (
                <img
                  src={freelancer.portfolioImageUrl}
                  alt="Portfolio"
                  className="w-full h-36 object-cover rounded-2xl"
                />
              )}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Skill</p>
                <p className="font-semibold text-primary">{freelancer.skillCategory}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</p>
                <p className="flex items-center gap-1.5 text-primary">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {freelancer.location}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Rate</p>
                <p className="font-bold text-xl font-display text-primary">
                  GHS {freelancer.rateGhs.toLocaleString()}<span className="text-sm font-normal text-muted-foreground"> /project</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${freelancer.phone}`}
                  className="flex items-center justify-center gap-2 bg-primary text-secondary font-bold rounded-2xl py-3 hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={`mailto:${freelancer.email}`}
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold rounded-2xl py-3 hover:bg-primary/5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
              <p className="text-xs text-muted-foreground text-center pb-1">
                Phone: {freelancer.phone} · Email: {freelancer.email}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─── List Your Skills Modal ─────────────────────────────────────────── */
const INITIAL_FORM = {
  name: "",
  skillCategory: "",
  location: "",
  rateGhs: "",
  bio: "",
  portfolioImageUrl: "",
  email: "",
  phone: "",
};

function ListSkillsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [customSkill, setCustomSkill] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateFreelancer();

  function handleClose() {
    if (!mutation.isPending) {
      onClose();
      setTimeout(() => {
        setForm(INITIAL_FORM);
        setCustomSkill("");
        setSubmitted(false);
        mutation.reset();
      }, 300);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const rate = parseInt(form.rateGhs, 10);
    if (isNaN(rate) || rate <= 0) return;
    const resolvedCategory =
      form.skillCategory === "Other" ? customSkill.trim() : form.skillCategory;
    if (!resolvedCategory) return;
    await mutation.mutateAsync({
      data: {
        name: form.name,
        skillCategory: resolvedCategory,
        location: form.location,
        rateGhs: rate,
        bio: form.bio,
        portfolioImageUrl: form.portfolioImageUrl || undefined,
        email: form.email,
        phone: form.phone,
      },
    });
    setSubmitted(true);
  }

  function field(
    id: keyof typeof INITIAL_FORM,
    label: string,
    placeholder: string,
    type = "text",
  ) {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={id} className="font-semibold text-sm text-primary">
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
          required={id !== "portfolioImageUrl"}
          className="rounded-xl border-border focus:border-primary"
          disabled={mutation.isPending}
        />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">List Your Skills</DialogTitle>
          <DialogDescription>
            Join the Pavia Work marketplace. Fill in your details and get discovered by clients across Ghana.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-secondary" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold text-primary">You're on the marketplace!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your profile is now live. Clients searching for your skills will be able to find and contact you.
              </p>
              <Button
                onClick={handleClose}
                className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-8 mt-2"
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4 pt-2"
            >
              {field("name", "Full Name", "e.g. Abena Owusu")}

              <div className="space-y-1.5">
                <Label htmlFor="skillCategory" className="font-semibold text-sm text-primary">
                  Skill Category
                </Label>
                <select
                  id="skillCategory"
                  required
                  value={form.skillCategory}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, skillCategory: e.target.value }));
                    if (e.target.value !== "Other") setCustomSkill("");
                  }}
                  disabled={mutation.isPending}
                  className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
                >
                  <option value="" disabled>Select a category…</option>
                  {CATEGORIES.filter((c) => c !== "All Skills").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Other">Other (specify below)</option>
                </select>
                {form.skillCategory === "Other" && (
                  <Input
                    placeholder="e.g. Copywriting, Social Media Management…"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    required
                    minLength={2}
                    disabled={mutation.isPending}
                    className="rounded-xl border-border focus:border-primary"
                  />
                )}
              </div>

              {field("location", "Location", "e.g. Accra, Kumasi, Remote")}

              <div className="space-y-1.5">
                <Label htmlFor="rateGhs" className="font-semibold text-sm text-primary">
                  Starting Rate (GHS)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">GHS</span>
                  <Input
                    id="rateGhs"
                    type="number"
                    min={1}
                    placeholder="350"
                    value={form.rateGhs}
                    onChange={(e) => setForm((f) => ({ ...f, rateGhs: e.target.value }))}
                    required
                    disabled={mutation.isPending}
                    className="pl-12 rounded-xl border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio" className="font-semibold text-sm text-primary">
                  Bio <span className="text-muted-foreground font-normal">(min 10 characters)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell clients what you do and what makes you stand out…"
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  required
                  minLength={10}
                  rows={3}
                  disabled={mutation.isPending}
                  className="rounded-xl border-border focus:border-primary resize-none"
                />
              </div>

              {field("portfolioImageUrl", "Portfolio Image URL (optional)", "https://yourportfolio.com/image.jpg")}
              {field("email", "Email Address", "you@example.com", "email")}
              {field("phone", "Phone Number", "0241234567", "tel")}

              {mutation.isError && (
                <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Something went wrong. Please check your details and try again.</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={mutation.isPending}
                  className="flex-1 rounded-full font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1 bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full"
                >
                  {mutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</>
                  ) : (
                    "Submit Profile"
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function Work() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [contactFreelancer, setContactFreelancer] = useState<Freelancer | null>(null);
  const [listSkillsOpen, setListSkillsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search]);

  const queryParams = {
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(activeCategory !== "All Skills" ? { category: activeCategory } : {}),
  };

  const { data, isLoading, isError, refetch } = useListFreelancers(queryParams);

  const freelancers = data?.freelancers ?? [];

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
            <Link href="/work" className="text-secondary font-semibold">Work</Link>
            <Link href="/learn" className="hover:text-secondary transition-colors">Learn</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors hidden md:block text-sm">Log In</Link>
            <Button
              data-testid="button-get-started-work-nav"
              onClick={() => navigate("/signup")}
              className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Ghana's Skills Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Hire Ghana's best<br />
              <span className="text-secondary">creative talent.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with vetted Ghanaian freelancers — graphic designers, illustrators, photographers, and more. Pay in GHS, work with confidence.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              data-testid="input-search"
              placeholder="Search by name, skill, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 pl-14 pr-12 rounded-2xl text-base border-border shadow-md focus:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Category filters */}
          <div className="flex items-center gap-3 flex-wrap mb-10">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase().replace(/[\s/]+/g, "-")}`}
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

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            {isLoading ? "Loading…" : `${freelancers.length} freelancer${freelancers.length !== 1 ? "s" : ""} found`}
          </p>

          {/* States */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-primary mb-2">Couldn't load freelancers</p>
              <p className="text-muted-foreground mb-6">Check your connection and try again.</p>
              <Button onClick={() => refetch()} variant="outline" className="rounded-full">
                Retry
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-[1.75rem] border border-border overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && freelancers.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl font-bold font-display text-primary mb-2">No results found</p>
              <p className="text-muted-foreground">Try a different skill or clear your search.</p>
            </div>
          )}

          {!isLoading && !isError && freelancers.length > 0 && (
            <motion.div
              key={activeCategory + debouncedSearch}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {freelancers.map((freelancer) => (
                <motion.div
                  key={freelancer.id}
                  variants={cardVariants}
                  data-testid={`card-designer-${freelancer.id}`}
                  className="bg-card rounded-[1.75rem] border border-border overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Portfolio image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={freelancer.portfolioImageUrl ?? FALLBACK_PORTFOLIO}
                      alt={`${freelancer.name} portfolio`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/30 border-2 border-primary flex items-center justify-center shrink-0 text-primary font-bold text-lg font-display">
                        {freelancer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold font-display text-primary text-lg leading-tight">{freelancer.name}</h3>
                        <p className="text-sm text-muted-foreground">{freelancer.skillCategory}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        {freelancer.location}
                      </span>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary rounded-full">
                        {freelancer.skillCategory}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                      {freelancer.bio}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Starting from</p>
                        <p className="text-xl font-bold font-display text-primary">
                          GHS {freelancer.rateGhs.toLocaleString()}
                          <span className="text-sm font-normal text-muted-foreground"> /project</span>
                        </p>
                      </div>
                      <Button
                        data-testid={`button-hire-${freelancer.id}`}
                        onClick={() => setContactFreelancer(freelancer)}
                        className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-5"
                      >
                        Hire Now
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-4xl text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">Are you a freelancer?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join the Pavia Work marketplace and get discovered by clients across Ghana. List your skills, set your rate, get paid on time.
          </p>
          <Button
            data-testid="button-list-skills-cta"
            size="lg"
            onClick={() => setListSkillsOpen(true)}
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-14 px-10 text-lg"
          >
            List Your Skills
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

      {/* Modals */}
      <ContactModal
        freelancer={contactFreelancer}
        onClose={() => setContactFreelancer(null)}
      />
      <ListSkillsModal
        open={listSkillsOpen}
        onClose={() => setListSkillsOpen(false)}
      />
    </div>
  );
}
