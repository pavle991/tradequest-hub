import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  MessageSquare,
  Shield,
  Star,
  CheckCircle2,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolucija u B2B Nabavci
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
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
      <section className="py-20 bg-white">
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

      {/* Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kako Platforma Funkcioniše
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <RoadmapStep
              icon={<Users className="h-8 w-8 text-primary" />}
              step="1"
              title="Registracija"
              description="Kreirajte nalog za vašu kompaniju i verifikujte identitet"
            />
            <RoadmapStep
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              step="2"
              title="Postavljanje Upita"
              description="Opišite šta vam je potrebno ili pregledajte postojeće ponude"
            />
            <RoadmapStep
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              step="3"
              title="Pregovaranje"
              description="Direktna komunikacija sa potencijalnim partnerima"
            />
            <RoadmapStep
              icon={<DollarSign className="h-8 w-8 text-primary" />}
              step="4"
              title="Realizacija"
              description="Sigurno plaćanje i isporuka kroz našu platformu"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard number="1000+" label="Aktivnih Kompanija" />
            <StatCard number="5000+" label="Uspešnih Transakcija" />
            <StatCard number="98%" label="Zadovoljnih Korisnika" />
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const RoadmapStep = ({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-white p-4 rounded-full shadow-md mb-4">{icon}</div>
      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mb-4">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-50">
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default Index;