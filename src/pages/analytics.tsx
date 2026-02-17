import Layout from '@/components/Layout';

export default function Analytics() {
  return (
    <Layout>
      <div className="p-8">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chart-line text-3xl text-indigo-600 dark:text-indigo-400"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Advanced analytics and insights coming soon</p>
        </div>
      </div>
    </Layout>
  );
}
