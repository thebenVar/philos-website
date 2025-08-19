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

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  try {
    const { rows } = await query(
      `SELECT i.id, i.name, i.slug, i.base_price, i.image, i.description, i.calories, i.category_id,
              c.name as category_name
         FROM items i
         LEFT JOIN categories c ON c.id = i.category_id
        WHERE i.id=$1;`,
      [id]
    );
    if (!rows[0]) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ data: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(params.id);
  const body = await req.json();
  const { name, base_price, category_id, image, description, calories } = body || {};
  // Build dynamic update
  const fields: string[] = [];
  const values: any[] = [];
  if (name !== undefined) { fields.push('name'); values.push(String(name)); }
  if (base_price !== undefined) { fields.push('base_price'); values.push(Number(base_price)); }
  if (category_id !== undefined) { fields.push('category_id'); values.push(Number(category_id)); }
  if (image !== undefined) { fields.push('image'); values.push(image || null); }
  if (description !== undefined) { fields.push('description'); values.push(description || null); }
  if (calories !== undefined) { fields.push('calories'); values.push(calories === null ? null : Number(calories)); }
  if (!fields.length) return NextResponse.json({ ok: true });
  const sets = fields.map((f, i) => `${f}=$${i + 1}`).join(', ');
  await query(`UPDATE items SET ${sets} WHERE id=$${fields.length + 1};`, [...values, id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const id = Number(params.id);
  await query('DELETE FROM items WHERE id=$1;', [id]);
  return NextResponse.json({ ok: true });
}
