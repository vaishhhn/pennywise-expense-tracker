import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Database, RefreshCw, Trash, Sparkles } from 'lucide-react';
import { exportExpensesToCSV } from '../utils/formatters';

export const Footer = () => {
  const { expenses, resetToSampleData, clearAllData, showToast } = useExpenses();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all expense records?')) {
      clearAllData();
    }
  };

  return (
    <footer className="mt-12 pb-10 border-t-2 border-[#FAD4BD] pt-8 text-[#75475E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Storage & Status */}
        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFF8F3] text-[#452632] border-2 border-[#FAD4BD] shadow-sm">
            <span className="text-sm">💾</span>
            <span>Auto-Saved in Browser LocalStorage</span>
          </div>
          <span className="text-[#A46583]">•</span>
          <span>{expenses.length} records</span>
        </div>

        {/* Center: Brand tagline */}
        <div className="text-xs font-bold text-[#452632] flex items-center gap-1">
          <span>pennywise &copy; {new Date().getFullYear()}</span>
          <span>•</span>
          <span>Your cute pocket money friend 🌸</span>
        </div>

        {/* Right: Reset and Clear */}
        <div className="flex items-center space-x-2">
          <button
            onClick={resetToSampleData}
            className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1.5 text-[#452632] bg-[#FFF8F3] hover:bg-[#FFE2E0] border-2 border-[#FAD4BD] rounded-xl transition-all"
            title="Reset to demo starter data"
          >
            <RefreshCw className="w-3 h-3 text-[#91204D]" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1.5 text-rose-700 bg-[#FFF0EE] hover:bg-[#FFE2E0] border-2 border-rose-200 rounded-xl transition-all"
            title="Clear all records"
          >
            <Trash className="w-3 h-3 text-rose-600" />
            <span>Clear All</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
