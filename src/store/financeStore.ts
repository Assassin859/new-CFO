import { create } from 'zustand';
import * as mockData from '../data/mockData';

interface FinanceState {
  metrics: typeof mockData.financialMetrics;
  cashFlow: typeof mockData.cashFlowData;
  competitors: typeof mockData.competitorData;
  isLoading: boolean;
  error: string | null;
  updateMetrics: (newMetrics: Partial<typeof mockData.financialMetrics>) => void;
  runScenario: (scenario: { type: string; params: any }) => void;
  fetchInitialData: () => Promise<void>;
  fetchFinancialMetrics: () => Promise<void>;
  fetchCashFlowData: () => Promise<void>;
  fetchCompetitorData: () => Promise<void>;
}

const defaultMetrics = {
  revenue: { current: 0, previous: 0, change: 0 },
  expenses: { current: 0, previous: 0, change: 0 },
  profit: { current: 0, previous: 0, change: 0 },
  cashFlow: { current: 0, previous: 0, change: 0 },
  runway: { current: 0, previous: 0, change: 0 },
};

const defaultCashFlow = {
  actual: [],
  projected: [],
};

export const useFinanceStore = create<FinanceState>((set, get) => ({
  metrics: defaultMetrics,
  cashFlow: defaultCashFlow,
  competitors: [],
  isLoading: false,
  error: null,

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),

  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        get().fetchFinancialMetrics(),
        get().fetchCashFlowData(),
        get().fetchCompetitorData(),
      ]);
    } catch (error) {
      set({ error: 'Failed to fetch initial data' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFinancialMetrics: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ metrics: mockData.financialMetrics });
        resolve();
      }, 1000);
    });
  },

  fetchCashFlowData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ cashFlow: mockData.cashFlowData });
        resolve();
      }, 800);
    });
  },

  fetchCompetitorData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ competitors: mockData.competitorData });
        resolve();
      }, 1200);
    });
  },

  runScenario: async (scenario) => {
    set({ isLoading: true, error: null });
    try {
      switch (scenario.type) {
        case 'delay_hiring':
          set((state) => ({
            metrics: {
              ...state.metrics,
              expenses: {
                ...state.metrics.expenses,
                current: state.metrics.expenses.current * 0.92,
                change: -8,
              },
              runway: {
                ...state.metrics.runway,
                current: state.metrics.runway.current + 2.4,
                change: 2.4,
              },
            },
          }));
          await get().fetchCashFlowData();
          break;

        case 'increase_prices':
          set((state) => ({
            metrics: {
              ...state.metrics,
              revenue: {
                ...state.metrics.revenue,
                current: state.metrics.revenue.current * 1.08,
                change: 8,
              },
              profit: {
                ...state.metrics.profit,
                current: state.metrics.profit.current * 1.15,
                change: 15,
              },
            },
          }));
          await get().fetchFinancialMetrics();
          break;
      }
    } catch (error) {
      set({ error: 'Failed to run scenario' });
    } finally {
      set({ isLoading: false });
    }
  },
}));