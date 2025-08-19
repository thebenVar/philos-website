import React from 'react';
import { requireAdmin } from '@/lib/adminServer';
import { headers } from 'next/headers';

async function getCategories() {
  const h = await headers();
  const host = h.get('host');
  const proto = process.env.VERCEL ? 'https' : 'http';
  const base = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000');
  const res = await fetch(`${base}/api/admin/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function CategoriesPage() {
  const ok = await requireAdmin();
  if (!ok) return <p>Unauthorized</p>;
  const cats = await getCategories();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <a href="/admin/categories/new" className="text-sm text-primary-red hover:underline">+ New</a>
      </div>
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-light">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Sort</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c: any) => (
              <tr key={c.id} className="border-t border-border/50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.sort_order}</td>
                <td className="p-3">
                  <a className="text-primary-red hover:underline" href={`/admin/categories/${c.id}/edit`}>Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
