import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES, PAYMENT_METHODS } from '../data/categories';
import { getTodayDateInput } from '../utils/formatters';
import { X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

export const ExpenseFormModal = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    editingExpense,
    setEditingExpense,
    addExpense,
    updateExpense,
  } = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [date, setDate] = useState(getTodayDateInput());
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || '');
      setAmount(editingExpense.amount ? editingExpense.amount.toString() : '');
      setCategory(editingExpense.category || 'Groceries');
      setDate(editingExpense.date || getTodayDateInput());
      setPaymentMethod(editingExpense.paymentMethod || 'UPI');
      setNotes(editingExpense.notes || '');
    } else {
      setTitle('');
      setAmount('');
      setCategory('Groceries');
      setDate(getTodayDateInput());
      setPaymentMethod('UPI');
      setNotes('');
    }
    setErrors({});
  }, [editingExpense, isAddModalOpen]);

  if (!isAddModalOpen) return null;

  const handleClose = () => {
    setIsAddModalOpen(false);
    setEditingExpense(null);
    setErrors({});
  };

  const handleQuickAddAmount = (addValue) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + addValue).toString());
    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
  };

  const handleQuickDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Please enter an item name (e.g. Milk)';
    }
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      errs.amount = 'Please enter a valid amount in ₹';
    }
    if (!date) {
      errs.date = 'Please select a date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingExpense) {
      updateExpense(editingExpense.id, {
        title,
        amount,
        category,
        date,
        paymentMethod,
        notes,
      });
    } else {
      addExpense({
        title,
        amount,
        category,
        date,
        paymentMethod,
        notes,
      });

      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.7 },
          colors: ['#FF9E9D', '#FFE2E0', '#91204D', '#A46583'],
        });
      } catch (err) {}
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#452632]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-[#FFF8F3] rounded-3xl shadow-cute-lg border-3 border-[#FAD4BD] max-w-lg w-full overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#FFE2E0] border-b-2 border-[#FFC8C7] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F3] border-2 border-[#FF9E9D] flex items-center justify-center text-2xl shadow-sm">
              🌸
            </div>
            <div>
              <h2 className="text-lg font-black text-[#452632] font-display">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <p className="text-xs font-bold text-[#75475E]">
                {editingExpense ? 'Update expense details' : 'Log a spend into your budget'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#FFF8F3] hover:bg-[#FFC8C7] text-[#452632] flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Item Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1.5">
              Item Name <span className="text-[#91204D]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: null }));
              }}
              placeholder="e.g. Milk, Groceries, Electricity Bill, Pizza"
              className={`w-full px-4 py-2.5 bg-[#FFFDFB] border-2 rounded-2xl text-sm font-bold text-[#452632] focus:outline-none focus:ring-2 focus:ring-[#FF9E9D]/50 transition-all ${
                errors.title ? 'border-[#91204D] bg-[#FFF0EE]' : 'border-[#FAD4BD] focus:border-[#91204D]'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-xs text-[#91204D] font-bold">{errors.title}</p>
            )}

            {!editingExpense && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  { name: 'Milk', cat: 'Groceries', emoji: '🥛' },
                  { name: 'Groceries', cat: 'Groceries', emoji: '🛒' },
                  { name: 'Coffee', cat: 'Food', emoji: '☕' },
                  { name: 'Apartment Rent', cat: 'Rent', emoji: '🏡' },
                  { name: 'Electricity Bill', cat: 'Bills', emoji: '⚡' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setTitle(item.name);
                      setCategory(item.cat);
                    }}
                    className="text-[11px] font-extrabold px-2.5 py-0.5 bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7] rounded-lg"
                  >
                    {item.emoji} {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount in ₹ */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1.5">
              Amount (₹ INR) <span className="text-[#91204D]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#91204D] font-black text-lg">
                ₹
              </div>
              <input
                type="number"
                step="any"
                min="0"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                }}
                placeholder="0.00"
                className={`w-full pl-9 pr-4 py-2.5 bg-[#FFFDFB] border-2 rounded-2xl text-lg font-black text-[#452632] font-display focus:outline-none focus:ring-2 focus:ring-[#FF9E9D]/50 transition-all ${
                  errors.amount ? 'border-[#91204D] bg-[#FFF0EE]' : 'border-[#FAD4BD] focus:border-[#91204D]'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-xs text-[#91204D] font-bold">{errors.amount}</p>
            )}

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] font-bold text-[#75475E]">Quick Add:</span>
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAddAmount(val)}
                  className="text-[11px] font-extrabold px-2 py-0.5 bg-[#FFF0EE] hover:bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7] rounded-md transition-colors"
                >
                  +₹{val}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-2">
              Category <span className="text-[#91204D]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center space-x-2 p-2 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'bg-[#FFE2E0] border-[#91204D] text-[#91204D] font-extrabold shadow-sm scale-[1.02]'
                        : 'border-[#FAD4BD] bg-[#FFFDFB] hover:bg-[#FFEAE0] text-[#452632]'
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span className="text-xs font-bold truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#452632]">
                  Date
                </label>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => handleQuickDate(0)}
                    className="text-[10px] font-extrabold text-[#91204D] hover:underline"
                  >
                    Today
                  </button>
                  <span className="text-[#A46583] text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => handleQuickDate(1)}
                    className="text-[10px] font-bold text-[#75475E] hover:underline"
                  >
                    Yesterday
                  </button>
                </div>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-bold text-[#452632] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-bold text-[#452632] focus:outline-none"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.emoji} {pm.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1">
              Notes <span className="text-[#A46583] lowercase font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 2L packet, monthly wifi..."
              className="w-full px-4 py-2 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-semibold text-[#452632] placeholder-[#A46583]/60 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#FAD4BD]">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-bold text-[#75475E] hover:text-[#452632] bg-[#FFFDFB] hover:bg-[#FDECE0] border border-[#FAD4BD] rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 text-xs font-extrabold text-[#452632] bg-[#FFE2E0] hover:bg-[#FFC8C7] border-2 border-[#FF9E9D] rounded-2xl shadow-cute active:scale-95 transition-all"
            >
              <Check className="w-4 h-4 stroke-[3] text-[#91204D]" />
              <span>{editingExpense ? 'Update Expense' : 'Save Expense'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
