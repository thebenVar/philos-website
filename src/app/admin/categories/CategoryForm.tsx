"use client";
import React, { useState } from 'react';

type Props = {
  initial?: { id?: number; name: string; sort_order: number } | null;
  baseUrl: string;
};

export default function CategoryForm({ initial, baseUrl }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [sort, setSort] = useState<number>(initial?.sort_order ?? 0);
  const [status, setStatus] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      const method = initial?.id ? 'PATCH' : 'POST';
      const url = initial?.id
        ? `${baseUrl}/api/admin/categories/${initial.id}`
        : `${baseUrl}/api/admin/categories`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), sort_order: Number(sort) }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Request failed ${res.status}`);
      }
      setStatus('Saved');
      window.location.href = '/admin/categories';
    } catch (err: any) {
      setStatus(err.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm('Delete this category?')) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/api/admin/categories/${initial.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      window.location.href = '/admin/categories';
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
        <input
          className="w-full border border-border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Sort Order</label>
        <input
          type="number"
          className="w-full border border-border rounded px-3 py-2"
          value={String(sort)}
          onChange={(e) => setSort(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-red text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {initial?.id ? 'Update' : 'Create'}
        </button>
        {initial?.id ? (
          <button
            type="button"
            onClick={onDelete}
            disabled={submitting}
            className="text-red-600 px-3 py-2"
          >
            Delete
          </button>
        ) : null}
        {status ? <span className="text-sm text-gray-600">{status}</span> : null}
      </div>
    </form>
  );
}
