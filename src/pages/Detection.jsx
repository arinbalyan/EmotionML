import { useState, useCallback } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import ModelSelector from '../components/ModelSelector';
import EmotionCard from '../components/EmotionCard';
import { AlertCircle, Loader2 } from 'lucide-react';

const Detection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentModel, setCurrentModel] = useState('MobileNetV2_FER2013');
  const [emotions, setEmotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const models = [
    'MobileNetV2_FER2013',
    'MobileNetV2_RAF-DB',
    'MobileNetV2_CK+48',
    'ResNet50_FER2013',
    'ResNet50_RAF-DB',
    'ResNet50_CK+48',
    'VGG19_FER2013',
    'VGG19_RAF-DB',
    'VGG19_CK+48'
  ];

  const emotionEmojis = {
    // FER2013 emotions
    'angry': '😠',
    'disgust': '🤢',
    'fear': '😨',
    'happy': '😊',
    'neutral': '😐',
    'sad': '😢',
    'surprise': '😲',
    // RAF-DB emotions
    'Surprise': '😲',
    'Fear': '😨',
    'Disgust': '🤢',
    'Happiness': '😊',
    'Sadness': '😢',
    'Anger': '😠',
    'Neutral': '😐',
    // CK+48 emotions
    'anger': '😠',
    'contempt': '😤',
    'happy': '😊',
    'sadness': '😢'
  };

  const handleFrame = useCallback(async (frameBlob) => {
    if (!isDetecting) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', frameBlob, 'frame.jpg');
      formData.append('model', currentModel);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.predictions) {
        const emotionData = Object.entries(data.predictions).map(([emotion, confidence]) => ({
          emotion,
          confidence,
          emoji: emotionEmojis[emotion] || '😐'
        }));
        
        // Sort by confidence descending
        emotionData.sort((a, b) => b.confidence - a.confidence);
        setEmotions(emotionData);
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Prediction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [isDetecting, currentModel]);

  const toggleDetection = () => {
    setIsDetecting(!isDetecting);
    if (!isDetecting) {
      setEmotions([]);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Real-time Emotion Detection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select a model and enable your camera to start detecting emotions in real-time. 
            Our AI will analyze your facial expressions and provide confidence scores for each emotion.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <WebcamCapture 
              onFrame={handleFrame}
              isActive={isDetecting}
            />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <ModelSelector
                    currentModel={currentModel}
                    onModelChange={setCurrentModel}
                    models={models}
                  />
                </div>
                <button
                  onClick={toggleDetection}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDetecting
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isDetecting ? 'Stop Detection' : 'Start Detection'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Emotion Results
                </h3>
                {isLoading && (
                  <Loader2 className="h-5 w-5 text-red-500 animate-spin" />
                )}
              </div>
              
              {emotions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <span className="text-4xl">🎭</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {isDetecting 
                      ? 'Analyzing emotions...' 
                      : 'Start detection to see results'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {emotions.map((emotion, index) => (
                    <EmotionCard
                      key={index}
                      emotion={emotion.emotion}
                      confidence={emotion.confidence}
                      emoji={emotion.emoji}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Model Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Model Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Architecture:</span>
                  <span className="text-black dark:text-white font-medium">
                    {currentModel.split('_')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Dataset:</span>
                  <span className="text-black dark:text-white font-medium">
                    {currentModel.split('_')[1]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`font-medium ${isDetecting ? 'text-green-500' : 'text-gray-500'}`}>
                    {isDetecting ? 'Active' : 'Stopped'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;