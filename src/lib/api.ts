import type { ClusterResponse, CommentSubmitRequest, CommentSubmitResponse, StatsResponse } from '@/types';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

export const api = {
  // Get all clusters
  getClusters: async (): Promise<ClusterResponse> => {
    const response = await axios.get(`${API_BASE}/api/clusters`);
    return response.data;
  },

  // Submit a new comment
  submitComment: async (data: CommentSubmitRequest): Promise<CommentSubmitResponse> => {
    const response = await axios.post(`${API_BASE}/api/comment`, data);
    return response.data;
  },

  // Get statistics
  getStats: async (): Promise<StatsResponse> => {
    const response = await axios.get(`${API_BASE}/api/stats`);
    return response.data;
  },

  // Get specific cluster details
  getClusterDetails: async (clusterId: string) => {
    const response = await axios.get(`${API_BASE}/api/cluster/${clusterId}`);
    return response.data;
  },

  // Sidebar actions
  refresh: async () => {
    const response = await axios.post(`${API_BASE}/api/sidebar/refresh`);
    return response.data;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/api/sidebar/upload`, formData);
    return response.data;
  },

  download: async () => {
    const response = await axios.get(`${API_BASE}/api/sidebar/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getSettings: async () => {
    const response = await axios.get(`${API_BASE}/api/sidebar/settings`);
    return response.data;
  },

  updateSettings: async (settings: any) => {
    const response = await axios.post(`${API_BASE}/api/sidebar/settings`, settings);
    return response.data;
  },

  getHelp: async () => {
    const response = await axios.get(`${API_BASE}/api/sidebar/help`);
    return response.data;
  },

  getAbout: async () => {
    const response = await axios.get(`${API_BASE}/api/sidebar/about`);
    return response.data;
  },
};
