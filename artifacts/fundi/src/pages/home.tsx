import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Wallet, 
  Home as HomeIcon, 
  Briefcase, 
  BookOpen, 
  ShieldCheck, 
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfTWUNdmslspAxFN5p-olxLxdcLgOWBIcaRv208FDqrErRCtA/viewform";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

function openForm() {
  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-secondary selection:text-primary">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-secondary font-bold text-xl">F</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary">Fundi</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#save" className="hover:text-secondary transition-colors">Save</a>
            <a href="#rent" className="hover:text-secondary transition-colors">Rent</a>
            <Link href="/work" className="hover:text-secondary transition-colors">Work</Link>
            <a href="#learn" className="hover:text-secondary transition-colors">Learn</a>
          </div>
          <Button
            data-testid="button-join-waitlist-nav"
            onClick={openForm}
            className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full px-6"
          >
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-2xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-primary font-semibold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Now inviting early access in Accra
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-primary mb-6">
                Your financial <br />
                <span className="text-secondary">co-pilot</span> for the future.
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Built for ambitious young Ghanaians. Save with purpose, finance your rent, find high-paying skills, and master your money—all in one place.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button
                  data-testid="button-join-waitlist-hero"
                  size="lg"
                  onClick={openForm}
                  className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-14 px-8 text-lg w-full sm:w-auto"
                >
                  Join the Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/5 w-full sm:w-auto">
                  See how it works
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  <strong className="text-primary block text-lg">Be the first to know</strong>
                  Launching soon in Ghana
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative z-10 rounded-[2.5rem] border-[8px] border-primary shadow-2xl overflow-hidden bg-white mx-auto w-[320px] aspect-[9/19] flex items-center justify-center">
                <img src="/app-mockup.png" alt="Fundi App Mockup" className="w-full h-full object-cover" />
              </div>
              
              <div className="absolute top-20 -left-16 bg-white p-4 rounded-2xl shadow-xl border border-border z-20 animate-[bounce_6s_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-secondary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Rent Target</p>
                    <p className="text-primary font-bold">GHS 1,500 <span className="text-secondary">hit</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">Everything you need to build.<br/>Nothing you don't.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We ripped apart the traditional banking model and rebuilt it for the reality of young Ghanaians.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-card p-10 rounded-[2rem] border border-border shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Wallet className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-primary mb-4" id="save">Save with Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create multiple stashes for your goals. Earn up to 12% interest annually. Lock your savings to stay disciplined or keep them flexible. Your money, your rules.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-primary p-10 rounded-[2rem] border border-primary shadow-lg group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <HomeIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-secondary mb-4" id="rent">Rent Finance</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Tired of the 2-year rent advance system? We pay your landlord upfront, and you pay us back monthly. Access quality housing without breaking the bank.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-card p-10 rounded-[2rem] border border-border shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-primary mb-4" id="work">Find Skilled Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with vetted gigs and remote opportunities. Get paid directly into your Fundi wallet with zero hidden fees. Built for freelancers and creators.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-card p-10 rounded-[2rem] border border-border shadow-sm group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display text-primary mb-4" id="learn">Master Your Money</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bite-sized, actionable financial education. Learn how to invest, negotiate, and build wealth from experts who understand the Ghanaian economy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Break / Story Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <img src="/texture.png" alt="Texture" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay -z-10" />
        
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-secondary mb-6">Designed for the reality of Accra.</h2>
              <p className="text-primary-foreground/80 text-xl leading-relaxed mb-8">
                We didn't just copy a western app. We built Fundi from the ground up for the hustle, the ambition, and the unique challenges of building a life in Ghana right now.
              </p>
              <ul className="space-y-4 text-primary-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">Bank-grade security & encryption</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">Instant Momo integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">Zero maintenance fees</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-4 border-secondary/30 shadow-2xl">
                <img src="/professionals.png" alt="Young Ghanaian Professionals" className="w-full h-auto object-cover aspect-[4/3]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-display text-primary mb-8">Take control of<br/>your tomorrow.</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join young Ghanaians who are building wealth and securing their futures with Fundi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              data-testid="button-join-waitlist-cta"
              size="lg"
              onClick={openForm}
              className="bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full h-16 px-10 text-xl w-full sm:w-auto"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 border-t border-primary/20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">F</span>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-secondary">Fundi</span>
              </div>
              <p className="text-primary-foreground/60 max-w-sm">
                The financial co-pilot for a new generation of young Ghanaians.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-secondary mb-4">Product</h4>
              <ul className="space-y-3 text-primary-foreground/60">
                <li><a href="#" className="hover:text-secondary transition-colors">Save</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Rent Finance</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Find Work</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Learn</a></li>
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
            <p>© {new Date().getFullYear()} Fundi Financial Technologies. All rights reserved.</p>
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
