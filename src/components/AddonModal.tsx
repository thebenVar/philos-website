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

  // Reset selected addons when the modal is reopened with a new item
  React.useEffect(() => {
    if (isOpen) {
      setSelectedAddons([]);
    }
  }, [isOpen, selectedItem]);

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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col font-sans">
        <div className="p-6 border-b border-stone-200 flex justify-between items-start bg-stone-50">
          <div>
            <h2 className="text-3xl font-display font-bold text-stone-800">Add Extras</h2>
            <p className="text-stone-600 mt-1">to {selectedItem.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-primary-red text-4xl font-light transition-colors duration-200"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAddons.map((addon) => {
              const isSelected = selectedAddons.find(a => a.name === addon.name);
              return (
                <div
                  key={addon.name}
                  onClick={() => handleAddonToggle(addon)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? 'border-accent-gold bg-yellow-50 ring-2 ring-accent-gold' 
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isVeg(addon.name) ? (
                       <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center" title="Vegetarian">
                         <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                       </span>
                    ) : (
                      <span className="w-4 h-4 border-2 border-primary-red flex items-center justify-center" title="Non-Vegetarian">
                        <span className="w-2 h-2 bg-primary-red rounded-full"></span>
                      </span>
                    )}
                    <span className="font-medium text-stone-800">{addon.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-stone-700 font-semibold">₹{addon.price}</span>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected 
                        ? 'border-accent-gold bg-accent-gold' 
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isSelected && <span className="text-white text-sm font-bold">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-stone-200 bg-stone-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-stone-600">Base Price: <span className="font-semibold">₹{selectedItem.price}</span></p>
              {selectedAddons.length > 0 && (
                <p className="text-stone-600">
                  Add-ons: <span className="font-semibold">₹{selectedAddons.reduce((sum, addon) => sum + addon.price, 0)}</span>
                </p>
              )}
              <p className="text-2xl font-bold text-stone-800 mt-1">Total: <span className="text-primary-red">₹{getTotalPrice()}</span></p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary-red text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
