import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCard({ title, amount, icon: Icon, isCurrency = true, color = 'text-blue-600' }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        {Icon && <Icon className={`${color} w-5 h-5`} />}
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {isCurrency ? '₹' : ''} {amount.toLocaleString('en-IN')}
      </p>
    </div>
  );
}
