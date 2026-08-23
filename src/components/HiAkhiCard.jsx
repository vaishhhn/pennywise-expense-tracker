import React from 'react';
import { Sparkles, ArrowUpLeft } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export const HiAkhiCard = () => {
  const { setIsSidebarOpen } = useExpenses();

  return (
    <div className="relative mb-6 rounded-3xl bg-[#FFF8F3] border-3 border-[#FAD4BD] p-5 sm:p-6 shadow-cute overflow-hidden group">
      
      {/* Visual Curved Arrow Graphic pointing UP towards top-left hamburger menu */}
      <div className="absolute top-2 left-3 sm:left-4 flex items-center space-x-1.5 z-10">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#FFE2E0] border border-[#FF9E9D] text-[10px] sm:text-xs font-black text-[#91204D] shadow-sm hover:scale-105 active:scale-95 transition-all animate-bounce-soft"
        >
          <ArrowUpLeft className="w-3.5 h-3.5 stroke-[3] text-[#91204D]" />
          <span>Tap here to navigate ↗</span>
        </button>
      </div>

      {/* Decorative SVG curved dashed arrow arching up-left */}
      <div className="hidden sm:block absolute top-1 left-28 pointer-events-none opacity-60">
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
          <path
            d="M50 35 C35 35 15 25 8 8"
            stroke="#91204D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path
            d="M6 14 L8 6 L16 8"
            stroke="#91204D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="pt-7 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#452632] font-display flex items-center gap-2">
              <span>Hi Akhi</span>
              <span className="text-3xl animate-bounce-soft inline-block">👋</span>
            </h2>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FFE2E0] text-[#91204D] border border-[#FFC8C7]">
              🌸 Welcome
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#75475E] leading-relaxed max-w-xl">
            Welcome to your Pennywise budget planner! Your slate is fresh and ready. Tap the menu above to switch folders, log your daily spends, or adjust your monthly cap.
          </p>
        </div>

        {/* Mascot & Quick Tip with Sakura Flower 🌸 */}
        <div className="flex items-center space-x-3 bg-[#FFE2E0]/70 border-2 border-[#FFC8C7] px-4 py-2.5 rounded-2xl flex-shrink-0">
          <span className="text-2xl sm:text-3xl">🌸</span>
          <div className="text-left">
            <span className="text-[10px] font-black text-[#91204D] uppercase tracking-wider block">
              Budget Buddy
            </span>
            <span className="text-xs font-extrabold text-[#452632]">
              Ready to track! ✨
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
