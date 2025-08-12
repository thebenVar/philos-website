import React from 'react';

interface FilterBarProps {
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  availableTags: { tag: string; count: number }[];
  onTagToggle: (tag: string) => void;
  dietFilter: string;
  onDietFilterChange: (filter: string) => void;
}

export default function FilterBar({
  selectedCategory,
  categories,
  onCategoryChange,
  selectedTags,
  availableTags,
  onTagToggle,
  dietFilter,
  onDietFilterChange
}: FilterBarProps) {
  return (
    <div className="bg-stone-50 p-4 rounded-xl shadow-lg border border-stone-200">
      {/* Category Filter */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'All'
                ? 'bg-primary-red text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-primary-red text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="mb-4 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {availableTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-1.5 transform hover:scale-105 ${
                selectedTags.includes(tag)
                  ? 'bg-accent-gold text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>{tag}</span>
              <span className="text-xs bg-black/10 rounded-full px-1.5 py-0.5">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Diet Filter */}
      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Veg', 'Non-Veg'].map((filter) => (
            <button
              key={filter}
              onClick={() => onDietFilterChange(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 ${
                dietFilter === filter
                  ? 'bg-primary-red text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
