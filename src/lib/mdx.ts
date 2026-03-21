import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'articles');

export interface ArticleData {
  title: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  author: string;
  imageUrl: string;
  readTime: string;
  slug: string;
}

export interface ArticleResult {
  data: ArticleData;
  content: string;
  toc: TOCItem[];
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function ensureDirectoryExists() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

export function generateSlugId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function extractTOC(content: string): TOCItem[] {
  const headingsRegex = /^(#{2,3})\s+(.*)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingsRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlugId(text);
    toc.push({ id, text, level });
  }

  return toc;
}

export function getArticleSlugs(): string[] {
  ensureDirectoryExists();
  const files = fs.readdirSync(contentDirectory);
  return files.filter(file => file.endsWith('.mdx')).map(file => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): ArticleResult | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    const toc = extractTOC(content);

    return {
      data: { ...data, slug: realSlug } as ArticleData,
      content,
      toc
    };
  } catch (e) {
    return null;
  }
}

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is ArticleResult => article !== null)
    .map(article => article.data)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  return articles;
}

export function getCategories() {
  const articles = getAllArticles();
  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    slug: generateSlugId(name),
    count
  }));
}
