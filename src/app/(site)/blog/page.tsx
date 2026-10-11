import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { FadeIn } from "@/components/animations/Reveal";
import { blogPosts } from "@/lib/data/blog";
import { blogHero } from "@/lib/data/content";

export const metadata = { title: "Blog | IBEX" };

export default function BlogPage() {
  return (
    <div>
      <PageHero banner={blogHero} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {blogPosts.map((post) => (
          <FadeIn key={post.id}>
            <article className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-6">
              <Link href={`/blog/${post.slug}`} className="relative aspect-4/3 sm:aspect-auto rounded-lg overflow-hidden block">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, 280px" className="object-cover" />
              </Link>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {new Date(post.date).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })} · By {post.author}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-ink mt-2 hover:text-brand-dark transition-colors">{post.title}</h2>
                </Link>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-brand-dark hover:underline">
                    Read More
                  </Link>
                  <span className="text-xs text-gray-400">{post.comments} Comments</span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
