import React from 'react';
import { AdvisoryResult, UserProfile } from '../types';
import { WealthProjectionChart, AllocationChart } from './Charts';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

interface DashboardProps {
  data: AdvisoryResult;
  profile: UserProfile;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, profile, onReset }) => {
  const finalAmount = data.projectionData[data.projectionData.length - 1]?.amount || 0;
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Summary Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="w-64 h-64 text-emerald-500" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
              AI Strategy Generated
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {data.strategyTitle}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {data.executiveSummary}
            </p>
          </div>
          
          <div className="flex flex-col justify-center items-start md:items-end space-y-2 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
            <span className="text-sm text-slate-400 font-medium">Projected Net Worth (Age {profile.retirementAge})</span>
            <span className="text-4xl md:text-5xl font-bold text-white">
              ${(finalAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1" /> Inflation Adjusted Estimate
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Wealth Projection */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" /> Wealth Trajectory
              </h3>
            </div>
            <WealthProjectionChart data={data.projectionData} />
          </div>

          {/* Allocation Details (List View for Mobile/Detail) */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
             <h3 className="text-xl font-bold text-white mb-4">Portfolio Composition Details</h3>
             <div className="space-y-4">
               {data.allocations.map((asset, idx) => (
                 <div key={idx} className="flex items-start p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-white">{asset.assetClass}</span>
                        <span className="font-bold text-emerald-400">{asset.percentage}%</span>
                      </div>
                      <p className="text-sm text-slate-400">{asset.description}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>

        {/* Sidebar: Allocation Pie & Analysis */}
        <div className="space-y-8">
          
          {/* Asset Allocation Pie */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center">
             <h3 className="text-lg font-bold text-white mb-2 self-start w-full border-b border-slate-700 pb-2">Target Allocation</h3>
             <AllocationChart data={data.allocations} />
          </div>

          {/* Risk Analysis Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
             <h3 className="text-lg font-bold text-white mb-3 flex items-center">
               <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Risk Assessment
             </h3>
             <p className="text-slate-300 text-sm leading-relaxed">
               {data.riskAnalysis}
             </p>
          </div>

          {/* Actionable Steps */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center">
               <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" /> Recommended Actions
             </h3>
             <ul className="space-y-3">
               {data.actionableSteps.map((step, i) => (
                 <li key={i} className="flex items-start text-sm text-slate-300">
                   <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></span>
                   {step}
                 </li>
               ))}
             </ul>
          </div>
          
          <button 
            onClick={onReset}
            className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center font-medium"
          >
            Create New Strategy
          </button>

        </div>
      </div>
    </div>
  );
};