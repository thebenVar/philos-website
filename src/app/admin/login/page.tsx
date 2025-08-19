"use client";
import React from 'react';

export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const password = data.get('password');
        const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } });
        if (res.ok) {
          location.href = '/admin';
        } else {
          alert('Invalid password');
        }
      }}>
        <input type="password" name="password" placeholder="Password" className="w-full border border-border rounded px-3 py-2" />
        <button className="w-full bg-primary-red text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
