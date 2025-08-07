import React from 'react';
import { MenuItem, CartItem } from '../types/menu';

interface AddonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
  availableAddons: MenuItem[];
  onAddToCart: (item: MenuItem, addons: MenuItem[]) => void;
  cart: CartItem[];
  dietFilter: string;
}

export default function AddonModal({
  isOpen,
  onClose,
  selectedItem,
  availableAddons,
  onAddToCart,
  cart,
  dietFilter
}: AddonModalProps) {
  const [selectedAddons, setSelectedAddons] = React.useState<MenuItem[]>([]);

  const isVeg = (itemName: string): boolean => {
    const vegItems = [
      'margherita', 'paneer', 'mushroom', 'quattro formaggi', 'melanzane', 'premavera',
      'wild mushroom', 'pasta arabiata', 'veg soup', 'garlic bread', 'french fries',
      'loaded fries', 'truffle fries', 'potato wedges', 'masala omelet', 'chilly cheese toast',
      'corn', 'cheese', 'broccoli', 'jalepino', 'olives', 'sweet corn', 'double cheese'
    ];
    return vegItems.some(vegItem => itemName.toLowerCase().includes(vegItem));
  };

  const filteredAddons = React.useMemo(() => {
    if (dietFilter === 'All') return availableAddons;
    if (dietFilter === 'Veg') return availableAddons.filter(addon => isVeg(addon.name));
    if (dietFilter === 'Non-Veg') return availableAddons.filter(addon => !isVeg(addon.name));
    return availableAddons;
  }, [availableAddons, dietFilter]);

  const handleAddonToggle = (addon: MenuItem) => {
    setSelectedAddons(prev => {
      const isSelected = prev.find(a => a.name === addon.name);
      if (isSelected) {
        return prev.filter(a => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      onAddToCart(selectedItem, selectedAddons);
      setSelectedAddons([]);
      onClose();
    }
  };

  const getTotalPrice = () => {
    const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return selectedItem ? selectedItem.price + addonPrice : 0;
  };

  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add Extras to {selectedItem.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAddons.map((addon) => {
              const isSelected = selectedAddons.find(a => a.name === addon.name);
              return (
                <div
                  key={addon.name}
                  onClick={() => handleAddonToggle(addon)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {isVeg(addon.name) && (
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full" title="Vegetarian"></span>
                      )}
                      <span className="font-medium text-gray-800">{addon.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-semibold">₹{addon.price}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600">Base Price: ₹{selectedItem.price}</p>
              {selectedAddons.length > 0 && (
                <p className="text-gray-600">
                  Add-ons: ₹{selectedAddons.reduce((sum, addon) => sum + addon.price, 0)}
                </p>
              )}
              <p className="text-xl font-bold text-gray-800">Total: ₹{getTotalPrice()}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
