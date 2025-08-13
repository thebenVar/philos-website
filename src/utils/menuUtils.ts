import { MenuItem } from '../types/menu';

export const isVegetarian = (itemName: string): boolean => {
  const vegItems = [
    'margherita', 'paneer', 'mushroom', 'quattro formaggi', 'melanzane', 'premavera',
    'wild mushroom', 'pasta arabiata', 'veg soup', 'garlic bread', 'french fries',
    'loaded fries', 'truffle fries', 'potato wedges', 'masala omelet', 'chilly cheese toast',
    'corn', 'cheese', 'broccoli', 'jalepino', 'olives', 'sweet corn', 'double cheese',
    'nachos', 'quesadilla', 'fresh lime', 'sprite', 'iced tea', 'virgin mojito',
    'mango basil', 'passionfruit', 'blue lagoon', 'pina colada', 'irish coffee'
  ];
  return vegItems.some(vegItem => itemName.toLowerCase().includes(vegItem));
};

export const getCompatibleAddons = (item: MenuItem, addons: MenuItem[]): MenuItem[] => {
  const itemName = item.name.toLowerCase();
  const isPizza = itemName.includes('pizza');
  const isPasta = itemName.includes('pasta') || itemName.includes('spaghetti');
  
  return (isPizza || isPasta) ? addons : [];
};

export const calculateItemTotal = (basePrice: number, quantity: number, addons: MenuItem[] = []): number => {
  const addonPrice = addons.reduce((sum, addon) => sum + addon.price, 0);
  return (basePrice + addonPrice) * quantity;
};

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const getUniqueCategories = (menuData: Array<{ category: string; items: MenuItem[] }>): string[] => {
  return menuData
    .map(section => section.category)
    .filter(category => category !== 'Add ons');
};

export const getAllTags = (menuData: Array<{ category: string; items: MenuItem[] }>): Array<{ tag: string; count: number }> => {
  const tagCounts: Record<string, number> = {};
  
  menuData.forEach(section => {
    section.items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
  });

  return Object.entries(tagCounts).map(([tag, count]) => ({ tag, count }));
};

// --- Image auto-matching helpers ---
const normalize = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

// Map a base image path like '/dishes/foo.jpg' to a derivative WebP path '/dishes/thumb/foo.webp' or '/dishes/large/foo.webp'
export const getImageDerivativePath = (basePath: string, kind: 'thumb' | 'large'): string => {
  try {
    if (!basePath || !basePath.startsWith('/')) return basePath;
    const parts = basePath.split('/'); // ['', 'dishes', 'foo.jpg'] or ['', 'gallery', 'sub', 'bar.png']
    if (parts.length < 3) return basePath;
    const root = parts[1];
    const rest = parts.slice(2);
    // remove existing size dir if present
    if (rest[0] === 'thumb' || rest[0] === 'large') rest.shift();
    const filename = rest.pop() as string;
    const nameWebp = filename.replace(/\.[a-z0-9]+$/i, '.webp');
    const subdir = rest.length ? rest.join('/') + '/' : '';
    return `/${root}/${kind}/${subdir}${nameWebp}`;
  } catch {
    return basePath;
  }
};

// Try to resolve a dish image from item name heuristically based on available files in public/dishes
export const getDishImageForName = (name: string): string | null => {
  const raw = name || '';
  const key = normalize(raw);
  const isPizza = /pizza/i.test(raw) || /\((8|10|12)\s*inch\)/i.test(raw);

  type Rule = { pattern: RegExp; file: string; pizzaOnly?: boolean };
  const rules: Rule[] = [
    // Pizza-focused mappings (restricted)
    { pattern: /(bbq|barbe?cue|barbq)/, file: 'bbq.jpg', pizzaOnly: true },
    { pattern: /bolognese|bolon?g?e?n?se/, file: 'bolognese.jpg', pizzaOnly: true },
    { pattern: /(chef|chefs).*?(special|spl)/, file: 'chefspl.jpg', pizzaOnly: true },
    { pattern: /classic.*pork/, file: 'classicpork.jpg', pizzaOnly: true },
    { pattern: /diavola/, file: 'diavola.jpg', pizzaOnly: true },
    { pattern: /gamber(e|a)tt?i|gamberetti|gamberatti/, file: 'gamberatti.jpg', pizzaOnly: true },
    { pattern: /formaggi|quattroformaggi/, file: 'formaggi.jpg', pizzaOnly: true },
    { pattern: /jamaic(an)?|jerk/, file: 'jamaican.jpg', pizzaOnly: true },
    { pattern: /leban(e|i)se/, file: 'lebanise.jpg', pizzaOnly: true },
    { pattern: /margh(a|e)rita|margarita/, file: 'margharita.jpg', pizzaOnly: true },
    { pattern: /meat.*lover/, file: 'meatlovers.jpg', pizzaOnly: true },
    { pattern: /paneer|paneertikka|grilledpaneer/, file: 'paneertikka.jpg', pizzaOnly: true },
    { pattern: /pepperoni/, file: 'pepperoni.jpg', pizzaOnly: true },
  ];

  for (const r of rules) {
    if (r.pizzaOnly && !isPizza) continue;
    if (r.pattern.test(key)) return `/dishes/${r.file}`;
  }
  return null;
};
