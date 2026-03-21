import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SearchBar } from "../ui/SearchBar";
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
          <Link href="/blog" className="hover:text-brand transition-colors">All Posts</Link>
          <Link href="/category/buying-guides" className="hover:text-brand transition-colors">Guides</Link>
          <Link href="/category/electric-vehicles" className="hover:text-brand transition-colors">Electric</Link>
          <Link href="/about" className="hover:text-brand transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
