import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MainLayout from './components/Layout/MainLayout';
import FinancialSummary from './components/Dashboard/FinancialSummary';
import RecentInsights from './components/Dashboard/RecentInsights';
import CashFlowChart from './components/Dashboard/CashFlowChart';
import CompetitorInsights from './components/Dashboard/CompetitorInsights';
import ConversationPanel from './components/Conversation/ConversationPanel';
import DeathClock from './components/Dashboard/DeathClock';
import FounderTranslator from './components/Dashboard/FounderTranslator';
import { useFinanceStore } from './store/financeStore';

function App() {
  const { fetchInitialData, isLoading, error } = useFinanceStore();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
          {isLoading ? <Skeleton height={120} /> : <FinancialSummary />}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <Skeleton height={300} />
              <Skeleton height={300} />
            </>
          ) : (
            <>
              <DeathClock />
              <FounderTranslator />
            </>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <Skeleton height={300} />
              <Skeleton height={300} />
            </>
          ) : (
            <>
              <CashFlowChart />
              <RecentInsights />
            </>
          )}
        </div>
        
        <div className="mt-8">
          {isLoading ? <Skeleton height={400} /> : <ConversationPanel />}
        </div>
        
        <div className="mt-8">
          {isLoading ? <Skeleton height={400} /> : <CompetitorInsights />}
        </div>
      </div>
    </MainLayout>
  );
}

export default App;