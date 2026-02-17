# Quick Start Script for Content Deduplicator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Content Deduplicator - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.8+ from https://python.org" -ForegroundColor Red
    exit 1
}

# Install Node dependencies
Write-Host ""
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install Node.js dependencies" -ForegroundColor Red
    exit 1
}

# Install Python dependencies
Write-Host ""
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install flask flask-cors sentence-transformers scikit-learn numpy
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Python dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install Python dependencies" -ForegroundColor Red
    exit 1
}

# Create .env.local if it doesn't exist
if (-not (Test-Path ".env.local")) {
    Write-Host ""
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✓ .env.local created" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 - Flask Backend:" -ForegroundColor Cyan
Write-Host "  python app.py" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Next.js Frontend:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open your browser to http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
