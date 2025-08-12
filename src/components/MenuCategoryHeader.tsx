import React from 'react';
import { MenuCategory } from '../types/menu';
import { imageMap } from '../data/menuData';

interface MenuCategoryHeaderProps {
  category: MenuCategory;
  itemCount: number;
}

export default function MenuCategoryHeader({ category, itemCount }: MenuCategoryHeaderProps) {
  return (
    <div className="mb-10">
      <div className="relative h-48 rounded-xl overflow-hidden shadow-lg mb-6">
        <img 
          src={imageMap[category.category] || '/gallery/restaurant.png'} 
          alt={category.category}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
