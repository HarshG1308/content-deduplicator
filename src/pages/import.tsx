import Layout from '@/components/Layout';

export default function Import() {
  return (
    <Layout>
      <div className="p-8">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Import Data</h1>
          
          <div className="border-2 border-dashed border-slate-300 dark:border-dark-border rounded-lg p-12 text-center">
            <i className="fas fa-cloud-upload-alt text-5xl text-slate-400 dark:text-slate-500 mb-4"></i>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Upload Your Data
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Drag and drop files here or click to browse
            </p>
            <button className="btn-primary text-white font-semibold py-2 px-6 rounded-lg">
              Select Files
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
