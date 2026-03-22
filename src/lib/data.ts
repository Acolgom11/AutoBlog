export interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export const mockArticles: Article[] = [
  {
    title: "Best cars under $10,000 in 2026",
    excerpt: "Finding a reliable used car under $10,000 is getting harder, but these 5 models offer the best value for your money right now.",
    category: "Budget Options",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1503376710356-70d6943486df?q=80&w=800&auto=format&fit=crop",
    slug: "best-cars-under-10000"
  },
  {
    title: "Electric cars vs gasoline: full comparison",
    excerpt: "Should you make the switch to electric? We break down the total cost of ownership, driving dynamics, and charging infrastructure.",
    category: "Electric Vehicles",
    date: "Mar 10, 2026",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
    slug: "electric-vs-gasoline"
  },
  {
    title: "Top fuel-efficient cars for beginners",
    excerpt: "If you're a new driver looking to save money at the pump, these compact fuel-sippers are the perfect starting point.",
    category: "Buying Guides",
    date: "Mar 05, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    slug: "fuel-efficient-beginner-cars"
  },
  {
    title: "The 2026 Porsche 911 GT3 RS Review",
    excerpt: "We took the new GT3 RS to the track to see if it still holds the crown for the ultimate driver's car.",
    category: "Car Reviews",
    date: "Feb 28, 2026",
    readTime: "15 min read",
    imageUrl: "https://images.unsplash.com/photo-1503376710356-70d6943486df?q=80&w=800&auto=format&fit=crop",
    slug: "porsche-911-gt3-rs-review"
  }
];

export const mockCategories = [
  { name: "Car Reviews", slug: "reviews", icon: "steering-wheel" },
  { name: "Electric Vehicles", slug: "electric", icon: "battery-charging" },
  { name: "Budget Options", slug: "budget", icon: "piggy-bank" },
  { name: "Buying Guides", slug: "guides", icon: "book-open" },
];
