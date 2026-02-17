import Layout from '@/components/Layout';

export default function HowItWorks() {
  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">How It Works</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            A comprehensive guide to understanding our semantic content deduplication system
          </p>

          {/* Overview */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-info-circle text-primary-600 dark:text-primary-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Overview</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The Content Deduplicator uses advanced machine learning algorithms to automatically group similar
              comments and content into semantic clusters. By analyzing the meaning and context of text rather than
              just matching keywords, our system can identify duplicate or similar content with high accuracy.
            </p>
          </section>

          {/* How It Works - Step by Step */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-cogs text-indigo-600 dark:text-indigo-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The Process</h2>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Text Input & Preprocessing
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    When you submit a comment, the system first preprocesses the text by cleaning and normalizing it.
                    This ensures consistent analysis regardless of formatting, capitalization, or minor variations in
                    punctuation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Advanced Semantic Embedding Generation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    The text is converted into a high-dimensional vector representation (embedding) using the
                    powerful all-mpnet-base-v2 model. This state-of-the-art embedding captures deep semantic meaning
                    in a 768-dimensional space, enabling superior understanding of context and meaning regardless of
                    text length. The enhanced preprocessing ensures consistent semantic representation across
                    different writing styles and lengths.
                  </p>
                  <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-4">
                    <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      Model: all-mpnet-base-v2 <br />
                      Embedding Size: 768 dimensions <br />
                      Technology: MPNet (Microsoft Research) <br />
                      Enhancement: Advanced text preprocessing
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Enhanced Similarity Calculation
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    The system uses an advanced dual-comparison approach: first comparing the new comment&apos;s embedding
                    with cluster centroids, then verifying against representative texts. This ensures accurate
                    clustering regardless of text length - whether you write one line or ten lines with the same
                    meaning, they&apos;ll cluster together correctly.
                  </p>
                  <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-4">
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                      <strong>Similarity Threshold:</strong> 65% (0.65)
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Optimized threshold for better semantic grouping across varying text lengths. The dual-similarity
                      approach ensures texts with the same meaning cluster together, even if expressed differently or
                      at different lengths.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Cluster Assignment
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Based on the similarity scores, the system makes a decision:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-3 text-slate-600 dark:text-slate-400">
                    <li>
                      <strong>Existing Cluster:</strong> If a cluster with sufficient similarity exists, the comment is
                      added to that cluster, and the cluster&apos;s centroid is updated.
                    </li>
                    <li>
                      <strong>New Cluster:</strong> If no similar cluster is found, a new cluster is created with this
                      comment as its first member.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Centroid Update & Optimization
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    When a comment is added to an existing cluster, the cluster&apos;s centroid (average position) is
                    recalculated to represent the center point of all comments in that cluster. This ensures that
                    future similarity comparisons are based on the collective meaning of the cluster.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Visualization & Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    The results are displayed in real-time through our interactive dashboard, showing cluster sizes,
                    distribution, and detailed comment breakdowns. You can explore each cluster, see the similarity
                    scores, and analyze patterns in your content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-purple-600 dark:text-purple-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Technical Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <i className="fas fa-brain text-primary-500"></i>
                  Machine Learning Model
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>Architecture:</strong> MPNet (Microsoft Permuted Language Model)</li>
                  <li><strong>Model:</strong> all-mpnet-base-v2</li>
                  <li><strong>Dimensions:</strong> 768</li>
                  <li><strong>Training:</strong> Pre-trained on massive text corpus</li>
                  <li><strong>Features:</strong> Enhanced semantic understanding, length-agnostic</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <i className="fas fa-project-diagram text-indigo-500"></i>
                  Clustering Algorithm
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>Method:</strong> Agglomerative Clustering</li>
                  <li><strong>Similarity:</strong> Cosine Similarity</li>
                  <li><strong>Threshold:</strong> 0.67 (configurable)</li>
                  <li><strong>Real-time:</strong> Dynamic cluster updates</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <i className="fas fa-server text-emerald-500"></i>
                  Backend Technology
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>Framework:</strong> Next.js 14 + Flask API</li>
                  <li><strong>Language:</strong> TypeScript + Python</li>
                  <li><strong>Libraries:</strong> sentence-transformers, sklearn</li>
                  <li><strong>Storage:</strong> In-memory + JSON persistence</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <i className="fas fa-paint-brush text-pink-500"></i>
                  Frontend Technology
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>Framework:</strong> Next.js 14 with React</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>Charts:</strong> Chart.js</li>
                  <li><strong>Icons:</strong> Font Awesome</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-lightbulb text-emerald-600 dark:text-emerald-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Use Cases</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: 'fa-comments',
                  color: 'primary',
                  title: 'Comment Moderation',
                  description: 'Automatically group similar user comments to identify common themes and reduce moderation workload.',
                },
                {
                  icon: 'fa-file-alt',
                  color: 'indigo',
                  title: 'Content Deduplication',
                  description: 'Identify and merge duplicate or near-duplicate content across large document collections.',
                },
                {
                  icon: 'fa-chart-line',
                  color: 'purple',
                  title: 'Feedback Analysis',
                  description: 'Cluster customer feedback to identify common issues, feature requests, and sentiment patterns.',
                },
                {
                  icon: 'fa-tags',
                  color: 'pink',
                  title: 'Content Tagging',
                  description: 'Automatically organize and tag content based on semantic similarity without manual categorization.',
                },
              ].map((useCase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-lg p-5 hover:border-primary-400 dark:hover:border-primary-500 transition card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-${useCase.color}-100 dark:bg-${useCase.color}-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`fas ${useCase.icon} text-${useCase.color}-600 dark:text-${useCase.color}-400`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{useCase.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-blue-600 dark:text-blue-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Key Benefits</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: 'fa-bolt', title: 'Fast & Efficient', description: 'Real-time clustering with optimized algorithms' },
                { icon: 'fa-bullseye', title: 'High Accuracy', description: 'Semantic analysis captures true meaning' },
                { icon: 'fa-expand-arrows-alt', title: 'Scalable', description: 'Handles thousands of documents efficiently' },
                { icon: 'fa-sliders-h', title: 'Configurable', description: 'Adjust similarity thresholds to your needs' },
                { icon: 'fa-eye', title: 'Transparent', description: 'Visual insights into clustering decisions' },
                { icon: 'fa-sync', title: 'Real-time', description: 'Immediate feedback and updates' },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-bg dark:to-dark-card border border-slate-200 dark:border-dark-border rounded-lg p-5 text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${benefit.icon} text-primary-600 dark:text-primary-400`}></i>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
