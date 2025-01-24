interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="text-5xl font-bold text-blue-600 mb-4">{number}</div>
      <div className="text-xl text-gray-600">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatCard number="1000+" label="Aktivnih Kompanija" />
          <StatCard number="5000+" label="Uspešnih Transakcija" />
          <StatCard number="98%" label="Zadovoljnih Korisnika" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;