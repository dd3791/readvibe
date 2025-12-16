"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { requestPasswordReset } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (result.error) {
        setError(result.error.message || "Failed to send reset email");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 sm:px-6">
      <Card
        className="
          relative w-full max-w-sm sm:max-w-md
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        <CardHeader className="pt-16 text-center px-5 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Reset Your Password
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-slate-600">
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 sm:px-6">
          {success ? (
            <div className="space-y-6">
              <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
                <AlertDescription>
                  <span className="font-semibold text-emerald-800">
                    Email sent successfully!
                  </span>{" "}
                  Password reset link has been sent to your email.
                </AlertDescription>
              </Alert>

              <Button
                asChild
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <Link href="/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
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

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
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
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative text-center text-sm text-slate-500">
                  <span className="bg-white px-2">or</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <Link href="/login">Back to Login</Link>
              </Button>

              <p className="pt-4 text-center text-sm text-slate-500">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="font-medium"
                  style={{ color: "#008CFF" }}
                >
                  Contact Support
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
