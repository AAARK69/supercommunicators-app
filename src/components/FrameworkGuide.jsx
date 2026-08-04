import React from 'react';
import { Wrench, Heart, Share2, AlertTriangle, CheckCircle2, BookOpen, Repeat } from 'lucide-react';

export default function FrameworkGuide() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* Title Hero */}
      <div className="glass-panel p-8 rounded-3xl border-indigo-500/20 text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Charles Duhigg Framework</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100">The Anatomy of a Supercommunicator</h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Supercommunicators recognize that every conversation takes place in one of three hidden states. To build trust and connect, you must match their current state before trying to solve problems or shift topics.
        </p>
      </div>

      {/* 3 Conversation States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Practical State */}
        <div className="glass-panel p-6 rounded-2xl border-emerald-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">1. Practical State</h3>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">"What is this really about?"</p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Focused on decisions, logistics, action items, metrics, and problem-solving. Demands direct, precise, and practical responses.
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-bold text-emerald-400">Matching Strategy:</span> Deliver concrete data, clear next steps, and efficient resolution.
          </div>
        </div>

        {/* Emotional State */}
        <div className="glass-panel p-6 rounded-2xl border-rose-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">2. Emotional State</h3>
            <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider">"How do we feel?"</p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Focused on feelings, vulnerability, venting, frustration, or excitement. Requires empathy and emotional validation before solutions.
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-bold text-rose-400">Matching Strategy:</span> Validate their feelings, mirror emotional intensity, and refrain from unsolicited advice.
          </div>
        </div>

        {/* Social State */}
        <div className="glass-panel p-6 rounded-2xl border-violet-500/20 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">3. Social State</h3>
            <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider">"Who are we?"</p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Focused on identity, group dynamics, status, shared background, and belonging. Requires warmth and rapport.
          </p>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-bold text-violet-400">Matching Strategy:</span> Acknowledge group identity, show mutual connection, and reciprocate social invitations.
          </div>
        </div>

      </div>

      {/* Looping for Understanding Technique */}
      <div className="glass-panel p-6 rounded-2xl border-indigo-500/20 space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400">
          <Repeat className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">The 3-Step "Looping for Understanding" Technique</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-indigo-400">Step 1: Active Listening</div>
            <p className="text-slate-300">Listen deeply to hidden subtext, emotional cues, and underlying needs without interrupting.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-indigo-400">Step 2: Reflect in Your Own Words</div>
            <p className="text-slate-300">Summarize their core message and feelings using your own phrasing (e.g. "What I'm hearing is...").</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-indigo-400">Step 3: Ask for Confirmation</div>
            <p className="text-slate-300">Explicitly check: "Did I get that right?" or "Is that how it feels?" to confirm alignment.</p>
          </div>
        </div>
      </div>

      {/* Distractor Traps */}
      <div className="glass-panel p-6 rounded-2xl border-rose-500/20 space-y-4">
        <div className="flex items-center space-x-2 text-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Common Distractor Traps to Avoid</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400">Toxic Positivity</div>
            <p className="text-slate-300">Forcing cheerful optimism or "look on the bright side" cheerleading onto someone who is venting emotionally.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-rose-400">Unsolicited Optimization</div>
            <p className="text-slate-300">Offering tools, software, or action fixes when a colleague simply wants human validation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400">Practical Overreach</div>
            <p className="text-slate-300">Jumping straight into task execution while skipping connection or active listening.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-violet-400">Social Misalignment</div>
            <p className="text-slate-300">Ignoring identity cues or treating warm social invitations with cold, pedantic analysis.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
