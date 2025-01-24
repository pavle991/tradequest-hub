import { 
  UserPlus, 
  MessageSquare, 
  CheckCircle2, 
  CreditCard, 
  Star,
  Search,
  ShoppingBag,
  Truck,
  ThumbsUp
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Kako platforma funkcioniše
        </h1>

        <div className="grid gap-8">
          <RoadmapSection
            icon={<UserPlus className="w-8 h-8 text-blue-600" />}
            title="1. Registracija"
            items={[
              "Firma otvara jedinstveni nalog, unosom osnovnih podataka i kategorija delatnosti."
            ]}
          />

          <RoadmapSection
            icon={<ShoppingBag className="w-8 h-8 text-blue-600" />}
            title="2. Kreiranje upita"
            items={[
              "Kupac opisuje potrebnu robu ili uslugu, dok AI automatski prepoznaje ključne reči i dodeljuje ih odgovarajućoj kategoriji."
            ]}
          />

          <RoadmapSection
            icon={<Search className="w-8 h-8 text-blue-600" />}
            title="3. Pregled upita"
            items={[
              "Svaka firma može videti i odabrati samo one zahteve koji se poklapaju s njenim asortimanom."
            ]}
          />

          <RoadmapSection
            icon={<MessageSquare className="w-8 h-8 text-blue-600" />}
            title="4. Chat i pregovori"
            items={[
              "Komunikacija se odvija kroz integrisani tiket sistem, uz skriven identitet do finalizacije dogovora."
            ]}
          />

          <RoadmapSection
            icon={<CheckCircle2 className="w-8 h-8 text-blue-600" />}
            title="5. Slanje ponude"
            items={[
              "Firma koja nudi robu popunjava detalje (količina, rok isporuke, cena) i šalje ih kupcu na razmatranje."
            ]}
          />

          <RoadmapSection
            icon={<CreditCard className="w-8 h-8 text-blue-600" />}
            title="6. Prihvatanje ponude i fakturisanje"
            items={[
              'Klikom na "Prihvati ponudu" generiše se e-faktura sa obračunatom 1% provizijom za platformu.'
            ]}
          />

          <RoadmapSection
            icon={<Truck className="w-8 h-8 text-blue-600" />}
            title="7. Plaćanje i isporuka"
            items={[
              "Kupac vrši uplatu, a prodavac šalje robu, uz mogućnost praćenja pošiljke preko kurirske službe."
            ]}
          />

          <RoadmapSection
            icon={<ThumbsUp className="w-8 h-8 text-blue-600" />}
            title="8. Potvrda transakcije"
            items={[
              "Kupac potvrđuje prijem robe, što označava završetak trgovine i aktivira isplatu dobavljaču."
            ]}
          />

          <RoadmapSection
            icon={<Star className="w-8 h-8 text-blue-600" />}
            title="9. Ocene i reputacija"
            items={[
              "Obe strane ocenjuju i komentarišu saradnju, čime se gradi poverenje i rangiranje korisnika."
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const RoadmapSection = ({ 
  icon, 
  title, 
  items 
}: { 
  icon: React.ReactNode;
  title: string;
  items: string[];
}) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600">
            <div className="min-w-[24px] h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorks;