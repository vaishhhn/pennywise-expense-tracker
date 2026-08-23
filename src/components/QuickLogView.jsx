import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES, PAYMENT_METHODS } from '../data/categories';
import { getTodayDateInput } from '../utils/formatters';
import { Sparkles, Plus, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

export const QuickLogView = ({ onDone }) => {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [date, setDate] = useState(getTodayDateInput());
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const handleQuickAddAmount = (val) => {
    const current = parseFloat(amount) || 0;
    setAmount((current + val).toString());
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
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
    if (!title.trim()) errs.title = 'Please enter an item name (e.g., Milk)';
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      errs.amount = 'Please enter a valid amount in ₹';
    }
    if (!date) errs.date = 'Please select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF9E9D', '#91204D', '#A46583', '#FFE2E0'],
      });
    } catch (err) {}

    setTitle('');
    setAmount('');
    setNotes('');
    setErrors({});
    if (onDone) onDone();
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#FFF8F3] rounded-3xl p-6 sm:p-8 border-2 border-[#FAD4BD] shadow-cute">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#FAD4BD]">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFE2E0] border-2 border-[#FF9E9D] flex items-center justify-center text-2xl shadow-sm">
            ✍️
          </div>
          <div>
            <h3 className="text-lg font-black text-[#452632] font-display flex items-center gap-1.5">
              <span>Quick Expense Logger</span>
              <Sparkles className="w-4 h-4 text-[#91204D]" />
            </h3>
            <p className="text-xs font-semibold text-[#75475E]">
              Fast entry for your daily grocery, milk, bills or dining spend
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        
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
              if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
            }}
            placeholder="e.g. Milk, Groceries, Electricity Bill, Pizza"
            className={`w-full px-4 py-3 bg-[#FFFDFB] border-2 rounded-2xl text-sm font-bold text-[#452632] placeholder-[#A46583]/60 focus:outline-none focus:ring-2 focus:ring-[#FF9E9D]/50 transition-all ${
              errors.title ? 'border-[#91204D] bg-[#FFF0EE]' : 'border-[#FAD4BD] focus:border-[#91204D]'
            }`}
            autoFocus
          />
          {errors.title && (
            <p className="mt-1 text-xs text-[#91204D] font-bold">{errors.title}</p>
          )}

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { name: 'Milk', cat: 'Groceries', emoji: '🥛' },
              { name: 'Groceries', cat: 'Groceries', emoji: '🛒' },
              { name: 'Electricity Bill', cat: 'Bills', emoji: '⚡' },
              { name: 'Apartment Rent', cat: 'Rent', emoji: '🏡' },
              { name: 'Coffee', cat: 'Food', emoji: '☕' },
              { name: 'Lunch', cat: 'Food', emoji: '🍜' },
            ].map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setTitle(preset.name);
                  setCategory(preset.cat);
                }}
                className="text-[11px] font-bold px-2.5 py-1 bg-[#FFE2E0]/80 hover:bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7] rounded-xl transition-all"
              >
                {preset.emoji} {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Amount in ₹ */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1.5">
            Amount (₹ INR) <span className="text-[#91204D]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#91204D] font-extrabold text-lg">
              ₹
            </div>
            <input
              type="number"
              step="any"
              min="0"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
              }}
              placeholder="0.00"
              className={`w-full pl-9 pr-4 py-3 bg-[#FFFDFB] border-2 rounded-2xl text-lg font-black text-[#452632] placeholder-[#A46583]/60 focus:outline-none focus:ring-2 focus:ring-[#FF9E9D]/50 font-display ${
                errors.amount ? 'border-[#91204D] bg-[#FFF0EE]' : 'border-[#FAD4BD] focus:border-[#91204D]'
              }`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-xs text-[#91204D] font-bold">{errors.amount}</p>
          )}

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-bold text-[#75475E]">Quick Add:</span>
            {QUICK_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleQuickAddAmount(val)}
                className="text-[11px] font-extrabold px-2 py-0.5 bg-[#FFF0EE] hover:bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7] rounded-lg transition-colors"
              >
                +₹{val}
              </button>
            ))}
          </div>
        </div>

        {/* Category Picker */}
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
                  className={`flex items-center space-x-2 p-2.5 rounded-2xl border-2 text-left transition-all ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#452632]">
                Date
              </label>
              <div className="flex space-x-1.5">
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
              className="w-full px-3.5 py-2.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-bold text-[#452632] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-bold text-[#452632] focus:outline-none"
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.emoji} {pm.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1">
            Notes <span className="text-[#A46583] lowercase font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 2L packet, weekly grocery trip, shared bill..."
            className="w-full px-4 py-2.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-semibold text-[#452632] placeholder-[#A46583]/60 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl text-sm font-black text-[#452632] border-2 border-[#FF9E9D] shadow-cute hover:shadow-cute-lg active:scale-[0.99] transition-all"
            style={{ backgroundColor: '#FFE2E0' }}
          >
            <span className="text-lg">🌸</span>
            <span>Save & Record Expense (₹)</span>
          </button>
        </div>

      </form>
    </div>
  );
};
