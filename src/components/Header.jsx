import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { 
  Menu, 
  Plus, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Calendar 
} from 'lucide-react';
import { getMonthName } from '../utils/formatters';

export const Header = ({ onBackToLanding }) => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    setIsAddModalOpen,
    setIsBudgetModalOpen,
    setIsSidebarOpen,
  } = useExpenses();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handleCurrentMonth = () => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return selectedMonth === now.getMonth() && selectedYear === now.getFullYear();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F9CDAD]/95 backdrop-blur-md border-b-2 border-[#FAD4BD] transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: 3-line Hamburger Menu Button & Logo */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* 3-Line Hamburger Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-2xl bg-[#FFF8F3] hover:bg-[#FFE2E0] active:bg-[#FFC8C7] border-2 border-[#FAD4BD] hover:border-[#FF9E9D] text-[#452632] shadow-cute active:scale-95 transition-all flex items-center justify-center group"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.8] text-[#91204D] group-hover:scale-110 transition-transform" />
            </button>

            {/* Brand Logo with Sakura Flower 🌸 & Title in #FF9E9D */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onBackToLanding}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFF8F3] border-2 border-[#FF9E9D] flex items-center justify-center text-xl shadow-sm hover:scale-105 transition-transform"
                title="Return to Welcome Screen"
              >
                🌸
              </button>

              <div>
                <button
                  onClick={onBackToLanding}
                  className="text-xl sm:text-2xl font-black tracking-tight font-display text-left lowercase hover:opacity-90 transition-opacity"
                  style={{ color: '#FF9E9D' }}
                >
                  pennywise
                </button>
              </div>
            </div>
          </div>

          {/* Right: Month Selector, Set Budget & Add Expense */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Month Navigator */}
            <div className="flex items-center bg-[#FFF8F3] rounded-2xl p-1 border-2 border-[#FAD4BD] shadow-sm">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded-xl hover:bg-[#FFE2E0] text-[#75475E] hover:text-[#452632] transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={handleCurrentMonth}
                className={`px-2.5 py-1 text-xs font-extrabold rounded-xl flex items-center space-x-1 transition-all ${
                  isCurrentMonth()
                    ? 'bg-[#FFE2E0] text-[#91204D] shadow-sm'
                    : 'text-[#452632] hover:text-[#91204D]'
                }`}
                title="Jump to current month"
              >
                <Calendar className="w-3 h-3 text-[#91204D]" />
                <span className="text-[11px] sm:text-xs">{getMonthName(selectedMonth, selectedYear)}</span>
              </button>

              <button
                onClick={handleNextMonth}
                className="p-1 rounded-xl hover:bg-[#FFE2E0] text-[#75475E] hover:text-[#452632] transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Set Budget Trigger */}
            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-extrabold text-[#452632] bg-[#FFF8F3] hover:bg-[#FFE2E0] border-2 border-[#FAD4BD] rounded-2xl shadow-sm transition-all"
              title="Configure Monthly Budget"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#91204D]" />
              <span>Budget</span>
            </button>

            {/* Add Expense Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 text-xs font-black text-[#452632] bg-[#FFE2E0] hover:bg-[#FFC8C7] border-2 border-[#FF9E9D] active:scale-95 rounded-2xl shadow-cute transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3] text-[#91204D]" />
              <span className="hidden sm:inline">+ Add Expense</span>
              <span className="sm:hidden">+ Add</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
