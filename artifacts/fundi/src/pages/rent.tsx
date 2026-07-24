import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Search, MapPin, BedDouble, Bath, CalendarDays, ArrowRight,
  X, Phone, Mail, Loader2, CheckCircle2, AlertCircle, SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useListProperties, useCreateProperty } from "@workspace/api-client-react";
import type { Property } from "@workspace/api-client-react";

const LOCATIONS = ["All", "Accra", "Kumasi", "Tema", "Takoradi", "Tamale", "Cape Coast"];
const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4+"];
const PRICE_RANGES = [
  { label: "Any price", min: undefined, max: undefined },
  { label: "Under GHS 1,500", min: undefined, max: 1499 },
  { label: "GHS 1,500 – 2,500", min: 1500, max: 2500 },
  { label: "GHS 2,500 – 4,000", min: 2501, max: 4000 },
  { label: "GHS 4,000+", min: 4001, max: undefined },
];

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 90 } },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GH", { day: "numeric", month: "short", year: "numeric" });
}

/* ─── Book Viewing Modal ─────────────────────────────────────────────── */
function BookViewingModal({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!property} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        {property && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-primary">
                Book a Viewing
              </DialogTitle>
              <DialogDescription>
                Contact the landlord directly to arrange a time to visit.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {property.photoUrl && (
                <img
                  src={property.photoUrl}
                  alt={property.title}
                  className="w-full h-36 object-cover rounded-2xl"
                />
              )}
              <div>
                <p className="font-bold font-display text-primary text-lg leading-tight">
                  {property.title}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {property.location}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 bg-muted/40 rounded-2xl p-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Rent/mo</p>
                  <p className="font-bold text-primary text-sm">GHS {property.monthlyRentGhs.toLocaleString()}</p>
                </div>
                <div className="text-center border-x border-border">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Beds</p>
                  <p className="font-bold text-primary text-sm">{property.bedrooms}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Baths</p>
                  <p className="font-bold text-primary text-sm">{property.bathrooms}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Landlord</p>
                <p className="font-semibold text-primary">{property.landlordName}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${property.landlordContact}`}
                  className="flex items-center justify-center gap-2 bg-primary text-secondary font-bold rounded-2xl py-3 hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={`mailto:${property.landlordContact}`}
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold rounded-2xl py-3 hover:bg-primary/5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
              <p className="text-xs text-muted-foreground text-center pb-1">
                Contact: {property.landlordContact}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─── List Property Modal ────────────────────────────────────────────── */
const INITIAL_PROP_FORM = {
  title: "",
  description: "",
  location: "",
  monthlyRentGhs: "",
  bedrooms: "",
  bathrooms: "",
  amenities: "",
  landlordName: "",
  landlordContact: "",
  photoUrl: "",
  availableDate: "",
};

function ListPropertyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState(INITIAL_PROP_FORM);
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateProperty();

  function handleClose() {
    if (!mutation.isPending) {
      onClose();
      setTimeout(() => {
        setForm(INITIAL_PROP_FORM);
        setSubmitted(false);
        mutation.reset();
      }, 300);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const monthlyRentGhs = parseInt(form.monthlyRentGhs, 10);
    const bedrooms = parseInt(form.bedrooms, 10);
    const bathrooms = parseInt(form.bathrooms, 10);
    if (isNaN(monthlyRentGhs) || isNaN(bedrooms) || isNaN(bathrooms)) return;

    await mutation.mutateAsync({
      data: {
        title: form.title,
        description: form.description,
        location: form.location,
        monthlyRentGhs,
        bedrooms,
        bathrooms,
        amenities: form.amenities,
        landlordName: form.landlordName,
        landlordContact: form.landlordContact,
        photoUrl: form.photoUrl || undefined,
        availableDate: form.availableDate,
      },
    });
    setSubmitted(true);
  }

  function f(
    id: keyof typeof INITIAL_PROP_FORM,
    label: string,
    placeholder: string,
    type = "text",
    required = true,
  ) {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={id} className="font-semibold text-sm text-primary">
          {label}{!required && <span className="text-muted-foreground font-normal"> (optional)</span>}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) => setForm((prev) => ({ ...prev, [id]: e.target.value }))}
          required={required}
          disabled={mutation.isPending}
          className="rounded-xl border-border focus:border-primary"
        />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">List Your Property</DialogTitle>
          <DialogDescription>
            Add your rental listing to the Pavia marketplace. Tenants can find and contact you directly.
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
              <h3 className="font-display text-xl font-bold text-primary">Your property is listed!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your listing is now live on the marketplace. Interested tenants will contact you directly.
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
              {f("title", "Property Title", "e.g. 2-Bedroom Apartment in East Legon")}

              <div className="space-y-1.5">
                <Label htmlFor="description" className="font-semibold text-sm text-primary">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the property — features, nearby landmarks, condition…"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  required
                  rows={3}
                  disabled={mutation.isPending}
                  className="rounded-xl border-border focus:border-primary resize-none"
                />
              </div>

              {f("location", "Location", "e.g. East Legon, Accra")}

              <div className="space-y-1.5">
                <Label htmlFor="monthlyRentGhs" className="font-semibold text-sm text-primary">
                  Monthly Rent (GHS)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">GHS</span>
                  <Input
                    id="monthlyRentGhs"
                    type="number"
                    min={1}
                    placeholder="2500"
                    value={form.monthlyRentGhs}
                    onChange={(e) => setForm((p) => ({ ...p, monthlyRentGhs: e.target.value }))}
                    required
                    disabled={mutation.isPending}
                    className="pl-12 rounded-xl border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bedrooms" className="font-semibold text-sm text-primary">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min={0}
                    placeholder="2"
                    value={form.bedrooms}
                    onChange={(e) => setForm((p) => ({ ...p, bedrooms: e.target.value }))}
                    required
                    disabled={mutation.isPending}
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bathrooms" className="font-semibold text-sm text-primary">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min={1}
                    placeholder="1"
                    value={form.bathrooms}
                    onChange={(e) => setForm((p) => ({ ...p, bathrooms: e.target.value }))}
                    required
                    disabled={mutation.isPending}
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="amenities" className="font-semibold text-sm text-primary">
                  Amenities <span className="text-muted-foreground font-normal">(comma-separated)</span>
                </Label>
                <Input
                  id="amenities"
                  placeholder="e.g. WiFi, Parking, Security, Generator"
                  value={form.amenities}
                  onChange={(e) => setForm((p) => ({ ...p, amenities: e.target.value }))}
                  disabled={mutation.isPending}
                  className="rounded-xl border-border focus:border-primary"
                />
              </div>

              {f("landlordName", "Your Name", "e.g. Kwame Boateng")}
              {f("landlordContact", "Your Phone / Email", "0244123456 or you@example.com")}
              {f("photoUrl", "Property Photo URL", "https://example.com/photo.jpg", "text", false)}

              <div className="space-y-1.5">
                <Label htmlFor="availableDate" className="font-semibold text-sm text-primary">Available From</Label>
                <Input
                  id="availableDate"
                  type="date"
                  value={form.availableDate}
                  onChange={(e) => setForm((p) => ({ ...p, availableDate: e.target.value }))}
                  required
                  disabled={mutation.isPending}
                  className="rounded-xl border-border focus:border-primary"
                />
              </div>

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
                    "List Property"
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
export default function Rent() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [bedroomsFilter, setBedroomsFilter] = useState("Any");
  const [priceRange, setPriceRange] = useState(0); // index into PRICE_RANGES
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookProperty, setBookProperty] = useState<Property | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [search]);

  const selectedPrice = PRICE_RANGES[priceRange];
  const queryParams = {
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(locationFilter !== "All" ? { location: locationFilter } : {}),
    ...(selectedPrice.min !== undefined ? { minPrice: selectedPrice.min } : {}),
    ...(selectedPrice.max !== undefined ? { maxPrice: selectedPrice.max } : {}),
    ...(bedroomsFilter !== "Any"
      ? { bedrooms: bedroomsFilter === "4+" ? 4 : parseInt(bedroomsFilter) }
      : {}),
  };

  const { data, isLoading, isError, refetch } = useListProperties(queryParams);
  const properties = data?.properties ?? [];

  const hasActiveFilters =
    locationFilter !== "All" || bedroomsFilter !== "Any" || priceRange !== 0;

  function clearFilters() {
    setLocationFilter("All");
    setBedroomsFilter("Any");
    setPriceRange(0);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
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
          <div className="flex items-center gap-3">
            <Link href="/login" className="font-semibold text-primary hover:text-secondary transition-colors hidden md:block text-sm">Log In</Link>
            <Button
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
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 -translate-y-1/4" />
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Ghana's Rental Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
              Find Your Home.<br />
              <span className="text-secondary">Pay Monthly.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Browse verified rental listings across Ghana. Connect directly with landlords, pay in GHS, and move in on your terms.
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
              placeholder="Search by property name, location, or landlord…"
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

      {/* Listings */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border transition-all ${
                filtersOpen || hasActiveFilters
                  ? "bg-primary text-secondary border-primary shadow-md"
                  : "bg-card border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 bg-secondary text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {[locationFilter !== "All", bedroomsFilter !== "Any", priceRange !== 0].filter(Boolean).length}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}

            <Button
              onClick={() => setListOpen(true)}
              className="ml-auto bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
            >
              List Your Property
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-3 gap-4 bg-card border border-border rounded-2xl p-5 mb-8">
                  {/* Location */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</p>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setLocationFilter(loc)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            locationFilter === loc
                              ? "bg-primary text-secondary"
                              : "bg-background border border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price / month</p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => setPriceRange(i)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            priceRange === i
                              ? "bg-primary text-secondary"
                              : "bg-background border border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bedrooms</p>
                    <div className="flex flex-wrap gap-2">
                      {BEDROOM_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setBedroomsFilter(opt)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            bedroomsFilter === opt
                              ? "bg-primary text-secondary"
                              : "bg-background border border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          {opt === "Any" ? "Any" : `${opt} bed${opt !== "1" ? "s" : ""}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Count */}
          <p className="text-sm text-muted-foreground mb-8 font-medium">
            {isLoading
              ? "Loading listings…"
              : `${properties.length} propert${properties.length !== 1 ? "ies" : "y"} found`}
          </p>

          {/* Error */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-primary mb-2">Couldn't load listings</p>
              <p className="text-muted-foreground mb-6">Check your connection and try again.</p>
              <Button onClick={() => refetch()} variant="outline" className="rounded-full">Retry</Button>
            </div>
          )}

          {/* Skeleton */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-[1.75rem] border border-border overflow-hidden animate-pulse">
                  <div className="h-52 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && properties.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl font-bold font-display text-primary mb-2">No listings found</p>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or clearing your search.</p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" className="rounded-full">
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Cards */}
          {!isLoading && !isError && properties.length > 0 && (
            <motion.div
              key={JSON.stringify(queryParams)}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={cardVariants}
                  className="bg-card rounded-[1.75rem] border border-border overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden shrink-0">
                    <img
                      src={property.photoUrl ?? FALLBACK_PHOTO}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-primary text-secondary font-bold text-sm px-3 py-1 rounded-full">
                        GHS {property.monthlyRentGhs.toLocaleString()}<span className="font-normal text-xs">/mo</span>
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold font-display text-primary text-lg leading-tight mb-1">
                      {property.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 text-secondary shrink-0" />
                      {property.location}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-sm font-semibold text-primary mb-3">
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-secondary" />
                        {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                      </span>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-secondary" />
                        {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Amenities */}
                    {property.amenities && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {property.amenities.split(",").slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="text-xs px-2.5 py-1 rounded-full bg-secondary/15 text-primary font-medium"
                          >
                            {a.trim()}
                          </span>
                        ))}
                        {property.amenities.split(",").length > 3 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                            +{property.amenities.split(",").length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Landlord</p>
                        <p className="text-sm font-semibold text-primary">{property.landlordName}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <CalendarDays className="w-3.5 h-3.5 text-secondary" />
                          Available {formatDate(property.availableDate)}
                        </p>
                      </div>
                      <Button
                        onClick={() => setBookProperty(property)}
                        className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-5 shrink-0"
                      >
                        Book Viewing
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
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <div className="container mx-auto max-w-4xl text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-4">Have a property to let?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            List your rental on the Pavia marketplace and reach thousands of verified tenants across Ghana — for free.
          </p>
          <Button
            size="lg"
            onClick={() => setListOpen(true)}
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold rounded-full h-14 px-10 text-lg"
          >
            List Your Property
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
      <BookViewingModal property={bookProperty} onClose={() => setBookProperty(null)} />
      <ListPropertyModal open={listOpen} onClose={() => setListOpen(false)} />
    </div>
  );
}
