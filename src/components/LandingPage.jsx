import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LandingPage = ({ onStartTracking }) => {
  const handleStart = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9E9D', '#FFE2E0', '#91204D', '#A46583', '#F9CDAD'],
      });
    } catch (e) {}
    onStartTracking();
  };

  return (
    <div className="min-h-screen bg-[#F9CDAD] flex flex-col items-center justify-between p-4 sm:p-6 md:p-10 relative overflow-hidden font-sans select-none">
      
      {/* Decorative cute floating background elements */}
      <div className="absolute top-12 left-10 text-3xl animate-float opacity-70">🌸</div>
      <div className="absolute top-24 right-16 text-4xl animate-bounce-soft opacity-80">🪙</div>
      <div className="absolute bottom-20 left-16 text-3xl animate-bounce-soft opacity-70">✨</div>
      <div className="absolute bottom-16 right-20 text-4xl animate-float opacity-75">🌸</div>
      
      {/* Ambient soft glow orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FF9E9D]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#A46583]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top mini badge */}
      <div className="z-10 pt-4 sm:pt-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FFF8F3] border-2 border-[#FAD4BD] text-xs font-bold text-[#452632] shadow-cute">
          <span className="text-sm">🌸</span>
          <span>Your Cute Pocket Budget Companion</span>
          <Sparkles className="w-3.5 h-3.5 text-[#91204D]" />
        </div>
      </div>

      {/* Main Center Hero */}
      <div className="z-10 max-w-xl w-full text-center space-y-7 my-auto py-8">
        
        {/* Centered Sakura Icon Graphic (Neat & Clean) */}
        <div className="relative inline-block mx-auto">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-4xl bg-[#FFF8F3] p-1.5 shadow-cute-lg border-4 border-[#FAD4BD] flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-5xl sm:text-6xl animate-bounce-soft">🌸</span>
          </div>
        </div>

        {/* Big Stylized Title in #FF9E9D */}
        <div className="space-y-2.5">
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight font-display drop-shadow-sm lowercase"
            style={{ color: '#FF9E9D' }}
          >
            pennywise
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-bold text-[#452632] max-w-md mx-auto leading-snug">
            Track daily expenses, keep your monthly budget happy, and watch your savings bloom 🌸
          </p>
        </div>

        {/* Start Tracking Button */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 rounded-3xl text-base sm:text-lg font-extrabold text-[#452632] shadow-cute-lg hover:shadow-cute hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 border-3 border-[#FF9E9D]"
            style={{ backgroundColor: '#FFE2E0' }}
          >
            <span className="text-xl group-hover:scale-125 transition-transform">🌸</span>
            <span className="tracking-wide">start tracking</span>
            <div className="w-8 h-8 rounded-full bg-[#FFF8F3] flex items-center justify-center text-[#91204D] group-hover:translate-x-1 transition-transform shadow-sm">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
          </button>
        </div>

      </div>

      {/* Footer subtle text */}
      <div className="z-10 pb-4 text-center">
        <p className="text-xs font-bold text-[#452632]/80 flex items-center justify-center gap-1.5">
          <span>Auto-saved in browser</span>
          <span>•</span>
          <span>No login required</span>
          <span>•</span>
          <span>100% Free & Private</span>
        </p>
      </div>

    </div>
  );
};
