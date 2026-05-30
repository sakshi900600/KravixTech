import React from 'react';
import EmptyState from '../components/EmptyState';

export default function CategorySummary({ transactions, categories }) {
  const categoryExpenses = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((transaction) => {
      if (!categoryExpenses[transaction.category]) {
        categoryExpenses[transaction.category] = 0;
      }
      categoryExpenses[transaction.category] += transaction.amount;
    });

  const totalExpenses = Object.values(categoryExpenses).reduce((sum, val) => sum + val, 0);
  const sortedCategories = Object.entries(categoryExpenses)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      info: categories.find((c) => c.name === category),
    }));

  return (
    <div className="pb-24 pt-4">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-gray-900">Spending by Category</h1>
          <p className="text-gray-500 text-sm mt-1">Total Expenses: ₹ {totalExpenses.toLocaleString('en-IN')}</p>
        </div>

        {sortedCategories.length > 0 ? (
          <div className="space-y-4">
            {sortedCategories.map((cat) => (
              <div key={cat.category} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.info?.icon || '📌'}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{cat.category}</p>
                      <p className="text-xs text-gray-500">{cat.percentage.toFixed(1)}% of total</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg text-gray-900">₹ {cat.amount.toLocaleString('en-IN')}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      cat.info?.color
                        ? ''
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-400'
                    }`}
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.info?.color || '#6366F1',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">Highest Spending</p>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  {sortedCategories[0]?.category}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  ₹ {sortedCategories[0]?.amount.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-700 font-medium">Categories Used</p>
                <p className="text-xl font-bold text-purple-900 mt-1">{sortedCategories.length}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 font-medium">Average Category Spend</p>
                <p className="text-xl font-bold text-green-900 mt-1">
                  ₹ {(totalExpenses / sortedCategories.length).toLocaleString('en-IN', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No expenses yet"
            description="Start adding expenses to see your spending breakdown by category"
            icon="📊"
          />
        )}
      </div>
    </div>
  );
}
