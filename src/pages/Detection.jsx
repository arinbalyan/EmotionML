import { useState, useCallback, useEffect } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import ModelSelector from '../components/ModelSelector';
import EmotionCard from '../components/EmotionCard';
import { AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Detection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentModel, setCurrentModel] = useState('MobileNetV2_FER2013');
  const [emotions, setEmotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

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
    // 'Surprise': '😲', // duplicate of 'surprise'
    // 'Fear': '😨', // duplicate of 'fear'
    // 'Disgust': '🤢', // duplicate of 'disgust'
    // 'Happiness': '😊', // duplicate of 'happy'
    // 'Sadness': '😢', // duplicate of 'sad'
    // 'Anger': '😠', // duplicate of 'angry'
    // 'Neutral': '😐', // duplicate of 'neutral'
    // CK+48 emotions
    // 'anger': '😠', // duplicate of 'angry'
    'contempt': '😤',
    // 'happy': '😊', // duplicate of 'happy'
    'sadness': '😢'
  };

  const checkApiStatus = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      if (response.ok) {
        setApiStatus('connected');
      } else {
        setApiStatus('error');
      }
    } catch (err) {
      setApiStatus('offline');
      setError('Backend API is not available. Please check if the server is running.');
    }
  };

  // Check API status on component mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  const handleFrame = useCallback(async (frameBlob) => {
    if (!isDetecting || apiStatus !== 'connected') return;
    
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', frameBlob, 'frame.jpg');
      formData.append('model', currentModel);

      const response = await fetch(API_ENDPOINTS.PREDICT, {
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
        
        // Update API status
        setApiStatus('connected');
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Prediction failed: ${err.message}`);
      setApiStatus('error');
    } finally {
      setIsLoading(false);
    }
  }, [isDetecting, currentModel, apiStatus]);

  const toggleDetection = () => {
    if (apiStatus !== 'connected') {
      setError('Cannot start detection: Backend API is not available');
      return;
    }
    
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
          
          {/* API Status Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            {apiStatus === 'connected' && (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">API Connected</span>
              </>
            )}
            {apiStatus === 'offline' && (
              <>
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">API Offline</span>
              </>
            )}
            {apiStatus === 'error' && (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-yellow-600 dark:text-yellow-400">API Error</span>
              </>
            )}
            {apiStatus === 'checking' && (
              <>
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                <span className="text-sm text-blue-600 dark:text-blue-400">Checking API...</span>
              </>
            )}
          </div>
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
                  disabled={apiStatus !== 'connected'}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDetecting
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isDetecting ? 'Stop Detection' : 'Start Detection'}
                </button>
                <button
                  onClick={checkApiStatus}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Check API
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400 text-sm">{error}</span>
                </div>
              )}
              
              {apiStatus === 'offline' && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Backend API Not Available
                  </h4>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
                    The emotion detection API is not running. To use this feature:
                  </p>
                  <ol className="text-yellow-700 dark:text-yellow-300 text-sm list-decimal list-inside space-y-1">
                    <li>Start the backend server locally: <code>cd backend && python main.py</code></li>
                    <li>Or deploy the backend using the deployment guide in <code>backend/DEPLOYMENT.md</code></li>
                    <li>Update the API URL in your environment variables</li>
                  </ol>
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
                    {apiStatus !== 'connected' 
                      ? 'API not available' 
                      : isDetecting 
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
                  <span className={`font-medium ${
                    apiStatus === 'connected' 
                      ? isDetecting ? 'text-green-500' : 'text-gray-500'
                      : 'text-red-500'
                  }`}>
                    {apiStatus === 'connected' 
                      ? (isDetecting ? 'Active' : 'Ready')
                      : 'Offline'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">API:</span>
                  <span className={`font-medium text-xs ${
                    apiStatus === 'connected' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
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