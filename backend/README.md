# Emotion Detection Backend

## Model Loading Optimization

- Models are now loaded **on demand** (only when a prediction is requested), not at startup. This reduces memory usage and allows deployment on platforms with strict memory limits (e.g., Render free tier).
- The `/api/v1/predict` endpoint will load the requested model if it is not already loaded.

## Deployment on Render (Free Tier)

1. **Create a new Web Service** on [Render](https://render.com/):
   - Select your repository or connect your GitHub repo.
   - Set the build and start commands (see below).
   - Use Python 3.8+ environment.
   - Make sure the `results/` directory with all model `.pt` files is included in your repo or available at build time.
   - Set the start command to:
     ```sh
     uvicorn main:app --host 0.0.0.0 --port 10000
     ```
   - (Optional) Set environment variable `PORT=10000` if needed by Render.

2. **Memory Usage**: Only the model requested for prediction is loaded into memory, so the service stays well below the 512MB RAM limit.

3. **Persistent Storage**: The `results/` directory must be present and contain all model files. Render's free tier does not support persistent storage after build, so ensure models are committed to the repo or use a build step to download them.

## Vercel Deployment

- **Not recommended for backend**: Vercel's free tier does not support persistent storage for model files or long-running Python processes. Deploy the backend on Render or another Python-friendly host instead.
- You can deploy the **frontend** (React app) on Vercel for free.

## Local Development

- Install dependencies:
  ```sh
  pip install -r requirements.txt
  ```
- Run the server:
  ```sh
  uvicorn main:app --reload
  ```
- The API will be available at `http://localhost:8000/`.

## API Endpoints

- `POST /api/v1/predict` — Predict emotion from an image (specify model name in the request).
- `GET /api/v1/models` — List available models and which are currently loaded.
- `GET /api/v1/health` — Health check.