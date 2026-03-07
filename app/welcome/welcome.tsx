import Navbar from "~/components/Navbar";
import HeroSection from "~/components/HeroSection";
import FeaturesSection from "~/components/FeaturesSection";
import TemplatesSection from "~/components/TemplatesSection";
import PreviewSection from "~/components/PreviewSection";
import GuideSection from "~/components/GuideSection";
import FeedbackSection from "~/components/FeedbackSection";
import Footer from "~/components/Footer";
import { ScrollProgress } from "~/components/ScrollProgress";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <PreviewSection />
      <GuideSection />
      <FeedbackSection />
      <Footer />
    </div>
  );
}
