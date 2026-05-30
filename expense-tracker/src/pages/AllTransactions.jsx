import React, { useState } from 'react';
import TransactionCard from '../components/TransactionCard';
import CategoryBadge from '../components/CategoryBadge';
import EmptyState from '../components/EmptyState';
import FloatingActionButton from '../components/FloatingActionButton';

export default function AllTransactions({ transactions, categories, onAddClick, onDelete }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions =
    selectedCategory === 'All'
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);

  const getCategoryInfo = (categoryName) => {
    return categories.find((c) => c.name === categoryName);
  };

  const categoryOptions = [
    { id: 'all', name: 'All', icon: '📌' },
    ...categories,
  ];

  return (
    <div className="pb-24 pt-4">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredTransactions.length} transactions</p>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((cat) => (
              <CategoryBadge
                key={cat.id || cat.name}
                category={cat.name === 'All' ? { name: 'All', icon: '📌' } : cat}
                selected={selectedCategory === (cat.name === 'All' ? 'All' : cat.name)}
                onClick={() => setSelectedCategory(cat.name === 'All' ? 'All' : cat.name)}
              />
            ))}
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                category={getCategoryInfo(transaction.category)}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={selectedCategory === 'All' ? 'No transactions' : `No ${selectedCategory} transactions`}
            description="Try selecting a different category or add a new transaction"
            icon="📭"
          />
        )}
      </div>

      <FloatingActionButton onClick={onAddClick} label="Add Transaction" />
    </div>
  );
}
