import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';

const FinancialSummary: React.FC = () => {
  const { metrics } = useFinanceStore();

  const stats = [
    {
      name: 'Revenue',
      value: `$${(metrics.revenue.current / 1000000).toFixed(2)}M`,
      change: `${metrics.revenue.change > 0 ? '+' : ''}${metrics.revenue.change}%`,
      changeType: metrics.revenue.change >= 0 ? 'increase' : 'decrease',
      icon: <DollarSign size={20} />,
    },
    {
      name: 'Cash Flow',
      value: `$${(metrics.cashFlow.current / 1000).toFixed(0)}K`,
      change: `${metrics.cashFlow.change > 0 ? '+' : ''}${metrics.cashFlow.change}%`,
      changeType: metrics.cashFlow.change >= 0 ? 'increase' : 'decrease',
      icon: <TrendingUp size={20} />,
    },
    {
      name: 'Expenses',
      value: `$${(metrics.expenses.current / 1000000).toFixed(2)}M`,
      change: `${metrics.expenses.change > 0 ? '+' : ''}${metrics.expenses.change}%`,
      changeType: metrics.expenses.change >= 0 ? 'increase' : 'decrease',
      icon: <TrendingDown size={20} />,
    },
    {
      name: 'Runway',
      value: `${metrics.runway.current.toFixed(1)} mo`,
      change: `${metrics.runway.change > 0 ? '+' : ''}${metrics.runway.change} mo`,
      changeType: metrics.runway.change >= 0 ? 'increase' : 'decrease',
      icon: <Clock size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <div className="text-white">{stat.icon}</div>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {stat.changeType === 'increase' ? (
                <TrendingUp size={16} className="self-center flex-shrink-0 mr-1" />
              ) : (
                <TrendingDown size={16} className="self-center flex-shrink-0 mr-1" />
              )}
              <span className="sr-only">
                {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
              </span>
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummary;