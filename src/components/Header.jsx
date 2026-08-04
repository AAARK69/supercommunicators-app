import React from 'react';
import { Brain, Sparkles, Award, BookOpen, Eye, EyeOff } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, stats, supercommunicatorRank, isBlindMode, setIsBlindMode }) {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Title */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('quiz')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Supercommunicators
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full uppercase">
                Duhigg Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">Master Practical, Emotional & Social Conversation States</p>
          </div>
        </div>

        {/* Tab & Blind Mode Controls */}
        <div className="flex items-center space-x-3 flex-wrap justify-center">
          <nav className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Quiz Trainer</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Framework Guide</span>
            </button>
          </nav>

          {/* Blind Mode Toggle Button */}
          <button
            onClick={() => setIsBlindMode(!isBlindMode)}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isBlindMode
                ? 'bg-purple-950/80 border-purple-500/60 text-purple-300 shadow-md shadow-purple-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Blind Mode hides category hints so you must diagnose the conversation state yourself!"
          >
            {isBlindMode ? (
              <>
                <EyeOff className="w-4 h-4 text-purple-400" />
                <span>Blind Mode ON 🙈</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Standard Mode 👁️</span>
              </>
            )}
          </button>
        </div>

        {/* User Rank & Score Pills */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Rank:</span>
            <span className="font-semibold text-amber-300">{supercommunicatorRank}</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-800/50 text-xs">
            <span className="text-slate-400">Streak:</span>
            <span className="font-bold text-indigo-400">{stats.streak} 🔥</span>
          </div>
        </div>

      </div>
    </header>
  );
}
