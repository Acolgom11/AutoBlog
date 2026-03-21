import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllArticles, getCategories } from "@/lib/mdx";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categories = getCategories();
  const category = categories.find((c) => c.slug === resolvedParams.slug);
  
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | AutoBlog`,
    description: `Browse all articles related to ${category.name}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categories = getCategories();
  const category = categories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const allArticles = getAllArticles();
  const articles = allArticles.filter((a) => a.category === category.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "#" },
          { label: category.name, href: `/category/${category.slug}` },
        ]}
      />

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
             {articles.map((article) => (
               <ArticleCard key={article.slug} {...article} />
             ))}
          </div>
          {articles.length === 0 && (
            <div className="py-12 text-center text-muted-foreground border border-dashed rounded-xl">
              No articles found in this category yet.
            </div>
          )}
        </main>

        <Sidebar />
      </div>

      <AdComponent slotId="category-bottom-banner" className="mt-16" />
    </div>
  );
}
