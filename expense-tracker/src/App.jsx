import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import AllTransactions from './pages/AllTransactions';
import CategorySummary from './pages/CategorySummary';
import AddTransactionModal from './pages/AddTransactionModal';
import Navigation from './components/Navigation';
import { mockTransactions, categories } from './data/mockData';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
    setShowAddModal(false);
  };

  const handleDeleteTransaction = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentPage === 'home' && (
          <Dashboard
            transactions={transactions}
            categories={categories}
            onAddClick={() => setShowAddModal(true)}
            onDelete={handleDeleteTransaction}
          />
        )}
        {currentPage === 'transactions' && (
          <AllTransactions
            transactions={transactions}
            categories={categories}
            onAddClick={() => setShowAddModal(true)}
            onDelete={handleDeleteTransaction}
          />
        )}
        {currentPage === 'categories' && (
          <CategorySummary transactions={transactions} categories={categories} />
        )}
      </main>

      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTransaction}
          categories={categories}
        />
      )}
    </div>
  );
}

export default App;
