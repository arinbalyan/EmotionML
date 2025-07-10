# Emotion Detection Web Application

A comprehensive real-time emotion detection system powered by deep learning models and modern web technologies. This application combines 9 pre-trained PyTorch models with an intuitive React frontend and FastAPI backend for accurate emotion recognition.

- Due to the free tier hosting the frontend and backend might be slow to load 1 to 2 minute as the render service shut  down and redeploy them only when they are tried to accessed.

## 🚀 Features

- **9 Pre-trained Models**: Choose from MobileNetV2, ResNet50, and VGG19 architectures trained on FER2013, RAF-DB, and CK+48 datasets
- **Real-time Detection**: Live emotion recognition through webcam with instant results
- **Image Upload**: Upload images for emotion analysis with detailed confidence scores
- **Interactive Web Interface**: Clean, responsive UI with dark/light mode support
- **High Accuracy**: Up to 98.99% accuracy on controlled datasets, 80.28% on real-world scenarios
- **FastAPI Backend**: High-performance API with automatic model loading and GPU acceleration
- **Deployment Ready**: Complete deployment guides for multiple platforms

## 📊 Model Performance
 
| Model | FER2013 | RAF-DB | CK+48 |
|-------|---------|---------|-------|
| **MobileNetV2** | 55.68% | 73.57% | 97.98% |
| **ResNet50** | 56.60% | 76.27% | 98.99% |
| **VGG19** | 58.75% | 80.28% | 98.99% |

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

### Backend
- **FastAPI** - High-performance Python web framework
- **PyTorch 2.1.0** - Deep learning framework
- **Torchvision** - Computer vision utilities
- **Uvicorn** - ASGI server implementation
- **Pillow** - Image processing library

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **CUDA** (optional, for GPU acceleration)
- **Trained model files** (place in `backend/results/`)

### 1. Clone Repository
```bash
git clone <repository-url>
cd emotion-detection-app
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Start FastAPI server
cd backend && python main.py
```

### 4. Add Model Files
Place your trained model files in the `backend/results/` directory:
```
backend/results/
├── MobileNetV2_FER2013_best.pt
├── MobileNetV2_RAF-DB_best.pt
├── MobileNetV2_CK+48_best.pt
├── ResNet50_FER2013_best.pt
├── ResNet50_RAF-DB_best.pt
├── ResNet50_CK+48_best.pt
├── VGG19_FER2013_best.pt
├── VGG19_RAF-DB_best.pt
└── VGG19_CK+48_best.pt
```

### 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🌐 Deployment

### Frontend Deployment (Netlify)
The frontend is already deployed at: https://lively-cannoli-82572a.netlify.app

### Backend Deployment Options

#### 1. Railway (Recommended)
```bash
# 1. Create account at railway.app
# 2. Connect your GitHub repository
# 3. Deploy from the backend folder
# 4. Railway will use the Dockerfile automatically
```

#### 2. Render
```bash
# 1. Create account at render.com
# 2. Create new Web Service
# 3. Set build command: pip install -r requirements.txt
# 4. Set start command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### 3. Vercel (Serverless)
```bash
# 1. Install Vercel CLI: npm i -g vercel
# 2. Run vercel in the backend directory
# 3. Uses serverless configuration with mock predictions
```

#### 4. Local Docker
```bash
cd backend
docker build -t emotion-api .
docker run -p 8000:8000 emotion-api
```

### Environment Configuration

After deploying your backend, update the frontend environment:

1. Create `.env` file in the root directory:
```bash
VITE_API_URL=https://your-backend-domain.railway.app
```

2. Redeploy the frontend to Netlify with the new environment variable.

## 📱 Usage

1. **Select Model**: Choose from 9 available models based on your accuracy/speed requirements
2. **Live Detection**: Enable camera permissions and click "Start Detection"
3. **Image Upload**: Upload an image and click "Analyze Emotion"
4. **View Results**: See real-time emotion predictions with confidence scores

## 🏗️ Project Structure

```
emotion-detection-app/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages
│   ├── contexts/          # React contexts (theme)
│   ├── config/            # API configuration
│   └── main.tsx           # Application entry point
├── backend/               # FastAPI backend
│   ├── main.py           # FastAPI application
│   ├── main-serverless.py # Serverless version
│   ├── requirements.txt  # Python dependencies
│   ├── Dockerfile        # Docker configuration
│   ├── railway.json      # Railway deployment config
│   ├── render.yaml       # Render deployment config
│   ├── vercel.json       # Vercel deployment config
│   ├── results/          # Model files directory
│   ├── DEPLOYMENT.md     # Deployment guide
│   └── README.md         # Backend documentation
├── public/               # Static assets
├── .env.example          # Environment variables template
└── README.md            # This file
```

## 📖 API Documentation

### Endpoints

#### GET /api/v1/models
Get information about available models and their configurations.

#### POST /api/v1/predict
Predict emotion from uploaded image.
- **Parameters**: `file` (image), `model` (string)
- **Response**: Emotion predictions with confidence scores

#### GET /api/v1/health
Health check endpoint for monitoring API status.

### Model Information

#### Datasets
- **FER2013**: 35,887 grayscale images, 7 emotions
- **RAF-DB**: 15,339 real-world images, 7 emotions  
- **CK+48**: 981 lab-controlled images, 7 emotions

#### Architectures
- **MobileNetV2**: 3.5M parameters, optimized for mobile
- **ResNet50**: 25.6M parameters, balanced performance
- **VGG19**: 143.7M parameters, highest accuracy

## 🔧 Development

### Adding New Models
1. Add model configuration to `MODEL_CONFIGS` in `backend/main.py`
2. Place model file in `backend/results/`
3. Update documentation and frontend model list

### Environment Variables
```bash
# Frontend
VITE_API_URL=http://localhost:8000

# Backend
PORT=8000
HOST=0.0.0.0
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running
   - Verify API URL in environment variables
   - Check CORS configuration

2. **Model files not found**
   - Verify files are in `backend/results/` directory
   - Check file names match configuration exactly

3. **Camera access denied**
   - Enable camera permissions in browser settings
   - Ensure HTTPS in production (required for camera access)

4. **Slow inference**
   - Check GPU availability and CUDA installation
   - Consider using MobileNetV2 for faster inference

## 📋 Requirements

### System Requirements
- **RAM**: 8GB minimum (16GB recommended for GPU inference)
- **Storage**: 2GB for models and dependencies
- **GPU**: NVIDIA GPU with CUDA support (optional)

### Browser Support
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **FER2013, RAF-DB, CK+48** datasets for training data
- **PyTorch** team for the deep learning framework
- **FastAPI** for the high-performance web framework
- **React** and **Vite** teams for modern web development tools

## 📞 Support

For questions, issues, or contributions:
- Check the backend deployment guide at `backend/DEPLOYMENT.md`
- Review the API docs at `/docs` (when backend is running)
- Create an issue on GitHub

---

**Built with ❤️ using React, FastAPI, and PyTorch**

### Live Demo
- **Frontend**: https://lively-cannoli-82572a.netlify.app
- **Backend**: Deploy using the guide in `backend/DEPLOYMENT.md`
