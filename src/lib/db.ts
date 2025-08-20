import { Pool } from 'pg';

let _pool: Pool | null = null;

const getPool = () => {
  if (_pool) return _pool;
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.VERCEL_POSTGRES_URL;
  if (!connectionString) {
    throw new Error('Database connection string not set. Please define POSTGRES_URL (or DATABASE_URL) in environment.');
  }
  // In Vercel/production, many PG providers require SSL.
  // Allow configuring via POSTGRES_URL plus ssl in production.
  const sslRequired = process.env.NODE_ENV === 'production' || process.env.VERCEL;
  _pool = new Pool({
    connectionString,
    ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
  } as any);
  return _pool;
};

export const query = async <T = any>(text: string, params?: any[]) => {
  const client = await getPool().connect();
  try {
    const res = await client.query<T>(text as any, params as any);
    return res as any;
  } finally {
    client.release();
  }
};

// Tiny helper to mimic sql`...${param}` tagging using pg parameterization
export const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  let text = '';
  const params: any[] = [];
  strings.forEach((str, i) => {
    text += str;
    if (i < values.length) {
      params.push(values[i]);
      text += `$${params.length}`;
    }
  });
  return { text, params };
};
