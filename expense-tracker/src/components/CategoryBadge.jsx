import React from 'react';

export default function CategoryBadge({ category, selected = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition-all ${
        selected
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <span className="mr-2">{category.icon}</span>
      {category.name}
    </button>
  );
}
