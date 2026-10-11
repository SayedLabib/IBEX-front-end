import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { FadeIn } from "@/components/animations/Reveal";
import { aboutHero } from "@/lib/data/content";

const stats = [
  { label: "Happy Customers", value: "42K+" },
  { label: "Products Listed", value: "1,200+" },
  { label: "Countries Served", value: "18" },
  { label: "Years in Business", value: "7" },
];

const values: { title: string; desc: string; icon: "shield-check" | "medal" | "truck" }[] = [
  { title: "Quality First", desc: "Every product is vetted for durability and craftsmanship before it reaches our shelves.", icon: "shield-check" },
  { title: "Fair Pricing", desc: "We work directly with makers to keep prices honest without cutting corners.", icon: "medal" },
  { title: "Fast & Reliable", desc: "Orders ship within 24 hours with real-time tracking every step of the way.", icon: "truck" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero banner={aboutHero} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <p className="section-eyebrow mb-3">Our Story</p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight">Built for people who love finding the right thing.</h1>
          <p className="mt-5 text-gray-600 leading-relaxed">
            IBEX started as a small curated shop for footwear and everyday apparel, and has grown into a destination
            for shoes, t-shirts, pants, and bags. We hand-pick every category to make sure it earns a spot on our
            shelves, and we obsess over the details that make online shopping feel personal again.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Today, our team works with independent makers and trusted brands across the world to bring you products
            that are genuinely worth owning — backed by fast shipping, easy returns, and a support team that actually
            picks up the phone. Your IBEX, our promise.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative aspect-4/3 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="Our team at work"
              fill
              className="object-cover"
            />
          </div>
        </FadeIn>
      </section>

      <section className="bg-ink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <FadeIn key={s.label}>
              <p className="text-3xl font-extrabold text-brand">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <SectionHeading title="What We Stand For" className="mb-12" />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => (
            <FadeIn key={v.title}>
              <div className="text-center">
                <span className="inline-flex h-14 w-14 rounded-full bg-brand/10 items-center justify-center">
                  <Icon name={v.icon} size={24} color="9c7a1a" />
                </span>
                <h3 className="font-bold text-ink mt-4">{v.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
