import React from 'react';
import { requireAdmin } from '@/lib/adminServer';
import Link from 'next/link';

export default async function AdminHome() {
  const ok = await requireAdmin();
  if (!ok) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form className="space-y-3" action="/admin/login" method="post">
          <input type="password" name="password" placeholder="Password" className="w-full border border-border rounded px-3 py-2" />
          <button formAction="/admin/login" className="w-full bg-primary-red text-white py-2 rounded">Login</button>
        </form>
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-6 bg-white rounded-lg shadow border border-border">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <p className="text-text-secondary mb-3">Create and organize menu categories.</p>
        <Link href="/admin/categories" className="text-primary-red hover:underline">Manage Categories →</Link>
      </div>
      <div className="p-6 bg-white rounded-lg shadow border border-border">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <p className="text-text-secondary mb-3">Manage items, variants, tags, and relations.</p>
        <Link href="/admin/items" className="text-primary-red hover:underline">Manage Items →</Link>
      </div>
    </div>
  );
}
