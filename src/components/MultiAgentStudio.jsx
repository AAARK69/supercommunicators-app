import React, { useState } from 'react';
import { Bot, Play, CheckCircle2, AlertCircle, Code, Cpu, RefreshCw, FileText, Search, ShieldCheck, Database } from 'lucide-react';

export default function MultiAgentStudio() {
  const [topic, setTopic] = useState("Managing team burnout and sudden deadline shifts");
  const [conversationState, setConversationState] = useState("Emotional");
  const [channel, setChannel] = useState("Slack");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentLogs, setAgentLogs] = useState([]);
  const [outputJson, setOutputJson] = useState(null);

  const handleRunPipeline = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setAgentLogs([]);
    setOutputJson(null);

    // Step 0: Research Bot
    setTimeout(() => {
      setAgentLogs(prev => [
        ...prev,
        {
          agent: "Agent 0: DuhiggResearchBot",
          status: "completed",
          title: "Research Blueprint Created",
          details: `Analyzed workplace friction around "${topic}". Identified hidden subtext cues (over-apologetic tone, trailing ellipses). Recommended Distractor Trap: "Unsolicited Optimization".`
        }
      ]);
      setCurrentStep(2);
    }, 1200);

    // Step 1: Generator
    setTimeout(() => {
      setAgentLogs(prev => [
        ...prev,
        {
          agent: "Agent A: ScenarioGenerator",
          status: "completed",
          title: "Scenario & MCQ Drafted",
          details: `Drafted 2020s ${channel} dialogue for ${conversationState} state. Constructed 4 options including distractor trap.`
        }
      ]);
      setCurrentStep(3);
    }, 2500);

    // Step 2: Auditor
    setTimeout(() => {
      setAgentLogs(prev => [
        ...prev,
        {
          agent: "Agent B: DuhiggAuditor",
          status: "approved",
          title: "STATUS: APPROVED",
          details: `Signal clarity verified. Correct answer unequivocally matches ${conversationState} state. Distractor trap valid against Duhigg criteria.`
        }
      ]);
      setCurrentStep(4);
    }, 3800);

    // Step 3: Formatter
    setTimeout(() => {
      const mockResult = {
        scenario_id: "a84f9321-72b1-482f-b2e4-998811223344",
        channel: channel,
        conversation_type: conversationState,
        difficulty_level: 2,
        context: `In a ${channel} thread during sprint planning, a developer writes: 'I'm honestly feeling really overwhelmed with these 3 overlapping deadlines. I feel like I'm sinking.'`,
        prompt: `How do you respond to match their conversation state?`,
        options: [
          {
            id: "A",
            text: "I hear you, that sounds incredibly overwhelming and heavy. Thank you for telling us.",
            is_correct: true,
            response_type: conversationState,
            feedback: "CORRECT (Emotional Match): Validates feeling before offering solutions."
          },
          {
            id: "B",
            text: "Here is a list of 5 time management apps you should install right now.",
            is_correct: false,
            response_type: "Mismatch",
            feedback: "MISMATCH (Unsolicited Optimization): Offers unwanted advice when emotional empathy was needed."
          }
        ],
        core_takeaway: "Match the emotional state before offering practical solutions."
      };

      setAgentLogs(prev => [
        ...prev,
        {
          agent: "Agent C: SchemaFormatter",
          status: "completed",
          title: "JSON Serialization Complete",
          details: "Validated against Pydantic ScenarioSchema with 0 errors."
        }
      ]);
      setOutputJson(mockResult);
      setIsRunning(false);
      setCurrentStep(0);
    }, 5000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Studio Header */}
      <div className="glass-panel p-6 rounded-2xl border-indigo-500/20 space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Multi-Agent Generation Studio</h2>
            <p className="text-xs text-slate-400">Simulate the 4-agent workflow: Researcher → Generator → Auditor → Formatter</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Generation Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Scenario Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Target Conversation State</label>
            <select
              value={conversationState}
              onChange={(e) => setConversationState(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Emotional">Emotional (How do we feel?)</option>
              <option value="Practical">Practical (What is this about?)</option>
              <option value="Social">Social (Who are we?)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Channel Medium</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Slack">Slack Thread</option>
              <option value="iMessage">iMessage / Text</option>
              <option value="Zoom">Zoom Side-Chat</option>
              <option value="In-Person">In-Person Dialogue</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Agents...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run 4-Agent Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Roster Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep === 1 ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 glow-cyan' : 'glass-card text-slate-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-bold mb-1 text-cyan-400">
            <Search className="w-4 h-4" />
            <span>Agent 0: Researcher</span>
          </div>
          <p className="text-xs text-slate-400">Builds subtext & trap blueprint</p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          currentStep === 2 ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200 glow-indigo' : 'glass-card text-slate-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-bold mb-1 text-indigo-400">
            <Cpu className="w-4 h-4" />
            <span>Agent A: Generator</span>
          </div>
          <p className="text-xs text-slate-400">Drafts dialogue & 4 MCQs</p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          currentStep === 3 ? 'bg-violet-950/40 border-violet-500 text-violet-200 glow-violet' : 'glass-card text-slate-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-bold mb-1 text-violet-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Agent B: Auditor</span>
          </div>
          <p className="text-xs text-slate-400">Verifies against Duhigg rules</p>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          currentStep === 4 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 glow-emerald' : 'glass-card text-slate-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-bold mb-1 text-emerald-400">
            <Database className="w-4 h-4" />
            <span>Agent C: Formatter</span>
          </div>
          <p className="text-xs text-slate-400">Outputs Pydantic JSON</p>
        </div>

      </div>

      {/* Execution Logs */}
      {agentLogs.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Live Execution Log</span>
          </h3>

          <div className="space-y-3">
            {agentLogs.map((log, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400">{log.agent}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-semibold">
                    {log.title}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output JSON Viewer */}
      {outputJson && (
        <div className="glass-panel p-6 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-emerald-400">
            <Code className="w-4 h-4" />
            <span>Validated Pydantic JSON Output</span>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
            {JSON.stringify(outputJson, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}
