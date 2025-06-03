import { create } from 'zustand';
import * as mockData from '../data/mockData';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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
  getAIResponse: (prompt: string) => Promise<string>;
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

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

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
    try {
      const response = await axios.get(`${ALPHA_VANTAGE_BASE_URL}`, {
        params: {
          function: 'OVERVIEW',
          symbol: 'MSFT', // Example company
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });

      const { data } = response;
      
      // Transform API data to match our metrics structure
      const metrics = {
        revenue: {
          current: parseFloat(data.RevenueTTM) || 0,
          previous: parseFloat(data.RevenueTTM) * 0.9, // Estimate previous
          change: 10 // Calculate percentage change
        },
        expenses: {
          current: parseFloat(data.RevenueTTM) * 0.7, // Estimate expenses
          previous: parseFloat(data.RevenueTTM) * 0.65,
          change: 7.7
        },
        profit: {
          current: parseFloat(data.RevenueTTM) * 0.3,
          previous: parseFloat(data.RevenueTTM) * 0.25,
          change: 20
        },
        cashFlow: {
          current: parseFloat(data.RevenueTTM) * 0.15,
          previous: parseFloat(data.RevenueTTM) * 0.12,
          change: 25
        },
        runway: {
          current: 18,
          previous: 20,
          change: -2
        }
      };

      set({ metrics });
    } catch (error) {
      console.error('Error fetching financial metrics:', error);
      // Fallback to mock data if API fails
      set({ metrics: mockData.financialMetrics });
    }
  },

  fetchCashFlowData: async () => {
    try {
      const response = await axios.get(`${ALPHA_VANTAGE_BASE_URL}`, {
        params: {
          function: 'CASH_FLOW',
          symbol: 'MSFT',
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });

      const { data } = response;
      
      // Transform API data to match our cashFlow structure
      const cashFlow = {
        actual: data.quarterlyReports.slice(0, 3).map((report: any) => ({
          month: new Date(report.fiscalDateEnding).toLocaleString('default', { month: 'short' }),
          inflow: parseFloat(report.operatingCashflow),
          outflow: parseFloat(report.capitalExpenditures)
        })),
        projected: mockData.cashFlowData.projected // Keep mock projections
      };

      set({ cashFlow });
    } catch (error) {
      console.error('Error fetching cash flow data:', error);
      // Fallback to mock data if API fails
      set({ cashFlow: mockData.cashFlowData });
    }
  },

  fetchCompetitorData: async () => {
    try {
      const competitors = ['MSFT', 'AAPL', 'GOOGL'];
      const competitorData = await Promise.all(
        competitors.map(async (symbol) => {
          const response = await axios.get(`${ALPHA_VANTAGE_BASE_URL}`, {
            params: {
              function: 'OVERVIEW',
              symbol,
              apikey: ALPHA_VANTAGE_API_KEY
            }
          });

          const { data } = response;
          return {
            id: symbol,
            name: data.Name,
            marketShare: parseFloat(data.MarketCapitalization) / 1e12 * 100,
            stockPrice: parseFloat(data['50DayMovingAverage']),
            stockPriceChange: parseFloat(data.PercentChange),
            revenue: parseFloat(data.RevenueTTM),
            revenueChange: parseFloat(data.QuarterlyRevenueGrowthYOY),
            keyMetrics: {
              profitMargin: parseFloat(data.ProfitMargin) * 100,
              rnd: parseFloat(data.RevenueTTM) * 0.15,
              employeeCount: parseInt(data.FullTimeEmployees),
              debtToEquity: parseFloat(data.DebtToEquityRatio)
            }
          };
        })
      );

      set({ competitors: competitorData });
    } catch (error) {
      console.error('Error fetching competitor data:', error);
      // Fallback to mock data if API fails
      set({ competitors: mockData.competitorData });
    }
  },

  getAIResponse: async (prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: "You are an AI financial advisor. Provide concise, actionable financial advice based on the metrics and data available." 
          },
          { role: "user", content: prompt }
        ],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.";
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "I apologize, but I'm having trouble processing your request at the moment.";
    }
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