import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { menuData } from '../../../../data/menuData';

export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const { rows: items } = await query(
      'SELECT id, name, slug, description, base_price, image, calories, rating_avg, rating_count, category_id FROM items WHERE slug=$1 LIMIT 1;',
      [slug]
    );
  if (!items.length) throw new Error('not-found');
    const item = items[0];

  const { rows: category } = await query('SELECT name FROM categories WHERE id=$1;', [item.category_id]);
    const categoryName = category[0]?.name || 'Unknown';

  const { rows: variants } = await query('SELECT label, price, image FROM item_variants WHERE item_id=$1;', [item.id]);
  const { rows: tagRows } = await query('SELECT t.name as tag FROM item_tags it INNER JOIN tags t ON t.id = it.tag_id WHERE it.item_id=$1;', [item.id]);
    const tags = tagRows.map(r => r.tag);

  const { rows: rel } = await query('SELECT beverage_item_id, side_item_id, addon_item_id FROM item_relations WHERE item_id=$1;', [item.id]);
    let related: any = undefined;
    if (rel.length) {
      const r = rel[0];
  const lookup = async (id?: number | null) => (id ? (await query('SELECT name FROM items WHERE id=$1;', [id])).rows[0]?.name : undefined);
      related = {
        beverage: await lookup(r.beverage_item_id),
        side: await lookup(r.side_item_id),
        addon: await lookup(r.addon_item_id)
      };
    }

    return NextResponse.json({
      item: {
        name: item.name,
        price: item.base_price,
        image: item.image || undefined,
        description: item.description || undefined,
        calories: item.calories || undefined,
        variants: variants.length ? variants : undefined,
        tags: tags.length ? tags : undefined,
        category: categoryName,
        related
      }
    });
  } catch (e: any) {
    // Fallback to file data when DB is not configured or item not found in DB
    const slug = params.slug;
    // naive slug matcher
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    for (const section of menuData) {
      for (const it of section.items) {
        if (normalize(it.name) === slug) {
          return NextResponse.json({
            item: {
              name: it.name,
              price: it.price,
              image: it.image || undefined,
              description: undefined,
              calories: undefined,
              variants: undefined,
              tags: it.tags,
              category: section.category,
              related: it.related
            }
          });
        }
      }
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
