import Layout from '@/components/Layout';

export default function Clusters() {
  return (
    <Layout>
      <div className="p-8">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8 text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-project-diagram text-3xl text-primary-600 dark:text-primary-400"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Clusters View</h1>
          <p className="text-slate-600 dark:text-slate-400">Detailed cluster management coming soon</p>
        </div>
      </div>
    </Layout>
  );
}
