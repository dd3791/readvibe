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
import { resetPassword } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing reset token");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

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

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        setError(result.error.message || "Failed to reset password");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!token && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
                d="M12 15v2m0-10v4m7 1a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <CardHeader className="pt-16 text-center px-5">
          <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Reset Password
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-slate-600">
            Enter your new password
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="password" className="text-sm text-slate-700">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!token}
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
              <Label
                htmlFor="confirmPassword"
                className="text-sm text-slate-700"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={!token}
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
              disabled={loading || !token}
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
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Link href="/login">Back to Login</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
