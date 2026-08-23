import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  Receipt, 
  PieChart, 
  SlidersHorizontal, 
  Download, 
  Home, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { exportExpensesToCSV } from '../utils/formatters';

export const SidebarDrawer = ({ activeView, setActiveView, onBackToLanding }) => {
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    setIsBudgetModalOpen, 
    expenses, 
    showToast,
    selectedYear,
    selectedMonth
  } = useExpenses();

  if (!isSidebarOpen) return null;

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setIsSidebarOpen(false);
  };

  const handleExport = () => {
    if (expenses.length === 0) {
      showToast('No expenses to export yet!', 'info');
      return;
    }
    exportExpensesToCSV(expenses, `pennywise_expenses_${selectedYear}_${selectedMonth + 1}.csv`);
    showToast('Expenses exported successfully');
    setIsSidebarOpen(false);
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      subtitle: 'Dashboard Cards & Metrics',
      emoji: '🌸',
      icon: LayoutDashboard,
    },
    {
      id: 'quick-log',
      label: 'Quick Log',
      subtitle: 'Fast Expense Logger',
      emoji: '✍️',
      icon: PlusCircle,
    },
    {
      id: 'history',
      label: 'Expense List',
      subtitle: 'History & Trash Actions',
      emoji: '📋',
      icon: Receipt,
    },
    {
      id: 'breakdown',
      label: 'Breakdown & Charts',
      subtitle: 'Category Spend Donut',
      emoji: '📊',
      icon: PieChart,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark blur backdrop */}
      <div 
        className="absolute inset-0 bg-[#452632]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-[#FFF8F3] border-r-3 border-[#FAD4BD] shadow-cute-lg flex flex-col justify-between z-10 animate-scale-in">
        
        {/* Drawer Header */}
        <div>
          <div className="p-5 sm:p-6 bg-[#FFE2E0] border-b-2 border-[#FFC8C7] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8F3] border-2 border-[#FF9E9D] flex items-center justify-center text-2xl shadow-sm">
                🌸
              </div>
              <div>
                <h2 
                  className="text-xl font-black font-display tracking-tight lowercase"
                  style={{ color: '#FF9E9D' }}
                >
                  pennywise
                </h2>
                <p className="text-[11px] font-bold text-[#452632]">
                  Pocket Budget Companion
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FFF8F3] hover:bg-[#FFC8C7] text-[#452632] flex items-center justify-center transition-colors shadow-sm"
              title="Close Menu"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-4 sm:p-5 space-y-2">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#75475E]">
              Main Navigation
            </div>

            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all text-left group ${
                    isActive
                      ? 'bg-[#FFE2E0] border-[#91204D] text-[#91204D] font-extrabold shadow-sm scale-[1.02]'
                      : 'border-[#FAD4BD] bg-[#FFFDFB] hover:bg-[#FFEAE0] text-[#452632]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-black truncate">{item.label}</div>
                      <div className="text-[10px] font-semibold text-[#75475E] truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight 
                    className={`w-4 h-4 text-[#A46583] transition-transform ${
                      isActive ? 'translate-x-0.5 text-[#91204D]' : 'group-hover:translate-x-1'
                    }`} 
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t-2 border-[#FAD4BD] bg-[#FFFDFB] space-y-2">
          <div className="px-3 text-[10px] font-black uppercase tracking-wider text-[#75475E]">
            Quick Actions
          </div>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              setIsBudgetModalOpen(true);
            }}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#452632] hover:bg-[#FFE2E0] border border-[#FAD4BD] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#91204D]" />
            <span>Set Monthly Budget</span>
          </button>

          <button
            onClick={handleExport}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#452632] hover:bg-[#FFE2E0] border border-[#FAD4BD] transition-colors"
          >
            <Download className="w-4 h-4 text-[#91204D]" />
            <span>Export Expenses CSV</span>
          </button>

          <button
            onClick={() => {
              setIsSidebarOpen(false);
              onBackToLanding();
            }}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#75475E] hover:text-[#452632] hover:bg-[#FFEAE0] transition-colors"
          >
            <Home className="w-4 h-4 text-[#A46583]" />
            <span>Return to Landing Page</span>
          </button>
        </div>

      </div>
    </div>
  );
};
