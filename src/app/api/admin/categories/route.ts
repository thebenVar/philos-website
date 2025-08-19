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
    const { rows } = await query('SELECT id, name, sort_order, hero_image FROM categories ORDER BY sort_order, name;');
    return NextResponse.json({ data: rows });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const name = (body?.name || '').trim();
  const sort = Number(body?.sort_order ?? 0);
  const hero = (body?.hero_image ?? '').toString().trim() || null;
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });
  await query('INSERT INTO categories (name, sort_order, hero_image) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;', [name, sort, hero]);
  return NextResponse.json({ ok: true });
}
