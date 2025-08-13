import React from 'react';
import { MenuItem, CartItem } from '../types/menu';
import { getDishImageForName } from '../utils/menuUtils';

interface MenuItemCardProps {
  item: MenuItem;
  cart: CartItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onShowAddons?: (item: MenuItem) => void;
  compatibleAddons?: MenuItem[];
}

export default function MenuItemCard({ 
  item, 
  cart, 
  onAddToCart, 
  onShowAddons, 
  compatibleAddons = [] 
}: MenuItemCardProps) {
  const isVeg = (itemName: string): boolean => {
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

  const getCartItemQuantity = (itemName: string): number => {
    const cartItem = cart.find(cartItem => cartItem.name === itemName);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onAddToCart(item, newQuantity);
    }
  };

  const currentQuantity = getCartItemQuantity(item.name);

  const getImageSrc = (src?: string | null): string => {
    // If item already provides an explicit image
    if (src && src.trim()) {
      if (src.startsWith('/') || src.startsWith('http')) return src;
      return `/dishes/${src}`;
    }
    // Try auto resolver based on name
    const auto = getDishImageForName(item.name);
    if (auto) return auto;
    return '/placeholders/menu-item.svg';
  };

  return (
    <div className="bg-bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {/* Using native img to avoid external domain config; works for public/ assets */}
        <img
          src={getImageSrc(item.image as any)}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src.endsWith('/placeholders/menu-item.svg')) return;
            target.src = '/placeholders/menu-item.svg';
          }}
          loading="lazy"
        />
      </div>

      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-text-primary leading-tight pr-4">{item.name}</h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {isVeg(item.name) && (
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full border-2 border-white" title="Vegetarian"></span>
            )}
            <span className="text-xl font-bold text-primary-red">₹{item.price}</span>
          </div>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  tag === 'Best Selling' ? 'bg-yellow-100 text-yellow-800' :
                  tag === 'New Addition' ? 'bg-blue-100 text-blue-800' :
                  tag === 'Premium' ? 'bg-accent-gold text-text-primary' :
                  tag === 'Discount Available' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-bg-light mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => handleQuantityChange(Math.max(0, currentQuantity - 1))}
                className="px-3 py-1 text-text-secondary hover:bg-gray-100 transition-colors duration-200 rounded-l-md"
                disabled={currentQuantity === 0}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1 min-w-[3rem] text-center border-l border-r border-border font-semibold text-text-primary">
                {currentQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(currentQuantity + 1)}
                className="px-3 py-1 text-text-secondary hover:bg-gray-100 transition-colors duration-200 rounded-r-md"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {compatibleAddons.length > 0 && currentQuantity > 0 && onShowAddons && (
            <button
              onClick={() => onShowAddons(item)}
              className="px-4 py-2 bg-accent-gold text-text-primary text-sm font-semibold rounded-md hover:bg-yellow-400 transition-colors duration-200"
              aria-label="Add extras to your item"
            >
              Extras
            </button>
          )}
        </div>
        {currentQuantity > 0 && (
          <p className="text-sm text-green-600 font-medium mt-3 text-center">
            Added to cart!
          </p>
        )}
      </div>
    </div>
  );
}
