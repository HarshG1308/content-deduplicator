# Semantic Comment Clustering Application

A real-time semantic comment clustering system that automatically groups similar comments by meaning and intelligently assigns new comments to existing clusters.

## Features

- **Semantic Understanding**: Uses sentence transformers to understand comment meaning
- **Real-time Clustering**: Automatically clusters comments as they arrive
- **Dynamic Cluster Management**: Creates new clusters or adds to existing ones based on similarity
- **Interactive Dashboard**: Web interface for data analysts to visualize clusters
- **RESTful API**: Complete API for integration with other systems

## Architecture

The system uses:
- **Sentence Transformers** for semantic embeddings
- **Cosine Similarity** for measuring comment similarity
- **Dynamic Clustering** with configurable similarity threshold
- **Flask** web framework with REST API
- **Real-time Updates** via AJAX

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser to `http://localhost:5000`

## API Endpoints

### POST /api/comment
Add a new comment and get cluster assignment
```json
{
  "text": "This is a great product!",
  "user_id": "user123"
}
```

### GET /api/clusters
Get all clusters with their comments

### GET /api/cluster/<cluster_id>
Get detailed information about a specific cluster

### GET /api/stats
Get system statistics

## Usage

1. **Add Comments**: Enter comments through the web interface
2. **View Clusters**: See how comments are automatically grouped
3. **Analyze Patterns**: Use the dashboard to understand comment themes
4. **Export Data**: Use the API to integrate with analytics tools

## Configuration

- **Similarity Threshold**: Adjust in `SemanticClusteringEngine` (default: 0.7)
- **Embedding Model**: Change in the constructor (default: 'all-MiniLM-L6-v2')
- **Port**: Modify in `app.run()` (default: 5000)

## Example Use Cases

- **Customer Feedback Analysis**: Group similar customer comments
- **Social Media Monitoring**: Cluster social media mentions
- **Survey Response Analysis**: Categorize open-ended survey responses
- **Content Moderation**: Group similar content for review

## Technical Details

- **Embedding Model**: all-mpnet-base-v2 (768-dimensional vectors)
- **Similarity Metric**: Cosine similarity with dual-comparison
- **Clustering Method**: Threshold-based with dynamic centroids
- **Storage**: In-memory (can be extended to persistent storage)
- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Flask with CORS support

## 🚀 Free Deployment

Deploy your application for **$0/month** using free tier services!

### Quick Deployment

**Option 1: Automated Script (Recommended)**
```bash
# Windows
.\deploy.ps1

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

**Option 2: Manual Deployment**

1. **Backend (Render - Free)**
   - Push code to GitHub
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your repository
   - Auto-deploys with `render.yaml`

2. **Frontend (Vercel - Free)**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Update Environment Variables**
   - Add your backend URL to Vercel: `NEXT_PUBLIC_API_BASE=https://your-api.onrender.com`

📖 **Complete deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions, troubleshooting, and alternative free hosting options.

### Deployment Files Included
- ✅ `render.yaml` - Render configuration
- ✅ `vercel.json` - Vercel configuration
- ✅ `Procfile` - Heroku/Railway configuration
- ✅ `deploy.sh` / `deploy.ps1` - Automated deployment scripts
- ✅ `DEPLOYMENT.md` - Complete deployment guide

## Future Enhancements

- Persistent storage with database integration
- Advanced clustering algorithms (DBSCAN, hierarchical)
- Real-time notifications for new clusters
- Batch processing for large datasets
- Multi-language support
- User authentication and team collaboration