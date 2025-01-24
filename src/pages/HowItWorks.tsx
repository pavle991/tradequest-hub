import { 
  UserPlus, 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  MessageSquare, 
  CheckCircle2, 
  CreditCard, 
  Star,
  ShieldCheck
} from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Kako platforma funkcioniše
        </h1>

        <div className="grid gap-12">
          <RoadmapSection
            icon={<UserPlus className="w-8 h-8 text-blue-600" />}
            title="1. Registracija na platformu"
            items={[
              'Posetite početnu stranicu i kliknite na "Registruj se"',
              "Unesite osnovne podatke o svojoj firmi (naziv, email, PIB, ako želite i broj telefona)",
              "Odaberite kategorije robe ili usluga kojima se bavite",
              "Nakon potvrde registracije, dobićete pristup svim funkcionalnostima"
            ]}
          />

          <RoadmapSection
            icon={<LayoutDashboard className="w-8 h-8 text-blue-600" />}
            title="2. Prijava i Dashboard"
            items={[
              "Prijavite se na svoj nalog korišćenjem email-a i lozinke",
              "Na glavnoj stranici (Dashboard) prikazuju se vaše trenutne aktivnosti",
              "Moji upiti (zahtevi koje ste postavili)",
              "Upiti iz mojih kategorija (ponude drugih firmi za robu/usluge iz oblasti koje vas zanimaju)",
              "Poruke i notifikacije (razgovori sa drugim firmama, upozorenja o novim ponudama)"
            ]}
          />

          <RoadmapSection
            icon={<PlusCircle className="w-8 h-8 text-blue-600" />}
            title="3. Slanje (kreiranje) novog upita"
            items={[
              'Kliknite na "Novi upit" ili "Dodaj zahtev"',
              "Upišite u slobodno polje šta vam je tačno potrebno",
              "Platforma koristi AI kategorizaciju kako bi izdvojila ključne reči",
              "Automatski se kreira upit vidljiv svim relevantnim firmama"
            ]}
          />

          <RoadmapSection
            icon={<Search className="w-8 h-8 text-blue-600" />}
            title="4. Pregled tuđih upita i slanje ponuda"
            items={[
              "Platforma prikazuje listu aktuelnih zahteva koji odgovaraju vašim ponudama",
              "Kliknite na upit koji vas zanima za detalje i mogućnost odgovora",
              "Dostavljanje ponude kroz Chat/Tiket sistem"
            ]}
          />

          <RoadmapSection
            icon={<MessageSquare className="w-8 h-8 text-blue-600" />}
            title="5. Chat i pregovori"
            items={[
              "Sistem poruka za razmenu dodatnih informacija",
              "Identitet firmi je skriven do finalnog dogovora",
              "Čuvanje svih poruka za kasniju proveru"
            ]}
          />

          <RoadmapSection
            icon={<CheckCircle2 className="w-8 h-8 text-blue-600" />}
            title="6. Prihvatanje ponude i e-Faktura"
            items={[
              "Prihvatanje ponude kreira e-Fakturu",
              "Faktura sadrži podatke obe strane",
              "Obračunava se 1% provizije"
            ]}
          />

          <RoadmapSection
            icon={<CreditCard className="w-8 h-8 text-blue-600" />}
            title="7. Plaćanje i isporuka"
            items={[
              "Kupac dobija podatke za uplatu",
              "Nakon evidentirane uplate, roba se šalje",
              "Mogućnost praćenja pošiljke kroz sistem"
            ]}
          />

          <RoadmapSection
            icon={<Star className="w-8 h-8 text-blue-600" />}
            title="8. Ocene i komentari"
            items={[
              "Međusobno ocenjivanje nakon uspešne transakcije",
              "Ocenjivanje od 1-5 zvezdica",
              "Mogućnost ostavljanja komentara"
            ]}
          />

          <RoadmapSection
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
            title="9. Administratorski panel"
            items={[
              "Praćenje korisnika i upravljanje nalozima",
              "Finansijski pregledi i obračuni",
              "Moderacija sadržaja i komentara"
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