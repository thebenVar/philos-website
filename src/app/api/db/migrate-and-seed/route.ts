import { NextResponse } from 'next/server';
import { query, sql as q } from '@/lib/db';
import { menuData } from '../../../../data/menuData';
import { slugify } from '../../../../utils/menuUtils';

export const runtime = 'nodejs';

export async function POST() {
  try {
    // Schema
  await query(q`CREATE TABLE IF NOT EXISTS categories (
      id serial PRIMARY KEY,
      name text UNIQUE NOT NULL,
      sort_order int DEFAULT 0,
      hero_image text
  );`.text);

  await query(q`CREATE TABLE IF NOT EXISTS items (
      id serial PRIMARY KEY,
      category_id int REFERENCES categories(id) ON DELETE CASCADE,
      name text NOT NULL,
      slug text UNIQUE NOT NULL,
      description text,
      base_price int NOT NULL,
      image text,
      calories int,
      rating_avg numeric,
      rating_count int
  );`.text);

  await query(q`CREATE TABLE IF NOT EXISTS tags (
      id serial PRIMARY KEY,
      name text UNIQUE NOT NULL
  );`.text);

  await query(q`CREATE TABLE IF NOT EXISTS item_tags (
      item_id int REFERENCES items(id) ON DELETE CASCADE,
      tag_id int REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (item_id, tag_id)
  );`.text);

  await query(q`CREATE TABLE IF NOT EXISTS item_variants (
      id serial PRIMARY KEY,
      item_id int REFERENCES items(id) ON DELETE CASCADE,
      label text NOT NULL,
      price int NOT NULL,
      image text,
      UNIQUE (item_id, label)
  );`.text);

  await query(q`CREATE TABLE IF NOT EXISTS item_relations (
      item_id int REFERENCES items(id) ON DELETE CASCADE,
      beverage_item_id int REFERENCES items(id) ON DELETE SET NULL,
      side_item_id int REFERENCES items(id) ON DELETE SET NULL,
      addon_item_id int REFERENCES items(id) ON DELETE SET NULL,
      PRIMARY KEY (item_id)
  );`.text);

    // Seed categories
    for (const [idx, section] of menuData.entries()) {
      if (section.category === 'Add ons') continue; // keep addons as items for now
  await query('INSERT INTO categories (name, sort_order) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;', [section.category, idx]);
    }

    // Get category id map
  const { rows: catRows } = await query('SELECT id, name FROM categories;');
    const catMap = new Map<string, string>(catRows.map(r => [r.name, r.id]));

    // Seed items
    for (const section of menuData) {
      if (section.category === 'Add ons') continue;
      const catId = catMap.get(section.category);
      if (!catId) continue;
      for (const it of section.items) {
        const slug = slugify(it.name);
  await query('INSERT INTO items (category_id, name, slug, base_price, image) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (slug) DO NOTHING;', [catId, it.name, slug, it.price, it.image ?? null]);

        // tags
        if (it.tags && it.tags.length) {
          for (const t of it.tags) {
            await query('INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;', [t]);
            await query('INSERT INTO item_tags (item_id, tag_id) SELECT i.id, tg.id FROM items i, tags tg WHERE i.slug=$1 AND tg.name=$2 ON CONFLICT DO NOTHING;', [slug, t]);
          }
        }

        // variants inferred from name (8/10/12 inch)
        const m = it.name.match(/^(.*)\s*\((8|10|12)\s*Inch\)\s*$/i);
        if (m) {
          const base = m[1].trim();
          const siblings = section.items.filter(sib => new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\((8|10|12)\\s*Inch\\)\\s*$`, 'i').test(sib.name));
          for (const sib of siblings) {
            const lm = sib.name.match(/\((8|10|12)\s*Inch\)/i);
            const label = lm ? `${lm[1]} Inch` : 'Std';
            await query('INSERT INTO item_variants (item_id, label, price, image) SELECT id, $1, $2, $3 FROM items WHERE slug=$4 ON CONFLICT (item_id, label) DO NOTHING;', [label, sib.price, sib.image ?? null, slug]);
          }
        }

        // relations
        if (it.related) {
          const bevSlug = it.related.beverage ? slugify(it.related.beverage) : null;
          const sideSlug = it.related.side ? slugify(it.related.side) : null;
          const addonSlug = it.related.addon ? slugify(it.related.addon) : null;
          await query(
            `INSERT INTO item_relations (item_id, beverage_item_id, side_item_id, addon_item_id)
             VALUES (
               (SELECT id FROM items WHERE slug=$1),
               (SELECT id FROM items WHERE slug=$2),
               (SELECT id FROM items WHERE slug=$3),
               (SELECT id FROM items WHERE slug=$4)
             )
             ON CONFLICT (item_id) DO UPDATE SET
               beverage_item_id = EXCLUDED.beverage_item_id,
               side_item_id = EXCLUDED.side_item_id,
               addon_item_id = EXCLUDED.addon_item_id;`,
            [slug, bevSlug, sideSlug, addonSlug]
          );
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 });
  }
}
