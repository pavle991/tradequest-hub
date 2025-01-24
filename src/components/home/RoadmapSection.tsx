import {
  UserPlus,
  ShoppingBag,
  Search,
  MessageSquare,
  CheckCircle2,
  DollarSign,
  Truck,
  ThumbsUp,
  Star
} from "lucide-react";
import RoadmapStep from "./RoadmapStep";

const RoadmapSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Kako Platforma Funkcioniše
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <UserPlus className="h-8 w-8 text-blue-600" />,
              step: "1",
              title: "Registracija",
              description: "Firma otvara jedinstveni nalog, unosom osnovnih podataka i kategorija delatnosti",
              delay: "0.2s"
            },
            {
              icon: <ShoppingBag className="h-8 w-8 text-blue-600" />,
              step: "2",
              title: "Kreiranje upita",
              description: "Kupac opisuje potrebnu robu ili uslugu, dok AI automatski prepoznaje ključne reči",
              delay: "0.3s"
            },
            {
              icon: <Search className="h-8 w-8 text-blue-600" />,
              step: "3",
              title: "Pregled upita",
              description: "Svaka firma može videti i odabrati samo one zahteve koji se poklapaju s njenim asortimanom",
              delay: "0.4s"
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
              step: "4",
              title: "Chat i pregovori",
              description: "Komunikacija se odvija kroz integrisani tiket sistem, uz skriven identitet",
              delay: "0.5s"
            },
            {
              icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
              step: "5",
              title: "Slanje ponude",
              description: "Firma popunjava detalje (količina, rok isporuke, cena) i šalje kupcu na razmatranje",
              delay: "0.6s"
            },
            {
              icon: <DollarSign className="h-8 w-8 text-blue-600" />,
              step: "6",
              title: "Prihvatanje ponude",
              description: "Generiše se e-faktura sa obračunatom provizijom za platformu",
              delay: "0.7s"
            },
            {
              icon: <Truck className="h-8 w-8 text-blue-600" />,
              step: "7",
              title: "Plaćanje i isporuka",
              description: "Kupac vrši uplatu, a prodavac šalje robu uz praćenje pošiljke",
              delay: "0.8s"
            },
            {
              icon: <ThumbsUp className="h-8 w-8 text-blue-600" />,
              step: "8",
              title: "Potvrda transakcije",
              description: "Kupac potvrđuje prijem robe, što aktivira isplatu dobavljaču",
              delay: "0.9s"
            },
            {
              icon: <Star className="h-8 w-8 text-blue-600" />,
              step: "9",
              title: "Ocene i reputacija",
              description: "Obe strane ocenjuju saradnju, čime se gradi poverenje i rangiranje",
              delay: "1s"
            }
          ].map((step, index) => (
            <div
              key={step.step}
              className="animate-fade-in opacity-0"
              style={{ animationDelay: step.delay, animationFillMode: "forwards" }}
            >
              <RoadmapStep
                icon={step.icon}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;