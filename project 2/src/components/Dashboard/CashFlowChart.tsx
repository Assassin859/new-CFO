import React from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinanceStore } from '../../store/financeStore';

const CashFlowChart: React.FC = () => {
  const { cashFlow } = useFinanceStore();
  
  const data = [...cashFlow.actual, ...cashFlow.projected].map(item => ({
    month: item.month,
    inflow: item.inflow / 1000, // Convert to K
    outflow: item.outflow / 1000,
    balance: (item.inflow - item.outflow) / 1000
  }));

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Cash Flow Forecast
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Predicted cash movement for the next 9 months with 94% confidence
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value}K`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="inflow"
                stackId="1"
                stroke="#10B981"
                fill="#D1FAE5"
                name="Cash Inflow"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stackId="2"
                stroke="#EF4444"
                fill="#FEE2E2"
                name="Cash Outflow"
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#6366F1"
                fill="#EEF2FF"
                name="Net Balance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded mr-2"></div>
            <span>Cash Inflow</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Cash Outflow</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
            <span>Net Balance</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
        <button 
          onClick={() => useFinanceStore.getState().runScenario({ type: 'delay_hiring', params: {} })}
          className="text-sm text-indigo-600 hover:text-indigo-900"
        >
          Run Scenario Analysis
        </button>
        <button className="text-sm text-indigo-600 hover:text-indigo-900">
          View Detailed Forecast
        </button>
      </div>
    </div>
  );
};

export default CashFlowChart;