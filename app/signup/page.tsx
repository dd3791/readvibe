"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        email,
        name,
        password,
      });
      if (result.error) {
        setError(result.error.message || "Signup failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during signup");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <Card
        className="
          relative w-full max-w-md
          border border-slate-200
          bg-white/80
          backdrop-blur-xl
          shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)]
          transition-all duration-300
          hover:scale-[1.01]
          py-4
        "
      >
        {/* Clean and small floating signup icon */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full
              shadow-md
              ring-1 ring-white
            "
            style={{
              background: "linear-gradient(135deg, #008CFF, #00B0FF)",
            }}
          >
            {/* Simple user icon */}
            <svg
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <CardHeader className="pt-12 text-center px-5">
          <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Sign Up
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-600">
            Create a new account to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 py-1">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label htmlFor="name" className="text-sm text-slate-700">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 h-9 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#008CFF] focus:ring-[#008CFF]/20"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 h-9 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#008CFF] focus:ring-[#008CFF]/20"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 h-9 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#008CFF] focus:ring-[#008CFF]/20"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm text-slate-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 h-9 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#008CFF] focus:ring-[#008CFF]/20"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-1 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-9 w-full text-white shadow-md transition hover:brightness-110 disabled:opacity-50"
              style={{
                background: "linear-gradient(to right, #008CFF, #00B0FF)",
                boxShadow: "0 4px 15px rgba(0, 140, 255, 0.35)",
              }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <div className="mt-3 space-y-1 text-center text-sm">
          <div className="text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "#008CFF" }}>
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
