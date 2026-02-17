# Content Deduplicator - Getting Started Guide

## Overview

You now have **TWO versions** of the Content Deduplicator application:

1. **Flask + HTML Version** (Original)
   - Simple, single-page application
   - Files: `app.py` + `templates/index.html`
   - Perfect for quick deployment

2. **Next.js + TypeScript Version** (New)
   - Professional, multi-page application
   - Full TypeScript support
   - Better developer experience
   - All sidebar buttons are functional
   - Includes comprehensive "How It Works" page

## Quick Start

### Option A: Flask + HTML Version (Simplest)

**1. Install Python dependencies:**
```bash
pip install flask flask-cors sentence-transformers scikit-learn numpy
```

**2. Run the application:**
```bash
python app.py
```

**3. Open your browser:**
```
http://localhost:5000
```

That's it! The application is now running.

---

### Option B: Next.js + TypeScript Version (Professional)

**1. Run the automated setup (Recommended):**

**Windows:**
```powershell
.\setup.ps1
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**2. Start both servers:**

**Terminal 1 - Flask Backend:**
```bash
python app.py
```

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

**3. Open your browser:**
```
http://localhost:3000
```

---

## Manual Installation (Next.js Version)

If the automated setup doesn't work, follow these steps:

### Step 1: Install Node.js Dependencies
```bash
npm install
# or
yarn install
```

### Step 2: Install Python Dependencies
```bash
pip install flask flask-cors sentence-transformers scikit-learn numpy
```

### Step 3: Create Environment File
Create a file named `.env.local` in the root directory:
```env
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

### Step 4: Start Flask Backend
```bash
python app.py
```
Leave this terminal running. Flask API will be available at `http://localhost:5000`

### Step 5: Start Next.js Frontend (New Terminal)
```bash
npm run dev
# or
yarn dev
```
Next.js app will be available at `http://localhost:3000`

---

## Feature Comparison

| Feature | Flask+HTML | Next.js+TypeScript |
|---------|------------|-------------------|
| Dashboard | ✓ | ✓ |
| Clustering | ✓ | ✓ |
| Dark Mode | ✓ | ✓ (with persistence) |
| "How It Works" Page | ✗ | ✓ |
| Multi-page Navigation | ✗ | ✓ |
| TypeScript Support | ✗ | ✓ |
| Functional Sidebar | Partial | ✓ Full |
| Analytics Page | ✗ | ✓ |
| Settings Page | ✗ | ✓ |
| Import/Export Pages | ✗ | ✓ |
| Help Center | ✗ | ✓ |
| Sticky Sidebar | ✓ | ✓ |

---

## What's New in Next.js Version?

### 1. Fixed Sticky Sidebar
The sidebar now remains fixed when scrolling through the page content.

### 2. All Sidebar Buttons Work
- **Dashboard**: Main clustering interface
- **Clusters**: Dedicated clusters view
- **Analytics**: Advanced analytics (coming soon)
- **Import Data**: File upload interface
- **Export Results**: Download in multiple formats
- **How It Works**: Complete explanation of the algorithm
- **Settings**: Configure similarity thresholds
- **Help**: FAQ and support

### 3. "How It Works" Page
A comprehensive explanation page that covers:
- Overview of the system
- Step-by-step process breakdown
- Technical details
- Use cases
- Key benefits
- Architecture diagrams

### 4. Professional UI
- Consistent color theme across all pages
- No emojis (professional icons only)
- Better typography and spacing
- Improved accessibility
- Mobile-responsive design

### 5. TypeScript Support
- Full type safety
- Better IDE support
- Fewer runtime errors
- Enhanced developer experience

---

## Folder Structure

```
content-deduplicator/
├── Flask + HTML Version:
│   ├── app.py                    # Flask backend
│   └── templates/
│       └── index.html            # Original HTML page
│
├── Next.js + TypeScript Version:
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/               # Next.js pages
│   │   ├── lib/                 # Utilities & API
│   │   ├── types/               # TypeScript types
│   │   └── styles/              # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── Shared:
│   ├── app.py                   # Backend (used by both)
│   ├── README_NEXTJS.md         # Next.js documentation
│   ├── GETTING_STARTED.md       # This file
│   ├── setup.ps1                # Windows setup script
│   └── setup.sh                 # Unix setup script
```

---

## Troubleshooting

### Issue: "Cannot find module 'next'"
**Solution**: Run `npm install` in the project root

### Issue: "ModuleNotFoundError: No module named 'sentence_transformers'"
**Solution**: Run `pip install sentence-transformers`

### Issue: Next.js can't connect to Flask
**Solution**: 
1. Make sure Flask is running on port 5000
2. Check that `.env.local` has the correct API URL
3. Verify CORS settings in `app.py`

### Issue: Port already in use
**Solution**:
- Flask (5000): Change port in `app.py`: `app.run(port=5001)`
- Next.js (3000): Run `npm run dev -- -p 3001`

### Issue: Sidebar not sticky
**Solution**: This is fixed in the Next.js version. The sidebar uses `sticky` positioning and will remain visible when scrolling.

---

## Which Version Should I Use?

### Use Flask + HTML Version if:
- You want the simplest setup
- You need to deploy quickly
- You don't need multiple pages
- You're comfortable with vanilla JavaScript

### Use Next.js + TypeScript Version if:
- You want a professional, production-ready app
- You need the "How It Works" page
- You want all sidebar features functional
- You prefer TypeScript and modern React
- You plan to extend the application
- You want better maintainability

---

## Next Steps

1. **Choose your version** (Flask+HTML or Next.js)
2. **Follow the installation steps** above
3. **Read the documentation**:
   - [README_NEXTJS.md](README_NEXTJS.md) for Next.js version
   - Visit the "How It Works" page in the app
4. **Start clustering**: Add your first comment!

---

## Support

If you need help:
1. Check the "Help" page in the Next.js version
2. Read the "How It Works" page for algorithm details
3. Review the README files
4. Check the troubleshooting section above

---

## Development Commands

### Next.js Version

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Flask Version

```bash
# Development mode
python app.py

# Production mode (with gunicorn)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

**Congratulations!** You're ready to start using the Content Deduplicator.

Choose your version and get started! 🚀
