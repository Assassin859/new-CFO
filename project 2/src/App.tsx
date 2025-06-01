import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import FinancialSummary from './components/Dashboard/FinancialSummary';
import RecentInsights from './components/Dashboard/RecentInsights';
import CashFlowChart from './components/Dashboard/CashFlowChart';
import CompetitorInsights from './components/Dashboard/CompetitorInsights';
import ConversationPanel from './components/Conversation/ConversationPanel';
import DeathClock from './components/Dashboard/DeathClock';
import FounderTranslator from './components/Dashboard/FounderTranslator';

function App() {
  return (
    <MainLayout>
      <div className="py-6">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Financial Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Your real-time financial insights and strategic recommendations
          </p>
        </div>
        
        <div className="mt-6">
          <FinancialSummary />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeathClock />
          <FounderTranslator />
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CashFlowChart />
          <RecentInsights />
        </div>
        
        <div className="mt-8">
          <ConversationPanel />
        </div>
        
        <div className="mt-8">
          <CompetitorInsights />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;