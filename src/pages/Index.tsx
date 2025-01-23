import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MessageSquare, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolucija u B2B Nabavci
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Povežite se sa pouzdanim dobavljačima, pojednostavite pregovore i upravljajte
              transakcijama na jednoj sigurnoj platformi.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg" className="text-lg">
                  Započnite Odmah
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg">
                  Saznajte Više
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Zašto Izabrati Našu Platformu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-primary" />}
              title="Sigurne Transakcije"
              description="Zaštićen identitet tokom pregovora i sigurno procesiranje plaćanja sa escrow servisom."
            />
            <FeatureCard
              icon={<MessageSquare className="h-12 w-12 text-primary" />}
              title="Pametna Komunikacija"
              description="AI kategorizacija i ugrađen sistem za poruke za efikasne pregovore."
            />
            <FeatureCard
              icon={<Star className="h-12 w-12 text-primary" />}
              title="Poverenje i Reputacija"
              description="Sveobuhvatan sistem ocenjivanja i verifikovani profili firmi za pouzdano poslovanje."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Spremni da Transformišete Vaše Poslovanje?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Pridružite se hiljadama firmi koje već koriste našu platformu za unapređenje
            procesa nabavke.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg bg-white text-primary hover:bg-gray-100"
            >
              Započnite Besplatnu Probu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md card-hover">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;