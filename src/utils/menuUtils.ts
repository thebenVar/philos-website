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

// Try to resolve a dish image from item name heuristically based on available files in public/dishes
export const getDishImageForName = (name: string): string | null => {
  const key = normalize(name);
  const rules: Array<{ pattern: RegExp; file: string }> = [
    { pattern: /(bbq|barbe?cue|barbq)/, file: 'bbq.jpg' },
    { pattern: /bolognese|bolon?g?e?n?se/, file: 'bolognese.jpg' },
    { pattern: /(chef|chefs).*?(special|spl)/, file: 'chefspl.jpg' },
    { pattern: /classic.*pork/, file: 'classicpork.jpg' },
    { pattern: /diavola/, file: 'diavola.jpg' },
    { pattern: /gamber(e|a)tt?i|gamberetti|gamberatti/, file: 'gamberatti.jpg' },
    { pattern: /formaggi|quattroformaggi/, file: 'formaggi.jpg' },
    { pattern: /jamaic(an)?|jerk/, file: 'jamaican.jpg' },
    { pattern: /leban(e|i)se/, file: 'lebanise.jpg' },
    { pattern: /margh(a|e)rita|margarita/, file: 'margharita.jpg' },
    { pattern: /meat.*lover/, file: 'meatlovers.jpg' },
    { pattern: /paneer|paneertikka|grilledpaneer/, file: 'paneertikka.jpg' },
    { pattern: /pepperoni/, file: 'pepperoni.jpg' },
  ];

  for (const r of rules) {
    if (r.pattern.test(key)) return `/dishes/${r.file}`;
  }
  return null;
};
