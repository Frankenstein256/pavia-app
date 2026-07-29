import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMeQueryKey } from "@/api-client";

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

export default function Signup() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const signup = useSignup({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(getGetMeQueryKey(), data);
        navigate("/dashboard");
      },
      onError: (err) => {
        const message =
          (err.data as { error?: string } | null)?.error ??
          "Something went wrong. Please try again.";
        if (message.toLowerCase().includes("email")) {
          setErrors((e) => ({ ...e, email: message }));
        } else {
          setServerError(message);
        }
      },
    },
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.includes("@")) e.email = "Enter a valid email address.";
    if (!/^0[0-9]{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Ghanaian phone number (e.g. 0241234567).";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
    setServerError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    signup.mutate({
      data: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\s/g, ""),
        password: form.password,
      },
    });
  }

  const loading = signup.isPending;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel – branding */}
      <div className="hidden lg:flex w-[45%] bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, hsl(var(--secondary)) 0%, transparent 60%)" }} />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <PaviaLogo />
          <span className="font-display font-bold text-2xl text-secondary tracking-tight">Pavia</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold font-display text-secondary mb-4 leading-tight">
            Your financial home starts here.
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
            Join 50,000+ young Ghanaians building their future with Pavia.
          </p>
          <ul className="space-y-4">
            {[
              "Save toward any goal — rent, travel, emergency fund",
              "Finance your rent with monthly repayments",
              "Find skilled work and get paid instantly",
              "Free courses with certified diplomas",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-primary-foreground/30 text-sm relative z-10">© {new Date().getFullYear()} Pavia Financial Technologies</p>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <PaviaLogo />
          <span className="font-display font-bold text-2xl text-primary tracking-tight">Pavia</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-bold font-display text-primary mb-1">Create your account</h1>
          <p className="text-muted-foreground mb-8">Free forever. No credit card needed.</p>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-semibold text-primary mb-1.5 block">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Abena Mensah"
                value={form.fullName}
                onChange={handleChange}
                className={`h-12 rounded-xl border-border focus-visible:ring-primary ${errors.fullName ? "border-red-400" : ""}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-primary mb-1.5 block">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="abena@example.com"
                value={form.email}
                onChange={handleChange}
                className={`h-12 rounded-xl border-border focus-visible:ring-primary ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-primary mb-1.5 block">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0241 234 567"
                value={form.phone}
                onChange={handleChange}
                className={`h-12 rounded-xl border-border focus-visible:ring-primary ${errors.phone ? "border-red-400" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-primary mb-1.5 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={`h-12 rounded-xl border-border focus-visible:ring-primary pr-11 ${errors.password ? "border-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-primary mb-1.5 block">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`h-12 rounded-xl border-border focus-visible:ring-primary pr-11 ${errors.confirmPassword ? "border-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              data-testid="button-signup-submit"
              disabled={loading}
              className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full text-base h-12"
            >
              {loading ? "Creating your account…" : (
                <>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
              Log in
            </Link>
          </p>

          <p className="text-center text-muted-foreground/60 text-xs mt-6 leading-relaxed">
            By creating an account you agree to Pavia's{" "}
            <a href="#" className="underline hover:text-primary transition-colors">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
