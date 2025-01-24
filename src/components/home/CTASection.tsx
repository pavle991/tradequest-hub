import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;