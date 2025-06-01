import React, { useState } from 'react';
import { MessageSquare, TrendingDown, DollarSign, RefreshCw } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import numeral from 'numeral';

const FounderTranslator: React.FC = () => {
  const { metrics } = useFinanceStore();
  const [showDetails, setShowDetails] = useState(false);

  const burnRate = metrics.expenses.current / metrics.revenue.current;
  const monthlyBurn = metrics.expenses.current - metrics.revenue.current;
  
  const insights = [
    {
      technical: `Negative EBITDA margin of ${((metrics.expenses.current - metrics.revenue.current) / metrics.revenue.current * 100).toFixed(1)}%`,
      translation: `You're spending $${burnRate.toFixed(2)} for every $1 you make`,
      icon: <DollarSign size={20} />,
      action: `Reduce monthly burn by ${numeral(monthlyBurn * 0.2).format('$0,0')} to reach sustainable levels`
    },
    {
      technical: `Burn multiple exceeding industry standards by 2.3x`,
      translation: `Your growth isn't keeping up with your spending`,
      icon: <TrendingDown size={20} />,
      action: `Focus on improving unit economics before scaling further`
    },
    {
      technical: `Working capital ratio below optimal threshold`,
      translation: `You might struggle to pay bills in the next 3 months`,
      icon: <RefreshCw size={20} />,
      action: `Negotiate better payment terms with top 3 vendors`
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center">
          <MessageSquare size={24} className="text-indigo-500" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            Financial Translator
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Complex financial metrics explained in simple terms
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    {insight.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <div 
                    className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? insight.technical : insight.translation}
                  </div>
                  <div className="mt-2 text-sm font-medium text-indigo-600">
                    {insight.action}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
        <button 
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={() => setShowDetails(!showDetails)}
        >
          Show {showDetails ? 'Simple' : 'Technical'} Terms
        </button>
        <button className="text-sm text-indigo-600 hover:text-indigo-900">
          View Detailed Analysis
        </button>
      </div>
    </div>
  );
};

export default FounderTranslator;