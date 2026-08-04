import React, { useState } from 'react';
import Header from './components/Header';
import QuizCard from './components/QuizCard';
import ScoreDashboard from './components/ScoreDashboard';
import FrameworkGuide from './components/FrameworkGuide';
import seedScenarios from './data/scenarios_seed.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  
  const [stats, setStats] = useState({
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    practicalCorrect: 0,
    practicalTotal: 0,
    emotionalCorrect: 0,
    emotionalTotal: 0,
    socialCorrect: 0,
    socialTotal: 0,
  });

  const calculateRank = () => {
    if (stats.totalAnswered === 0) return 'Novice Listener';
    const accuracy = (stats.totalCorrect / stats.totalAnswered) * 100;
    if (stats.totalAnswered >= 10 && accuracy >= 90) return 'Master Supercommunicator 🧠';
    if (stats.totalAnswered >= 5 && accuracy >= 80) return 'Advanced Matcher 🌟';
    if (stats.totalAnswered >= 3 && accuracy >= 60) return 'Active Listener 🎧';
    return 'Conversational Apprentice 💬';
  };

  const handleAnswerSubmitted = (isCorrect, conversationType) => {
    setStats((prev) => {
      const newTotalAnswered = prev.totalAnswered + 1;
      const newTotalCorrect = isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect;
      const newStreak = isCorrect ? prev.streak + 1 : 0;

      let practicalC = prev.practicalCorrect;
      let practicalT = prev.practicalTotal;
      let emotionalC = prev.emotionalCorrect;
      let emotionalT = prev.emotionalTotal;
      let socialC = prev.socialCorrect;
      let socialT = prev.socialTotal;

      if (conversationType === 'Practical') {
        practicalT += 1;
        if (isCorrect) practicalC += 1;
      } else if (conversationType === 'Emotional') {
        emotionalT += 1;
        if (isCorrect) emotionalC += 1;
      } else if (conversationType === 'Social') {
        socialT += 1;
        if (isCorrect) socialC += 1;
      }

      return {
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        streak: newStreak,
        practicalCorrect: practicalC,
        practicalTotal: practicalT,
        emotionalCorrect: emotionalC,
        emotionalTotal: emotionalT,
        socialCorrect: socialC,
        socialTotal: socialT,
      };
    });
  };

  const handleNextScenario = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % seedScenarios.length);
  };

  const handleResetStats = () => {
    setStats({
      totalAnswered: 0,
      totalCorrect: 0,
      streak: 0,
      practicalCorrect: 0,
      practicalTotal: 0,
      emotionalCorrect: 0,
      emotionalTotal: 0,
      socialCorrect: 0,
      socialTotal: 0,
    });
    setCurrentScenarioIndex(0);
  };

  const currentScenario = seedScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        stats={stats} 
        supercommunicatorRank={calculateRank()} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8 pb-12">
        {activeTab === 'quiz' && (
          <div className="space-y-10">
            
            {/* Top Score Summary Dashboard */}
            <ScoreDashboard 
              stats={stats} 
              onResetStats={handleResetStats} 
              supercommunicatorRank={calculateRank()} 
            />

            {/* Interactive MCQ Quiz Card */}
            <QuizCard 
              scenario={currentScenario}
              onAnswerSubmitted={handleAnswerSubmitted}
              onNextScenario={handleNextScenario}
              scenarioIndex={currentScenarioIndex}
              totalScenarios={seedScenarios.length}
            />

          </div>
        )}

        {activeTab === 'guide' && (
          <FrameworkGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Supercommunicators MCQ Training Module • Powered by Charles Duhigg's Framework & Antigravity Pipeline</p>
      </footer>

    </div>
  );
}
