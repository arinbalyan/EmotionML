import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from typing import Dict, List
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Emotion Detection API",
    description="Real-time emotion detection using deep learning models",
    version="1.0.0"
)

# CORS middleware - Updated for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device configuration - Force CPU for serverless
device = torch.device("cpu")
logger.info(f"Using device: {device}")

# Simplified model configurations for serverless deployment
MODEL_CONFIGS = {
    "MobileNetV2_FER2013": {
        "architecture": "MobileNetV2",
        "dataset": "FER2013",
        "emotions": ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'],
        "accuracy": 55.68,
        "file": "MobileNetV2_FER2013_best.pt"
    }
}

# Global variables for loaded models
loaded_models = {}
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

def create_model(architecture: str, num_classes: int):
    """Create model architecture"""
    if architecture == "MobileNetV2":
        model = models.mobilenet_v2(weights=None)
        model.classifier[1] = nn.Linear(model.last_channel, num_classes)
    else:
        raise ValueError(f"Unsupported architecture: {architecture}")
    
    return model

def load_model(model_name: str):
    """Load a specific model - simplified for serverless"""
    if model_name in loaded_models:
        return loaded_models[model_name]
    
    if model_name not in MODEL_CONFIGS:
        raise ValueError(f"Model {model_name} not found in configurations")
    
    config = MODEL_CONFIGS[model_name]
    
    # For serverless deployment, we'll create a dummy model
    # In production, you would load the actual model weights
    model = create_model(config["architecture"], len(config["emotions"]))
    model.to(device)
    model.eval()
    
    loaded_models[model_name] = model
    logger.info(f"Successfully loaded model: {model_name}")
    return model

@app.on_event("startup")
async def startup_event():
    """Load models on startup"""
    logger.info("Loading emotion detection models...")
    
    # Load default model
    try:
        load_model("MobileNetV2_FER2013")
    except Exception as e:
        logger.warning(f"Could not load default model: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Emotion Detection API", "version": "1.0.0", "status": "deployed"}

@app.get("/api/v1/models")
async def get_models():
    """Get available models and their information"""
    return {
        "models": MODEL_CONFIGS,
        "loaded_models": list(loaded_models.keys())
    }

@app.post("/api/v1/predict")
async def predict_emotion(
    file: UploadFile = File(...),
    model: str = Form(...)
):
    """Predict emotion from uploaded image"""
    try:
        # Validate model
        if model not in MODEL_CONFIGS:
            raise HTTPException(status_code=400, detail=f"Invalid model: {model}")
        
        # Load model if not already loaded
        emotion_model = load_model(model)
        config = MODEL_CONFIGS[model]
        
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
        
        # Transform image
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        # Make prediction - For demo purposes, return mock predictions
        # In production, you would use: outputs = emotion_model(input_tensor)
        mock_predictions = {
            'happy': 0.75,
            'neutral': 0.15,
            'sad': 0.05,
            'angry': 0.03,
            'surprise': 0.01,
            'fear': 0.01,
            'disgust': 0.00
        }
        
        return {
            "success": True,
            "model": model,
            "predictions": mock_predictions,
            "top_emotion": max(mock_predictions, key=mock_predictions.get),
            "confidence": max(mock_predictions.values()),
            "note": "Demo mode - using mock predictions"
        }
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "device": str(device),
        "loaded_models": len(loaded_models),
        "available_models": len(MODEL_CONFIGS),
        "deployment": "serverless"
    }

# For serverless deployment
handler = app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))