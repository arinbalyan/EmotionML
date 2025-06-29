import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import ModelSelector from '../components/ModelSelector';
import EmotionCard from '../components/EmotionCard';
import { API_ENDPOINTS } from '../config/api';

const ImageDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentModel, setCurrentModel] = useState('MobileNetV2_FER2013');
  const [emotions, setEmotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const fileInputRef = useRef(null);

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

  // Check API status on component mount
  useState(() => {
    checkApiStatus();
  }, []);

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
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setError(null);
      setEmotions([]);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Simulate file input change
      const fakeEvent = {
        target: {
          files: [file]
        }
      };
      handleImageSelect(fakeEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEmotions([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    if (apiStatus !== 'connected') {
      setError('Backend API is not available. Please check the server status.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
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
        setApiStatus('connected');
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Analysis failed: ${err.message}`);
      setApiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Image Emotion Detection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload an image to analyze facial expressions and detect emotions. 
            Our AI models will provide confidence scores for each detected emotion.
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
          {/* Image Upload and Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Upload Image
              </h3>
              
              {!imagePreview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-red-400 dark:hover:border-red-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop an image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Supports JPG, PNG, GIF (max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Selected for analysis"
                    className="w-full h-auto max-h-96 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Controls */}
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
                  onClick={analyzeImage}
                  disabled={!selectedImage || isLoading || apiStatus !== 'connected'}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      <span>Analyze Emotion</span>
                    </>
                  )}
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
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Please start the backend server or deploy it using the deployment guide.
                  </p>
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
                      : selectedImage 
                        ? 'Click "Analyze Emotion" to see results' 
                        : 'Upload an image to get started'
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
                  <span className="text-gray-600 dark:text-gray-400">Input:</span>
                  <span className="text-black dark:text-white font-medium">
                    {selectedImage ? 'Image uploaded' : 'No image'}
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

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Tips for Better Results
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Use clear, well-lit images</li>
                <li>• Ensure the face is clearly visible</li>
                <li>• Avoid heavily filtered or edited images</li>
                <li>• Single face works better than multiple faces</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;