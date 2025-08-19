import React from 'react';
import Image from 'next/image';
import { MenuItem, CartItem } from '../types/menu';
import { getBaseImageForItem, getImageDerivativePath } from '../utils/menuUtils';

interface MenuItemCardProps {
  item: MenuItem;
  cart: CartItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onShowAddons?: (item: MenuItem) => void;
  compatibleAddons?: MenuItem[];
  category?: string;
  onShowDetails?: (item: MenuItem, category?: string) => void; // NEW
}

export default function MenuItemCard({ 
  item, 
  cart, 
  onAddToCart, 
  onShowAddons, 
  compatibleAddons = [],
  category,
  onShowDetails
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
    // Prefer explicit image set on the item
    let basePath: string | null = null;
    if (src && src.trim()) {
      basePath = src.startsWith('/') || src.startsWith('http') ? src : `/dishes/${src}`;
    } else {
      basePath = getBaseImageForItem(item.name, category);
    }
    if (basePath) {
      return getImageDerivativePath(basePath, 'thumb');
    }
    return '/placeholders/menu-item.svg';
  };

  const imageWrapperClasses = `relative w-full aspect-[4/3] ${onShowDetails ? 'cursor-pointer' : ''} bg-gray-100`;
  const titleProps = onShowDetails ? { role: 'button' as const, tabIndex: 0, onClick: () => onShowDetails(item, category), className: 'text-lg font-semibold text-text-primary leading-tight pr-4 cursor-pointer' } : { className: 'text-lg font-semibold text-text-primary leading-tight pr-4' };
  const handleImageClick = () => onShowDetails && onShowDetails(item, category);

  return (
    <div className="bg-bg-white rounded-xl shadow-md border border-border/60 overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition duration-300 flex flex-col h-full">
      {/* Image */}
      <div className={imageWrapperClasses} onClick={handleImageClick} role={onShowDetails ? 'button' : undefined}>
        <Image
          src={getImageSrc((item as any).image)}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 {...titleProps}>{item.name}</h3>
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
        <div className="flex items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            {onShowDetails && (
              <button
                onClick={() => onShowDetails(item, category)}
                className="px-4 py-2 border border-border text-text-primary text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200"
                aria-label={`View details for ${item.name}`}
              >
                View details
              </button>
            )}
            {currentQuantity === 0 && (
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-primary-red text-white text-sm font-semibold rounded-md hover:bg-primary-red-hover transition-colors duration-200"
                aria-label={`Add ${item.name} to cart`}
              >
                Add to cart
              </button>
            )}
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
