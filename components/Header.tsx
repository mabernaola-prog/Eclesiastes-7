import React from 'react';
import { BookOpen, Info } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="p-2 bg-white text-black rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Eclesiastes <span className="text-zinc-500">7</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900 rounded-full" aria-label="Información">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};