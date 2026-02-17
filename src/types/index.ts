export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  user_id?: string;
  cluster_id?: string;
}

export interface Cluster {
  cluster_id: string;
  comment_count: number;
  representative_text: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

export interface ClusterResponse {
  clusters: Cluster[];
  total_clusters: number;
  total_comments: number;
}

export interface CommentSubmitRequest {
  text: string;
  user_id?: string;
}

export interface CommentSubmitResponse {
  comment_id: string;
  cluster_id: string;
  similarity: number;
  is_new_cluster: boolean;
}

export interface StatsResponse {
  total_comments: number;
  total_clusters: number;
  similarity_threshold: number;
  avg_cluster_size: number;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
