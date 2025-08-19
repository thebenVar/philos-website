import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { menuData } from '../../../data/menuData';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const { rows: categories } = await query(
      'SELECT id, name, sort_order, hero_image FROM categories ORDER BY sort_order, name;'
    );

    const { rows: items } = await query(
      'SELECT i.id, i.category_id, i.name, i.slug, i.description, i.base_price, i.image, i.calories, i.rating_avg, i.rating_count FROM items i ORDER BY i.name;'
    );

  const { rows: variants } = await query('SELECT id, item_id, label, price, image FROM item_variants;');

  const { rows: tags } = await query('SELECT t.name as tag, it.item_id FROM item_tags it INNER JOIN tags t ON t.id = it.tag_id;');

    const itemsByCategory: Record<number, any[]> = {};
    for (const c of categories) itemsByCategory[c.id] = [];
    const variantsByItem: Record<number, any[]> = {};
    for (const v of variants) {
      variantsByItem[v.item_id] = variantsByItem[v.item_id] || [];
      variantsByItem[v.item_id].push({ label: v.label, price: v.price, image: v.image || undefined });
    }
    const tagsByItem: Record<number, string[]> = {};
    for (const t of tags) {
      tagsByItem[t.item_id] = tagsByItem[t.item_id] || [];
      tagsByItem[t.item_id].push(t.tag);
    }

    for (const it of items) {
      itemsByCategory[it.category_id]?.push({
        name: it.name,
        price: it.base_price,
        image: it.image || undefined,
        description: it.description || undefined,
        calories: it.calories || undefined,
        variants: variantsByItem[it.id] || undefined,
        tags: tagsByItem[it.id] || undefined,
        slug: it.slug,
      });
    }

    const data = categories.map(c => ({
      category: c.name,
      items: itemsByCategory[c.id] || []
    }));

    // If DB has no categories/items yet, fall back to file data
    if (!data.length) {
      return NextResponse.json({ data: menuData });
    }
    return NextResponse.json({ data });
  } catch (e: any) {
    // Fallback to file data when DB is not configured
    return NextResponse.json({ data: menuData });
  }
}
