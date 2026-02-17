import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Help() {
  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-slate-200 dark:border-dark-border p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Help Center</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Getting Started
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Welcome to Content Deduplicator! To get started:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                <li>Add your first comment in the Dashboard</li>
                <li>Watch as similar comments are automatically grouped</li>
                <li>Explore clusters to see patterns in your content</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                    How does the clustering algorithm work?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our system uses advanced machine learning to analyze the semantic meaning of text. 
                    Check out the <Link href="/how-it-works" className="text-primary-600 dark:text-primary-400 underline">How It Works</Link> page for detailed information.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                    Can I adjust the similarity threshold?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Yes! Visit the Settings page to configure the similarity threshold. Higher values create 
                    more specific clusters, while lower values create broader groupings.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                    How do I export my results?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Navigate to the Export page to download your clustering results in JSON, CSV, or Excel format.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Need More Help?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Contact our support team at support@contentdeduplicator.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
