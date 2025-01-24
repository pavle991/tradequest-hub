import { Shield, MessageSquare, Star } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Zašto Izabrati Našu Platformu?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Shield className="h-12 w-12 text-blue-600" />}
            title="Sigurne Transakcije"
            description="Zaštićen identitet tokom pregovora i sigurno procesiranje plaćanja sa escrow servisom."
          />
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-blue-600" />}
            title="Pametna Komunikacija"
            description="AI kategorizacija i ugrađen sistem za poruke za efikasne pregovore."
          />
          <FeatureCard
            icon={<Star className="h-12 w-12 text-blue-600" />}
            title="Poverenje i Reputacija"
            description="Sveobuhvatan sistem ocenjivanja i verifikovani profili firmi za pouzdano poslovanje."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;