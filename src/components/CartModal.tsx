import React from 'react';
import { CartItem, MenuItem } from '../types/menu';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemName: string, newQuantity: number) => void;
  onRemoveFromCart: (itemName: string) => void;
}

export default function CartModal({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart 
}: CartModalProps) {
  if (!isOpen) return null;

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const addonsTotal = item.addons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0;
      return total + itemTotal + (addonsTotal * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (itemName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(itemName);
    } else {
      onUpdateQuantity(itemName, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <button
                      onClick={() => onRemoveFromCart(item.name)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 min-w-[3rem] text-center border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-gray-600">₹{item.price} each</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  {item.addons && item.addons.length > 0 && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-100">
                      <p className="text-sm text-gray-600 mb-1">Add-ons:</p>
                      {item.addons.map((addon, addonIndex) => (
                        <div key={addonIndex} className="flex justify-between text-sm text-gray-600">
                          <span>+ {addon.name}</span>
                          <span>₹{addon.price} × {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Total: ₹{getTotalPrice()}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
