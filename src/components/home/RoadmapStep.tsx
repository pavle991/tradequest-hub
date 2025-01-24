interface RoadmapStepProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}

const RoadmapStep = ({ icon, step, title, description }: RoadmapStepProps) => {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300">
        {icon}
      </div>
      <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-6 text-lg font-semibold">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default RoadmapStep;