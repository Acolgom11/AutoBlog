import { notFound } from "next/navigation";
import { Metadata } from "next";
import { mockArticles, mockCategories } from "@/lib/data";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdComponent } from "@/components/ads/AdComponent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const category = mockCategories.find((c) => c.slug === resolvedParams.slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | AutoBlog`,
    description: `Browse all articles related to ${category.name}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = mockCategories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const articles = mockArticles.filter((a) => a.category === category.name);
  const displayArticles = articles.length > 0 ? articles : mockArticles;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Ad */}
      <AdComponent slotId="category-top-banner" className="mb-10" />

      <header className="mb-12 border-b border-border pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{category.name}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore our latest automotive reviews, buying guides, and breaking news related to {category.name.toLowerCase()}.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {displayArticles.map((article) => (
               <ArticleCard key={article.slug} {...article} />
             ))}
          </div>
          
          <div className="mt-16 flex justify-center items-center gap-2">
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-4 py-2 bg-brand text-white rounded-md text-sm font-medium shadow-sm">1</span>
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors bg-card">
              2
            </button>
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors bg-card">
              3
            </button>
            <span className="px-2">...</span>
            <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors bg-card">
              Next
            </button>
          </div>
        </main>

        <Sidebar />
      </div>

      <AdComponent slotId="category-bottom-banner" className="mt-16" />
    </div>
  );
}
