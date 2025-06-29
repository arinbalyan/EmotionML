# Emotion Detection Web Application

A comprehensive real-time emotion detection system powered by deep learning models and modern web technologies. This application combines 9 pre-trained PyTorch models with an intuitive React frontend and FastAPI backend for accurate emotion recognition.

## 🚀 Features

- **9 Pre-trained Models**: Choose from MobileNetV2, ResNet50, and VGG19 architectures trained on FER2013, RAF-DB, and CK+48 datasets
- **Real-time Detection**: Live emotion recognition through webcam with instant results
- **Interactive Web Interface**: Clean, responsive UI with dark/light mode support
- **High Accuracy**: Up to 98.99% accuracy on controlled datasets, 80.28% on real-world scenarios
- **FastAPI Backend**: High-performance API with automatic model loading and GPU acceleration
- **Comprehensive Documentation**: Complete guides for setup, API usage, and deployment

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

## 📱 Usage

1. **Select Model**: Choose from 9 available models based on your accuracy/speed requirements
2. **Enable Camera**: Grant camera permissions for real-time detection
3. **Start Detection**: Click "Start Detection" to begin emotion analysis
4. **View Results**: See real-time emotion predictions with confidence scores

## 🏗️ Project Structure

```
emotion-detection-app/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   ├── pages/             # Application pages
│   ├── contexts/          # React contexts (theme)
│   └── main.tsx           # Application entry point
├── backend/               # FastAPI backend
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   ├── results/          # Model files directory
│   └── README.md         # Backend documentation
├── public/               # Static assets
└── README.md            # This file
```

## 🎨 Design System

### Color Palette
- **Light Mode**: Primary (White), Secondary (Black), Accent (Red)
- **Dark Mode**: Primary (Black), Secondary (White), Accent (Red)

### Typography
- **Headings**: 3 font weights maximum
- **Body Text**: 150% line spacing
- **Code**: Monospace font family

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Responsive Breakpoints**: Mobile-first approach

## 📖 Documentation

### API Endpoints

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

## 🚀 Deployment

### Production Build
```bash
# Frontend
npm run build

# Backend
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Environment Variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8000

# Backend
PORT=8000
HOST=0.0.0.0
```

## 🔧 Development

### Adding New Models
1. Add model configuration to `MODEL_CONFIGS` in `backend/main.py`
2. Place model file in `backend/results/`
3. Update documentation and frontend model list

### Custom Themes
1. Modify color values in `tailwind.config.js`
2. Update theme context in `src/contexts/ThemeContext.jsx`
3. Test across all components and pages

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

## 🐛 Troubleshooting

### Common Issues

1. **Model files not found**
   - Verify files are in `backend/results/` directory
   - Check file names match configuration exactly

2. **Camera access denied**
   - Enable camera permissions in browser settings
   - Ensure HTTPS in production (required for camera access)

3. **Slow inference**
   - Check GPU availability and CUDA installation
   - Consider using MobileNetV2 for faster inference

4. **CORS errors**
   - Verify frontend and backend URLs in configuration
   - Check CORS middleware settings in FastAPI

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
- Create an issue on GitHub
- Check the documentation at `/documentation` 
- Review the API docs at `/docs` (when backend is running)

---

**Built with ❤️ using React, FastAPI, and PyTorch**