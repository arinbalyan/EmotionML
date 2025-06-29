# Backend Deployment Guide

## Deployment Options

### 1. Railway (Recommended)
Railway offers easy deployment with automatic HTTPS and custom domains.

**Steps:**
1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy from the `backend` folder
4. Railway will automatically detect the Dockerfile
5. Set environment variables if needed
6. Your API will be available at `https://your-app.railway.app`

**Configuration:**
- Uses `railway.json` for deployment settings
- Dockerfile handles the build process
- Health check endpoint: `/api/v1/health`

### 2. Render
Free tier available with automatic deployments.

**Steps:**
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy

**Configuration:**
- Uses `render.yaml` for service configuration
- Free tier has limitations (spins down after inactivity)

### 3. Vercel (Serverless)
Good for lightweight deployments.

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the backend directory
3. Follow the prompts
4. Uses `vercel.json` configuration

**Limitations:**
- Serverless functions have execution time limits
- Large model files may not work well
- Uses `main-serverless.py` with mock predictions

### 4. Heroku
Traditional platform with good Python support.

**Steps:**
1. Create Heroku account
2. Install Heroku CLI
3. Create new app: `heroku create your-app-name`
4. Add Python buildpack: `heroku buildpacks:set heroku/python`
5. Deploy: `git push heroku main`

### 5. Google Cloud Run
Containerized deployment with good scaling.

**Steps:**
1. Build Docker image: `docker build -t emotion-api .`
2. Tag for GCR: `docker tag emotion-api gcr.io/PROJECT-ID/emotion-api`
3. Push: `docker push gcr.io/PROJECT-ID/emotion-api`
4. Deploy: `gcloud run deploy --image gcr.io/PROJECT-ID/emotion-api`

## Model Files

**Important:** The actual model files (.pt) are large (9MB - 558MB each) and need to be handled carefully:

1. **For Railway/Render:** Upload model files to cloud storage (AWS S3, Google Cloud Storage) and download them during startup
2. **For Vercel:** Use the serverless version with mock predictions or external model hosting
3. **For production:** Consider model optimization techniques like quantization

## Environment Variables

Set these environment variables in your deployment platform:

```bash
PORT=8000
PYTHONPATH=.
```

## CORS Configuration

Update the CORS origins in your deployed backend to include your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Health Check

All deployment platforms can use the health check endpoint:
- URL: `/api/v1/health`
- Method: GET
- Returns deployment status and model information

## Monitoring

Consider adding monitoring and logging:
- Error tracking (Sentry)
- Performance monitoring
- API usage analytics
- Health check monitoring

## Scaling Considerations

- **Railway/Render:** Automatic scaling based on traffic
- **Vercel:** Serverless scaling with cold starts
- **Google Cloud Run:** Container-based scaling
- **Heroku:** Manual scaling configuration

Choose the deployment option that best fits your needs, budget, and technical requirements.