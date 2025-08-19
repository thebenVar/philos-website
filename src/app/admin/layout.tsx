import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-light">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin</h1>
          <nav className="space-x-4">
            <a className="text-sm text-text-primary hover:underline" href="/admin">Dashboard</a>
            <a className="text-sm text-text-primary hover:underline" href="/admin/categories">Categories</a>
            <a className="text-sm text-text-primary hover:underline" href="/admin/items">Items</a>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
