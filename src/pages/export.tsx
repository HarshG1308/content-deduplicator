import Layout from '@/components/Layout';

export default function Export() {
  return (
    <Layout>
      <div className="p-8">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Export Results</h1>
          
          <div className="space-y-4">
            <button className="w-full btn-primary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <i className="fas fa-file-download"></i>
              Export as JSON
            </button>
            <button className="w-full bg-slate-200 dark:bg-dark-border text-slate-800 dark:text-slate-200 font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <i className="fas fa-file-csv"></i>
              Export as CSV
            </button>
            <button className="w-full bg-slate-200 dark:bg-dark-border text-slate-800 dark:text-slate-200 font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <i className="fas fa-file-excel"></i>
              Export as Excel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
