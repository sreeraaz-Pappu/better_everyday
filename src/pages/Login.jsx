import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import GlassCard from "../components/ui/GlassCard";
import { Label, Input, PrimaryButton } from "../components/ui/Field";

const LOGIN_NAME = "Niharika";
const LOGIN_EMAIL = import.meta.env.VITE_APP_LOGIN_EMAIL;

export default function Login() {
  const { session, signIn } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (name.trim().toLowerCase() !== LOGIN_NAME.toLowerCase()) {
      setError("Invalid name or password");
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(LOGIN_EMAIL, password);
    setSubmitting(false);
    if (error) setError("Invalid name or password");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-sm flex flex-col gap-5" hover={false}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-2)] flex items-center justify-center p-2">
            <img src="/favicon.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-display text-xl font-semibold text-ink">Better Everyday</h1>
          <p className="text-sm text-ink-50">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              autoComplete="username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  );
}
