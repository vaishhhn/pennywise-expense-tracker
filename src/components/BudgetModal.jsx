import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { X, Check } from 'lucide-react';

export const BudgetModal = () => {
  const {
    isBudgetModalOpen,
    setIsBudgetModalOpen,
    monthlyBudget,
    monthlyIncome,
    setBudget,
    setIncome,
  } = useExpenses();

  const [budgetVal, setBudgetVal] = useState('');
  const [incomeVal, setIncomeVal] = useState('');

  useEffect(() => {
    if (isBudgetModalOpen) {
      setBudgetVal(monthlyBudget.toString());
      setIncomeVal(monthlyIncome.toString());
    }
  }, [isBudgetModalOpen, monthlyBudget, monthlyIncome]);

  if (!isBudgetModalOpen) return null;

  const handleClose = () => {
    setIsBudgetModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (budgetVal !== '') setBudget(budgetVal);
    if (incomeVal !== '') setIncome(incomeVal);
    handleClose();
  };

  const estimatedSavings = (Number(incomeVal) || 0) - (Number(budgetVal) || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#452632]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-[#FFF8F3] rounded-3xl shadow-cute-lg border-3 border-[#FAD4BD] max-w-md w-full overflow-hidden transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#FFE2E0] border-b-2 border-[#FFC8C7] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8F3] border-2 border-[#FF9E9D] flex items-center justify-center text-2xl shadow-sm">
              🎯
            </div>
            <div>
              <h2 className="text-lg font-black text-[#452632] font-display">Budget & Income</h2>
              <p className="text-xs font-bold text-[#75475E]">Set targets to calculate your savings</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-[#FFF8F3] hover:bg-[#FFC8C7] text-[#452632] flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Monthly Budget */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1.5">
              Monthly Expense Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#91204D] font-black text-lg">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={budgetVal}
                onChange={(e) => setBudgetVal(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-[#452632] font-black focus:outline-none transition-all font-display text-lg"
              />
            </div>
            <p className="mt-1 text-[11px] font-semibold text-[#75475E]">
              Your maximum spending limit target for this month.
            </p>
          </div>

          {/* Monthly Income */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#452632] mb-1.5">
              Monthly Income / Salary (₹)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#91204D] font-black text-lg">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={incomeVal}
                onChange={(e) => setIncomeVal(e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-[#452632] font-black focus:outline-none transition-all font-display text-lg"
              />
            </div>
            <p className="mt-1 text-[11px] font-semibold text-[#75475E]">
              Used to calculate your real savings amount and rate.
            </p>
          </div>

          {/* Estimated Savings card with Sakura Flower 🌸 */}
          <div className="p-3.5 rounded-2xl bg-[#FFE2E0] border-2 border-[#FFC8C7] flex items-center space-x-3">
            <span className="text-2xl">🌸</span>
            <div className="flex-1">
              <span className="text-[11px] font-extrabold text-[#75475E] block">
                Target Monthly Savings:
              </span>
              <span className={`text-sm font-black ${estimatedSavings >= 0 ? 'text-[#91204D]' : 'text-[#73163A]'}`}>
                ₹{estimatedSavings.toLocaleString('en-IN')}
              </span>
            </div>
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
              className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-black text-[#452632] bg-[#FFE2E0] hover:bg-[#FFC8C7] border-2 border-[#FF9E9D] rounded-2xl shadow-cute active:scale-95 transition-all"
            >
              <Check className="w-4 h-4 stroke-[3] text-[#91204D]" />
              <span>Save Budget</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
