import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';

const CompetitorInsights: React.FC = () => {
  const { competitors } = useFinanceStore();

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp size={16} className="text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown size={16} className="text-red-500" />;
    } else {
      return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getChangeColorClass = (change: number) => {
    if (change > 0) {
      return 'text-green-600';
    } else if (change < 0) {
      return 'text-red-600';
    } else {
      return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Competitor Insights
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Financial health monitoring of key market competitors
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Share
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {competitors.map((competitor) => (
              <tr key={competitor.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={competitor.logo}
                        alt={competitor.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {competitor.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{competitor.marketShare}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${competitor.marketShare * 2}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${competitor.stockPrice}</div>
                  <div className={`text-xs flex items-center ${getChangeColorClass(competitor.stockPriceChange)}`}>
                    {getChangeIcon(competitor.stockPriceChange)}
                    <span className="ml-1">{Math.abs(competitor.stockPriceChange)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${(competitor.revenue / 1e9).toFixed(2)}B</div>
                  <div className={`text-xs flex items-center ${getChangeColorClass(competitor.revenueChange)}`}>
                    {getChangeIcon(competitor.revenueChange)}
                    <span className="ml-1">{Math.abs(competitor.revenueChange)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className="text-sm text-gray-700 text-right">
          <button 
            onClick={() => useFinanceStore.getState().runScenario({ type: 'analyze_competitors', params: {} })}
            className="text-indigo-600 hover:text-indigo-900"
          >
            View Full Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitorInsights;