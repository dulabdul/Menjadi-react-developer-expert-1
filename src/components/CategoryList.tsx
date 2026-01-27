import React from 'react';

interface CategoryListProps {
  categories: string[];
  filter: string;
  setFilter: (category: string) => void;
}

export default function CategoryList({
  categories,
  filter,
  setFilter,
}: CategoryListProps) {
  return (
    <div className='mb-6 flex gap-2 overflow-x-auto pb-2'>
      <button
        onClick={() => setFilter('')}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors border ${
          filter === ''
            ? 'bg-black dark:bg-gray-200 text-white dark:text-black border-transparent'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 border-transparent'
        }`}>
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors border ${
            filter === cat
              ? 'bg-black dark:bg-gray-200 text-white dark:text-black border-transparent'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 border-transparent'
          }`}>
          #{cat}
        </button>
      ))}
    </div>
  );
}
