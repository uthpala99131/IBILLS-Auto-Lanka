const stages = [
  'Check-in',
  'Diagnosis',
  'Repair',
  'Quality Check',
  'Ready for Delivery',
  'Completed'
];

export default function ProgressTracker({ currentStage, onStageChange }) {
  const currentIndex = stages.indexOf(currentStage);
  
  return (
    <div className="flex items-center">
      <nav className="flex space-x-4">
        {stages.map((stage, index) => (
          <button
            key={stage}
            onClick={() => onStageChange(stage)}
            className={`px-3 py-2 text-xs font-medium rounded-full ${
              index <= currentIndex
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {stage}
          </button>
        ))}
      </nav>
    </div>
  );
}