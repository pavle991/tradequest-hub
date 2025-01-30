import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
            className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Započnite Besplatnu Probu
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
    </section>
  );
};

export default CTASection;