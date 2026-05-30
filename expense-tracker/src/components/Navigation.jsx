import React from 'react';

export default function Navigation({ currentPage, onNavigate }) {
  const pages = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'transactions', label: 'Transactions', icon: '📋' },
    { id: 'categories', label: 'Categories', icon: '📊' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center max-w-4xl mx-auto">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onNavigate(page.id)}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-colors ${
              currentPage === page.id
                ? 'text-indigo-600 border-t-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-xl">{page.icon}</span>
            <span className="text-xs font-medium">{page.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
