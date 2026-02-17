#!/bin/bash

echo "========================================"
echo "Content Deduplicator - Setup Script"
echo "========================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js found: $NODE_VERSION"
else
    echo "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

# Check Python
echo "Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✓ Python found: $PYTHON_VERSION"
else
    echo "✗ Python not found. Please install Python 3.8+ from https://python.org"
    exit 1
fi

# Install Node dependencies
echo ""
echo "Installing Node.js dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✓ Node.js dependencies installed successfully"
else
    echo "✗ Failed to install Node.js dependencies"
    exit 1
fi

# Install Python dependencies
echo ""
echo "Installing Python dependencies..."
pip3 install flask flask-cors sentence-transformers scikit-learn numpy
if [ $? -eq 0 ]; then
    echo "✓ Python dependencies installed successfully"
else
    echo "✗ Failed to install Python dependencies"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "Creating .env.local file..."
    cp .env.example .env.local
    echo "✓ .env.local created"
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Flask Backend:"
echo "  python3 app.py"
echo ""
echo "Terminal 2 - Next.js Frontend:"
echo "  npm run dev"
echo ""
echo "Then open your browser to http://localhost:3000"
echo ""
