import React from 'react';
import { 
  LayoutGrid, 
  PlusCircle, 
  ReceiptText, 
  PieChart, 
  Layers
} from 'lucide-react';

export const FOLDER_SECTIONS = [
  {
    id: 'all',
    name: 'All Folders',
    emoji: '📁',
    icon: Layers,
    description: 'Complete overview of all 4 sections',
  },
  {
    id: 'dashboard',
    name: 'Dashboard Cards',
    emoji: '🌸',
    icon: LayoutGrid,
    description: 'Spent, Remaining Budget, Cap & Savings',
  },
  {
    id: 'add',
    name: 'Quick Log',
    emoji: '✍️',
    icon: PlusCircle,
    description: 'Enter new milk, groceries, bills spend',
  },
  {
    id: 'history',
    name: 'Expense List',
    emoji: '📋',
    icon: ReceiptText,
    description: 'All items with red delete buttons',
  },
  {
    id: 'breakdown',
    name: 'Breakdown & Charts',
    emoji: '📊',
    icon: PieChart,
    description: 'Donut chart & category spending',
  },
];

export const FolderTabs = ({ activeFolder, setActiveFolder }) => {
  return (
    <div className="mb-6">
      {/* Folder Tabs Row */}
      <div className="flex items-end space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {FOLDER_SECTIONS.map((folder) => {
          const isActive = activeFolder === folder.id;
          const Icon = folder.icon;

          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`group relative flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-t-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-[#FFF8F3] text-[#91204D] border-t-3 border-t-[#91204D] border-x-2 border-x-[#FAD4BD] shadow-cute z-10 -mb-[2px] pb-3.5 font-extrabold'
                  : 'bg-[#FAD4BD] hover:bg-[#FFE2E0] text-[#75475E] hover:text-[#452632] border-t-2 border-t-[#E8B690] border-x-2 border-x-[#E8B690] opacity-90'
              }`}
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {folder.emoji}
              </span>
              <span>{folder.name}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#91204D] inline-block animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Decorative colored strip connecting tabs to folder box */}
      <div className="h-1.5 bg-[#FFF8F3] border-t border-[#FAD4BD] w-full rounded-t-sm" />
    </div>
  );
};
