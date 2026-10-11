import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { blogPosts, getPostBySlug } from "@/lib/data/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <Breadcrumb title={post.title} trail={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {new Date(post.date).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })} · By {post.author} · {post.comments} Comments
        </p>
        <h1 className="text-3xl font-bold text-ink mt-3">{post.title}</h1>
        <p className="text-gray-600 leading-relaxed mt-6 whitespace-pre-line">{post.content}</p>
      </article>
    </div>
  );
}
