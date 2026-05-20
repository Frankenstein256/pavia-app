import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, MapPin, Star, SlidersHorizontal, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HIRE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfTWUNdmslspAxFN5p-olxLxdcLgOWBIcaRv208FDqrErRCtA/viewform";
const LIST_SKILLS_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeuzZia6Ja2sOoVKrJ1ymkNdNMe9PK_YGTtSWWduy-bIgVXzw/viewform";

function openForm() {
  window.open(HIRE_FORM_URL, "_blank", "noopener,noreferrer");
}

function openListSkillsForm() {
  window.open(LIST_SKILLS_FORM_URL, "_blank", "noopener,noreferrer");
}

const CATEGORIES = [
  "All Skills",
  "Graphic Design",
  "Motion & Video",
  "Illustration",
  "Brand Identity",
  "UI / UX",
  "Photography",
];

const DESIGNERS = [
  {
    id: 1,
    name: "Abena Owusu",
    skill: "Brand Identity Designer",
    location: "Accra, Kumasi",
    rate: 350,
    rating: 4.9,
    reviews: 38,
    tags: ["Brand Identity", "Graphic Design"],
    bio: "I craft brand identities that stick. 6+ years working with startups and established businesses across Ghana.",
    portfolio: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=47",
    available: true,
  },
  {
    id: 2,
    name: "Kweku Asante",
    skill: "Motion Designer & Video Editor",
    location: "Accra, Remote",
    rate: 480,
    rating: 5.0,
    reviews: 22,
    tags: ["Motion & Video", "Graphic Design"],
    bio: "Award-winning motion designer. I turn ideas into scroll-stopping visuals for brands, music artists, and agencies.",
    portfolio: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=53",
    available: true,
  },
  {
    id: 3,
    name: "Efua Mensah",
    skill: "Illustrator & Visual Artist",
    location: "Kumasi",
    rate: 280,
    rating: 4.8,
    reviews: 51,
    tags: ["Illustration", "Graphic Design"],
    bio: "Afrocentric illustrations for publishing, packaging, and digital media. My work celebrates African stories.",
    portfolio: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=44",
    available: false,
  },
  {
    id: 4,
    name: "Nana Kofi Boateng",
    skill: "UI/UX Designer",
    location: "Accra, Remote",
    rate: 420,
    rating: 4.9,
    reviews: 17,
    tags: ["UI / UX", "Brand Identity"],
    bio: "Product designer for mobile and web. I have shipped apps used by 50,000+ Ghanaians. Clean, purposeful design.",
    portfolio: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=60",
    available: true,
  },
  {
    id: 5,
    name: "Adwoa Darko",
    skill: "Photographer & Creative Director",
    location: "Accra",
    rate: 600,
    rating: 4.7,
    reviews: 43,
    tags: ["Photography", "Brand Identity"],
    bio: "Commercial photographer specialising in lifestyle, product, and portrait work for brands across West Africa.",
    portfolio: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=48",
    available: true,
  },
  {
    id: 6,
    name: "Yaw Amponsah",
    skill: "Graphic Designer & Print Specialist",
    location: "Tema, Remote",
    rate: 220,
    rating: 4.6,
    reviews: 67,
    tags: ["Graphic Design"],
    bio: "Fast, reliable, detail-obsessed. From flyers to full brand kits — I deliver quality work on tight deadlines.",
    portfolio: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    avatar: "https://i.pravatar.cc/150?img=57",
    available: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } },
};

export default function Work() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = DESIGNERS.filter((d) => {
    const matchesSearch =
      search === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.skill.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All Skills" || d.tags.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

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
            <Link href="/work" className="text-secondary font-semibold">Work</Link>
            <Link href="/#learn" className="hover:text-secondary transition-colors">Learn</Link>
          </div>
          <Button
            data-testid="button-join-waitlist-work-nav"
            onClick={openForm}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
          >
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              data-testid="input-search"
              placeholder="Search by name, skill, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 pl-14 pr-6 rounded-2xl text-base border-border shadow-md focus:border-primary"
            />
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
                data-testid={`filter-${cat.toLowerCase().replace(/\s|\/\s/g, "-")}`}
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

            <div className="ml-auto relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border text-sm font-semibold hover:border-primary transition-colors"
              >
                Sort by <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            {filtered.length} freelancer{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((designer) => (
                <motion.div
                  key={designer.id}
                  variants={cardVariants}
                  data-testid={`card-designer-${designer.id}`}
                  className="bg-card rounded-[1.75rem] border border-border overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Portfolio image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={designer.portfolio}
                      alt={`${designer.name} portfolio`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {designer.available ? (
                      <span className="absolute top-3 right-3 bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Busy
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={designer.avatar}
                        alt={designer.name}
                        className="w-12 h-12 rounded-full border-2 border-primary object-cover shrink-0"
                      />
                      <div>
                        <h3 className="font-bold font-display text-primary text-lg leading-tight">{designer.name}</h3>
                        <p className="text-sm text-muted-foreground">{designer.skill}</p>
                      </div>
                    </div>

                    {/* Location + rating */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        {designer.location}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        {designer.rating}
                        <span className="text-muted-foreground font-normal">({designer.reviews})</span>
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{designer.bio}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {designer.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-primary/30 text-primary rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rate + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Starting from</p>
                        <p className="text-xl font-bold font-display text-primary">
                          GHS {designer.rate.toLocaleString()}
                          <span className="text-sm font-normal text-muted-foreground"> /project</span>
                        </p>
                      </div>
                      <Button
                        data-testid={`button-hire-${designer.id}`}
                        onClick={openForm}
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
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl font-bold font-display text-primary mb-2">No results found</p>
              <p className="text-muted-foreground">Try a different skill or clear your search.</p>
            </div>
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
            onClick={openListSkillsForm}
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
    </div>
  );
}
