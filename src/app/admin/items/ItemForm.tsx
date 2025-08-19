"use client";
import React, { useEffect, useState } from 'react';

type Category = { id: number; name: string };

type InitialItem = {
  id?: number;
  name: string;
  base_price: number;
  category_id: number;
  image?: string | null;
  description?: string | null;
  calories?: number | null;
};

export default function ItemForm({ initial, baseUrl }: { initial?: InitialItem | null; baseUrl: string }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState<number>(initial?.base_price ?? 0);
  const [categoryId, setCategoryId] = useState<number>(initial?.category_id ?? 0);
  const [image, setImage] = useState<string>(initial?.image ?? '');
  const [description, setDescription] = useState<string>(initial?.description ?? '');
  const [calories, setCalories] = useState<string>(
    initial?.calories == null ? '' : String(initial?.calories)
  );
  const [cats, setCats] = useState<Category[]>([]);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // load categories for select
    fetch(`${baseUrl}/api/admin/categories`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => setCats(j.data || []))
      .catch(() => setCats([]));
  }, [baseUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      const body: any = {
        name: name.trim(),
        base_price: Number(price),
        category_id: Number(categoryId),
        image: image.trim() || null,
        description: description.trim() || null,
        calories: calories === '' ? null : Number(calories),
      };
      const method = initial?.id ? 'PATCH' : 'POST';
      const url = initial?.id
        ? `${baseUrl}/api/admin/items/${initial.id}`
        : `${baseUrl}/api/admin/items`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Request failed ${res.status}`);
      }
      window.location.href = '/admin/items';
    } catch (e: any) {
      setStatus(e.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm('Delete this item?')) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/api/admin/items/${initial.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      window.location.href = '/admin/items';
    } catch (e: any) {
      setStatus(e.message || 'Delete failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input className="w-full border border-border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm mb-1">Base Price (₹)</label>
        <input type="number" className="w-full border border-border rounded px-3 py-2" value={String(price)} onChange={(e) => setPrice(Number(e.target.value))} required />
      </div>
      <div>
        <label className="block text-sm mb-1">Category</label>
        <select className="w-full border border-border rounded px-3 py-2" value={String(categoryId)} onChange={(e) => setCategoryId(Number(e.target.value))} required>
          <option value="0" disabled>Select a category</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Image URL or Path</label>
        <input className="w-full border border-border rounded px-3 py-2" placeholder="e.g. /dishes/pizza.webp or https://..." value={image} onChange={(e) => setImage(e.target.value)} />
        <p className="text-xs text-text-secondary mt-1">Put files in /public (e.g., /dishes/yourfile.webp). Use WebP if possible.</p>
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea className="w-full border border-border rounded px-3 py-2" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Calories</label>
        <input type="number" className="w-full border border-border rounded px-3 py-2" value={calories} onChange={(e) => setCalories(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" disabled={submitting} className="bg-primary-red text-white px-4 py-2 rounded disabled:opacity-50">{initial?.id ? 'Update' : 'Create'}</button>
        {initial?.id ? <button type="button" onClick={onDelete} disabled={submitting} className="text-red-600 px-3 py-2">Delete</button> : null}
        {status ? <span className="text-sm text-gray-600">{status}</span> : null}
      </div>
    </form>
  );
}
