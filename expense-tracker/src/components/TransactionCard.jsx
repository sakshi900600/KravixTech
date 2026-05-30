import React from 'react';
import { Trash2 } from 'lucide-react';

export default function TransactionCard({ transaction, onDelete, category }) {
  const isExpense = transaction.type === 'expense';
  const categoryInfo = category || { name: transaction.category, icon: '📌', color: '#6B7280' };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 flex-1">
        <div className="text-2xl">{categoryInfo.icon}</div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{transaction.title}</p>
          <p className="text-xs text-gray-500">{transaction.category}</p>
          <p className="text-xs text-gray-400">
            {new Date(transaction.date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
          {isExpense ? '-' : '+'}₹ {transaction.amount.toLocaleString('en-IN')}
        </p>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(transaction.id)}
          className="ml-3 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}
