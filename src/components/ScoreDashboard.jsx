import React from 'react';
import { Award, Wrench, Heart, Share2, Flame, Target, Trophy, RefreshCw } from 'lucide-react';

export default function ScoreDashboard({ stats, onResetStats, supercommunicatorRank }) {
  const getPercentage = (correct, total) => {
    if (!total || total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  const totalPercentage = getPercentage(stats.totalCorrect, stats.totalAnswered);
  const practicalPct = getPercentage(stats.practicalCorrect, stats.practicalTotal);
  const emotionalPct = getPercentage(stats.emotionalCorrect, stats.emotionalTotal);
  const socialPct = getPercentage(stats.socialCorrect, stats.socialTotal);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border-indigo-500/20">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Rank</div>
            <div className="text-base font-bold text-amber-300">{supercommunicatorRank}</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Accuracy</div>
            <div className="text-xl font-bold text-emerald-400">{totalPercentage}%</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border-indigo-500/20">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Flame className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Streak</div>
            <div className="text-xl font-bold text-indigo-300">{stats.streak} 🔥</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Answered</div>
            <div className="text-xl font-bold text-slate-100">{stats.totalAnswered}</div>
          </div>
        </div>

      </div>

      {/* Conversation State Mastery Meters */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-100">Conversation State Mastery</h3>
            <p className="text-xs text-slate-400">Your state-matching performance across Duhigg's 3 states</p>
          </div>

          <button
            onClick={onResetStats}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs transition-colors border border-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Stats</span>
          </button>
        </div>

        <div className="space-y-5">
          
          {/* Practical State */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Practical State (What is this about?)</span>
              </div>
              <span className="font-bold text-emerald-400">{practicalPct}% ({stats.practicalCorrect}/{stats.practicalTotal})</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: `${practicalPct}%` }}></div>
            </div>
          </div>

          {/* Emotional State */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="font-semibold text-slate-200">Emotional State (How do we feel?)</span>
              </div>
              <span className="font-bold text-rose-400">{emotionalPct}% ({stats.emotionalCorrect}/{stats.emotionalTotal})</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-500" style={{ width: `${emotionalPct}%` }}></div>
            </div>
          </div>

          {/* Social State */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-violet-400" />
                <span className="font-semibold text-slate-200">Social State (Who are we?)</span>
              </div>
              <span className="font-bold text-violet-400">{socialPct}% ({stats.socialCorrect}/{stats.socialTotal})</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full transition-all duration-500" style={{ width: `${socialPct}%` }}></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
