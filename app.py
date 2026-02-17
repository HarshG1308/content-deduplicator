import json
import logging
import os
import re
import uuid
from datetime import datetime

import numpy as np
from flask import Flask, jsonify, render_template, request, send_file
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)
DATA_FILE = "data.json"
# Using all-mpnet-base-v2 for better semantic understanding with 768 dimensions (close to 786)
MODEL_NAME = "all-mpnet-base-v2"
EMBEDDING_SIZE = 768
model = SentenceTransformer(MODEL_NAME)

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SemanticClusteringEngine:
    def __init__(self, similarity_threshold=0.65):
        # Using all-mpnet-base-v2 (768 dims) for superior semantic understanding
        self.model = SentenceTransformer('all-mpnet-base-v2')
        self.clusters = {}
        self.comments = {}
        # Lower threshold for better semantic grouping across different text lengths
        self.similarity_threshold = similarity_threshold
    
    def preprocess_text(self, text):
        """Enhanced text preprocessing for better semantic matching"""
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace while preserving sentence structure
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters but keep punctuation for context
        text = re.sub(r'[^a-z0-9\s.,!?;:\'-]', '', text)
        # Strip leading/trailing whitespace
        text = text.strip()
        return text
        
    def get_embedding(self, text):
        """Generate embedding for preprocessed text"""
        # Preprocess for consistent semantic representation
        processed_text = self.preprocess_text(text)
        # Generate embedding using more powerful model
        return self.model.encode([processed_text])[0]
    
    def find_best_cluster(self, comment_embedding, comment_text):
        """Find the best matching cluster using enhanced semantic similarity"""
        best_cluster = None
        best_similarity = 0
        
        for cluster_id, cluster_data in self.clusters.items():
            # Calculate cosine similarity
            similarity = cosine_similarity(
                [comment_embedding], 
                [cluster_data['centroid']]
            )[0][0]
            
            # Enhanced similarity calculation that accounts for semantic meaning
            # regardless of text length differences
            if similarity >= self.similarity_threshold:
                # Calculate additional semantic similarity with representative text
                rep_embedding = self.get_embedding(cluster_data['representative_text'])
                direct_similarity = cosine_similarity(
                    [comment_embedding],
                    [rep_embedding]
                )[0][0]
                
                # Use maximum similarity for better semantic grouping
                final_similarity = max(similarity, direct_similarity)
                
                if final_similarity > best_similarity:
                    best_similarity = final_similarity
                    best_cluster = cluster_id
                
        return best_cluster, best_similarity
    
    def create_cluster(self, comment_id, comment_text, embedding):
        """Create a new cluster"""
        cluster_id = str(uuid.uuid4())
        self.clusters[cluster_id] = {
            'id': cluster_id,
            'comments': [comment_id],
            'centroid': embedding,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat(),
            'representative_text': comment_text
        }
        return cluster_id
    
    def add_to_cluster(self, cluster_id, comment_id, embedding):
        """Add comment to existing cluster and update centroid"""
        cluster = self.clusters[cluster_id]
        cluster['comments'].append(comment_id)
        
        # Update centroid (average of all embeddings in cluster)
        all_embeddings = [self.comments[cid]['embedding'] for cid in cluster['comments']]
        cluster['centroid'] = np.mean(all_embeddings, axis=0)
        cluster['updated_at'] = datetime.now().isoformat()
    
    def process_comment(self, comment_text, user_id=None):
        """Process a new comment with enhanced semantic clustering"""
        comment_id = str(uuid.uuid4())
        
        # Generate embedding with preprocessing for consistent semantic representation
        embedding = self.get_embedding(comment_text)
        
        # Store comment with original text
        self.comments[comment_id] = {
            'id': comment_id,
            'text': comment_text,  # Keep original text
            'embedding': embedding,
            'user_id': user_id,
            'timestamp': datetime.now().isoformat(),
            'cluster_id': None
        }
        
        # Find best cluster using enhanced similarity matching
        best_cluster, similarity = self.find_best_cluster(embedding, comment_text)
        
        if best_cluster:
            self.add_to_cluster(best_cluster, comment_id, embedding)
            self.comments[comment_id]['cluster_id'] = best_cluster
            logger.info(f"Added comment to cluster {best_cluster} (similarity: {similarity:.3f})")
            logger.info(f"Comment length: {len(comment_text)} chars")
        else:
            cluster_id = self.create_cluster(comment_id, comment_text, embedding)
            self.comments[comment_id]['cluster_id'] = cluster_id
            logger.info(f"Created new cluster {cluster_id}")
        
        return {
            'comment_id': comment_id,
            'cluster_id': self.comments[comment_id]['cluster_id'],
            'similarity': float(similarity) if best_cluster else 0.0,
            'is_new_cluster': not bool(best_cluster)
        }
    
    def get_clusters_summary(self):
        """Get summary of all clusters"""
        summary = []
        for cluster_id, cluster_data in self.clusters.items():
            comments_in_cluster = [
                self.comments[cid] for cid in cluster_data['comments']
            ]
            summary.append({
                'cluster_id': cluster_id,
                'comment_count': len(cluster_data['comments']),
                'representative_text': cluster_data['representative_text'],
                'created_at': cluster_data['created_at'],
                'updated_at': cluster_data['updated_at'],
                'comments': [
                    {
                        'id': c['id'],
                        'text': c['text'],
                        'timestamp': c['timestamp'],
                        'user_id': c['user_id']
                    } for c in comments_in_cluster
                ]
            })
        return sorted(summary, key=lambda x: x['comment_count'], reverse=True)

