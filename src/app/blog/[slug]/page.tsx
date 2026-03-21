import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { CalendarDays, Clock, User } from "lucide-react";
import { mockArticles } from "@/lib/data";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticleCard } from "@/components/ui/ArticleCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = mockArticles.find((a) => a.slug === resolvedParams.slug);
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.title} | AutoBlog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = mockArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = mockArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.imageUrl,
    datePublished: new Date(article.date).toISOString(),
    author: {
      "@type": "Person",
      name: "AutoBlog Editor",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD Schema Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: article.category, href: `/category/${article.category.toLowerCase().replace(" ", "-")}` },
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />

      {/* Top Ad */}
      <AdComponent slotId="article-top-banner" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1 max-w-3xl min-w-0">
          <header className="mb-8 space-y-4">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">AutoBlog Editor</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          <figure className="mb-10 w-full relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </figure>

          {/* Table of Contents */}
          <div className="bg-muted/30 border border-border rounded-xl p-6 mb-10 w-full max-w-sm shrink-0 shadow-sm float-right ml-8 mb-4 hidden md:block">
            <h2 className="font-bold text-lg mb-4">Table of Contents</h2>
            <ul className="space-y-3 text-sm">
              <li><a href="#introduction" className="text-brand hover:underline font-medium">1. Introduction</a></li>
              <li><a href="#key-features" className="text-muted-foreground hover:text-brand transition-colors">2. Key Features</a></li>
              <li><a href="#performance" className="text-muted-foreground hover:text-brand transition-colors">3. Performance</a></li>
              <li><a href="#verdict" className="text-muted-foreground hover:text-brand transition-colors">4. Final Verdict</a></li>
            </ul>
          </div>

          <div className="md:hidden bg-muted/30 border border-border rounded-xl p-6 mb-10 w-full shadow-sm">
             <h2 className="font-bold text-lg mb-4">Table of Contents</h2>
            <ul className="space-y-3 text-sm">
               <li><a href="#introduction" className="text-brand hover:underline font-medium">1. Introduction</a></li>
              <li><a href="#key-features" className="text-muted-foreground hover:text-brand transition-colors">2. Key Features</a></li>
              <li><a href="#performance" className="text-muted-foreground hover:text-brand transition-colors">3. Performance</a></li>
              <li><a href="#verdict" className="text-muted-foreground hover:text-brand transition-colors">4. Final Verdict</a></li>
            </ul>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand hover:prose-a:text-brand-hover">
            <h2 id="introduction" className="scroll-mt-24 mt-0">Introduction</h2>
            <p className="lead text-xl text-muted-foreground mb-6">
              Modern engineering has brought us to a crossroads where utility, performance, and efficiency meet. In this comprehensive review, we dive deep into what makes this vehicle stand out in a crowded market.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* In-Article Ad */}
            <AdComponent slotId="article-middle" className="my-10" />

            <h2 id="key-features" className="scroll-mt-24">Key Features</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ul>
              <li>High performance twin-turbo engine</li>
              <li>Advanced driver-assistance systems (ADAS)</li>
              <li>Premium interior with sustainable materials</li>
              <li>State-of-the-art panoramic infotainment display</li>
            </ul>

            <h3 id="performance" className="scroll-mt-24 text-2xl mt-8 mb-4 font-semibold">Performance & Handling</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <h2 id="verdict" className="scroll-mt-24">Final Verdict</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. Check our ratings below.
            </p>
          </div>

          {/* Bottom Ad */}
          <AdComponent slotId="article-bottom" className="mt-16 mb-8" />

          {/* Author Section */}
          <div className="mt-12 p-8 bg-card border border-border rounded-xl flex items-start gap-6 shadow-sm">
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">About the Author</h3>
              <p className="text-muted-foreground leading-relaxed">
                AutoBlog Editor is an automotive enthusiast with over 10 years of experience testing and reviewing the latest cars on the market. Focused on delivering objective, comprehensive analysis for every buyer.
              </p>
            </div>
          </div>
        </article>

        <Sidebar />
      </div>

      <div className="mt-20 pt-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
          <span className="bg-brand w-2 h-8 rounded-full inline-block"></span>
          Related Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((relArticle) => (
             <ArticleCard key={relArticle.slug} {...relArticle} />
          ))}
        </div>
      </div>
    </div>
  );
}
