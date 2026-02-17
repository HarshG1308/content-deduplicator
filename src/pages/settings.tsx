import Layout from '@/components/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="p-8">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Settings</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Similarity Threshold
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.67"
                className="w-full"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Current: 0.67 (67%) - Higher values create more specific clusters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Model Selection
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-bg text-slate-700 dark:text-slate-200">
                <option>all-MiniLM-L6-v2 (Default)</option>
                <option>all-mpnet-base-v2 (Larger)</option>
              </select>
            </div>

            <button className="btn-primary text-white font-semibold py-2 px-6 rounded-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
