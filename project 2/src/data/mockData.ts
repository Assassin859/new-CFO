// Mock financial data for demonstration purposes

export const financialMetrics = {
  revenue: {
    current: 3420000,
    previous: 2990000,
    change: 14.3,
  },
  expenses: {
    current: 1800000,
    previous: 1760000,
    change: 2.3,
  },
  profit: {
    current: 1620000,
    previous: 1230000,
    change: 31.7,
  },
  cashFlow: {
    current: 842000,
    previous: 785000,
    change: 7.2,
  },
  runway: {
    current: 18.2, // months
    previous: 19.0, // months
    change: -0.8,
  },
};

export const cashFlowData = {
  actual: [
    { month: 'Jan', inflow: 840000, outflow: 750000 },
    { month: 'Feb', inflow: 920000, outflow: 800000 },
    { month: 'Mar', inflow: 880000, outflow: 820000 },
  ],
  projected: [
    { month: 'Apr', inflow: 950000, outflow: 880000 },
    { month: 'May', inflow: 1020000, outflow: 910000 },
    { month: 'Jun', inflow: 1080000, outflow: 950000 },
    { month: 'Jul', inflow: 1150000, outflow: 1000000 },
    { month: 'Aug', inflow: 1100000, outflow: 980000 },
    { month: 'Sep', inflow: 1200000, outflow: 1050000 },
  ],
};

export const competitorData = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    marketShare: 24.3,
    stockPrice: 342.68,
    stockPriceChange: 1.2,
    revenue: 1240000000, // $1.24B
    revenueChange: 3.5,
    keyMetrics: {
      profitMargin: 18.5,
      rnd: 310000000,
      employeeCount: 4200,
      debtToEquity: 0.42,
    },
  },
  {
    id: 2,
    name: 'Innovate Systems',
    marketShare: 18.7,
    stockPrice: 156.42,
    stockPriceChange: -0.8,
    revenue: 840000000, // $840M
    revenueChange: 1.2,
    keyMetrics: {
      profitMargin: 15.2,
      rnd: 210000000,
      employeeCount: 2800,
      debtToEquity: 0.38,
    },
  },
  {
    id: 3,
    name: 'DataStream Ltd.',
    marketShare: 12.4,
    stockPrice: 89.76,
    stockPriceChange: 0,
    revenue: 512000000, // $512M
    revenueChange: -2.1,
    keyMetrics: {
      profitMargin: 11.8,
      rnd: 124000000,
      employeeCount: 1650,
      debtToEquity: 0.52,
    },
  },
];

export const industryTrends = [
  { 
    name: 'Cloud Services Growth',
    value: 22.3, // percentage
    impact: 'positive',
    description: 'Continued strong growth in cloud services adoption benefits our core product lines.'
  },
  { 
    name: 'Labor Market Pressure',
    value: 8.4, // percentage
    impact: 'negative',
    description: 'Increasing compensation requirements for technical talent may pressure margins.'
  },
  { 
    name: 'Enterprise IT Spending',
    value: 4.2, // percentage
    impact: 'positive',
    description: 'Enterprise IT budgets are expanding, creating new opportunities for premium offerings.'
  },
  { 
    name: 'Supply Chain Disruption',
    value: -3.1, // percentage
    impact: 'negative',
    description: 'Ongoing supply chain challenges may impact hardware-dependent solutions.'
  },
];

export const strategicScenarios = [
  {
    id: 1,
    name: 'Accelerate Growth Plan',
    description: 'Increase marketing spend by 35% and hire 15 additional sales representatives',
    outcomes: {
      revenue: { change: 18.5, timeline: '6-9 months' },
      profit: { change: -5.2, timeline: '3-6 months' },
      cashBurn: { change: 42.0, timeline: 'immediate' },
      runway: { change: -4.2, timeline: 'immediate' },
    },
    recommendation: 'Consider if investor expectations prioritize growth over profitability',
  },
  {
    id: 2,
    name: 'Optimize Profitability',
    description: 'Reduce non-essential expenses by 12% and increase prices on enterprise tiers by 8%',
    outcomes: {
      revenue: { change: 2.3, timeline: '1-3 months' },
      profit: { change: 15.4, timeline: '1-3 months' },
      cashBurn: { change: -18.7, timeline: 'immediate' },
      runway: { change: 3.5, timeline: 'immediate' },
    },
    recommendation: 'Recommended if market conditions deteriorate or funding environment tightens',
  },
  {
    id: 3,
    name: 'Expand Product Line',
    description: 'Develop and launch two new product offerings in adjacent markets',
    outcomes: {
      revenue: { change: 24.8, timeline: '9-12 months' },
      profit: { change: -12.3, timeline: '6-9 months' },
      cashBurn: { change: 35.2, timeline: 'immediate' },
      runway: { change: -3.8, timeline: 'immediate' },
    },
    recommendation: 'Consider if competition is increasing in core markets and diversification is strategic',
  },
];