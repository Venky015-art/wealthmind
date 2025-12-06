import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { generateFinancialAdvice } from './services/geminiService';
import { UserProfile, AdvisoryResult, AppState } from './types';
import { INITIAL_USER_PROFILE } from './constants';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [result, setResult] = useState<AdvisoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const advice = await generateFinancialAdvice(profile);
      setResult(advice);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.INPUT);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col justify-center">
        
        {appState === AppState.INPUT && (
          <div className="animate-fade-in-up">
            <InputForm 
              profile={profile} 
              setProfile={setProfile} 
              onSubmit={handleSubmit}
              isLoading={false}
            />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
            <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center space-y-2">
               <h2 className="text-2xl font-bold text-white">Analyzing Financial Data</h2>
               <p className="text-slate-400">Our AI is constructing your personalized wealth strategy...</p>
            </div>
          </div>
        )}

        {appState === AppState.RESULTS && result && (
          <Dashboard 
            data={result} 
            profile={profile} 
            onReset={handleReset} 
          />
        )}

        {appState === AppState.ERROR && (
           <div className="max-w-lg mx-auto w-full bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center space-y-4 backdrop-blur-sm">
             <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
               <AlertCircle className="w-8 h-8 text-red-500" />
             </div>
             <h3 className="text-xl font-bold text-white">Analysis Failed</h3>
             <p className="text-slate-300">{error}</p>
             <button 
               onClick={() => setAppState(AppState.INPUT)}
               className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-600"
             >
               Try Again
             </button>
           </div>
        )}
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950">
        <p>© {new Date().getFullYear()} WealthMind AI. Not professional financial advice. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;