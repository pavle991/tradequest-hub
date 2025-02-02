import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="flex-grow">
        <div className="overflow-hidden">
          <HeroSection />
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  Revolucija u <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                    B2B Poslovanju
                  </span>
                </h1>
              </>
            }
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
              Vaš Put ka Uspešnom Poslovanju
            </div>
          </ContainerScroll>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <FeaturesSection />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <StatsSection />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <RoadmapSection />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <CTASection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;