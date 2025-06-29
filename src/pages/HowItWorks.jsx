import { Brain, Database, Zap, Target, Layers, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Collection & Preprocessing",
      description: "Three comprehensive datasets were used for training our models:",
      details: [
        "FER2013: 35,887 grayscale images of facial expressions",
        "RAF-DB: 15,339 real-world facial images with natural variations",
        "CK+48: 981 lab-controlled images with high-quality expressions"
      ]
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Model Architecture",
      description: "Three different deep learning architectures were employed:",
      details: [
        "MobileNetV2: Lightweight model optimized for mobile deployment",
        "ResNet50: Deep residual network with skip connections for better gradient flow",
        "VGG19: Classical deep CNN architecture with excellent feature extraction"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Training Process",
      description: "Advanced training techniques were used to optimize performance:",
      details: [
        "Transfer learning from ImageNet pre-trained weights",
        "Mixed precision training for faster computation",
        "Early stopping to prevent overfitting",
        "Adam optimizer with adaptive learning rates"
      ]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Model Performance",
      description: "Each model achieved different accuracies across datasets:",
      details: [
        "CK+48: Up to 98.99% accuracy (controlled lab conditions)",
        "RAF-DB: Up to 80.28% accuracy (real-world scenarios)",
        "FER2013: Up to 58.75% accuracy (challenging grayscale images)"
      ]
    }
  ];

  const technicalSpecs = [
    {
      title: "Image Processing",
      specs: [
        "Input resolution: 224×224 pixels",
        "Normalization: [-1, 1] range",
        "Real-time preprocessing pipeline",
        "Automatic face detection and cropping"
      ]
    },
    {
      title: "Model Inference",
      specs: [
        "PyTorch backend with CUDA acceleration",
        "Batch processing for efficiency",
        "Mixed precision inference",
        "Sub-second prediction times"
      ]
    },
    {
      title: "Emotion Classes",
      specs: [
        "FER2013: 7 emotions (angry, disgust, fear, happy, neutral, sad, surprise)",
        "RAF-DB: 7 emotions (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise)",
        "CK+48: 7 emotions (anger, contempt, disgust, fear, happy, sadness, surprise)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            How Our Emotion Detection Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the science behind our ML-powered emotion recognition system, 
            from data collection to real-time inference.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
            Development Process
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-red-500">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-black dark:text-white">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
            Technical Specifications
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  {spec.title}
                </h3>
                <ul className="space-y-3">
                  {spec.specs.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Model Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
            Model Performance Comparison
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      FER2013
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      RAF-DB
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CK+48
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Parameters
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                      MobileNetV2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      55.68%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      73.57%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      97.98%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      3.5M
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                      ResNet50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      56.60%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      76.27%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      98.99%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      25.6M
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white">
                      VGG19
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      58.75%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      80.28%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      98.99%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      143.7M
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Real-time Processing */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Real-time Processing Pipeline</h2>
            <p className="text-red-100 mb-6 max-w-3xl mx-auto">
              Our system processes your camera feed through a sophisticated pipeline that captures frames, 
              preprocesses images, runs inference through selected models, and displays results with 
              confidence scores - all in real-time with minimal latency.
            </p>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold">Frame Capture</div>
                <div className="text-sm text-red-100">1-2ms</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold">Preprocessing</div>
                <div className="text-sm text-red-100">5-10ms</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold">Model Inference</div>
                <div className="text-sm text-red-100">50-200ms</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold">Result Display</div>
                <div className="text-sm text-red-100">1-2ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;