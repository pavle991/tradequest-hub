import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center relative z-10">
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold">
              Želiš da nađeš najbolju ponudu za nabavku u svom poslu?
            </h2>
            <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold">
              Želiš da prodaš svoju robu ili usluge drugim firmama?
            </h2>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600">
            Revolucija u B2B Nabavci i Prodaji
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Objavi upit, uporedi ponude i izaberi najbolje uslove - sve na jednom mestu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Započnite Odmah
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-gray-50 transition-all duration-300">
                Saznajte Više
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50"></div>
      </div>
    </section>
  );
};

export default HeroSection;