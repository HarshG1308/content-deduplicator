# Quick Deployment Script for Content Deduplicator (Windows)
# This script helps you deploy to free hosting services

Write-Host "🚀 Content Deduplicator - Deployment Helper" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for deployment"
}

Write-Host "Choose deployment option:" -ForegroundColor Green
Write-Host "1. Deploy Frontend to Vercel"
Write-Host "2. Deploy Backend to Render (via GitHub)"
Write-Host "3. Deploy Both (Complete Setup)"
Write-Host "4. Exit"
Write-Host ""
$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📱 Deploying Frontend to Vercel..." -ForegroundColor Cyan
        Write-Host "====================================" -ForegroundColor Cyan
        Write-Host ""
        
        # Check if vercel is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelInstalled) {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host "Please login to Vercel:" -ForegroundColor Yellow
        vercel login
        
        Write-Host ""
        Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
        vercel --prod
        
        Write-Host ""
        Write-Host "✅ Frontend deployed!" -ForegroundColor Green
        Write-Host "Don't forget to add NEXT_PUBLIC_API_BASE environment variable in Vercel dashboard" -ForegroundColor Yellow
    }
    
    "2" {
        Write-Host ""
        Write-Host "🔧 Backend Deployment to Render" -ForegroundColor Cyan
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Steps to deploy backend:" -ForegroundColor Yellow
        Write-Host "1. Push your code to GitHub"
        Write-Host "2. Go to https://render.com and sign up"
        Write-Host "3. Click 'New +' → 'Web Service'"
        Write-Host "4. Connect your GitHub repository"
        Write-Host "5. Render will auto-detect Python and use render.yaml"
        Write-Host "6. Click 'Create Web Service'"
        Write-Host ""
        $pushed = Read-Host "Have you pushed to GitHub? (y/n)"
        
        if ($pushed -ne "y") {
            Write-Host ""
            $repoUrl = Read-Host "Enter your GitHub repository URL"
            try {
                git remote add origin $repoUrl 2>$null
            } catch {
                git remote set-url origin $repoUrl
            }
            git branch -M main
            git add .
            try {
                git commit -m "Prepare for deployment"
            } catch {
                Write-Host "No changes to commit" -ForegroundColor Yellow
            }
            git push -u origin main
            Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "Now go to Render and deploy!" -ForegroundColor Green
        Write-Host "Your backend will be at: https://your-app-name.onrender.com" -ForegroundColor Cyan
    }
    
    "3" {
        Write-Host ""
        Write-Host "🎯 Complete Deployment Setup" -ForegroundColor Cyan
        Write-Host "=============================" -ForegroundColor Cyan
        Write-Host ""
        
        # Push to GitHub
        Write-Host "Step 1: Pushing to GitHub..." -ForegroundColor Yellow
        $repoUrl = Read-Host "Enter your GitHub repository URL"
        try {
            git remote add origin $repoUrl 2>$null
        } catch {
            git remote set-url origin $repoUrl
        }
        git branch -M main
        git add .
        try {
            git commit -m "Prepare for deployment"
        } catch {
            Write-Host "No changes to commit" -ForegroundColor Yellow
        }
        git push -u origin main
        Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "Step 2: Deploy Backend" -ForegroundColor Yellow
        Write-Host "----------------------"
        Write-Host "1. Go to https://render.com"
        Write-Host "2. Sign up and connect GitHub"
        Write-Host "3. Create new Web Service from your repo"
        Write-Host "4. Wait for deployment (~10 mins)"
        Write-Host ""
        $backendUrl = Read-Host "Press Enter when backend is deployed and enter your API URL"
        
        # Update .env.production
        "NEXT_PUBLIC_API_BASE=$backendUrl" | Out-File -FilePath ".env.production" -Encoding UTF8
        git add .env.production
        git commit -m "Update production API URL"
        git push
        
        Write-Host ""
        Write-Host "Step 3: Deploy Frontend" -ForegroundColor Yellow
        Write-Host "----------------------"
        
        # Check if vercel is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelInstalled) {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        vercel login
        vercel --prod
        
        Write-Host ""
        Write-Host "======================================" -ForegroundColor Green
        Write-Host "✅ Deployment Complete!" -ForegroundColor Green
        Write-Host "======================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your app is now live:" -ForegroundColor Cyan
        Write-Host "Frontend: Check Vercel dashboard for URL"
        Write-Host "Backend: $backendUrl"
        Write-Host ""
        Write-Host "Don't forget to:" -ForegroundColor Yellow
        Write-Host "1. Add NEXT_PUBLIC_API_BASE=$backendUrl to Vercel environment variables"
        Write-Host "2. Test your app by submitting a comment"
        Write-Host "3. Check /health endpoint: $backendUrl/health"
    }
    
    "4" {
        Write-Host "Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📚 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host "🐛 Having issues? Check the troubleshooting section in DEPLOYMENT.md" -ForegroundColor Cyan
