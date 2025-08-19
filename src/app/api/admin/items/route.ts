import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { adminCookie, verifySessionToken } from '@/lib/adminAuth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

function isAuthed() {
  const c = cookies();
  // @ts-ignore - cookies may be promise in newer types, handle both
  const ck = (c as any).get ? (c as any).get(adminCookie.name)?.value : undefined;
  return verifySessionToken(ck);
}

export async function GET() {
  try {
    const { rows } = await query('SELECT i.id, i.name, i.base_price, c.name as category_name FROM items i LEFT JOIN categories c ON c.id = i.category_id ORDER BY i.name;');
    return NextResponse.json({ data: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const { name, base_price, category_id, image, description, calories } = body || {};
  if (!name || !category_id || base_price == null) return NextResponse.json({ error: 'name, category_id, base_price required' }, { status: 400 });
  await query('INSERT INTO items (name, slug, category_id, base_price, image, description, calories) VALUES ($1, $2, $3, $4, $5, $6, $7);', [
    name,
    (name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    Number(category_id),
    Number(base_price),
    image ?? null,
    description ?? null,
    calories ?? null,
  ]);
  return NextResponse.json({ ok: true });
}
