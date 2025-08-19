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

export async function GET(_: NextRequest, context: any) {
  const id = Number(context?.params?.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  try {
    const { rows } = await query('SELECT id, name, sort_order, hero_image FROM categories WHERE id=$1;', [id]);
    if (!rows[0]) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ data: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(context?.params?.id);
  const body = await req.json();
  const name = body?.name as string | undefined;
  const sort = body?.sort_order as number | undefined;
  const hero = (body?.hero_image ?? undefined) as string | undefined;
  if (name !== undefined) await query('UPDATE categories SET name=$1 WHERE id=$2;', [name, id]);
  if (sort !== undefined) await query('UPDATE categories SET sort_order=$1 WHERE id=$2;', [sort, id]);
  if (hero !== undefined) await query('UPDATE categories SET hero_image=$1 WHERE id=$2;', [hero || null, id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, context: any) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(context?.params?.id);
  await query('DELETE FROM categories WHERE id=$1;', [id]);
  return NextResponse.json({ ok: true });
}
