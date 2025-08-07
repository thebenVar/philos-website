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
