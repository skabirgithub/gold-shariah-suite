import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, KeyRound, User, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { setSession } from "@/lib/session";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In — SJIBL Corporate Transaction Banking" },
      { name: "description", content: "Secure sign-in to Shahjalal Islami Bank PLC corporate banking portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"credentials" | "otp">("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  function submitCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage("otp");
      toast.success("OTP sent to your registered device", { description: "Use 123456 for demo" });
    }, 700);
  }

  function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSession({
        username,
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
        role: "Approver",
        entity: "Acme Trading Ltd.",
        loggedInAt: Date.now(),
      });
      navigate({ to: "/app" });
    }, 600);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex relative navy-gradient text-navy-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 70%, var(--gold) 0, transparent 35%)" }} />
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg gold-gradient grid place-items-center text-navy font-display font-bold text-xl">S</div>
            <div>
              <div className="font-display text-xl leading-tight">Shahjalal Islami Bank</div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold">PLC</div>
            </div>
          </div>
        </div>
        <div className="relative space-y-6 max-w-md">
          <h1 className="font-display text-4xl leading-tight">Corporate Transaction Banking, the Shariah way.</h1>
          <p className="text-sm/relaxed text-navy-foreground/80">
            A unified portal for payments, trade finance, liquidity and collections —
            built for corporate treasurers, with Maker–Checker–Approver controls and bank-grade security.
          </p>
          <div className="flex items-center gap-2 text-xs text-navy-foreground/70">
            <Shield className="w-4 h-4 text-gold" />
            ISO 27001 · PCI-DSS aligned · End-to-end encryption
          </div>
        </div>
        <div className="relative text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} Shahjalal Islami Bank PLC · All rights reserved
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md p-8 shadow-xl border-border/60">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gold-gradient grid place-items-center text-navy font-display font-bold">S</div>
            <div className="font-display text-lg">SJIBL CTB Portal</div>
          </div>

          {stage === "credentials" ? (
            <form onSubmit={submitCredentials} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl">Sign in</h2>
                <p className="text-sm text-muted-foreground mt-1">Access your corporate banking portal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Corporate username</Label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                         placeholder="e.g. acme.treasurer" className="pl-9" autoComplete="username" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-navy hover:text-gold" onClick={() => toast.info("Recovery flow — demo placeholder")}>Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                         placeholder="••••••••" className="pl-9" autoComplete="current-password" />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-navy text-navy-foreground hover:bg-navy/90">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button type="button" className="hover:text-navy" onClick={() => toast.info("Demo flow")}>Forgot username</button>
                <button type="button" className="hover:text-navy" onClick={() => toast.info("Demo flow")}>Forgot both</button>
              </div>

              <div className="rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">Demo:</strong> any username/password works. OTP is <code className="font-mono">123456</code>.
              </div>
            </form>
          ) : (
            <form onSubmit={submitOtp} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl">Two-factor authentication</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code sent to your device</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">One-time password</Label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="otp" inputMode="numeric" maxLength={6} value={otp}
                         onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                         placeholder="123456" className="pl-9 tracking-[0.5em] font-mono text-center" />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-navy text-navy-foreground hover:bg-navy/90">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & sign in"}
              </Button>

              <button type="button" onClick={() => setStage("credentials")} className="text-xs text-muted-foreground hover:text-navy block mx-auto">
                ← Back to sign in
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
