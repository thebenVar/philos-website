import { NextRequest, NextResponse } from 'next/server';
import { adminCookie, createSessionToken } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body || {};
    const expected = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || '';
    if (!expected) return NextResponse.json({ ok: false, error: 'ADMIN_PASSWORD not set' }, { status: 500 });
    if (!password || password !== expected) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });

    const res = NextResponse.json({ ok: true });
    const token = createSessionToken();
    res.cookies.set(adminCookie.name, token, adminCookie.options);
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 });
  }
}
