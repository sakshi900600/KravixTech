import React, { useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import TransactionCard from '../components/TransactionCard';
import FloatingActionButton from '../components/FloatingActionButton';
import EmptyState from '../components/EmptyState';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function Dashboard({ transactions, categories, onAddClick, onDelete }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const recentTransactions = transactions.slice(0, 5);

  const getCategoryInfo = (categoryName) => {
    return categories.find((c) => c.name === categoryName);
  };

  return (
    <div className="pb-24 pt-4">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Balance"
            amount={balance}
            icon={Wallet}
            color="text-indigo-600"
          />
          <SummaryCard
            title="Income"
            amount={totalIncome}
            icon={TrendingUp}
            color="text-green-600"
          />
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            icon={TrendingDown}
            color="text-red-600"
          />
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            {recentTransactions.length > 0 && (
              <a href="#transactions" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                View all →
              </a>
            )}
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
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
              title="No transactions yet"
              description="Start by adding your first income or expense"
              icon="🎯"
            />
          )}
        </div>
      </div>

      <FloatingActionButton onClick={onAddClick} label="Add Transaction" />
    </div>
  );
}
