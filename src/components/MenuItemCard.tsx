import React from 'react';
import { MenuItem, CartItem } from '../types/menu';

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">{item.name}</h3>
          <div className="flex items-center space-x-2">
            {isVeg(item.name) && (
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full" title="Vegetarian"></span>
            )}
            <span className="text-xl font-bold text-green-600">₹{item.price}</span>
          </div>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mb-3">
            {item.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 mb-1 ${
                  tag === 'Best Selling' ? 'bg-yellow-100 text-yellow-800' :
                  tag === 'New Addition' ? 'bg-blue-100 text-blue-800' :
                  tag === 'Premium' ? 'bg-purple-100 text-purple-800' :
                  tag === 'Discount Available' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(Math.max(0, currentQuantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                disabled={currentQuantity === 0}
              >
                -
              </button>
              <span className="px-3 py-1 min-w-[3rem] text-center border-l border-r border-gray-300">
                {currentQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(currentQuantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                +
              </button>
            </div>

            {currentQuantity > 0 && (
              <span className="text-sm text-green-600 font-medium">
                Added to cart!
              </span>
            )}
          </div>

          {compatibleAddons.length > 0 && currentQuantity > 0 && onShowAddons && (
            <button
              onClick={() => onShowAddons(item)}
              className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors duration-200"
            >
              Add Extras
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
