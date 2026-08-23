import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';
import { 
  Sparkles,
  Edit2
} from 'lucide-react';

export const DashboardCards = () => {
  const { metrics, setIsBudgetModalOpen } = useExpenses();

  const {
    totalSpentThisMonth,
    monthlyBudget,
    remainingBudget,
    totalSavings,
    budgetUsedPercentage,
    savingsRate,
    transactionCount,
    monthlyIncome,
  } = metrics;

  const isOverBudget = remainingBudget < 0;
  const isBudgetNearLimit = !isOverBudget && budgetUsedPercentage > 85 && monthlyBudget > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
      
      {/* 1. Total Spent this Month */}
      <div className="relative overflow-hidden bg-[#FFF8F3] rounded-3xl p-5 sm:p-6 border-2 border-[#FAD4BD] shadow-cute hover:shadow-cute-lg transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#75475E]">
            Total Spent this Month
          </span>
          <div className="w-10 h-10 rounded-2xl bg-[#FFE2E0] border border-[#FFC8C7] flex items-center justify-center text-xl shadow-sm">
            💸
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-[#452632] tracking-tight font-display">
            {formatCurrency(totalSpentThisMonth)}
          </div>
          
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-[#75475E] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#91204D] inline-block"></span>
              {transactionCount} {transactionCount === 1 ? 'item' : 'items'}
            </span>
            <span className="font-extrabold text-[#91204D] bg-[#FFE2E0] px-2 py-0.5 rounded-full border border-[#FFC8C7]">
              {monthlyBudget > 0 ? `${budgetUsedPercentage.toFixed(0)}% used` : 'No budget set'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5 w-full bg-[#FAD4BD] h-2 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-[#91204D] transition-all duration-500"
            style={{ width: `${monthlyBudget > 0 ? Math.min(100, budgetUsedPercentage) : 0}%` }}
          />
        </div>
      </div>

      {/* 2. Remaining Budget */}
      <div className={`relative overflow-hidden bg-[#FFF8F3] rounded-3xl p-5 sm:p-6 border-2 shadow-cute hover:shadow-cute-lg transition-all duration-300 group ${
        isOverBudget 
          ? 'border-[#91204D] bg-[#FFF0EE]' 
          : isBudgetNearLimit 
          ? 'border-[#A46583]' 
          : 'border-[#FAD4BD]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#75475E]">
            Remaining Budget
          </span>
          <div className="w-10 h-10 rounded-2xl bg-[#FFFDFB] border border-[#FAD4BD] flex items-center justify-center text-xl shadow-sm">
            {isOverBudget ? '⚠️' : '🎯'}
          </div>
        </div>

        <div className="space-y-1">
          <div className={`text-2xl sm:text-3xl font-black tracking-tight font-display ${
            isOverBudget ? 'text-[#91204D]' : 'text-[#452632]'
          }`}>
            {isOverBudget ? `-${formatCurrency(Math.abs(remainingBudget))}` : formatCurrency(remainingBudget)}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-[#75475E] font-bold">
              {isOverBudget ? 'Over Limit' : 'Safe to spend'}
            </span>
            <span className={`font-extrabold px-2 py-0.5 rounded-full border text-[11px] ${
              isOverBudget
                ? 'bg-[#91204D] text-white border-[#73163A]'
                : 'bg-[#FFE2E0] text-[#91204D] border-[#FFC8C7]'
            }`}>
              {monthlyBudget > 0 
                ? `${Math.max(0, 100 - budgetUsedPercentage).toFixed(0)}% left`
                : '₹0 cap'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5 w-full bg-[#FAD4BD] h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-[#91204D]' : 'bg-[#FF9E9D]'
            }`}
            style={{ width: `${monthlyBudget > 0 ? Math.max(0, Math.min(100, 100 - budgetUsedPercentage)) : 0}%` }}
          />
        </div>
      </div>

      {/* 3. Monthly Budget */}
      <div className="relative overflow-hidden bg-[#FFF8F3] rounded-3xl p-5 sm:p-6 border-2 border-[#FAD4BD] shadow-cute hover:shadow-cute-lg transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#75475E]">
            Monthly Budget
          </span>
          <button 
            onClick={() => setIsBudgetModalOpen(true)}
            className="w-10 h-10 rounded-2xl bg-[#FFE2E0] hover:bg-[#FFC8C7] border border-[#FFC8C7] flex items-center justify-center text-xl shadow-sm transition-colors"
            title="Edit Budget"
          >
            👛
          </button>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-black text-[#452632] tracking-tight font-display">
              {formatCurrency(monthlyBudget)}
            </div>
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="text-xs text-[#91204D] hover:underline font-extrabold flex items-center gap-0.5"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-[#75475E] font-bold">Planned Target Cap</span>
            <span className="font-extrabold text-[#452632] bg-[#FAF5F7] px-2 py-0.5 rounded-full border border-[#E4CDD9]">
              {monthlyBudget > 0 ? 'Allocated' : 'Not Set'}
            </span>
          </div>
        </div>

        <div className="mt-3.5 w-full bg-[#FAD4BD] h-2 rounded-full overflow-hidden">
          <div className={`h-full rounded-full w-full ${monthlyBudget > 0 ? 'bg-[#A46583]' : 'bg-[#FAD4BD]'}`} />
        </div>
      </div>

      {/* 4. Total Savings (Sakura Flower 🌸 Icon) */}
      <div className="relative overflow-hidden bg-[#FFF8F3] rounded-3xl p-5 sm:p-6 border-2 border-[#FAD4BD] shadow-cute hover:shadow-cute-lg transition-all duration-300 group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#75475E]">
              Savings
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#91204D]" />
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#FFE2E0] border border-[#FFC8C7] flex items-center justify-center text-xl shadow-sm">
            🌸
          </div>
        </div>

        <div className="space-y-1">
          <div className={`text-2xl sm:text-3xl font-black tracking-tight font-display ${
            totalSavings >= 0 ? 'text-[#91204D]' : 'text-[#73163A]'
          }`}>
            {formatCurrency(totalSavings)}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-[#75475E] font-bold">
              from {formatCurrency(monthlyIncome)} income
            </span>
            <span className={`font-extrabold px-2 py-0.5 rounded-full border text-[11px] ${
              totalSavings >= 0 
                ? 'bg-[#FFE2E0] text-[#91204D] border-[#FFC8C7]' 
                : 'bg-[#91204D] text-white border-[#73163A]'
            }`}>
              {savingsRate > 0 ? `${savingsRate.toFixed(0)}% saved` : '0% saved'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5 w-full bg-[#FAD4BD] h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF9E9D] to-[#91204D] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(0, Math.min(100, savingsRate))}%` }}
          />
        </div>
      </div>

    </div>
  );
};
