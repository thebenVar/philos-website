import React from 'react';
import { MenuCategory } from '../types/menu';
import { imageMap } from '../data/menuData';
import { getDishImageForName } from '../utils/menuUtils';

interface MenuCategoryHeaderProps {
  category: MenuCategory;
  itemCount: number;
}

export default function MenuCategoryHeader({ category, itemCount }: MenuCategoryHeaderProps) {
  const resolveItemImage = (img?: string | null): string | null => {
    if (!img) return null;
    if (img.startsWith('/') || img.startsWith('http')) return img;
    return `/dishes/${img}`;
  };

  const inferredFromItems = (): string | null => {
    // Prefer explicit item.image if available
    for (const it of category.items) {
      const explicit = resolveItemImage((it as any).image);
      if (explicit) return explicit;
    }
    // Try auto-matching from item names
    for (const it of category.items) {
      const auto = getDishImageForName(it.name);
      if (auto) return auto;
    }
    return null;
  };

  const bannerSrc = imageMap[category.category] || inferredFromItems() || '/gallery/restaurant.png';

  return (
    <div className="mb-10">
      <div className="relative h-48 rounded-xl overflow-hidden shadow-lg mb-6">
        <img 
          src={bannerSrc}
          alt={category.category}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.src.endsWith('/gallery/restaurant.png')) target.src = '/gallery/restaurant.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-start p-6">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-1">{category.category}</h2>
            <p className="text-lg opacity-90">{itemCount} items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
