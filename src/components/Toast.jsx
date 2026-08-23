import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { CheckCircle, AlertCircle, Info, X, Undo2 } from 'lucide-react';

export const Toast = () => {
  const { toast, closeToast, undoDelete } = useExpenses();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center">
      <div className="flex items-center space-x-3 px-4 py-3 bg-[#452632] text-white rounded-2xl shadow-cute-lg border-2 border-[#FF9E9D] max-w-md">
        
        {/* Cute Emoji Status */}
        <div className="text-lg">
          {toast.type === 'info' ? '🌸' : toast.type === 'error' ? '⚠️' : '✨'}
        </div>

        {/* Message */}
        <div className="text-xs font-bold text-[#FFF8F3] flex-1">
          {toast.message}
        </div>

        {/* Undo Button */}
        {toast.undoCallback && (
          <button
            onClick={undoDelete}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-black text-[#452632] bg-[#FFE2E0] hover:bg-[#FFC8C7] rounded-xl transition-colors border border-[#FF9E9D]"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
        )}

        {/* Close */}
        <button
          onClick={closeToast}
          className="text-[#A46583] hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
