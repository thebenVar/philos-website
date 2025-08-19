import { cookies } from 'next/headers';
import { verifySessionToken, adminCookie } from './adminAuth';

export async function requireAdmin(): Promise<boolean> {
  try {
    const c = await cookies();
    const token = c.get(adminCookie.name)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
