import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-slate-900" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              WealthMind AI
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
             <div className="flex items-center text-xs text-slate-400 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50">
                <Activity className="h-3 w-3 mr-2 text-emerald-400" />
                <span>AI Powered Advisory</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};