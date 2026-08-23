import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES, getCategoryById } from '../data/categories';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  Trash2, 
  Search, 
  ArrowUpDown, 
  Clock, 
  Edit3,
  Plus
} from 'lucide-react';

export const ExpenseList = () => {
  const {
    visibleExpenses,
    monthExpenses,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    deleteExpense,
    setEditingExpense,
    setIsAddModalOpen,
  } = useExpenses();

  return (
    <div className="bg-[#FFF8F3] rounded-3xl p-5 sm:p-7 border-2 border-[#FAD4BD] shadow-cute">
      
      {/* Header & Search/Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 mb-5 pb-4 border-b border-[#FAD4BD]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">📋</span>
            <h2 className="text-base sm:text-lg font-black text-[#452632] font-display">
              Expense History
            </h2>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7]">
              {visibleExpenses.length} {visibleExpenses.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-xs font-semibold text-[#75475E]">
            All recorded expenses with search and quick actions
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Input */}
          <div className="relative flex-1 sm:w-48 min-w-[150px]">
            <Search className="w-4 h-4 text-[#A46583] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#FFFDFB] focus:bg-white border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-bold text-[#452632] placeholder-[#A46583]/60 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A46583] hover:text-[#452632] text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-[#FFFDFB] border-2 border-[#FAD4BD] focus:border-[#91204D] rounded-2xl text-xs font-extrabold text-[#452632] focus:outline-none cursor-pointer appearance-none"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount (₹)</option>
              <option value="amount-asc">Lowest Amount (₹)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#A46583] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Category Filter Badges */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`text-xs font-extrabold px-3 py-1.5 rounded-2xl whitespace-nowrap transition-all border-2 ${
            selectedCategory === 'ALL'
              ? 'bg-[#91204D] text-white border-[#73163A] shadow-sm'
              : 'bg-[#FFFDFB] border-[#FAD4BD] hover:bg-[#FFEAE0] text-[#452632]'
          }`}
        >
          ✨ All ({monthExpenses.length})
        </button>

        {CATEGORIES.map((cat) => {
          const count = monthExpenses.filter((e) => e.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-2xl whitespace-nowrap border-2 transition-all ${
                isSelected
                  ? 'bg-[#FFE2E0] text-[#91204D] border-[#91204D] font-extrabold shadow-sm'
                  : 'border-[#FAD4BD] bg-[#FFFDFB] hover:bg-[#FFEAE0] text-[#452632]'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FFF8F3] border border-[#FAD4BD]">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expense List Items or Clean Empty State */}
      {visibleExpenses.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-3xl border-2 border-dashed border-[#FAD4BD] bg-[#FFFDFB]">
          <div className="w-14 h-14 rounded-3xl bg-[#FFE2E0] border-2 border-[#FF9E9D] flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
            🌸
          </div>
          
          <h3 className="text-base font-black text-[#452632] font-display">
            {searchQuery || selectedCategory !== 'ALL'
              ? 'No matching expenses found'
              : 'No expenses logged yet.'}
          </h3>
          
          <p className="text-xs font-bold text-[#75475E] max-w-sm mx-auto mt-1 mb-4">
            {searchQuery || selectedCategory !== 'ALL'
              ? 'Try resetting your search query or category filter.'
              : "No expenses logged yet. Tap '+ Add Expense' to get started!"}
          </p>

          <div className="flex items-center justify-center">
            {searchQuery || selectedCategory !== 'ALL' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="text-xs font-extrabold px-4 py-2 bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7] rounded-2xl transition-all"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs font-black px-5 py-2.5 bg-[#FFE2E0] hover:bg-[#FFC8C7] text-[#452632] border-2 border-[#FF9E9D] rounded-2xl shadow-cute hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3] text-[#91204D]" />
                <span>+ Add Expense</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {visibleExpenses.map((expense) => {
            const cat = getCategoryById(expense.category);
            return (
              <div
                key={expense.id}
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-3xl bg-[#FFFDFB] hover:bg-[#FFEAE0]/70 border-2 border-[#FAD4BD] hover:border-[#FF9E9D] transition-all duration-200 shadow-sm hover:shadow-cute"
              >
                {/* Left: Category Emoji & Details */}
                <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                  
                  {/* Category Emoji Badge */}
                  <div className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl bg-[#FFE2E0] border border-[#FFC8C7] shadow-sm">
                    {cat.emoji}
                  </div>

                  {/* Title, Date & Metadata */}
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-black text-[#452632] truncate">
                        {expense.title}
                      </h4>
                      <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-[#FFF0EE] text-[#91204D] border border-[#FFC8C7]">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs text-[#75475E]">
                      <span className="flex items-center font-bold">
                        <Clock className="w-3 h-3 text-[#A46583] mr-1" />
                        {formatDate(expense.date)}
                      </span>

                      {expense.paymentMethod && (
                        <>
                          <span className="text-[#A46583]">•</span>
                          <span className="text-[11px] font-semibold text-[#75475E]">
                            {expense.paymentMethod}
                          </span>
                        </>
                      )}

                      {expense.notes && (
                        <>
                          <span className="text-[#A46583]">•</span>
                          <span className="text-[11px] font-medium text-[#75475E] italic truncate max-w-[150px] sm:max-w-[250px]">
                            {expense.notes}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount in ₹ & Red Delete Button */}
                <div className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
                  
                  {/* Amount Display */}
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-[#452632] tracking-tight font-display">
                      {formatCurrency(expense.amount)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-1">
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setEditingExpense(expense);
                        setIsAddModalOpen(true);
                      }}
                      className="p-2 rounded-2xl text-[#A46583] hover:text-[#91204D] hover:bg-[#FFE2E0] transition-all"
                      title="Edit expense"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* RED Delete (Trash) Button */}
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 rounded-2xl text-rose-600 hover:text-rose-700 bg-rose-100/90 hover:bg-rose-200 border-2 border-rose-300 active:scale-90 transition-all shadow-sm"
                      title="Delete expense"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
