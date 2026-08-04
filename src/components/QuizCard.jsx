import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  MessageSquare, 
  Slack, 
  Video, 
  Users, 
  Wrench, 
  Heart, 
  Share2, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export default function QuizCard({ scenario, onAnswerSubmitted, onNextScenario, scenarioIndex, totalScenarios }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    onAnswerSubmitted(option.is_correct, scenario.conversation_type);
  };

  const resetCard = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    onNextScenario();
  };

  // Helper icons and styles for channels
  const getChannelBadge = (channel) => {
    switch (channel) {
      case 'iMessage':
        return { icon: <MessageSquare className="w-3.5 h-3.5 text-blue-400" />, label: 'iMessage / Text', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'Slack':
        return { icon: <Slack className="w-3.5 h-3.5 text-purple-400" />, label: 'Slack Thread', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
      case 'Zoom':
        return { icon: <Video className="w-3.5 h-3.5 text-cyan-400" />, label: 'Zoom Side-Chat', style: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
      case 'In-Person':
        return { icon: <Users className="w-3.5 h-3.5 text-amber-400" />, label: 'In-Person Dialogue', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      default:
        return { icon: <MessageSquare className="w-3.5 h-3.5 text-slate-400" />, label: channel, style: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  // Helper icons and styles for conversation states
  const getStateBadge = (type) => {
    switch (type) {
      case 'Practical':
        return { icon: <Wrench className="w-3.5 h-3.5 text-emerald-400" />, label: 'Practical State', desc: 'What is this really about?', style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'Emotional':
        return { icon: <Heart className="w-3.5 h-3.5 text-rose-400" />, label: 'Emotional State', desc: 'How do we feel?', style: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
      case 'Social':
        return { icon: <Share2 className="w-3.5 h-3.5 text-violet-400" />, label: 'Social State', desc: 'Who are we?', style: 'bg-violet-500/10 text-violet-400 border-violet-500/30' };
      default:
        return { icon: <HelpCircle className="w-3.5 h-3.5 text-slate-400" />, label: type, desc: '', style: 'bg-slate-800 text-slate-300' };
    }
  };

  const channelInfo = getChannelBadge(scenario.channel);
  const stateInfo = getStateBadge(scenario.conversation_type);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Scenario Header Info */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${channelInfo.style}`}>
              {channelInfo.icon}
              <span>{channelInfo.label}</span>
            </span>

            <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${stateInfo.style}`}>
              {stateInfo.icon}
              <span>{stateInfo.label}</span>
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Scenario <span className="text-indigo-400 font-bold">{scenarioIndex + 1}</span> of {totalScenarios}
          </div>
        </div>

        {/* Realistic Channel Dialogue Container */}
        <div className="pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Context & Dialogue</h3>
          
          {scenario.channel === 'iMessage' && (
            <div className="imessage-bubble-left p-4 shadow-inner text-sm leading-relaxed border border-slate-700/50">
              <div className="text-xs font-semibold text-blue-400 mb-1">Incoming Text Message:</div>
              <p className="text-slate-100">{scenario.context}</p>
            </div>
          )}

          {scenario.channel === 'Slack' && (
            <div className="slack-thread p-4 rounded-r-xl text-sm leading-relaxed space-y-1">
              <div className="text-xs font-semibold text-purple-400 flex items-center space-x-2">
                <Slack className="w-3.5 h-3.5" />
                <span>#general-team-sync</span>
              </div>
              <p className="text-slate-200">{scenario.context}</p>
            </div>
          )}

          {scenario.channel === 'Zoom' && (
            <div className="zoom-chat p-4 rounded-xl text-sm leading-relaxed space-y-1">
              <div className="text-xs font-semibold text-cyan-400 flex items-center space-x-2">
                <Video className="w-3.5 h-3.5" />
                <span>Zoom Side-Chat Box</span>
              </div>
              <p className="text-slate-200">{scenario.context}</p>
            </div>
          )}

          {scenario.channel === 'In-Person' && (
            <div className="inperson-script p-4 rounded-r-xl text-sm leading-relaxed space-y-1">
              <div className="text-xs font-semibold text-amber-400 flex items-center space-x-2">
                <Users className="w-3.5 h-3.5" />
                <span>In-Person Conversation</span>
              </div>
              <p className="text-slate-200 italic">{scenario.context}</p>
            </div>
          )}
        </div>

        {/* Prompt Question */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-indigo-500/20">
          <p className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{scenario.prompt}</span>
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 gap-3.5">
        {scenario.options.map((option) => {
          let btnStyle = "glass-card hover:border-indigo-500/50 hover:bg-slate-800/80 text-slate-200";
          let icon = null;

          if (isAnswered) {
            if (option.is_correct) {
              btnStyle = "bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 glow-emerald";
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            } else if (selectedOption?.id === option.id) {
              btnStyle = "bg-rose-950/80 border-2 border-rose-500 text-rose-100 glow-rose";
              icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
            } else {
              btnStyle = "opacity-40 bg-slate-900/40 border-slate-800 text-slate-400";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-start space-x-3.5 ${btnStyle}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                isAnswered && option.is_correct ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-indigo-300 border border-slate-700'
              }`}>
                {option.id}
              </span>

              <div className="flex-1 text-sm font-medium leading-relaxed">
                {option.text}
              </div>

              {icon}
            </button>
          );
        })}
      </div>

      {/* Immediate Pedagogical Feedback Card */}
      {isAnswered && (
        <div className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 ${
          selectedOption.is_correct 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-slate-900 border-indigo-500/30 text-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              {selectedOption.is_correct ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-emerald-400 text-sm">Supercommunicator Match!</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-rose-400 text-sm">Communication Mismatch Detected</span>
                </>
              )}
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 border border-slate-700">
              Type: {selectedOption.response_type}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedOption.feedback}
          </p>

          {/* Core Takeaway Box */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Charles Duhigg Core Principle</span>
            </div>
            <p className="text-xs text-slate-300 italic">{scenario.core_takeaway}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={resetCard}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
