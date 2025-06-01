import { create } from 'zustand';
import { financialMetrics, cashFlowData, competitorData } from '../data/mockData';

interface FinanceState {
  metrics: typeof financialMetrics;
  cashFlow: typeof cashFlowData;
  competitors: typeof competitorData;
  updateMetrics: (newMetrics: Partial<typeof financialMetrics>) => void;
  runScenario: (scenario: { type: string; params: any }) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  metrics: financialMetrics,
  cashFlow: cashFlowData,
  competitors: competitorData,
  
  updateMetrics: (newMetrics) => 
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics }
    })),
    
  runScenario: (scenario) => {
    switch (scenario.type) {
      case 'delay_hiring':
        set((state) => ({
          metrics: {
            ...state.metrics,
            expenses: {
              ...state.metrics.expenses,
              current: state.metrics.expenses.current * 0.92,
              change: -8
            },
            runway: {
              ...state.metrics.runway,
              current: state.metrics.runway.current + 2.4,
              change: 2.4
            }
          }
        }));
        break;
      
      case 'increase_prices':
        set((state) => ({
          metrics: {
            ...state.metrics,
            revenue: {
              ...state.metrics.revenue,
              current: state.metrics.revenue.current * 1.08,
              change: 8
            },
            profit: {
              ...state.metrics.profit,
              current: state.metrics.profit.current * 1.15,
              change: 15
            }
          }
        }));
        break;
    }
  }
}));