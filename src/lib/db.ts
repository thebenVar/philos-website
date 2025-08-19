import { Pool } from 'pg';

let _pool: Pool | null = null;

const getPool = () => {
  if (_pool) return _pool;
  const connectionString = process.env.POSTGRES_URL;
  _pool = new Pool({ connectionString });
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
