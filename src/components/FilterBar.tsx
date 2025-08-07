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
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 sticky top-0 z-10">
      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Special Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                selectedTags.includes(tag)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tag}</span>
              <span className="text-xs opacity-75">({count})</span>
              {selectedTags.includes(tag) && (
                <span className="ml-1 text-xs">×</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Dietary Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {['All', 'Veg', 'Non-Veg'].map((filter) => (
            <button
              key={filter}
              onClick={() => onDietFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                dietFilter === filter
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
