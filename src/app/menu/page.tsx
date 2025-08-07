'use client';

import React, { useState } from 'react';
import { MenuItem, CartItem } from '../../types/menu';
import { menuData } from '../../data/menuData';
import { 
  isVegetarian, 
  getCompatibleAddons, 
  getUniqueCategories, 
  getAllTags 
} from '../../utils/menuUtils';
import MenuItemCard from '../../components/MenuItemCard';
import MenuCategoryHeader from '../../components/MenuCategoryHeader';
import FilterBar from '../../components/FilterBar';
import CartModal from '../../components/CartModal';
import AddonModal from '../../components/AddonModal';

export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showAddonModal, setShowAddonModal] = useState<boolean>(false);
  const [dietFilter, setDietFilter] = useState<string>('All');
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  const addons = menuData.find(section => section.category === 'Add ons')?.items || [];

  const addToCart = (item: MenuItem, quantity: number = 1, itemAddons: MenuItem[] = []) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.name === item.name);
      
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        if (itemAddons.length > 0) {
          updatedCart[existingItemIndex].addons = itemAddons;
        }
        return updatedCart;
      } else {
        // Find the category for this item
        const itemCategory = menuData.find(section => 
          section.items.some(sectionItem => sectionItem.name === item.name)
        )?.category || 'Unknown';
        
        return [...prevCart, { 
          ...item, 
          category: itemCategory,
          quantity, 
          addons: itemAddons.length > 0 ? itemAddons : undefined 
        }];
      }
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName));
  };

  const updateCartItemQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemName);
    } else {
      setCart(prevCart => 
        prevCart.map(item => 
          item.name === itemName 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const showAddons = (item: MenuItem) => {
    setSelectedItem(item);
    setShowAddonModal(true);
  };

  const handleAddWithAddons = (item: MenuItem, selectedAddons: MenuItem[]) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    const quantity = existingItem ? existingItem.quantity : 1;
    addToCart(item, quantity, selectedAddons);
  };

  const categories = getUniqueCategories(menuData);
  const availableTags = getAllTags(menuData);

  const filteredData = menuData.filter(section => {
    if (section.category === 'Add ons') return false;
    if (selectedCategory === 'All') return true;
    return section.category === selectedCategory;
  }).map(section => ({
    ...section,
    items: section.items.filter(item => {
      // Tag filter
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some(tag => item.tags?.includes(tag));
        if (!hasSelectedTag) return false;
      }
      
      // Diet filter
      if (dietFilter === 'Veg' && !isVegetarian(item.name)) return false;
      if (dietFilter === 'Non-Veg' && isVegetarian(item.name)) return false;
      
      return true;
    })
  })).filter(section => section.items.length > 0);

  const getTotalCartItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const addonsTotal = item.addons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0;
      return total + itemTotal + (addonsTotal * item.quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600">Discover our delicious selection of dishes</p>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagToggle={(tag) => {
            setSelectedTags(prev => 
              prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
            );
          }}
          dietFilter={dietFilter}
          onDietFilterChange={setDietFilter}
        />

        {getTotalCartItems() > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowCartModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>View Cart ({getTotalCartItems()})</span>
              <span className="font-bold">₹{getTotalPrice()}</span>
            </button>
          </div>
        )}

        <div className="space-y-12">
          {filteredData.map((section) => (
            <div key={section.category}>
              <MenuCategoryHeader 
                category={section}
                itemCount={section.items.length}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => {
                  const compatibleAddons = getCompatibleAddons(item, addons);
                  return (
                    <MenuItemCard
                      key={item.name}
                      item={item}
                      cart={cart}
                      onAddToCart={addToCart}
                      onShowAddons={compatibleAddons.length > 0 ? showAddons : undefined}
                      compatibleAddons={compatibleAddons}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No items found matching your filters.</p>
          </div>
        )}

        <CartModal
          isOpen={showCartModal}
          onClose={() => setShowCartModal(false)}
          cart={cart}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveFromCart={removeFromCart}
        />

        <AddonModal
          isOpen={showAddonModal}
          onClose={() => setShowAddonModal(false)}
          selectedItem={selectedItem}
          availableAddons={addons}
          onAddToCart={handleAddWithAddons}
          cart={cart}
          dietFilter={dietFilter}
        />
      </div>
    </div>
  );
}
