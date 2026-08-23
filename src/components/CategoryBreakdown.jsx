import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { getCategoryById } from '../data/categories';
import { formatCurrency } from '../utils/formatters';
import { ChevronRight, Plus } from 'lucide-react';

export const CategoryBreakdown = () => {
  const { metrics, selectedCategory, setSelectedCategory, monthExpenses, setIsAddModalOpen } = useExpenses();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const { categoryBreakdown, totalSpentThisMonth } = metrics;

  if (monthExpenses.length === 0) {
    return (
      <div className="bg-[#FFF8F3] rounded-3xl p-6 sm:p-7 border-2 border-[#FAD4BD] shadow-cute flex flex-col items-center justify-center text-center h-full min-h-[260px]">
        <div className="w-14 h-14 rounded-3xl bg-[#FFE2E0] border-2 border-[#FF9E9D] flex items-center justify-center text-2xl mb-3 shadow-sm">
          📊
        </div>
        <h3 className="text-base font-black text-[#452632] font-display">No Category Spending Yet</h3>
        <p className="text-xs font-bold text-[#75475E] max-w-xs mt-1 mb-4">
          Add your first expense to view the visual breakdown and category distribution.
        </p>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-1.5 text-xs font-extrabold px-4 py-2 bg-[#FFE2E0] text-[#452632] border-2 border-[#FF9E9D] rounded-2xl shadow-sm hover:scale-105 transition-transform"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3] text-[#91204D]" />
          <span>+ Add Spend</span>
        </button>
      </div>
    );
  }

  // Calculate SVG Donut slices
  let cumulativePercent = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const donutSlices = categoryBreakdown.map((item) => {
    const categoryInfo = getCategoryById(item.categoryId);
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += item.percentage;

    return {
      ...item,
      categoryInfo,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="bg-[#FFF8F3] rounded-3xl p-6 sm:p-7 border-2 border-[#FAD4BD] shadow-cute">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#FAD4BD]">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE2E0] border border-[#FFC8C7] flex items-center justify-center text-xl shadow-sm">
            📊
          </div>
          <div>
            <h3 className="text-base font-black text-[#452632] font-display">Category Breakdown</h3>
            <p className="text-xs font-semibold text-[#75475E]">Monthly spend distribution</p>
          </div>
        </div>

        {selectedCategory !== 'ALL' && (
          <button
            onClick={() => setSelectedCategory('ALL')}
            className="text-[11px] font-extrabold text-[#91204D] bg-[#FFE2E0] hover:bg-[#FFC8C7] px-2.5 py-1 rounded-xl transition-colors border border-[#FFC8C7]"
          >
            Show All
          </button>
        )}
      </div>

      {/* SVG Donut Visual */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
        <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#FDECE0"
              strokeWidth="22"
            />
            {/* Slices */}
            {donutSlices.map((slice) => {
              const isHovered = hoveredCategory === slice.categoryId;
              const isSelected = selectedCategory === slice.categoryId;
              return (
                <circle
                  key={slice.categoryId}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={slice.categoryInfo.chartColor || '#FF9E9D'}
                  strokeWidth={isHovered || isSelected ? '26' : '22'}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(slice.categoryId)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === slice.categoryId ? 'ALL' : slice.categoryId
                    )
                  }
                />
              );
            })}
          </svg>

          {/* Donut Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="text-lg">
              {hoveredCategory
                ? getCategoryById(hoveredCategory).emoji
                : selectedCategory !== 'ALL'
                ? getCategoryById(selectedCategory).emoji
                : '🪙'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#75475E] truncate max-w-[90px]">
              {hoveredCategory
                ? getCategoryById(hoveredCategory).name
                : selectedCategory !== 'ALL'
                ? getCategoryById(selectedCategory).name
                : 'Total Spent'}
            </span>
            <span className="text-xs font-black text-[#452632] font-display">
              {hoveredCategory
                ? formatCurrency(
                    categoryBreakdown.find((c) => c.categoryId === hoveredCategory)?.total || 0
                  )
                : selectedCategory !== 'ALL'
                ? formatCurrency(
                    categoryBreakdown.find((c) => c.categoryId === selectedCategory)?.total || 0
                  )
                : formatCurrency(totalSpentThisMonth)}
            </span>
          </div>
        </div>

        {/* Top Category Highlight */}
        {categoryBreakdown.length > 0 && (
          <div className="flex-1 w-full space-y-2">
            <span className="text-[11px] font-black text-[#75475E] uppercase tracking-wider">
              Top Category
            </span>
            {(() => {
              const top = categoryBreakdown[0];
              const info = getCategoryById(top.categoryId);
              return (
                <div className="p-3.5 rounded-2xl bg-[#FFFDFB] border-2 border-[#FAD4BD] flex items-center space-x-3 shadow-sm">
                  <div className="text-2xl">{info.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-[#452632] truncate">{info.name}</h4>
                      <span className="text-xs font-black text-[#91204D]">
                        {top.percentage.toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-[#75475E]">{formatCurrency(top.total)}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Category List Rows with click-to-filter */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {categoryBreakdown.map((item) => {
          const info = getCategoryById(item.categoryId);
          const isSelected = selectedCategory === item.categoryId;
          return (
            <button
              key={item.categoryId}
              onClick={() =>
                setSelectedCategory(selectedCategory === item.categoryId ? 'ALL' : item.categoryId)
              }
              onMouseEnter={() => setHoveredCategory(item.categoryId)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`w-full p-2.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                isSelected
                  ? 'bg-[#FFE2E0] border-[#91204D] text-[#91204D] font-extrabold shadow-sm'
                  : 'border-[#FAD4BD] bg-[#FFFDFB] hover:bg-[#FFEAE0] text-[#452632]'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="text-base">{info.emoji}</span>
                <span className="text-xs font-bold truncate">{info.name}</span>
              </div>

              <div className="flex items-center space-x-3 text-right">
                <div>
                  <span className="text-xs font-black text-[#452632] block">
                    {formatCurrency(item.total)}
                  </span>
                  <span className="text-[10px] text-[#75475E] font-extrabold">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-[#A46583] transition-transform ${
                    isSelected ? 'rotate-90 text-[#91204D]' : 'group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
