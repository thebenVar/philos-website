import React from 'react';
import CategoryForm from '../CategoryForm';
import { headers } from 'next/headers';
import { requireAdmin } from '@/lib/adminServer';

async function getBaseUrl() {
  const h = await headers();
  const host = h.get('host');
  const proto = process.env.VERCEL ? 'https' : 'http';
  return process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000');
}

export default async function NewCategoryPage() {
  const ok = await requireAdmin();
  if (!ok) return <p>Unauthorized</p>;
  const base = await getBaseUrl();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">New Category</h2>
        <a href="/admin/categories" className="text-sm text-primary-red hover:underline">Back</a>
      </div>
      <div className="bg-white border border-border rounded-lg p-4">
        <CategoryForm initial={null} baseUrl={base} />
      </div>
    </div>
  );
}
