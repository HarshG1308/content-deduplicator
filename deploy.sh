#!/bin/bash

# Quick Deployment Script for Content Deduplicator
# This script helps you deploy to free hosting services

echo "🚀 Content Deduplicator - Deployment Helper"
echo "============================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
fi

echo "Choose deployment option:"
echo "1. Deploy Frontend to Vercel"
echo "2. Deploy Backend to Render (via GitHub)"
echo "3. Deploy Both (Complete Setup)"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📱 Deploying Frontend to Vercel..."
        echo "===================================="
        echo ""
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "Please login to Vercel:"
        vercel login
        
        echo ""
        echo "Deploying to Vercel..."
        vercel --prod
        
        echo ""
        echo "✅ Frontend deployed!"
        echo "Don't forget to add NEXT_PUBLIC_API_BASE environment variable in Vercel dashboard"
        ;;
        
    2)
        echo ""
        echo "🔧 Backend Deployment to Render"
        echo "================================"
        echo ""
        echo "Steps to deploy backend:"
        echo "1. Push your code to GitHub"
        echo "2. Go to https://render.com and sign up"
        echo "3. Click 'New +' → 'Web Service'"
        echo "4. Connect your GitHub repository"
        echo "5. Render will auto-detect Python and use render.yaml"
        echo "6. Click 'Create Web Service'"
        echo ""
        read -p "Have you pushed to GitHub? (y/n): " pushed
        
        if [ "$pushed" != "y" ]; then
            echo ""
            read -p "Enter your GitHub repository URL: " repo_url
            git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
            git branch -M main
            git add .
            git commit -m "Prepare for deployment" 2>/dev/null || echo "No changes to commit"
            git push -u origin main
            echo "✅ Code pushed to GitHub!"
        fi
        
        echo ""
        echo "Now go to Render and deploy!"
        echo "Your backend will be at: https://your-app-name.onrender.com"
        ;;
        
    3)
        echo ""
        echo "🎯 Complete Deployment Setup"
        echo "============================="
        echo ""
        
        # Push to GitHub
        echo "Step 1: Pushing to GitHub..."
        read -p "Enter your GitHub repository URL: " repo_url
        git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"
        git branch -M main
        git add .
        git commit -m "Prepare for deployment" 2>/dev/null || echo "No changes to commit"
        git push -u origin main
        echo "✅ Code pushed to GitHub!"
        
        echo ""
        echo "Step 2: Deploy Backend"
        echo "----------------------"
        echo "1. Go to https://render.com"
        echo "2. Sign up and connect GitHub"
        echo "3. Create new Web Service from your repo"
        echo "4. Wait for deployment (~10 mins)"
        echo ""
        read -p "Press Enter when backend is deployed and copy your API URL: " backend_url
        
        # Update .env.production
        echo "NEXT_PUBLIC_API_BASE=$backend_url" > .env.production
        git add .env.production
        git commit -m "Update production API URL"
        git push
        
        echo ""
        echo "Step 3: Deploy Frontend"
        echo "----------------------"
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        vercel login
        vercel --prod
        
        echo ""
        echo "======================================"
        echo "✅ Deployment Complete!"
        echo "======================================"
        echo ""
        echo "Your app is now live:"
        echo "Frontend: Check Vercel dashboard for URL"
        echo "Backend: $backend_url"
        echo ""
        echo "Don't forget to:"
        echo "1. Add NEXT_PUBLIC_API_BASE=$backend_url to Vercel environment variables"
        echo "2. Test your app by submitting a comment"
        echo "3. Check /health endpoint: $backend_url/health"
        ;;
        
    4)
        echo "Goodbye!"
        exit 0
        ;;
        
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo "🐛 Having issues? Check the troubleshooting section in DEPLOYMENT.md"
