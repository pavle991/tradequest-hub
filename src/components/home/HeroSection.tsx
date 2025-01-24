import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold">
              Želiš da nađeš najbolju ponudu za nabavku u svom poslu?
            </h2>
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold">
              Želiš da prodaš svoju robu ili usluge drugim firmama?
            </h2>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 animate-gradient">
            Revolucija u B2B Nabavci i Prodaji
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Objavi upit, uporedi ponude i izaberi najbolje uslove - sve na jednom mestu.
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
  );
};

export default HeroSection;