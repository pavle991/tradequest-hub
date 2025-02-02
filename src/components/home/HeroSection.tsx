"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Usporavamo animaciju smanjivanjem opsega skrola, ali zadržavamo krajnju vrednost 1.2
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <section className="relative h-[200vh] bg-black w-full rounded-md overflow-clip" ref={ref}>
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Revolucija u B2B Nabavci i Prodaji"
        description="Objavi upit, uporedi ponude i izaberi najbolje uslove - sve na jednom mestu."
        buttonText="B2B EZ"
      />
      <div className="sticky top-[60vh] text-center z-10">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl text-blue-400 font-semibold">
            Želiš da nađeš najbolju ponudu za nabavku u svom poslu?
          </h2>
          <h2 className="text-2xl md:text-3xl text-blue-400 font-semibold">
            Želiš da prodaš svoju robu ili usluge drugim firmama?
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300">
              Započnite Odmah
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 hover:bg-gray-50/10 transition-all duration-300 text-white border-white/20">
              Saznajte Više
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;