const EmotionCard = ({ emotion, confidence, emoji }) => {
  const percentage = (confidence * 100).toFixed(1);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{emoji}</span>
          <span className="font-medium text-black dark:text-white capitalize">{emotion}</span>
        </div>
        <span className="text-sm font-semibold text-red-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-red-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EmotionCard;