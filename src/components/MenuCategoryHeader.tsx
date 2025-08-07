import React from 'react';
import { MenuCategory } from '../types/menu';
import { imageMap } from '../data/menuData';

interface MenuCategoryHeaderProps {
  category: MenuCategory;
  itemCount: number;
}

export default function MenuCategoryHeader({ category, itemCount }: MenuCategoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="relative h-40 rounded-lg overflow-hidden mb-4">
        <img 
          src={imageMap[category.category] || '/gallery/restaurant.png'} 
          alt={category.category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">{category.category}</h2>
            <p className="text-lg opacity-90">{itemCount} items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
