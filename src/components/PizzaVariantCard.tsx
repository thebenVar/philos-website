"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { CartItem, MenuItem } from '../types/menu';
import { isVegetarian, getCompatibleAddons, getDishImageForName, getImageDerivativePath } from '../utils/menuUtils';

export interface PizzaVariantCardProps {
  baseName: string;
  variants: MenuItem[]; // each variant keeps original name including size
  cart: CartItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onShowAddons?: (item: MenuItem) => void;
  addons: MenuItem[]; // list of available addons to compute compatibility
  onShowDetails?: (item: MenuItem, category?: string) => void;
  category?: string;
}

function parseSize(name: string): string | null {
  const m = name.match(/\((\d+)\s*Inch\)/i);
  return m ? `${m[1]}"` : null;
}

function resolveImage(src?: string | null, fallbackName?: string | null): string {
  // If explicit src provided, honor it
  if (src && src.trim()) {
    const base = src.startsWith('/') || src.startsWith('http') ? src : `/dishes/${src}`;
    return getImageDerivativePath(base, 'thumb');
  }
  // Try auto-match based on name
  if (fallbackName) {
    const autoBase = getDishImageForName(fallbackName);
    if (autoBase) return getImageDerivativePath(autoBase, 'thumb');
  }
  // Pizza-only category fallback image before generic placeholder
  if (fallbackName && /pizza/i.test(fallbackName)) {
    return '/dishes/idontknow.jpg';
  }
  return '/placeholders/menu-item.svg';
}

export default function PizzaVariantCard({ baseName, variants, cart, onAddToCart, onShowAddons, addons, onShowDetails, category }: PizzaVariantCardProps) {
  // Sort variants by numeric size if possible: 8" < 10" < 12"
  const sorted = useMemo(() => {
    return [...variants].sort((a, b) => {
      const as = parseInt(parseSize(a.name)?.replace('"', '') || '0', 10);
      const bs = parseInt(parseSize(b.name)?.replace('"', '') || '0', 10);
      return as - bs;
    });
  }, [variants]);

  const [selectedName, setSelectedName] = useState<string>(sorted[0]?.name || variants[0]?.name);
  const selected = useMemo(() => sorted.find(v => v.name === selectedName) || sorted[0] || variants[0], [selectedName, sorted, variants]);
  const sizeLabels = useMemo(() => sorted.map(v => ({ key: v.name, label: parseSize(v.name) || 'Std' })), [sorted]);

  const currentQuantity = useMemo(() => {
    const cartItem = cart.find(ci => ci.name === selected.name);
    return cartItem ? cartItem.quantity : 0;
  }, [cart, selected.name]);

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= 0) onAddToCart(selected, newQty);
  };

  const veg = isVegetarian(selected.name);
  const compatibleAddons = getCompatibleAddons(selected, addons);

  return (
    <div className="bg-bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div
        className={`relative w-full aspect-[4/3] bg-gray-100 ${onShowDetails ? 'cursor-pointer' : ''}`}
        onClick={() => onShowDetails && onShowDetails(selected, category)}
        role={onShowDetails ? 'button' : undefined}
      >
        <Image
          src={resolveImage(selected.image, selected.name)}
          alt={selected.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3
            className={`text-lg font-semibold text-text-primary leading-tight pr-4 ${onShowDetails ? 'cursor-pointer' : ''}`}
            onClick={() => onShowDetails && onShowDetails(selected, category)}
          >
            {baseName}
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            {veg && (
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full border-2 border-white" title="Vegetarian" />
            )}
            <span className="text-xl font-bold text-primary-red">₹{selected.price}</span>
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-4 flex flex-wrap gap-2">
          {sizeLabels.map(s => (
            <button
              key={s.key}
              onClick={() => setSelectedName(s.key)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors duration-200 ${
                s.key === selected.name ? 'bg-primary-red text-white border-primary-red' : 'bg-gray-50 text-text-secondary border-border hover:bg-gray-100'
              }`}
              aria-label={`Select size ${s.label}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Tags of selected variant */}
        {selected.tags && selected.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {selected.tags.map((tag, i) => (
              <span
                key={i}
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
        <div className="flex items-center justify-between gap-2">
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
                onClick={() => onShowDetails(selected, category)}
                className="text-primary-red text-sm font-semibold hover:underline"
                aria-label={`View details for ${selected.name}`}
              >
                View details
              </button>
            )}
            {currentQuantity === 0 && (
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-primary-red text-white text-sm font-semibold rounded-md hover:bg-primary-red-hover transition-colors duration-200"
                aria-label={`Add ${selected.name} to cart`}
              >
                Add to cart
              </button>
            )}
            {compatibleAddons.length > 0 && currentQuantity > 0 && onShowAddons && (
              <button
                onClick={() => onShowAddons(selected)}
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
