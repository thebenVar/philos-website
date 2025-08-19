import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const runtime = 'nodejs';

type ItemRow = {
  id: number;
  name: string;
  description: string | null;
  category_id: number;
};

const toKey = (s: string) => (s || '').toLowerCase();

function genPizzaDescription(name: string): string {
  const k = toKey(name);
  if (/(margh(a|e)rita)/.test(k)) return 'A classic Margherita with tangy tomato sauce, fresh mozzarella, basil, and a drizzle of extra-virgin olive oil on our hand-tossed crust.';
  if (/pepperoni/.test(k)) return 'A crowd favorite: crispy pepperoni over rich tomato sauce and mozzarella on a thin, hand-tossed crust.';
  if (/(bbq|barbe?cue)/.test(k)) return 'Smoky BBQ chicken, caramelized onions, and mozzarella on a tangy barbecue base.';
  if (/paneer/.test(k)) return 'Tandoori-spiced paneer with peppers and onions, finished with mozzarella on a tomato base.';
  if (/diavola/.test(k)) return 'A spicy Italian classic with fiery salami, tomato sauce, and mozzarella, finished with chili heat.';
  if (/formaggi|quattro/.test(k)) return 'Silky four-cheese blend on a delicate white base, perfect for cheese lovers.';
  if (/bolognese/.test(k)) return 'Slow-cooked meat ragù layered with mozzarella on our signature crust.';
  if (/(meat.*lover)/.test(k)) return 'A hearty medley of premium meats over tomato sauce and mozzarella.';
  if (/classic.*pork/.test(k)) return 'Savory pork toppings with mellow mozzarella on a rich tomato base.';
  if (/(jamaic|jerk)/.test(k)) return 'Jerk-spiced chicken with peppers and onions, balanced with melty mozzarella.';
  if (/(leban(e|i)se)/.test(k)) return 'Middle Eastern inspired flavors with fresh veggies and herbs over mozzarella.';
  if (/(gamber(e|a)tt?i|gamberetti)/.test(k)) return 'Juicy prawns with garlic and cherry tomatoes, finished with mozzarella.';
  if (/(chef).*?(special|spl)/.test(k)) return 'Our chef’s curated creation featuring premium seasonal toppings and mozzarella.';
  return 'Hand-tossed thin crust pizza with rich tomato sauce and mozzarella, finished with fresh toppings.';
}

function genPastaDescription(name: string): string {
  const k = toKey(name);
  if (/arrabbi?ata|arabiata/.test(k)) return 'Al dente pasta tossed in a spicy arrabbiata sauce with garlic, tomatoes, and chili.';
  if (/bolognese/.test(k)) return 'A comforting bowl of al dente pasta in slow-cooked beef ragù with tomatoes and herbs.';
  if (/alfredo|cream/.test(k)) return 'Creamy Alfredo-style sauce coating al dente pasta, finished with parmesan.';
  return 'Al dente pasta in a house-made sauce, finished with herbs and parmesan.';
}

function genSushiDescription(name: string): string {
  const k = toKey(name);
  if (/tuna/.test(k)) return 'Hand-rolled sushi featuring fresh tuna, seasoned rice, and crisp vegetables.';
  if (/salmon/.test(k)) return 'Delicate salmon with seasoned rice, rolled with nori and fresh vegetables.';
  return 'Authentic hand-rolled sushi with seasoned rice, nori, and fresh fillings.';
}

function genBeverageDescription(name: string): string {
  const k = toKey(name);
  if (/passion/.test(k)) return 'A zesty passionfruit spritzer that’s lightly sweet, refreshing, and served chilled.';
  if (/mojito/.test(k)) return 'A refreshing virgin mojito with mint, lime, and a sparkling finish.';
  if (/blue\s*lagoon/.test(k)) return 'A bright and bubbly Blue Lagoon mocktail with a citrusy kick.';
  if (/pina\s*colada/.test(k)) return 'A creamy piña colada-style mocktail with tropical pineapple and coconut.';
  if (/coffee|irish/.test(k)) return 'Smooth, robust coffee prepared to order and served hot.';
  if (/iced\s*tea|lime|sprite/.test(k)) return 'A crisp, thirst-quenching cooler served ice-cold.';
  return 'A refreshing, house-made beverage served perfectly chilled.';
}

function genSidesDescription(name: string): string {
  const k = toKey(name);
  if (/fries|wedges/.test(k)) return 'Crispy, golden potatoes seasoned to perfection and served hot.';
  if (/garlic\s*bread/.test(k)) return 'Warm, buttery garlic bread with a crisp edge and soft center.';
  if (/nachos|quesadilla|toast/.test(k)) return 'A crunchy, cheesy snack prepared fresh and served warm.';
  return 'A satisfying side prepared fresh to complement your meal.';
}

function genAsianDescription(name: string): string {
  const k = toKey(name);
  if (/teriyaki/.test(k)) return 'Tender cuts glazed in a savory-sweet teriyaki sauce, served with crisp vegetables.';
  return 'A bold, umami-rich Asian specialty with fresh ingredients and balanced flavors.';
}

function genGenericDescription(name: string, category: string): string {
  const kcat = toKey(category);
  const kpizza = /(pizza|\(\s*(8|10|12)\s*inch\s*\))/i;
  if (kpizza.test(name)) return genPizzaDescription(name);
  if (/pasta|spaghetti/.test(toKey(name))) return genPastaDescription(name);
  if (/beverage|drink/.test(kcat)) return genBeverageDescription(name);
  if (/sushi|japanese/.test(kcat)) return genSushiDescription(name);
  if (/side/.test(kcat)) return genSidesDescription(name);
  if (/asian/.test(kcat)) return genAsianDescription(name);
  // Fallback
  return 'A popular menu favorite prepared with fresh ingredients and balanced flavors.';
}

export async function POST() {
  try {
    // Build category map
    const { rows: categories } = await query('SELECT id, name FROM categories;');
    const catMap = new Map<number, string>(categories.map((c: any) => [c.id, c.name]));

    const { rows } = await query('SELECT id, name, description, category_id FROM items;');
    let updated = 0;
    for (const r of rows as ItemRow[]) {
      const current = (r.description || '').trim();
      if (current.length > 0) continue; // skip items that already have a description
      const categoryName = catMap.get(r.category_id) || '';
      const desc = genGenericDescription(r.name, categoryName);
      await query('UPDATE items SET description=$1 WHERE id=$2;', [desc, r.id]);
      updated += 1;
    }

    return NextResponse.json({ ok: true, updated });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 });
  }
}
