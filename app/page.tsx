import Link from "next/link"; // Next.js component for client-side navigation
import { Button } from "@/components/ui/button"; // shadcn UI button component

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <nav className="flex justify-end gap-4 p-4 border-b border-gray-200">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Better Auth Tutorial</h1>
          <p className="text-muted-foreground">
            Learn how to implement forgot password functionality
          </p>
        </div>
      </div>
    </div>
  );
}
