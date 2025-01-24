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
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Revolucija u B2B Nabavci
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Povežite se sa pouzdanim dobavljačima, pojednostavite pregovore i upravljajte
              transakcijama na jednoj sigurnoj platformi.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Započnite Odmah
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-gray-50 transition-all duration-300">
                  Saznajte Više
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Roadmap Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Kako Platforma Funkcioniše
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <RoadmapStep
              icon={<Users className="h-8 w-8 text-blue-600" />}
              step="1"
              title="Registracija"
              description="Kreirajte nalog za vašu kompaniju i verifikujte identitet"
            />
            <RoadmapStep
              icon={<BarChart3 className="h-8 w-8 text-blue-600" />}
              step="2"
              title="Postavljanje Upita"
              description="Opišite šta vam je potrebno ili pregledajte postojeće ponude"
            />
            <RoadmapStep
              icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
              step="3"
              title="Pregovaranje"
              description="Direktna komunikacija sa potencijalnim partnerima"
            />
            <RoadmapStep
              icon={<DollarSign className="h-8 w-8 text-blue-600" />}
              step="4"
              title="Realizacija"
              description="Sigurno plaćanje i isporuka kroz našu platformu"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatCard number="1000+" label="Aktivnih Kompanija" />
            <StatCard number="5000+" label="Uspešnih Transakcija" />
            <StatCard number="98%" label="Zadovoljnih Korisnika" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Spremni da Transformišete Vaše Poslovanje?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Pridružite se hiljadama firmi koje već koriste našu platformu za unapređenje
            procesa nabavke.
          </p>
          <Link to="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Započnite Besplatnu Probu
              <ArrowRight className="ml-2 h-6 w-6" />
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
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="mb-6 bg-blue-50 w-20 h-20 rounded-xl flex items-center justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
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
    <div className="flex flex-col items-center text-center group">
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300">
        {icon}
      </div>
      <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-6 text-lg font-semibold">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="text-5xl font-bold text-blue-600 mb-4">{number}</div>
      <div className="text-xl text-gray-600">{label}</div>
    </div>
  );
};

export default Index;