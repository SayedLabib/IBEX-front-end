import Link from "next/link";

export default function Breadcrumb({ title, trail }: { title: string; trail: { label: string; href?: string }[] }) {
  return (
    <div className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-dark transition-colors">
            Home
          </Link>
          {trail.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>›</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-brand-dark transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
