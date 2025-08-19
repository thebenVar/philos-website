import React from 'react';
import CategoryForm from '../../CategoryForm';
import { headers } from 'next/headers';
import { requireAdmin } from '@/lib/adminServer';

async function getBaseUrl() {
  const h = await headers();
  const host = h.get('host');
  const proto = process.env.VERCEL ? 'https' : 'http';
  return process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000');
}

async function getCategory(id: string, base: string) {
  const res = await fetch(`${base}/api/admin/categories/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const ok = await requireAdmin();
  if (!ok) return <p>Unauthorized</p>;
  const base = await getBaseUrl();
  const { id } = await params;
  const cat = await getCategory(id, base);
  if (!cat) return <p className="text-sm text-gray-600">Category not found.</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Edit Category</h2>
        <a href="/admin/categories" className="text-sm text-primary-red hover:underline">Back</a>
      </div>
      <div className="bg-white border border-border rounded-lg p-4">
        <CategoryForm initial={cat} baseUrl={base} />
      </div>
    </div>
  );
}
