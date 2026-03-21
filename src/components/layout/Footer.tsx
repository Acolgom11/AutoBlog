import Link from "next/link";
import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-brand" />
            <span className="font-bold text-xl tracking-tight">AutoBlog</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your ultimate source for objective reviews, automotive news, and comprehensive buying guides. 
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/category/reviews" className="hover:text-brand transition-colors">Car Reviews</Link></li>
            <li><Link href="/category/electric" className="hover:text-brand transition-colors">Electric Vehicles</Link></li>
            <li><Link href="/category/budget" className="hover:text-brand transition-colors">Budget Options</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-brand transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-brand transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-brand transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AutoBlog. All rights reserved.
      </div>
    </footer>
  );
}
