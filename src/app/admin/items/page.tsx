import React from 'react';
import { requireAdmin } from '@/lib/adminServer';
import { headers } from 'next/headers';

async function getItems() {
  const h = await headers();
  const host = h.get('host');
  const proto = process.env.VERCEL ? 'https' : 'http';
  const base = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000');
  const res = await fetch(`${base}/api/admin/items`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function ItemsPage() {
  const ok = await requireAdmin();
  if (!ok) return <p>Unauthorized</p>;
  const items = await getItems();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Items</h2>
        <a href="/admin/items/new" className="text-sm text-primary-red hover:underline">+ New</a>
      </div>
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-light">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: any) => (
              <tr key={it.id} className="border-t border-border/50">
                <td className="p-3">{it.name}</td>
                <td className="p-3">{it.category_name}</td>
                <td className="p-3">₹{it.base_price}</td>
                <td className="p-3">
                  <a className="text-primary-red hover:underline" href={`/admin/items/${it.id}/edit`}>Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
