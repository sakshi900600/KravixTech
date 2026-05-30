import React from 'react';
import { Plus } from 'lucide-react';

export default function FloatingActionButton({ onClick, label = "Add" }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-40"
      title={label}
    >
      <Plus size={24} />
      <span className="font-medium hidden sm:inline">{label}</span>
    </button>
  );
}
