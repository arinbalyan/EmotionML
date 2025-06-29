import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ModelSelector = ({ currentModel, onModelChange, models }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-black dark:text-white mb-2">
        Select Model
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-black dark:text-white">{currentModel}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => {
                onModelChange(model);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                model === currentModel ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-black dark:text-white'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;