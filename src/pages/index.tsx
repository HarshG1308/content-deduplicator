import Layout from '@/components/Layout';
import { ToastContainer } from '@/components/Toast';
import { api } from '@/lib/api';
import { formatDate, generateId, truncateText } from '@/lib/utils';
import type { Cluster, ClusterResponse, ToastMessage } from '@/types';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [totalClusters, setTotalClusters] = useState(0);
  const [avgClusterSize, setAvgClusterSize] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'size' | 'recent'>('size');
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadClusters();
  }, []);

  const loadClusters = async () => {
    try {
      const data: ClusterResponse = await api.getClusters();
      setClusters(data.clusters);
      setTotalComments(data.total_comments);
      setTotalClusters(data.total_clusters);
      setAvgClusterSize(
        data.total_clusters > 0 ? parseFloat((data.total_comments / data.total_clusters).toFixed(1)) : 0
      );
    } catch (error) {
      console.error('Error loading clusters:', error);
      showToast('Failed to load clusters', 'error');
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) {
      showToast('Please enter a comment', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await api.submitComment({ text: commentInput });
      const message = result.is_new_cluster
        ? 'Created new cluster!'
        : `Added with ${(result.similarity * 100).toFixed(0)}% similarity`;
      showToast(message, 'success');
      setCommentInput('');
      await loadClusters();
    } catch (error) {
      console.error('Error submitting comment:', error);
      showToast('Failed to submit comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message: string, type: ToastMessage['type']) => {
    const id = generateId();
    setToasts((prev) => [...prev.filter((t) => t.type !== type), { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCluster = (clusterId: string) => {
    setExpandedClusters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clusterId)) {
        newSet.delete(clusterId);
      } else {
        newSet.add(clusterId);
      }
      return newSet;
    });
  };

  const filteredClusters = clusters.filter((cluster) =>
    cluster.representative_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedClusters = [...filteredClusters].sort((a, b) => {
    if (sortOrder === 'size') {
      return b.comment_count - a.comment_count;
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const chartData = {
    labels: clusters.map((_, i) => `Cluster ${i + 1}`),
    datasets: [
      {
        label: 'Comments per Cluster',
        data: clusters.map((c) => c.comment_count),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(79, 70, 229, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(79, 70, 229, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#64748b', font: { size: 11 } },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
  };

  const colors = [
    'from-primary-500 to-indigo-600',
    'from-indigo-500 to-purple-600',
    'from-purple-500 to-pink-600',
    'from-pink-500 to-rose-600',
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-cyan-600',
  ];

  return (
    <Layout onSearch={setSearchQuery}>
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Comments</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">{totalComments}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Processed</p>
              </div>
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-comments text-2xl text-primary-600 dark:text-primary-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Clusters</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">{totalClusters}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Identified</p>
              </div>
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-project-diagram text-2xl text-indigo-600 dark:text-indigo-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Average Size</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-2">{avgClusterSize}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Per cluster</p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-bar text-2xl text-emerald-600 dark:text-emerald-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <i className="fas fa-plus-circle text-primary-500"></i>
                Add New Comment
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter text to cluster semantically</p>
            </div>
            <form onSubmit={submitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Comment Text
                </label>
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Enter your comment here..."
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-dark-border rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                           min-h-[140px] transition resize-none
                           bg-white dark:bg-dark-bg text-slate-800 dark:text-slate-200
                           placeholder-slate-400"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">Maximum 500 characters</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {commentInput.length}/500
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white font-semibold py-3 rounded-lg shadow-sm 
                         hover:shadow-md transition flex items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Process Comment</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <i className="fas fa-chart-line text-primary-500"></i>
                Cluster Distribution
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Visual representation of comment groupings
              </p>
            </div>
            <div className="relative h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Clusters Section */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <i className="fas fa-layer-group text-primary-500"></i>
                Semantic Clusters
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Comments grouped by similarity</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'size' | 'recent')}
                className="px-4 py-2 border border-slate-300 dark:border-dark-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         bg-white dark:bg-dark-bg text-slate-700 dark:text-slate-200 text-sm"
              >
                <option value="size">Sort by Size</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-4">
            {sortedClusters.length === 0 ? (
              <div className="text-center text-slate-400 dark:text-slate-500 py-16">
                <div className="w-16 h-16 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-inbox text-3xl text-slate-300 dark:text-slate-600"></i>
                </div>
                <p className="text-base font-medium">No clusters yet</p>
                <p className="text-sm mt-1">Start adding comments to see semantic groupings</p>
              </div>
            ) : (
              sortedClusters.map((cluster, idx) => {
                const density =
                  (cluster.comment_count / Math.max(...clusters.map((c) => c.comment_count))) * 100;
                const colorClass = colors[idx % colors.length];
                const isExpanded = expandedClusters.has(cluster.cluster_id);

                return (
                  <div
                    key={cluster.cluster_id}
                    className="bg-slate-50 dark:bg-dark-bg rounded-lg border border-slate-200 dark:border-dark-border 
                             hover:border-primary-400 dark:hover:border-primary-500 transition-all card-hover fade-in"
                  >
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 focus:outline-none group"
                      onClick={() => toggleCluster(cluster.cluster_id)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} 
                                    flex items-center justify-center text-white font-bold text-lg shadow-sm`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                            Cluster {idx + 1}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                            {truncateText(cluster.representative_text, 80)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                            {cluster.comment_count}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {cluster.comment_count === 1 ? 'Comment' : 'Comments'}
                          </div>
                        </div>
                        <i
                          className={`fas fa-chevron-down text-slate-400 group-hover:text-primary-500 transition transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        ></i>
                      </div>
                    </button>

                    <div className="px-5 pb-4">
                      <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-2 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${colorClass} h-full rounded-full transition-all duration-500`}
                          style={{ width: `${density}%` }}
                        ></div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 space-y-2">
                        <div className="border-t border-slate-200 dark:border-dark-border pt-4">
                          {cluster.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border 
                                       rounded-lg p-4 mb-3 hover:shadow-sm transition"
                            >
                              <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                {comment.text}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1.5">
                                  <i className="fas fa-clock"></i>
                                  {formatDate(comment.timestamp)}
                                </span>
                                {comment.user_id && (
                                  <span className="flex items-center gap-1.5">
                                    <i className="fas fa-user"></i>
                                    {comment.user_id}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </Layout>
  );
}
