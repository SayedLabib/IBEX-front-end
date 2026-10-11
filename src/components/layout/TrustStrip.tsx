import Icon from "@/components/ui/Icon";
import { trustFeatures } from "@/lib/data/content";

export default function TrustStrip() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {trustFeatures.map((f) => (
          <div key={f.title} className="flex items-center gap-3">
            <Icon name={f.icon} size={26} />
            <div>
              <p className="font-semibold text-ink text-sm">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
