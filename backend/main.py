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

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://localhost:5173", "https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logger.info(f"Using device: {device}")

# Model configurations
MODEL_CONFIGS = {
    "MobileNetV2_FER2013": {
        "architecture": "MobileNetV2",
        "dataset": "FER2013",
        "emotions": ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'],
        "accuracy": 55.68,
        "file": "MobileNetV2_FER2013_best.pt"
    },
    "MobileNetV2_RAF-DB": {
        "architecture": "MobileNetV2", 
        "dataset": "RAF-DB",
        "emotions": ['Surprise', 'Fear', 'Disgust', 'Happiness', 'Sadness', 'Anger', 'Neutral'],
        "accuracy": 73.57,
        "file": "MobileNetV2_RAF-DB_best.pt"
    },
    "MobileNetV2_CK+48": {
        "architecture": "MobileNetV2",
        "dataset": "CK+48", 
        "emotions": ['anger', 'contempt', 'disgust', 'fear', 'happy', 'sadness', 'surprise'],
        "accuracy": 97.98,
        "file": "MobileNetV2_CK+48_best.pt"
    },
    "ResNet50_FER2013": {
        "architecture": "ResNet50",
        "dataset": "FER2013",
        "emotions": ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'],
        "accuracy": 56.60,
        "file": "ResNet50_FER2013_best.pt"
    },
    "ResNet50_RAF-DB": {
        "architecture": "ResNet50",
        "dataset": "RAF-DB", 
        "emotions": ['Surprise', 'Fear', 'Disgust', 'Happiness', 'Sadness', 'Anger', 'Neutral'],
        "accuracy": 76.27,
        "file": "ResNet50_RAF-DB_best.pt"
    },
    "ResNet50_CK+48": {
        "architecture": "ResNet50",
        "dataset": "CK+48",
        "emotions": ['anger', 'contempt', 'disgust', 'fear', 'happy', 'sadness', 'surprise'],
        "accuracy": 98.99,
        "file": "ResNet50_CK+48_best.pt"
    },
    "VGG19_FER2013": {
        "architecture": "VGG19",
        "dataset": "FER2013",
        "emotions": ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'],
        "accuracy": 58.75,
        "file": "VGG19_FER2013_best.pt"
    },
    "VGG19_RAF-DB": {
        "architecture": "VGG19",
        "dataset": "RAF-DB",
        "emotions": ['Surprise', 'Fear', 'Disgust', 'Happiness', 'Sadness', 'Anger', 'Neutral'],
        "accuracy": 80.28,
        "file": "VGG19_RAF-DB_best.pt"
    },
    "VGG19_CK+48": {
        "architecture": "VGG19", 
        "dataset": "CK+48",
        "emotions": ['anger', 'contempt', 'disgust', 'fear', 'happy', 'sadness', 'surprise'],
        "accuracy": 98.99,
        "file": "VGG19_CK+48_best.pt"
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
    elif architecture == "ResNet50":
        model = models.resnet50(weights=None)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    elif architecture == "VGG19":
        model = models.vgg19(weights=None)
        model.classifier[6] = nn.Linear(4096, num_classes)
    else:
        raise ValueError(f"Unsupported architecture: {architecture}")
    
    return model

def load_model(model_name: str):
    """Load a specific model"""
    if model_name in loaded_models:
        return loaded_models[model_name]
    
    if model_name not in MODEL_CONFIGS:
        raise ValueError(f"Model {model_name} not found in configurations")
    
    config = MODEL_CONFIGS[model_name]
    model_path = os.path.join("results", config["file"])
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    
    # Create model
    model = create_model(config["architecture"], len(config["emotions"]))
    
    # Load weights
    try:
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)
        model.to(device)
        model.eval()
        
        loaded_models[model_name] = model
        logger.info(f"Successfully loaded model: {model_name}")
        return model
    
    except Exception as e:
        logger.error(f"Error loading model {model_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error loading model: {str(e)}")

# Remove the startup event that loads all models
# @app.on_event("startup")
# async def startup_event():
#     """Load all models on startup"""
#     logger.info("Loading emotion detection models...")
#     # Check if results directory exists
#     if not os.path.exists("results"):
#         logger.warning("Results directory not found. Models will be loaded on demand.")
#         return
#     # Load each model
#     for model_name in MODEL_CONFIGS.keys():
#         try:
#             load_model(model_name)
#         except Exception as e:
#             logger.warning(f"Could not load model {model_name}: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Emotion Detection API", "version": "1.0.0"}

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
        
        # Make prediction
        with torch.no_grad():
            outputs = emotion_model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        
        # Create prediction dictionary
        predictions = {}
        for i, emotion in enumerate(config["emotions"]):
            predictions[emotion] = float(probabilities[i])
        
        return {
            "success": True,
            "model": model,
            "predictions": predictions,
            "top_emotion": max(predictions, key=predictions.get),
            "confidence": max(predictions.values())
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
        "available_models": len(MODEL_CONFIGS)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)