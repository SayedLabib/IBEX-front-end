import PageHero from "@/components/layout/PageHero";
import Icon from "@/components/ui/Icon";
import { FadeIn } from "@/components/animations/Reveal";
import { ourStoreHero } from "@/lib/data/content";

const stores = [
  { city: "Dhaka", address: "House 12, Road 5, Banani, Dhaka 1213", phone: "+880 1712-345678", hours: "Mon - Fri / 9:30 AM - 6:30 PM" },
  { city: "Chattogram", address: "45 Agrabad Access Road, Chattogram 4100", phone: "+880 1812-345678", hours: "Sat - Thu / 10:00 AM - 7:00 PM" },
  { city: "Sylhet", address: "12 Zindabazar, Sylhet 3100", phone: "+880 1912-345678", hours: "Sat - Thu / 9:00 AM - 6:00 PM" },
  { city: "Khulna", address: "8 KDA Avenue, Khulna 9000", phone: "+880 1612-345678", hours: "Sat - Thu / 10:00 AM - 6:00 PM" },
];

export default function OurStorePage() {
  return (
    <div>
      <PageHero banner={ourStoreHero} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stores.map((s) => (
          <FadeIn key={s.city}>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-ink mb-3">IBEX — {s.city}</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <Icon name="map-pin" size={16} className="shrink-0 mt-0.5" />
                  <span>{s.address}</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="phone" size={16} className="shrink-0 mt-0.5" />
                  <span>{s.phone}</span>
                </div>
                <div className="flex gap-3">
                  <Icon name="clock" size={16} className="shrink-0 mt-0.5" />
                  <span>{s.hours}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
