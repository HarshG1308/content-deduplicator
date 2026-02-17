# Free Deployment Guide

## Overview

This guide covers **100% free deployment options** for the Content Deduplicator application. The app consists of two parts:
- **Frontend:** Next.js (TypeScript)
- **Backend:** Flask API with ML model

---

## 🚀 Recommended Free Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - **RECOMMENDED**

#### **Frontend on Vercel** (Free Forever)
- 100 GB bandwidth/month
- Unlimited projects
- Automatic HTTPS & CDN
- Git integration

#### **Backend on Render** (Free Tier)
- 750 hours/month (enough for 24/7)
- Automatic HTTPS
- Auto-deploy from Git
- 512 MB RAM (sufficient for clustering)

---

## 📦 Step-by-Step Deployment

### **Part 1: Deploy Backend to Render**

#### 1. Prepare Your Repository

First, create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: content-deduplicator-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

#### 2. Add Gunicorn to requirements.txt

Update your `requirements.txt`:
```
flask
flask-cors
sentence-transformers
scikit-learn
numpy
huggingface-hub
transformers
gunicorn
```

#### 3. Update app.py for production

Add this at the end of `app.py`:
```python
if __name__ == '__main__':
    # Use environment port for deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

#### 4. Deploy on Render

1. Go to https://render.com and sign up (free account)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab repository
4. Configure:
   - **Name:** content-deduplicator-api
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --timeout 120`
   - **Instance Type:** Free
5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment (model download takes time)
7. Copy your API URL: `https://your-app-name.onrender.com`

**Note:** Free tier sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

---

### **Part 2: Deploy Frontend to Vercel**

#### 1. Update Environment Variables

Create `.env.production`:
```env
NEXT_PUBLIC_API_BASE=https://your-app-name.onrender.com
```

#### 2. Deploy on Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com and sign up (free account)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
5. Add Environment Variable:
   - **Key:** `NEXT_PUBLIC_API_BASE`
   - **Value:** `https://your-app-name.onrender.com`
6. Click **"Deploy"**
7. Your app will be live at: `https://your-app.vercel.app`

---

## 🔧 Alternative Free Options

### **Option 2: Railway (Backend) + Vercel (Frontend)**

**Railway Free Tier:**
- $5 free credit/month
- Good for ~500 hours
- Better cold-start than Render

**Steps:**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub"**
4. Select your repository
5. Railway auto-detects Python and deploys
6. Add environment variables if needed
7. Copy your Railway URL

### **Option 3: PythonAnywhere (Backend Only)**

**Best for smaller projects:**
- 100 MB disk space
- Always-on (no sleep)
- Good for testing

**Steps:**
1. Sign up at https://www.pythonanywhere.com
2. Upload your code or clone from Git
3. Create virtual environment
4. Install requirements
5. Configure WSGI app
6. Free subdomain: `username.pythonanywhere.com`

**Limitations:** Model size might exceed free tier disk space.

### **Option 4: Fly.io (Full Stack)**

Deploy both frontend and backend on Fly.io:
- 3 VMs free
- 160 GB bandwidth/month
- Persistent storage

---

## 🎯 Quick Deployment Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy Frontend (Vercel)
npm i -g vercel
vercel login
vercel --prod

# 3. Deploy Backend (Render)
# Just connect your GitHub repo on Render dashboard
# Render will auto-deploy on every push
```

---

## ⚙️ Production Optimizations

### 1. Create `.dockerignore`
```
node_modules
.next
.git
.env.local
__pycache__
*.pyc
.vscode
```

### 2. Update `.gitignore`
```
.env.local
.env.production
.vercel
```

### 3. Add Health Check Endpoint

Add to `app.py`:
```python
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model': MODEL_NAME}), 200
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** with secrets
2. **Use environment variables** for API URLs
3. **Enable CORS properly** for your production domain:

```python
# In app.py
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-app.vercel.app"],
        "methods": ["GET", "POST", "OPTIONS"]
    }
})
```

4. **Add rate limiting** (optional):
```bash
pip install flask-limiter
```

---

## 📊 Cost Comparison

| Service | Frontend | Backend | Total Cost |
|---------|----------|---------|------------|
| Vercel + Render | Free | Free | **$0/month** |
| Vercel + Railway | Free | ~$5 credit | **$0/month** |
| Netlify + Render | Free | Free | **$0/month** |
| Fly.io (both) | Free tier | Free tier | **$0/month** |

---

## 🐛 Troubleshooting

### Issue: Model download timeout on Render
**Solution:** Increase timeout in start command:
```bash
gunicorn app:app --timeout 300 --workers 1
```

### Issue: Cold starts are slow
**Solutions:**
1. Use Render's hobby plan ($7/month) - no sleep
2. Use Railway with enough credits
3. Use Fly.io persistent machines
4. Add uptime monitor (e.g., UptimeRobot - free) to ping every 5 minutes

### Issue: Out of memory
**Solution:** Reduce model size or upgrade to paid tier

### Issue: CORS errors
**Solution:** Update CORS settings in `app.py`:
```python
CORS(app, origins=['https://your-vercel-app.vercel.app'])
```

---

## 🎉 Post-Deployment

After deployment, test your app:

1. **Frontend:** Visit `https://your-app.vercel.app`
2. **Backend Health:** Visit `https://your-api.onrender.com/health`
3. **API Test:** Try adding a comment through the UI
4. **Monitor logs:** Check Vercel and Render dashboards

---

## 📝 Deployment Checklist

- [ ] Push code to GitHub
- [ ] Add `gunicorn` to requirements.txt
- [ ] Create `.env.production` with API URL
- [ ] Deploy backend on Render/Railway
- [ ] Wait for model download (5-10 mins)
- [ ] Test backend health endpoint
- [ ] Deploy frontend on Vercel
- [ ] Add backend URL to Vercel environment variables
- [ ] Test full application flow
- [ ] Set up custom domain (optional)
- [ ] Add uptime monitoring (optional)

---

## 🌐 Custom Domain (Optional - Free with Vercel)

1. Go to Vercel dashboard
2. Select your project
3. Click **"Settings"** → **"Domains"**
4. Add your custom domain
5. Update DNS records as instructed
6. HTTPS certificate auto-configured

---

## 💡 Pro Tips

1. **Keep backend warm:** Use cron-job.org (free) to ping your API every 10 minutes
2. **Monitor uptime:** Use UptimeRobot (free) for monitoring
3. **Analytics:** Add Vercel Analytics (free) for frontend insights
4. **Logs:** Both Render and Vercel provide free log access
5. **Auto-deploy:** Both services support automatic deployment on Git push

---

## 🔗 Useful Links

- **Vercel Documentation:** https://vercel.com/docs
- **Render Documentation:** https://render.com/docs
- **Railway Documentation:** https://docs.railway.app
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Flask Deployment:** https://flask.palletsprojects.com/en/2.3.x/deploying/

---

## Need Help?

If you encounter issues:
1. Check service status pages
2. Review deployment logs
3. Test API endpoints manually
4. Verify environment variables
5. Check CORS configuration

**Total Cost: $0/month** 🎉
