import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface SidebarProps {
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fa-th-large', section: 'Main Menu' },
    { path: '/clusters', label: 'Clusters', icon: 'fa-project-diagram', section: 'Tools' },
    { path: '/analytics', label: 'Analytics', icon: 'fa-chart-line', section: 'Tools' },
    { path: '/import', label: 'Import Data', icon: 'fa-upload', section: 'Tools' },
    { path: '/export', label: 'Export Results', icon: 'fa-download', section: 'Tools' },
    { path: '/how-it-works', label: 'How It Works', icon: 'fa-info-circle', section: 'Help' },
    { path: '/settings', label: 'Settings', icon: 'fa-cog', section: 'System' },
    { path: '/help', label: 'Help', icon: 'fa-question-circle', section: 'System' },
  ];

  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <aside className="w-72 sidebar-gradient dark:bg-dark-sidebar text-white flex flex-col shadow-xl h-screen fixed left-0 top-0 z-40">
      <div className="px-6 py-8 border-b border-slate-700 dark:border-slate-600">
        <Link href="/" className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-layer-group text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Content Deduplicator</h1>
            <p className="text-xs text-slate-400">Professional Edition</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              {section}
            </p>
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => onNavigate?.(item.path)}
                    className={`
                      py-2.5 px-4 rounded-lg cursor-pointer transition flex items-center gap-3
                      ${
                        isActive
                          ? 'bg-primary-500 bg-opacity-20 border border-primary-500 font-medium text-primary-300'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700 hover:bg-opacity-50'
                      }
                    `}
                  >
                    <i className={`fas ${item.icon} w-5`}></i>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-slate-700 dark:border-slate-600">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-400 dark:text-slate-500">System Status</span>
        </div>
        <p className="text-sm font-semibold text-green-400">Active & Running</p>
        <p className="text-xs text-slate-500 dark:text-slate-600 mt-3">&copy; 2026 Content Deduplicator</p>
      </div>
    </aside>
  );
};

export default Sidebar;
