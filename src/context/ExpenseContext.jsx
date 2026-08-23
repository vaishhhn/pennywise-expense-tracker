import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SAMPLE_EXPENSES, INITIAL_BUDGET, INITIAL_INCOME } from '../data/sampleExpenses';
import { generateId } from '../utils/formatters';

const ExpenseContext = createContext();

const STORAGE_KEYS = {
  EXPENSES: 'pennywise_clean_expenses_v3',
  BUDGET: 'pennywise_budget_v3',
  INCOME: 'pennywise_income_v3',
};

export const ExpenseProvider = ({ children }) => {
  // Load from localStorage or clean 0/empty defaults
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading expenses', e);
    }
    return [];
  });

  const [monthlyBudget, setMonthlyBudgetState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUDGET);
      if (saved !== null) {
        return Math.max(0, Number(saved) || 0);
      }
    } catch (e) {
      console.error('Error loading budget', e);
    }
    return INITIAL_BUDGET;
  });

  const [monthlyIncome, setMonthlyIncomeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INCOME);
      if (saved !== null) {
        return Math.max(0, Number(saved) || 0);
      }
    } catch (e) {
      console.error('Error loading income', e);
    }
    return INITIAL_INCOME;
  });

  // Filters & State
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Notification Toast
  const [toast, setToast] = useState(null);
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);

  // LocalStorage Sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses', e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUDGET, monthlyBudget.toString());
    } catch (e) {
      console.error('Failed to save budget', e);
    }
  }, [monthlyBudget]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INCOME, monthlyIncome.toString());
    } catch (e) {
      console.error('Failed to save income', e);
    }
  }, [monthlyIncome]);

  const showToast = (message, type = 'success', undoCallback = null) => {
    const id = Date.now();
    setToast({ id, message, type, undoCallback });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const closeToast = () => setToast(null);

  // Actions
  const addExpense = (expenseData) => {
    const newExpense = {
      id: generateId(),
      title: expenseData.title.trim(),
      amount: Math.abs(parseFloat(expenseData.amount)),
      category: expenseData.category,
      date: expenseData.date,
      paymentMethod: expenseData.paymentMethod || 'UPI',
      notes: expenseData.notes ? expenseData.notes.trim() : '',
      createdAt: new Date().toISOString(),
    };

    setExpenses(prev => [newExpense, ...prev]);
    showToast(`Added "${newExpense.title}" (₹${newExpense.amount.toLocaleString('en-IN')})`);
    return newExpense;
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
              title: updatedData.title.trim(),
              amount: Math.abs(parseFloat(updatedData.amount)),
              notes: updatedData.notes ? updatedData.notes.trim() : '',
            }
          : item
      )
    );
    showToast('Expense updated successfully');
  };

  const deleteExpense = (id) => {
    const itemToDelete = expenses.find(e => e.id === id);
    if (!itemToDelete) return;

    setLastDeletedExpense(itemToDelete);
    setExpenses(prev => prev.filter(e => e.id !== id));

    showToast(
      `Deleted "${itemToDelete.title}"`,
      'info',
      () => {
        setExpenses(curr => [itemToDelete, ...curr]);
        setLastDeletedExpense(null);
        showToast(`Restored "${itemToDelete.title}"`, 'success');
      }
    );
  };

  const undoDelete = () => {
    if (toast?.undoCallback) {
      toast.undoCallback();
      setToast(null);
    }
  };

  const setBudget = (budget) => {
    const num = Math.max(0, Number(budget) || 0);
    setMonthlyBudgetState(num);
    showToast(`Monthly budget set to ₹${num.toLocaleString('en-IN')}`);
  };

  const setIncome = (income) => {
    const num = Math.max(0, Number(income) || 0);
    setMonthlyIncomeState(num);
    showToast(`Monthly income set to ₹${num.toLocaleString('en-IN')}`);
  };

  const clearAllData = () => {
    setExpenses([]);
    setMonthlyBudgetState(0);
    setMonthlyIncomeState(0);
    showToast('All expense records and balances reset to ₹0', 'info');
  };

  // Month filtered expenses
  const monthExpenses = useMemo(() => {
    return expenses.filter(expense => {
      if (!expense.date) return false;
      const d = new Date(expense.date);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
  }, [expenses, selectedMonth, selectedYear]);

  // Visible expenses with search, category & sort
  const visibleExpenses = useMemo(() => {
    let result = [...monthExpenses];

    if (selectedCategory !== 'ALL') {
      result = result.filter(e => e.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        e =>
          (e.title && e.title.toLowerCase().includes(q)) ||
          (e.category && e.category.toLowerCase().includes(q)) ||
          (e.notes && e.notes.toLowerCase().includes(q)) ||
          (e.amount && e.amount.toString().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [monthExpenses, selectedCategory, searchQuery, sortBy]);

  // Computed metrics
  const metrics = useMemo(() => {
    const totalSpentThisMonth = monthExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    
    // Remaining Budget calculation
    const remainingBudget = monthlyBudget > 0 ? (monthlyBudget - totalSpentThisMonth) : (totalSpentThisMonth > 0 ? -totalSpentThisMonth : 0);
    
    // Total Savings calculation
    const totalSavings = monthlyIncome > 0 ? (monthlyIncome - totalSpentThisMonth) : (totalSpentThisMonth > 0 ? -totalSpentThisMonth : 0);
    
    const budgetUsedPercentage = monthlyBudget > 0 ? (totalSpentThisMonth / monthlyBudget) * 100 : 0;
    const savingsRate = monthlyIncome > 0 ? Math.max(0, (totalSavings / monthlyIncome) * 100) : 0;

    const categoryTotals = {};
    monthExpenses.forEach(exp => {
      const cat = exp.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(exp.amount) || 0);
    });

    const categoryBreakdown = Object.entries(categoryTotals)
      .map(([catId, total]) => ({
        categoryId: catId,
        total,
        percentage: totalSpentThisMonth > 0 ? (total / totalSpentThisMonth) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      totalSpentThisMonth,
      monthlyBudget,
      remainingBudget,
      monthlyIncome,
      totalSavings,
      budgetUsedPercentage,
      savingsRate,
      categoryBreakdown,
      transactionCount: monthExpenses.length,
      totalSpentAllTime: expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
      totalTransactionsAllTime: expenses.length,
    };
  }, [monthExpenses, monthlyBudget, monthlyIncome, expenses]);

  const value = {
    expenses,
    monthExpenses,
    visibleExpenses,
    metrics,
    monthlyBudget,
    monthlyIncome,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isAddModalOpen,
    setIsAddModalOpen,
    isBudgetModalOpen,
    setIsBudgetModalOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    editingExpense,
    setEditingExpense,
    toast,
    showToast,
    closeToast,
    undoDelete,
    addExpense,
    updateExpense,
    deleteExpense,
    setBudget,
    setIncome,
    clearAllData,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
