import { Shield, MessageSquare, Star } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Zašto Izabrati Našu Platformu?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-blue-600" />}
              title="Sigurne Transakcije"
              description="Zaštićen identitet tokom pregovora i sigurno procesiranje plaćanja sa escrow servisom."
            />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <FeatureCard
              icon={<MessageSquare className="h-12 w-12 text-blue-600" />}
              title="Pametna Komunikacija"
              description="AI kategorizacija i ugrađen sistem za poruke za efikasne pregovore."
            />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <FeatureCard
              icon={<Star className="h-12 w-12 text-blue-600" />}
              title="Poverenje i Reputacija"
              description="Sveobuhvatan sistem ocenjivanja i verifikovani profili firmi za pouzdano poslovanje."
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
    </section>
  );
};

export default FeaturesSection;