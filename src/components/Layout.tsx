import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearch }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg">
      <Sidebar />
      <main className="ml-72 flex flex-col min-h-screen">
        <Header onSearch={onSearch} />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
