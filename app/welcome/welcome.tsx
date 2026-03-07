import Navbar from "~/components/Navbar";
import HeroSection from "~/components/HeroSection";
import FeaturesSection from "~/components/FeaturesSection";
import TemplatesSection from "~/components/TemplatesSection";
import PreviewSection from "~/components/PreviewSection";
import GuideSection from "~/components/GuideSection";
import Footer from "~/components/Footer";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <PreviewSection />
      <GuideSection />
      <Footer />
    </div>
  );
}
