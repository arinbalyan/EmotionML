# Emotion Detection FastAPI Backend

## Overview
This FastAPI backend serves pre-trained PyTorch models for real-time emotion detection. It supports 9 different models trained on three datasets (FER2013, RAF-DB, CK+48) with three architectures (MobileNetV2, ResNet50, VGG19).

## Features
- **9 Pre-trained Models**: Different combinations of architectures and datasets
- **Real-time Processing**: Fast inference with GPU support
- **RESTful API**: Clean API endpoints for model interaction
- **Model Management**: Automatic model loading and caching
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Ready for web application integration

## Model Performance

### FER2013 Dataset
- **VGG19**: 58.75% accuracy
- **ResNet50**: 56.60% accuracy  
- **MobileNetV2**: 55.68% accuracy

### RAF-DB Dataset
- **VGG19**: 80.28% accuracy
- **ResNet50**: 76.27% accuracy
- **MobileNetV2**: 73.57% accuracy

### CK+48 Dataset
- **VGG19**: 98.99% accuracy
- **ResNet50**: 98.99% accuracy
- **MobileNetV2**: 97.98% accuracy

## Installation

### Prerequisites
- Python 3.8+
- PyTorch 2.1.0+
- CUDA (optional, for GPU acceleration)

### Setup
1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Place model files in `results/` directory:
```
backend/
├── results/
│   ├── MobileNetV2_FER2013_best.pt
│   ├── MobileNetV2_RAF-DB_best.pt
│   ├── MobileNetV2_CK+48_best.pt
│   ├── ResNet50_FER2013_best.pt
│   ├── ResNet50_RAF-DB_best.pt
│   ├── ResNet50_CK+48_best.pt
│   ├── VGG19_FER2013_best.pt
│   ├── VGG19_RAF-DB_best.pt
│   └── VGG19_CK+48_best.pt
├── main.py
└── requirements.txt
```

## Usage

### Start the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation
- Interactive docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### GET /api/v1/models
Get information about available models.

**Response:**
```json
{
  "models": {
    "MobileNetV2_FER2013": {
      "architecture": "MobileNetV2",
      "dataset": "FER2013", 
      "emotions": ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"],
      "accuracy": 55.68
    }
  },
  "loaded_models": ["MobileNetV2_FER2013"]
}
```

### POST /api/v1/predict
Predict emotion from uploaded image.

**Parameters:**
- `file`: Image file (JPEG, PNG)
- `model`: Model name (e.g., "MobileNetV2_FER2013")

**Response:**
```json
{
  "success": true,
  "model": "MobileNetV2_FER2013",
  "predictions": {
    "happy": 0.85,
    "neutral": 0.10,
    "sad": 0.03,
    "angry": 0.02
  },
  "top_emotion": "happy",
  "confidence": 0.85
}
```

### GET /api/v1/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "device": "cuda",
  "loaded_models": 9,
  "available_models": 9
}
```

## Model Architectures

### MobileNetV2
- **Parameters**: ~3.5M
- **Speed**: Fast inference
- **Use case**: Mobile deployment, real-time applications

### ResNet50
- **Parameters**: ~25.6M  
- **Speed**: Medium inference
- **Use case**: Balanced accuracy and speed

### VGG19
- **Parameters**: ~143.7M
- **Speed**: Slower inference
- **Use case**: High accuracy requirements

## Dataset Information

### FER2013
- **Images**: 35,887 grayscale images
- **Emotions**: 7 (angry, disgust, fear, happy, neutral, sad, surprise)
- **Characteristics**: Challenging dataset with varied lighting conditions

### RAF-DB
- **Images**: 15,339 real-world images
- **Emotions**: 7 (Surprise, Fear, Disgust, Happiness, Sadness, Anger, Neutral)
- **Characteristics**: Real-world scenarios with natural variations

### CK+48
- **Images**: 981 lab-controlled images
- **Emotions**: 7 (anger, contempt, disgust, fear, happy, sadness, surprise)
- **Characteristics**: High-quality controlled environment

## Development

### Adding New Models
1. Add model configuration to `MODEL_CONFIGS`
2. Place model file in `results/` directory
3. Update documentation

### Logging
The application uses Python's logging module. Logs include:
- Model loading status
- Prediction requests
- Error messages
- Performance metrics

### Error Handling
- Invalid model names return 400 status
- Missing model files return 500 status
- Image processing errors are logged and returned
- Health check endpoint for monitoring

## Performance Optimization

### GPU Acceleration
- Automatic CUDA detection
- Model loading to GPU if available
- Optimized tensor operations

### Model Caching
- Models loaded once on startup
- In-memory caching for fast inference
- Lazy loading for missing models

### Memory Management
- Efficient tensor operations
- Proper cleanup of temporary variables
- Optimized image preprocessing

## Troubleshooting

### Common Issues

1. **Model files not found**
   - Ensure model files are in `results/` directory
   - Check file names match configuration

2. **CUDA out of memory**
   - Reduce batch size
   - Use CPU inference
   - Close other GPU applications

3. **Slow inference**
   - Check GPU availability
   - Verify model is loaded to GPU
   - Consider using smaller models

### Debug Mode
Set logging level to DEBUG for detailed information:
```python
logging.basicConfig(level=logging.DEBUG)
```

## License
This project is part of the Emotion Detection Web Application.