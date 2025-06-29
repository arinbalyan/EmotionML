import { Link } from 'react-router-dom';
import { Brain, Camera, BarChart3, FileText, ArrowRight, Upload } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "9 Pre-trained Models",
      description: "Choose from MobileNetV2, ResNet50, and VGG19 trained on FER2013, RAF-DB, and CK+48 datasets"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Real-time Detection",
      description: "Live emotion recognition through your webcam with instant results and confidence scores"
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Image Analysis",
      description: "Upload images for emotion detection with detailed confidence scores and visual feedback"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Detailed Analytics",
      description: "View confidence levels for each emotion with visual progress bars and emoji indicators"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Complete Documentation",
      description: "Comprehensive guides covering model architecture, training process, and API usage"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            ML-Powered
            <span className="text-red-500 block">Emotion Detection</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Experience cutting-edge emotion recognition technology with our collection of pre-trained 
            deep learning models. Analyze facial expressions in real-time or upload images for analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/detection"
              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Camera className="h-5 w-5" />
              <span>Live Detection</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/image-detection"
              className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Brain className="h-5 w-5" />
              <span>How it Works</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our emotion detection system combines state-of-the-art deep learning models 
              with an intuitive user interface for seamless emotion analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="text-red-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Model Performance
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our models have been trained and validated on multiple datasets, 
              achieving excellent accuracy across different emotion recognition scenarios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-2">FER2013</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">35,887 grayscale images</p>
              <div className="text-sm text-black dark:text-white">
                <div className="flex justify-between mb-1">
                  <span>VGG19</span>
                  <span className="font-semibold">58.75%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>ResNet50</span>
                  <span className="font-semibold">56.60%</span>
                </div>
                <div className="flex justify-between">
                  <span>MobileNetV2</span>
                  <span className="font-semibold">55.68%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-2">RAF-DB</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">15,339 real-world images</p>
              <div className="text-sm text-black dark:text-white">
                <div className="flex justify-between mb-1">
                  <span>VGG19</span>
                  <span className="font-semibold">80.28%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>ResNet50</span>
                  <span className="font-semibold">76.27%</span>
                </div>
                <div className="flex justify-between">
                  <span>MobileNetV2</span>
                  <span className="font-semibold">73.57%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-2xl font-bold text-red-500 mb-2">CK+48</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">981 lab-controlled images</p>
              <div className="text-sm text-black dark:text-white">
                <div className="flex justify-between mb-1">
                  <span>VGG19</span>
                  <span className="font-semibold">98.99%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>ResNet50</span>
                  <span className="font-semibold">98.99%</span>
                </div>
                <div className="flex justify-between">
                  <span>MobileNetV2</span>
                  <span className="font-semibold">97.98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try Emotion Detection?
          </h2>
          <p className="text-red-100 mb-8 text-lg">
            Start analyzing emotions with our advanced AI models. 
            Choose between live camera detection or upload your own images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/detection"
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-red-500 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Camera className="h-5 w-5" />
              <span>Live Detection</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/image-detection"
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-red-500 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;