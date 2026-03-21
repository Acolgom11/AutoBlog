import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Car } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-brand" />
          <span className="font-bold text-xl tracking-tight">AutoBlog</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/category/reviews" className="hover:text-brand transition-colors">Reviews</Link>
          <Link href="/category/electric" className="hover:text-brand transition-colors">Electric</Link>
          <Link href="/category/budget" className="hover:text-brand transition-colors">Budget</Link>
          <Link href="/about" className="hover:text-brand transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile menu toggle could go here */}
        </div>
      </div>
    </header>
  );
}
