import React, { useState } from 'react';
import { Send, RefreshCw, Download } from 'lucide-react';
import { useFinanceStore } from '../../store/financeStore';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ConversationPanel: React.FC = () => {
  const { metrics, runScenario } = useFinanceStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "I'm your AI Financial Advisor. How can I help with your strategic financial decisions today?",
      sender: 'ai',
      timestamp: 'Just now',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: 'Just now',
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = '';
      
      // Pattern matching with real metrics
      if (input.toLowerCase().includes('fed') || input.toLowerCase().includes('interest rate')) {
        response = `Based on today's Federal Reserve announcement, our Q4 projections would see a ${(metrics.expenses.change * -0.5).toFixed(1)}% reduction in financing costs. This would improve our projected EBITDA by approximately $${(metrics.revenue.current * 0.037).toFixed(0)}K. Would you like me to adjust our cash flow forecast to reflect this change?`;
        runScenario({ type: 'interest_rate_impact', params: {} });
      } else if (input.toLowerCase().includes('delay') && input.toLowerCase().includes('hiring')) {
        response = `I've modeled the scenario where we delay hiring by 2 months. This would conserve approximately $${(metrics.expenses.current * 0.08).toFixed(0)}K in Q3, but could impact our product roadmap. Revenue projections would decrease by an estimated ${(metrics.revenue.change * 0.33).toFixed(1)}% in Q4. Would you like to see the detailed financial model?`;
        runScenario({ type: 'delay_hiring', params: {} });
      } else if (input.toLowerCase().includes('competitor') || input.toLowerCase().includes('competition')) {
        const competitor = useFinanceStore.getState().competitors[0];
        response = `Our competitive analysis shows that ${competitor.name} has increased their R&D spending by ${(competitor.revenueChange * 2).toFixed(1)}% this quarter. Their cash reserves have decreased by ${Math.abs(competitor.stockPriceChange)}% while their revenue grew by ${competitor.revenueChange}%. This suggests they're aggressively investing in new product development.`;
        runScenario({ type: 'analyze_competitors', params: {} });
      } else {
        response = `I've analyzed your question and prepared some insights. Current runway is ${metrics.runway.current.toFixed(1)} months with a ${metrics.revenue.change > 0 ? 'positive' : 'negative'} revenue trend of ${Math.abs(metrics.revenue.change)}%. Would you like me to generate a detailed report, run a scenario analysis, or provide recommendations based on current market conditions?`;
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: 'ai',
        timestamp: 'Just now',
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-[500px]">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Strategic Financial Assistant
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Ask questions, run scenarios, and get AI-powered financial guidance
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="min-w-0 flex-1">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ask about financial strategy, market impact, or run scenarios..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send size={16} className="mr-2" />
            Send
          </button>
          <button
            type="button"
            onClick={() => runScenario({ type: 'refresh_analysis', params: {} })}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw size={16} />
          </button>
          <button
            type="button"
            onClick={() => runScenario({ type: 'export_conversation', params: {} })}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPanel;