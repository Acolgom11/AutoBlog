import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { CalendarDays, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { getArticleBySlug, getArticleSlugs, getAllArticles, GenericResult, ArticleData } from "@/lib/mdx";
import { AdComponent } from "@/components/ads/AdComponent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Ad } from "@/components/mdx/Ad";
import dynamic from "next/dynamic";
import { RelatedPostsSkeleton } from "@/components/blog/RelatedPosts";

const RelatedPosts = dynamic(() => import("@/components/blog/RelatedPosts"), {
  loading: () => <RelatedPostsSkeleton />
});

export const revalidate = 3600; // ISR validation

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: "Not Found" };

  return {
    title: `${article.data.title} | AutoBlog`,
    description: article.data.description,
    openGraph: {
      title: article.data.title,
      description: article.data.description,
      images: [article.data.imageUrl],
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleResult: GenericResult<ArticleData> | null = getArticleBySlug(resolvedParams.slug);

  if (!articleResult) {
    notFound();
  }

  const { data, content, toc } = articleResult;

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.category === data.category && a.slug !== data.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: data.imageUrl,
    datePublished: new Date(data.date).toISOString(),
    author: {
      "@type": "Person",
      name: data.author,
    },
  };
  
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.autoblog.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": data.category,
        "item": `https://www.autoblog.com/categorias/${data.category.toLowerCase().replace(/ /g, "-")}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.title,
        "item": `https://www.autoblog.com/blog/${data.slug}`
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Breadcrumbs
        items={[
          { label: data.category, href: `/categorias/${data.category.toLowerCase().replace(" ", "-")}` },
          { label: data.title, href: `/blog/${data.slug}` },
        ]}
      />

      <AdComponent slotId="article-top-banner" className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1 max-w-3xl min-w-0">
          <header className="mb-8 space-y-4">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {data.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-foreground">{data.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={data.date}>{data.date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{data.readTime}</span>
              </div>
            </div>
          </header>

          <figure className="mb-10 w-full relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm">
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </figure>

          <div className="md:hidden">
            <TableOfContents items={toc} />
          </div>

          <div className="float-right ml-8 mb-4 hidden md:block max-w-xs w-full shrink-0">
             <TableOfContents items={toc} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand hover:prose-a:text-brand-hover prose-headings:scroll-mt-24 prose-table:w-full prose-table:min-w-full prose-th:bg-muted/50 prose-th:p-4 prose-td:p-4 prose-td:border-b prose-td:border-border">
             <MDXRemote 
                source={content} 
                components={{ Ad }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  }
                }}
             />
          </div>

          <AdComponent slotId="article-bottom" className="mt-16 mb-8" />

          <div className="mt-12 p-8 bg-card border border-border rounded-xl flex items-start gap-6 shadow-sm">
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">About {data.author}</h3>
              <p className="text-muted-foreground leading-relaxed">
                AutoBlog Editor is an automotive enthusiast with over 10 years of experience testing and reviewing the latest cars on the market. Focused on delivering objective, comprehensive analysis for every buyer.
              </p>
            </div>
          </div>
        </article>

        <Sidebar />
      </div>

      <RelatedPosts articles={relatedArticles} />
    </div>
  );
}
