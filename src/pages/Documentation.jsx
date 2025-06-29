import React, { useState } from 'react';
import { Book, Code, Database, Settings, Zap, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const Documentation = () => {
  const [openSections, setOpenSections] = useState({
    quickStart: true,
    api: false,
    models: false,
    datasets: false,
    deployment: false,
    troubleshooting: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const models = [
    {
      name: "MobileNetV2",
      params: "3.5M",
      speed: "Fast",
      useCase: "Mobile deployment, real-time applications",
      datasets: [
        { name: "FER2013", accuracy: "55.68%" },
        { name: "RAF-DB", accuracy: "73.57%" },
        { name: "CK+48", accuracy: "97.98%" }
      ]
    },
    {
      name: "ResNet50", 
      params: "25.6M",
      speed: "Medium",
      useCase: "Balanced accuracy and speed",
      datasets: [
        { name: "FER2013", accuracy: "56.60%" },
        { name: "RAF-DB", accuracy: "76.27%" },
        { name: "CK+48", accuracy: "98.99%" }
      ]
    },
    {
      name: "VGG19",
      params: "143.7M", 
      speed: "Slower",
      useCase: "High accuracy requirements",
      datasets: [
        { name: "FER2013", accuracy: "58.75%" },
        { name: "RAF-DB", accuracy: "80.28%" },
        { name: "CK+48", accuracy: "98.99%" }
      ]
    }
  ];

  const datasets = [
    {
      name: "FER2013",
      images: "35,887",
      type: "Grayscale",
      emotions: ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"],
      description: "Challenging dataset with varied lighting conditions and real-world scenarios"
    },
    {
      name: "RAF-DB",
      images: "15,339", 
      type: "Color",
      emotions: ["Surprise", "Fear", "Disgust", "Happiness", "Sadness", "Anger", "Neutral"],
      description: "Real-world facial expressions with natural variations and diverse demographics"
    },
    {
      name: "CK+48",
      images: "981",
      type: "Grayscale",
      emotions: ["anger", "contempt", "disgust", "fear", "happy", "sadness", "surprise"],
      description: "Lab-controlled environment with high-quality posed expressions"
    }
  ];

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/models",
      description: "Get information about available models",
      response: `{
  "models": {
    "MobileNetV2_FER2013": {
      "architecture": "MobileNetV2",
      "dataset": "FER2013",
      "emotions": [...],
      "accuracy": 55.68
    }
  }
}`
    },
    {
      method: "POST",
      endpoint: "/api/v1/predict",
      description: "Predict emotion from uploaded image",
      parameters: "file (image), model (string)",
      response: `{
  "success": true,
  "predictions": {
    "happy": 0.85,
    "neutral": 0.10,
    "sad": 0.03
  },
  "top_emotion": "happy",
  "confidence": 0.85
}`
    },
    {
      method: "GET",
      endpoint: "/api/v1/health",
      description: "Health check endpoint",
      response: `{
  "status": "healthy",
  "device": "cuda",
  "loaded_models": 9
}`
    }
  ];

  const CollapsibleSection = ({ id, title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-red-500">{icon}</div>
          <h2 className="text-xl font-semibold text-black dark:text-white">{title}</h2>
        </div>
        {openSections[id] ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {openSections[id] && (
        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete guide to using the Emotion Detection API and web application. 
            Learn about models, datasets, API endpoints, and deployment options.
          </p>
        </div>

        {/* Quick Start Guide */}
        <CollapsibleSection
          id="quickStart"
          title="Quick Start Guide"
          icon={<Zap className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Clone the Repository
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400"># Clone the repository</div>
                <div className="text-black dark:text-white">git clone https://github.com/arinbalyan/EmotionML.git</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2"># Change directory</div>
                <div className="text-black dark:text-white">cd EmotionML</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Frontend Setup
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400"># Install dependencies</div>
                <div className="text-black dark:text-white">npm install</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2"># Start development server</div>
                <div className="text-black dark:text-white">npm run dev</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Backend Setup
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400"># Create virtual environment</div>
                <div className="text-black dark:text-white">python -m venv venv</div>
                <div className="text-black dark:text-white">source venv/bin/activate</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2"># Install dependencies</div>
                <div className="text-black dark:text-white">pip install -r backend/requirements.txt</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2"># Start FastAPI server</div>
                <div className="text-black dark:text-white">cd backend && python main.py</div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Important: Model Files Required
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Place your trained model files (.pt) in the <code>backend/results/</code> directory 
                before starting the server. The application expects 9 model files as specified in the backend documentation.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* API Reference */}
        <CollapsibleSection
          id="api"
          title="API Reference"
          icon={<Code className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Base URL
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm">
                <span className="text-black dark:text-white">http://localhost:8000</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Endpoints
              </h3>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-sm text-black dark:text-white">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {endpoint.description}
                    </p>
                    {endpoint.parameters && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-black dark:text-white">Parameters: </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{endpoint.parameters}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-medium text-black dark:text-white">Response:</span>
                      <pre className="mt-2 bg-gray-100 dark:bg-gray-900 rounded p-3 text-xs overflow-x-auto">
                        <code className="text-black dark:text-white">{endpoint.response}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Model Information */}
        <CollapsibleSection
          id="models"
          title="Model Information"
          icon={<Settings className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            {models.map((model, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {model.name}
                  </h3>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Parameters:</strong> {model.params}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Speed:</strong> {model.speed}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  <strong>Use Case:</strong> {model.useCase}
                </p>
                
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">
                    Performance by Dataset
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {model.datasets.map((dataset, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
                        <div className="font-medium text-black dark:text-white">
                          {dataset.name}
                        </div>
                        <div className="text-2xl font-bold text-red-500 mt-1">
                          {dataset.accuracy}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Dataset Information */}
        <CollapsibleSection
          id="datasets"
          title="Dataset Information"
          icon={<Database className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            {datasets.map((dataset, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {dataset.name}
                  </h3>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Images:</strong> {dataset.images}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Type:</strong> {dataset.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {dataset.description}
                </p>
                
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3">
                    Emotion Classes ({dataset.emotions.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dataset.emotions.map((emotion, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-sm">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Deployment */}
        <CollapsibleSection
          id="deployment"
          title="Deployment Guide"
          icon={<ExternalLink className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Production Deployment
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-black dark:text-white mb-2">
                    Frontend (React)
                  </h4>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <div className="text-gray-600 dark:text-gray-400"># Build for production</div>
                    <div className="text-black dark:text-white">npm run build</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2"># Deploy to your hosting service</div>
                    <div className="text-black dark:text-white">npm run preview</div>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-black dark:text-white mb-2">
                    Backend (FastAPI)
                  </h4>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm">
                    <div className="text-gray-600 dark:text-gray-400"># Install production server</div>
                    <div className="text-black dark:text-white">pip install gunicorn</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2"># Run with gunicorn</div>
                    <div className="text-black dark:text-white">gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                Environment Variables
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400"># Frontend (.env)</div>
                <div className="text-black dark:text-white">VITE_API_URL=http://localhost:8000</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2"># Backend</div>
                <div className="text-black dark:text-white">PORT=8000</div>
                <div className="text-black dark:text-white">HOST=0.0.0.0</div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Troubleshooting */}
        <CollapsibleSection
          id="troubleshooting"
          title="Troubleshooting"
          icon={<Book className="h-6 w-6" />}
        >
          <div className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-black dark:text-white mb-2">
                  Model files not found
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Ensure model files are in the correct location and have the expected names.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs">
                  <div className="text-black dark:text-white">backend/results/MobileNetV2_FER2013_best.pt</div>
                  <div className="text-black dark:text-white">backend/results/ResNet50_RAF-DB_best.pt</div>
                  <div className="text-black dark:text-white">...</div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-black dark:text-white mb-2">
                  CUDA out of memory
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If you encounter GPU memory issues, the models will automatically fall back to CPU inference.
                  You can also manually set the device in the backend configuration.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-black dark:text-white mb-2">
                  Slow inference times
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  For better performance, ensure GPU is available and models are properly loaded.
                  Consider using MobileNetV2 models for faster inference on resource-constrained devices.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-black dark:text-white mb-2">
                  Camera access denied
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Make sure your browser allows camera access. The application requires webcam permissions 
                  for real-time emotion detection. Check browser settings and reload the page.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            For additional support, please refer to the GitHub repository or contact the development team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;