# Initialize clustering engine
clustering_engine = SemanticClusteringEngine()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/comment', methods=['POST'])
def add_comment():
    """Add a new comment and get cluster assignment"""
    try:
        data = request.json
        comment_text = data.get('text', '').strip()
        user_id = data.get('user_id')
        
        if not comment_text:
            return jsonify({'error': 'Comment text is required'}), 400
        
        result = clustering_engine.process_comment(comment_text, user_id)
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error processing comment: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/clusters', methods=['GET'])
def get_clusters():
    """Get all clusters with their comments"""
    try:
        clusters = clustering_engine.get_clusters_summary()
        return jsonify({
            'clusters': clusters,
            'total_clusters': len(clusters),
            'total_comments': len(clustering_engine.comments)
        })
    except Exception as e:
        logger.error(f"Error getting clusters: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/cluster/<cluster_id>', methods=['GET'])
def get_cluster_details(cluster_id):
    """Get detailed information about a specific cluster"""
    try:
        if cluster_id not in clustering_engine.clusters:
            return jsonify({'error': 'Cluster not found'}), 404
        
        cluster_data = clustering_engine.clusters[cluster_id]
        comments_in_cluster = [
            clustering_engine.comments[cid] for cid in cluster_data['comments']
        ]
        
        return jsonify({
            'cluster_id': cluster_id,
            'comment_count': len(cluster_data['comments']),
            'representative_text': cluster_data['representative_text'],
            'created_at': cluster_data['created_at'],
            'updated_at': cluster_data['updated_at'],
            'comments': [
                {
                    'id': c['id'],
                    'text': c['text'],
                    'timestamp': c['timestamp'],
                    'user_id': c['user_id']
                } for c in comments_in_cluster
            ]
        })
    except Exception as e:
        logger.error(f"Error getting cluster details: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    try:
        return jsonify({
            'total_comments': len(clustering_engine.comments),
            'total_clusters': len(clustering_engine.clusters),
            'similarity_threshold': clustering_engine.similarity_threshold,
            'avg_cluster_size': len(clustering_engine.comments) / max(len(clustering_engine.clusters), 1)
        })
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# --- Sidebar Option Endpoints ---
@app.route("/api/sidebar/refresh", methods=["POST"])
def sidebar_refresh():
    # Simulate refresh by returning a random timestamp
    return jsonify({"status": "refreshed", "timestamp": datetime.now().isoformat()})

@app.route("/api/sidebar/upload", methods=["POST"])
def sidebar_upload():
    file = request.files.get("file")
    if file:
        content = file.read().decode("utf-8")
        data = load_data()
        data.append({"text": content, "uploaded": True, "time": datetime.now().isoformat()})
        save_data(data)
        return jsonify({"status": "uploaded", "filename": file.filename})
    return jsonify({"status": "error", "message": "No file provided"}), 400

@app.route("/api/sidebar/download", methods=["GET"])
def sidebar_download():
    # Download all clustered data as a file
    data = load_data()
    filename = f"clusters_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return send_file(filename, as_attachment=True)

@app.route("/api/sidebar/settings", methods=["GET", "POST"])
def sidebar_settings():
    if request.method == "POST":
        settings = request.get_json()
        # Save settings (simulate)
        return jsonify({"status": "saved", "settings": settings})
    # Return current settings (simulate)
    return jsonify({"embedding_size": EMBEDDING_SIZE, "model_name": MODEL_NAME})

@app.route("/api/sidebar/help", methods=["GET"])
def sidebar_help():
    help_text = "This dashboard allows you to cluster, upload, download, and configure settings."
    return jsonify({"help": help_text})

@app.route("/api/sidebar/about", methods=["GET"])
def sidebar_about():
    about_text = "Content Deduplicator v1.0. Powered by Flask, Tailwind, and Agglomerative Clustering."
    return jsonify({"about": about_text})

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for deployment monitoring"""
    return jsonify({
        'status': 'healthy',
        'model': MODEL_NAME,
        'embedding_size': EMBEDDING_SIZE,
        'total_clusters': len(clustering_engine.clusters),
        'total_comments': len(clustering_engine.comments)
    }), 200

if __name__ == '__main__':
    # Use environment port for deployment, fallback to 5000 for local dev
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)