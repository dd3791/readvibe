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
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        setError(result.error.message || "Signin failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during signin");
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
        "
      >
        {/* Floating icon */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              shadow-xl
              ring-1 ring-white
            "
            style={{
              background: "linear-gradient(to bottom right, #008CFF, #008CFF)",
              boxShadow: "0 0 20px rgba(0, 140, 255, 0.35)",
            }}
          >
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <CardHeader className="pt-16 text-center px-5">
          <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-slate-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="
                  mt-2 h-11
                  border-slate-300
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#008CFF]
                  focus:ring-[#008CFF]/20
                "
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
                className="
                  mt-2 h-11
                  border-slate-300
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-[#008CFF]
                  focus:ring-[#008CFF]/20
                "
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="
                h-11 w-full
                text-white
                shadow-md
                transition
                hover:brightness-110
                disabled:opacity-50
              "
              style={{
                background: "linear-gradient(to right, #008CFF, #008CFF)",
                boxShadow: "0 4px 15px rgba(0, 140, 255, 0.35)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <div className="mt-6 space-y-2 text-center text-sm">
          <Link
            href="/forgot-password"
            className="font-medium hover:underline"
            style={{ color: "#008CFF" }}
          >
            Forgot your password?
          </Link>
          <div className="text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium hover:underline"
              style={{ color: "#008CFF" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
