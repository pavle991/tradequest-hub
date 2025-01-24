import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <FeaturesSection />
      <RoadmapSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

export default Index;