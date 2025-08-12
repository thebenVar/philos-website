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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col font-sans">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
          <h2 className="text-3xl font-display font-bold text-stone-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-primary-red text-4xl font-light transition-colors duration-200"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-stone-500">Your cart is empty.</p>
              <p className="text-stone-400 mt-2">Explore our menu to add items.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4 transition-shadow hover:shadow-md bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-stone-800">{item.name}</h3>
                    <button
                      onClick={() => onRemoveFromCart(item.name)}
                      className="text-stone-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-stone-300 rounded-full overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                          className="px-3 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 min-w-[3rem] text-center font-semibold text-stone-700 border-l border-r border-stone-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                          className="px-3 py-1 text-stone-600 hover:bg-stone-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-stone-600 text-sm">@ ₹{item.price}</span>
                    </div>
                    <span className="font-bold text-xl text-stone-800">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  {item.addons && item.addons.length > 0 && (
                    <div className="mt-3 pt-3 pl-4 border-t border-stone-100">
                      <p className="text-sm font-semibold text-stone-600 mb-2">Add-ons:</p>
                      {item.addons.map((addon, addonIndex) => (
                        <div key={addonIndex} className="flex justify-between text-sm text-stone-600">
                          <span>+ {addon.name}</span>
                          <span className="font-medium">₹{addon.price} × {item.quantity}</span>
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
          <div className="p-6 border-t border-stone-200 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-stone-800">Total:</span>
              <span className="text-3xl font-bold text-primary-red">₹{getTotalPrice()}</span>
            </div>
            <button className="w-full bg-primary-red text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
