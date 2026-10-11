import SiteHeader from "@/components/layout/SiteHeader";
import TrustStrip from "@/components/layout/TrustStrip";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">{children}</main>
      <TrustStrip />
      <Footer />
      <FloatingContact />
    </>
  );
}
