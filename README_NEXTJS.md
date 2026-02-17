# Content Deduplicator - Professional Edition v2.0

A professional-grade content deduplication and semantic clustering application built with Next.js, TypeScript, and advanced machine learning algorithms.

![Content Deduplicator Dashboard](https://via.placeholder.com/800x400?text=Content+Deduplicator+Dashboard)

## Features

- **Semantic Clustering**: Advanced machine learning algorithms to group similar content
- **Real-time Analysis**: Instant clustering and feedback
- **Interactive Dashboard**: Professional UI with dark mode support
- **Visual Analytics**: Charts and graphs to visualize cluster distribution
- **Export Capabilities**: Download results in multiple formats (JSON, CSV, Excel)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript Support**: Full type safety and better developer experience

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Font Awesome
- **HTTP Client**: Axios

### Backend (Flask API)
- **Framework**: Flask (Python)
- **ML Model**: Sentence-BERT (all-MiniLM-L6-v2)
- **Libraries**: sentence-transformers, sklearn, numpy
- **CORS**: flask-cors

## Architecture

```
content-deduplicator/
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Layout.tsx
│   │   └── Toast.tsx
│   ├── pages/             # Next.js pages
│   │   ├── index.tsx      # Dashboard
│   │   ├── how-it-works.tsx
│   │   ├── clusters.tsx
│   │   ├── analytics.tsx
│   │   ├── settings.tsx
│   │   ├── import.tsx
│   │   ├── export.tsx
│   │   └── help.tsx
│   ├── lib/               # Utilities
│   │   ├── api.ts         # API client
│   │   └── utils.ts       # Helper functions
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── styles/            # Global styles
│       └── globals.css
├── app.py                 # Flask backend
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## How It Works

### 1. Text Input & Preprocessing
When you submit a comment, the system preprocesses the text by cleaning and normalizing it.

### 2. Semantic Embedding Generation
Text is converted into a 384-dimensional vector using the Sentence-BERT model (all-MiniLM-L6-v2).

### 3. Similarity Calculation
The system compares embeddings using cosine similarity with a default threshold of 67%.

### 4. Cluster Assignment
Based on similarity scores, comments are either added to existing clusters or create new ones.

### 5. Centroid Update
When comments are added to clusters, centroids are recalculated for improved accuracy.

### 6. Visualization
Results are displayed in real-time through the interactive dashboard.

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- pip (Python package manager)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/content-deduplicator.git
cd content-deduplicator
```

### Step 2: Install Frontend Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install manually:
```bash
pip install flask flask-cors sentence-transformers scikit-learn numpy
```

### Step 4: Create Environment File
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

## Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Flask Backend:**
```bash
python app.py
```
The Flask API will run on `http://localhost:5000`

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
# or
yarn dev
```
The Next.js app will run on `http://localhost:3000`

### Option 2: Production Build

**Build the Next.js app:**
```bash
npm run build
npm start
# or
yarn build
yarn start
```

**Run Flask in production mode:**
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Usage Guide

### Adding Comments
1. Navigate to the Dashboard
2. Enter your comment in the "Add New Comment" section
3. Click "Process Comment"
4. The system will automatically cluster your comment

### Viewing Clusters
- Clusters are displayed on the Dashboard
- Click on any cluster to expand and see all comments
- Use the sort dropdown to organize clusters by size or recency
- Use the search bar to filter clusters

### Exploring the App
- **Dashboard**: Main interface for adding comments and viewing clusters
- **How It Works**: Comprehensive explanation of the clustering algorithm
- **Analytics**: Advanced insights and statistics
- **Settings**: Configure similarity thresholds and model parameters
- **Import/Export**: Import data or export clustering results
- **Help**: FAQ and support information

### Dark Mode
Click the moon/sun icon in the header to toggle between light and dark modes. Your preference is saved automatically.

## Configuration

### Adjusting Similarity Threshold
Edit `app.py`:
```python
clustering_engine = SemanticClusteringEngine(similarity_threshold=0.67)
```
- **Lower values (0.5-0.6)**: Create larger, more general clusters
- **Higher values (0.7-0.9)**: Create smaller, more specific clusters

### Changing the ML Model
Edit `app.py`:
```python
self.model = SentenceTransformer('all-MiniLM-L6-v2')  # Default
# Or use a larger, more accurate model:
# self.model = SentenceTransformer('all-mpnet-base-v2')
```

## API Endpoints

### Comments
- `POST /api/comment` - Submit a new comment
- `GET /api/clusters` - Get all clusters
- `GET /api/cluster/:id` - Get specific cluster details
- `GET /api/stats` - Get system statistics

### Sidebar Actions
- `POST /api/sidebar/refresh` - Refresh data
- `POST /api/sidebar/upload` - Upload file
- `GET /api/sidebar/download` - Download clusters
- `GET|POST /api/sidebar/settings` - Get/update settings
- `GET /api/sidebar/help` - Get help information
- `GET /api/sidebar/about` - Get about information

## TypeScript Types

All TypeScript types are defined in `src/types/index.ts`:
- `Comment` - Individual comment structure
- `Cluster` - Cluster data structure
- `ClusterResponse` - API response format
- `ToastType` - Toast notification types

## Development

### Code Structure
- **Components**: Reusable React components
- **Pages**: Next.js pages (routes)
- **Lib**: Utility functions and API client
- **Types**: TypeScript type definitions
- **Styles**: Global CSS and Tailwind configuration

### Adding New Pages
1. Create a new file in `src/pages/`
2. Import and use the `Layout` component
3. Add navigation link in `Sidebar.tsx`

### Customizing Theme
Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

## Deployment

### Deploy to Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Deploy Flask Backend
- **Heroku**: Use Procfile with gunicorn
- **AWS**: Deploy using Elastic Beanstalk
- **Docker**: Create Dockerfile for containerized deployment

## Troubleshooting

### Common Issues

**Issue**: `ModuleNotFoundError: No module named 'sentence_transformers'`
**Solution**: Install Python dependencies: `pip install sentence-transformers`

**Issue**: Next.js can't connect to Flask API
**Solution**: Ensure Flask is running on port 5000 and check CORS settings

**Issue**: Dark mode not persisting
**Solution**: Check browser localStorage is enabled

**Issue**: Charts not rendering
**Solution**: Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`

## Performance Optimization

- **Model Caching**: The ML model is loaded once at startup
- **Client-side State**: Minimizes API calls with local state management
- **Lazy Loading**: Pages are code-split automatically by Next.js
- **Production Build**: Use `npm run build` for optimized production bundle

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Sentence-BERT**: UKPLab for the amazing sentence transformer models
- **Tailwind CSS**: For the utility-first CSS framework
- **Next.js**: For the powerful React framework
- **Chart.js**: For beautiful data visualizations

## Contact & Support

- **Email**: support@contentdeduplicator.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/content-deduplicator/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/content-deduplicator/wiki)

---

Made with ❤️ by the Content Deduplicator Team

**Version**: 2.0.0 Professional Edition  
**Last Updated**: February 2026
