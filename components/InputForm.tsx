import React from 'react';
import { UserProfile } from '../types';
import { DollarSign, User, Target, Briefcase, ChevronRight, Loader2 } from 'lucide-react';

interface InputFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ profile, setProfile, onSubmit, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'financialGoal' || name === 'riskTolerance' ? value : Number(value)
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Financial Profile</h2>
        <p className="text-slate-400">Let's understand your current standing to build your future.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        
        {/* Basic Info Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <User className="w-4 h-4 mr-2 text-emerald-400" /> Current Age
            </label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300 flex items-center">
              <Target className="w-4 h-4 mr-2 text-emerald-400" /> Retirement Age
            </label>
            <input
              type="number"
              name="retirementAge"
              value={profile.retirementAge}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Money Group */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-300 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-emerald-400" /> Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">$</span>
              <input
                type="number"
                name="annualIncome"
                value={profile.annualIncome}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-emerald-400" /> Current Savings
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">$</span>
              <input
                type="number"
                name="currentSavings"
                value={profile.currentSavings}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" /> Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">$</span>
              <input
                type="number"
                name="monthlyContribution"
                value={profile.monthlyContribution}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Strategy Group */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Risk Tolerance</label>
          <div className="grid grid-cols-3 gap-4">
            {['Low', 'Moderate', 'High'].map((risk) => (
              <button
                key={risk}
                type="button"
                onClick={() => setProfile(p => ({ ...p, riskTolerance: risk as any }))}
                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                  profile.riskTolerance === risk
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-300">Primary Financial Goal</label>
           <textarea
             name="financialGoal"
             value={profile.financialGoal}
             onChange={handleChange}
             rows={2}
             className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
             placeholder="e.g. Retire at 60 with a paid-off home..."
             required
           />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/50 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Market Data...
            </>
          ) : (
            <>
              Generate Strategy <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// Internal icon component for ease of use in this file
const TrendingUp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);
