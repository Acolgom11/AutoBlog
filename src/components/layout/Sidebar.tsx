import { AdComponent } from "../ads/AdComponent";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Sidebar() {
  const categories = [
    { name: "Car Reviews", count: 24, href: "/category/reviews" },
    { name: "Electric Vehicles", count: 18, href: "/category/electric" },
    { name: "Budget Options", count: 12, href: "/category/budget" },
    { name: "Buying Guides", count: 9, href: "/category/guides" },
  ];

  return (
    <aside className="space-y-8 lg:w-80 flex-shrink-0 w-full hidden md:block">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
             <li key={category.name}>
                <Link href={category.href} className="group flex items-center justify-between py-1 transition-colors">
                  <span className="text-muted-foreground group-hover:text-brand font-medium">{category.name}</span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-0.5 rounded-full mr-2 group-hover:bg-brand/10 group-hover:text-brand transition-colors">{category.count}</span>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </span>
                </Link>
             </li>
          ))}
        </ul>
      </div>

      <div className="sticky top-24">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-center">Sponsored</h3>
          <AdComponent slotId="sidebar-1" className="!my-0 w-full" />
        </div>
      </div>
    </aside>
  );
}
