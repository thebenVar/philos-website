import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';
const TOKEN_DATA = 'admin';

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
  if (!secret) {
    // In dev, provide a default to avoid hard crash, but strongly recommend setting env
    return 'dev-secret-change-me';
  }
  return secret;
}

function sign(data: string): string {
  const h = crypto.createHmac('sha256', getSecret());
  h.update(data);
  return h.digest('base64url');
}

export function createSessionToken(): string {
  const payload = Buffer.from(TOKEN_DATA).toString('base64url');
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split('.') as [string, string];
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig !== expected) return false;
  const data = Buffer.from(payload, 'base64url').toString('utf8');
  return data === TOKEN_DATA;
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12, // 12h
  },
};
