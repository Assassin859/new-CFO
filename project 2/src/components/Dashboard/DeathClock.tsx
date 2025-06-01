import React from 'react';
import { AlertTriangle, Clock, TrendingUp, Ban } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';
import { format, addDays } from 'date-fns';

interface RunwayAction {
  name: string;
  impact: number;
  icon: React.ReactNode;
  description: string;
}

const DeathClock: React.FC = () => {
  const { metrics, runScenario } = useFinanceStore();
  
  const runwayDays = Math.floor(metrics.runway.current * 30);
  const criticalThreshold = runwayDays <= 60;
  
  const runwayActions: RunwayAction[] = [
    {
      name: 'Delay Hiring',
      impact: 30,
      icon: <Clock size={16} />,
      description: 'Postpone new hires for next quarter'
    },
    {
      name: 'Extend Payment Terms',
      impact: 15,
      icon: <TrendingUp size={16} />,
      description: 'Negotiate 60-day payment terms with vendors'
    },
    {
      name: 'Pause Marketing',
      impact: 28,
      icon: <Ban size={16} />,
      description: 'Temporarily reduce marketing spend'
    }
  ];

  const totalExtension = runwayActions.reduce((acc, action) => acc + action.impact, 0);
  const projectedRunway = runwayDays + totalExtension;
  const projectedDate = addDays(new Date(), projectedRunway);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className={`px-4 py-5 sm:px-6 ${criticalThreshold ? 'bg-red-50' : 'bg-orange-50'}`}>
        <div className="flex items-center">
          <AlertTriangle 
            size={24} 
            className={criticalThreshold ? 'text-red-500' : 'text-orange-500'} 
          />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            Runway Alert
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Current burn rate analysis and extension opportunities
        </p>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {runwayDays} days
          </div>
          <div className="text-sm text-gray-500">
            remaining at current burn rate
          </div>
          <div className="text-sm text-gray-500">
            (until {format(addDays(new Date(), runwayDays), 'MMM d, yyyy')})
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-900">
            Recommended Actions to Extend Runway:
          </div>
          
          {runwayActions.map((action, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => runScenario({ type: 'extend_runway', params: { actionIndex: index } })}
            >
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-full">
                  {action.icon}
                </div>
                <div className="ml-3">
                  <div className="font-medium">{action.name}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </div>
              <div className="text-green-600">+{action.impact} days</div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-baseline">
            <div className="text-sm text-gray-500">Potential Extension</div>
            <div className="text-lg font-semibold text-green-600">
              +{totalExtension} days
            </div>
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <div className="text-sm text-gray-500">Projected Runway</div>
            <div className="text-lg font-semibold text-gray-900">
              {projectedRunway} days ({format(projectedDate, 'MMM d, yyyy')})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeathClock;