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
  const { metrics, runScenario, getAIResponse } = useFinanceStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "I'm your AI Financial Advisor. How can I help with your strategic financial decisions today?",
      sender: 'ai',
      timestamp: 'Just now',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: 'Just now',
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    try {
      const response = await getAIResponse(input);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: 'ai',
        timestamp: 'Just now',
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      if (input.toLowerCase().includes('hiring')) {
        runScenario({ type: 'delay_hiring', params: {} });
      } else if (input.toLowerCase().includes('price')) {
        runScenario({ type: 'increase_prices', params: {} });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I apologize, but I'm having trouble processing your request at the moment.",
        sender: 'ai',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
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
                  ? 'bg-teal-600 text-white'
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              placeholder="Ask about financial strategy, market impact, or run scenarios..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Send size={16} className="mr-2" />
            Send
          </button>
          <button
            type="button"
            onClick={() => runScenario({ type: 'refresh_analysis', params: {} })}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <RefreshCw size={16} />
          </button>
          <button
            type="button"
            onClick={() => runScenario({ type: 'export_conversation', params: {} })}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Download size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPanel;