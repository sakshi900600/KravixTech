import React from 'react';

export default function EmptyState({ title, description, icon = '📭' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-500 text-center max-w-sm">{description}</p>
    </div>
  );
}
