import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load theme preference
    const theme = localStorage.getItem('theme') || 'light';
    setIsDark(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/': 'Clustering Dashboard',
      '/clusters': 'Clusters View',
      '/analytics': 'Analytics',
      '/how-it-works': 'How It Works',
      '/settings': 'Settings',
      '/help': 'Help Center',
      '/import': 'Import Data',
      '/export': 'Export Results',
    };
    return titles[router.pathname] || 'Dashboard';
  };

  const getPageDescription = () => {
    const descriptions: Record<string, string> = {
      '/': 'Real-time semantic analysis and content grouping',
      '/clusters': 'View and manage all content clusters',
      '/analytics': 'Detailed insights and statistics',
      '/how-it-works': 'Learn about the clustering algorithm',
      '/settings': 'Configure application settings',
      '/help': 'Get help and support',
      '/import': 'Import data for clustering',
      '/export': 'Export clustering results',
    };
    return descriptions[router.pathname] || 'Content deduplication dashboard';
  };

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm sticky top-0 z-30 border-b border-slate-200 dark:border-dark-border">
      <div className="px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{getPageTitle()}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{getPageDescription()}</p>
        </div>
        <div className="flex items-center gap-3">
          {router.pathname === '/' && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search clusters..."
                className="pl-10 pr-4 py-2.5 w-64 border border-slate-300 dark:border-dark-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         bg-white dark:bg-dark-card text-slate-800 dark:text-slate-200
                         placeholder-slate-400 text-sm transition"
              />
              <i className="fas fa-search absolute left-3 top-3.5 text-slate-400"></i>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg transition bg-slate-100 hover:bg-slate-200 
                     dark:bg-dark-border dark:hover:bg-slate-600 
                     text-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button
            className="p-2.5 rounded-lg transition bg-slate-100 hover:bg-slate-200 
                     dark:bg-dark-border dark:hover:bg-slate-600 
                     text-slate-700 dark:text-slate-200 relative"
            aria-label="Notifications"
          >
            <i className="fas fa-bell"></i>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
