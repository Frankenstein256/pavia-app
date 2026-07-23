import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin, getGetMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

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

export default function Login() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const login = useLogin({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData(getGetMeQueryKey(), data);
        navigate("/dashboard");
      },
      onError: (err) => {
        const message =
          (err.data as { error?: string } | null)?.error ??
          "Invalid email or password.";
        setServerError(message);
      },
    },
  });

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
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
    login.mutate({ data: { email: form.email.trim(), password: form.password } });
  }

  const loading = login.isPending;

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
            Welcome back.
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Log in to check your savings goals, manage your rent finance, explore jobs, and continue your courses — all in one place.
          </p>
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
          <h1 className="text-3xl font-bold font-display text-primary mb-1">Log in to Pavia</h1>
          <p className="text-muted-foreground mb-8">Good to have you back.</p>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-primary">Password</Label>
                <a href="#" className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
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

            <Button
              type="submit"
              data-testid="button-login-submit"
              disabled={loading}
              className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full text-base h-12"
            >
              {loading ? "Logging in…" : (
                <>Log In <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:text-secondary transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}    <p className="text-primary-foreground/30 text-sm relative z-10">© {new Date().getFullYear()} Pavia Financial Technologies</p>
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
          <h1 className="text-3xl font-bold font-display text-primary mb-1">Log in to Pavia</h1>
          <p className="text-muted-foreground mb-8">Good to have you back.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-primary">Password</Label>
                <a href="#" className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
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

            <Button
              type="submit"
              data-testid="button-login-submit"
              disabled={loading}
              className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold rounded-full text-base h-12"
            >
              {loading ? "Logging in…" : (
                <>Log In <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:text-secondary transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
