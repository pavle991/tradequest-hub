interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">{number}</div>
      <div className="text-xl text-gray-600">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <StatCard number="1000+" label="Aktivnih Kompanija" />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <StatCard number="5000+" label="Uspešnih Transakcija" />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <StatCard number="98%" label="Zadovoljnih Korisnika" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;