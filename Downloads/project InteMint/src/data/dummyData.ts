import { Competitor, Alert, TrendData, OverviewMetric, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah@techstartup.com',
  avatar: 'https://images.pexels.com/photos/3807443/pexels-photo-3807443.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  company: {
    name: 'TechStartup Inc.',
    sector: 'FinTech'
  }
};

export const overviewMetrics: OverviewMetric[] = [
  {
    id: '1',
    title: 'Total Competitors Tracked',
    value: 24,
    change: '+3 this month',
    trend: 'up',
    icon: 'Target'
  },
  {
    id: '2',
    title: 'Alerts Triggered This Week',
    value: 18,
    change: '+12% from last week',
    trend: 'up',
    icon: 'Bell'
  },
  {
    id: '3',
    title: 'Average Trend Score',
    value: '7.8/10',
    change: '+0.3 from last month',
    trend: 'up',
    icon: 'TrendingUp'
  },
  {
    id: '4',
    title: 'Suggested Opportunities',
    value: 5,
    change: '2 new this week',
    trend: 'neutral',
    icon: 'Lightbulb'
  }
];

export const competitors: Competitor[] = [
  {
    id: '1',
    name: 'PayFlow Technologies',
    sector: 'FinTech',
    lastFunding: {
      amount: '$12.5M',
      date: '2024-01-15',
      round: 'Series A'
    },
    recentNews: {
      headline: 'PayFlow Technologies launches new AI-powered fraud detection system',
      url: '#',
      date: '2024-01-20'
    },
    riskLevel: 'high'
  },
  {
    id: '2',
    name: 'CreditFlow Inc.',
    sector: 'FinTech',
    lastFunding: {
      amount: '$8.2M',
      date: '2023-11-08',
      round: 'Seed+'
    },
    recentNews: {
      headline: 'CreditFlow partners with major bank for digital lending platform',
      url: '#',
      date: '2024-01-18'
    },
    riskLevel: 'medium'
  },
  {
    id: '3',
    name: 'MoneyBridge Solutions',
    sector: 'FinTech',
    lastFunding: {
      amount: '$5.1M',
      date: '2023-09-22',
      round: 'Seed'
    },
    recentNews: {
      headline: 'MoneyBridge expands to European markets with new regulatory approval',
      url: '#',
      date: '2024-01-16'
    },
    riskLevel: 'low'
  },
  {
    id: '4',
    name: 'InstantPay Corp',
    sector: 'FinTech',
    lastFunding: {
      amount: '$18.7M',
      date: '2024-01-10',
      round: 'Series A'
    },
    recentNews: {
      headline: 'InstantPay announces strategic partnership with leading e-commerce platform',
      url: '#',
      date: '2024-01-19'
    },
    riskLevel: 'high'
  },
  {
    id: '5',
    name: 'SecureTransfer Ltd',
    sector: 'FinTech',
    lastFunding: {
      amount: '$3.8M',
      date: '2023-12-05',
      round: 'Pre-seed'
    },
    recentNews: {
      headline: 'SecureTransfer receives blockchain security certification',
      url: '#',
      date: '2024-01-17'
    },
    riskLevel: 'medium'
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'funding',
    title: 'PayFlow Technologies raises $12.5M Series A',
    description: 'Major competitor secured significant funding from Tier 1 VCs',
    timestamp: '2 hours ago',
    priority: 'high'
  },
  {
    id: '2',
    type: 'product',
    title: 'CreditFlow launches new mobile app',
    description: 'Competitor released enhanced mobile experience',
    timestamp: '4 hours ago',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'regulation',
    title: 'New EU fintech regulations announced',
    description: 'PSD3 directive may impact market dynamics',
    timestamp: '6 hours ago',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'market',
    title: 'Fintech investment down 23% YoY',
    description: 'Industry report shows market cooling',
    timestamp: '8 hours ago',
    priority: 'low'
  },
  {
    id: '5',
    type: 'funding',
    title: 'InstantPay Corp closes $18.7M round',
    description: 'Direct competitor raises larger Series A',
    timestamp: '1 day ago',
    priority: 'high'
  }
];

export const trendData: TrendData[] = [
  { date: '2024-01-01', value: 45, keyword: 'fintech' },
  { date: '2024-01-02', value: 52, keyword: 'fintech' },
  { date: '2024-01-03', value: 48, keyword: 'fintech' },
  { date: '2024-01-04', value: 61, keyword: 'fintech' },
  { date: '2024-01-05', value: 55, keyword: 'fintech' },
  { date: '2024-01-06', value: 67, keyword: 'fintech' },
  { date: '2024-01-07', value: 73, keyword: 'fintech' },
  { date: '2024-01-08', value: 69, keyword: 'fintech' },
  { date: '2024-01-09', value: 78, keyword: 'fintech' },
  { date: '2024-01-10', value: 82, keyword: 'fintech' },
  { date: '2024-01-11', value: 71, keyword: 'fintech' },
  { date: '2024-01-12', value: 86, keyword: 'fintech' },
  { date: '2024-01-13', value: 79, keyword: 'fintech' },
  { date: '2024-01-14', value: 91, keyword: 'fintech' },
  { date: '2024-01-15', value: 88, keyword: 'fintech' },
  { date: '2024-01-16', value: 94, keyword: 'fintech' },
  { date: '2024-01-17', value: 87, keyword: 'fintech' },
  { date: '2024-01-18', value: 92, keyword: 'fintech' },
  { date: '2024-01-19', value: 96, keyword: 'fintech' },
  { date: '2024-01-20', value: 89, keyword: 'fintech' }
];

export const sectors = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'E-commerce',
  'SaaS',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Cybersecurity',
  'Other'
];

// Extended data for new features

export const trackedCompetitors = [
  {
    id: '1',
    name: 'PayFlow Technologies',
    industry: 'FinTech',
    employees: '150-200',
    totalFunding: '$45.2M',
    founded: '2019',
    headquarters: 'San Francisco, CA',
    website: 'https://payflow.tech',
    description: 'PayFlow Technologies is a leading fintech company specializing in AI-powered payment processing and fraud detection. They serve over 10,000 merchants globally with their innovative payment infrastructure.',
    lastFunding: {
      amount: '$12.5M',
      date: '2024-01-15',
      round: 'Series A'
    },
    fundingHistory: [
      { round: 'Series A', amount: '$12.5M', date: '2024-01-15', leadInvestor: 'Andreessen Horowitz' },
      { round: 'Seed', amount: '$4.2M', date: '2022-08-10', leadInvestor: 'First Round Capital' },
      { round: 'Pre-seed', amount: '$1.5M', date: '2021-03-15', leadInvestor: 'Y Combinator' }
    ],
    recentActivity: {
      headline: 'PayFlow Technologies launches new AI-powered fraud detection system',
      url: '#',
      date: '2024-01-20'
    },
    recentNews: [
      {
        headline: 'PayFlow Technologies launches new AI-powered fraud detection system',
        url: '#',
        date: '2024-01-20'
      },
      {
        headline: 'PayFlow expands to European markets with new partnerships',
        url: '#',
        date: '2024-01-15'
      },
      {
        headline: 'PayFlow CEO speaks at FinTech Summit 2024',
        url: '#',
        date: '2024-01-10'
      }
    ],
    riskLevel: 'high'
  },
  {
    id: '2',
    name: 'CreditFlow Inc.',
    industry: 'FinTech',
    employees: '75-100',
    totalFunding: '$18.7M',
    founded: '2020',
    headquarters: 'New York, NY',
    website: 'https://creditflow.com',
    description: 'CreditFlow Inc. provides digital lending solutions for small and medium businesses. Their platform uses machine learning to assess creditworthiness and provide instant loan approvals.',
    lastFunding: {
      amount: '$8.2M',
      date: '2023-11-08',
      round: 'Seed+'
    },
    fundingHistory: [
      { round: 'Seed+', amount: '$8.2M', date: '2023-11-08', leadInvestor: 'Sequoia Capital' },
      { round: 'Seed', amount: '$3.5M', date: '2022-05-20', leadInvestor: 'Accel Partners' }
    ],
    recentActivity: {
      headline: 'CreditFlow partners with major bank for digital lending platform',
      url: '#',
      date: '2024-01-18'
    },
    recentNews: [
      {
        headline: 'CreditFlow partners with major bank for digital lending platform',
        url: '#',
        date: '2024-01-18'
      },
      {
        headline: 'CreditFlow processes $100M in loans in 2023',
        url: '#',
        date: '2024-01-05'
      }
    ],
    riskLevel: 'medium'
  },
  {
    id: '3',
    name: 'MoneyBridge Solutions',
    industry: 'FinTech',
    employees: '50-75',
    totalFunding: '$12.3M',
    founded: '2021',
    headquarters: 'Austin, TX',
    website: 'https://moneybridge.io',
    description: 'MoneyBridge Solutions focuses on cross-border payments and currency exchange for businesses. They offer competitive rates and fast settlement times for international transactions.',
    lastFunding: {
      amount: '$5.1M',
      date: '2023-09-22',
      round: 'Seed'
    },
    fundingHistory: [
      { round: 'Seed', amount: '$5.1M', date: '2023-09-22', leadInvestor: 'Index Ventures' },
      { round: 'Pre-seed', amount: '$2.2M', date: '2022-01-15', leadInvestor: 'Bessemer Venture Partners' }
    ],
    recentActivity: {
      headline: 'MoneyBridge expands to European markets with new regulatory approval',
      url: '#',
      date: '2024-01-16'
    },
    recentNews: [
      {
        headline: 'MoneyBridge expands to European markets with new regulatory approval',
        url: '#',
        date: '2024-01-16'
      },
      {
        headline: 'MoneyBridge reduces transaction fees by 30%',
        url: '#',
        date: '2024-01-08'
      }
    ],
    riskLevel: 'low'
  },
  {
    id: '4',
    name: 'InstantPay Corp',
    industry: 'FinTech',
    employees: '200-250',
    totalFunding: '$67.4M',
    founded: '2018',
    headquarters: 'Seattle, WA',
    website: 'https://instantpay.com',
    description: 'InstantPay Corp is a major player in the instant payment space, providing real-time payment solutions for e-commerce and retail businesses. They process over $2B in transactions annually.',
    lastFunding: {
      amount: '$18.7M',
      date: '2024-01-10',
      round: 'Series A'
    },
    fundingHistory: [
      { round: 'Series A', amount: '$18.7M', date: '2024-01-10', leadInvestor: 'Kleiner Perkins' },
      { round: 'Seed', amount: '$8.2M', date: '2022-11-15', leadInvestor: 'GV (Google Ventures)' },
      { round: 'Pre-seed', amount: '$3.5M', date: '2021-06-20', leadInvestor: 'Founders Fund' }
    ],
    recentActivity: {
      headline: 'InstantPay announces strategic partnership with leading e-commerce platform',
      url: '#',
      date: '2024-01-19'
    },
    recentNews: [
      {
        headline: 'InstantPay announces strategic partnership with leading e-commerce platform',
        url: '#',
        date: '2024-01-19'
      },
      {
        headline: 'InstantPay reaches $2B in annual transaction volume',
        url: '#',
        date: '2024-01-12'
      },
      {
        headline: 'InstantPay launches new API for developers',
        url: '#',
        date: '2024-01-05'
      }
    ],
    riskLevel: 'high'
  },
  {
    id: '5',
    name: 'SecureTransfer Ltd',
    industry: 'FinTech',
    employees: '25-50',
    totalFunding: '$8.9M',
    founded: '2022',
    headquarters: 'London, UK',
    website: 'https://securetransfer.co.uk',
    description: 'SecureTransfer Ltd specializes in blockchain-based secure transactions for financial institutions. They provide enterprise-grade security solutions for digital asset transfers.',
    lastFunding: {
      amount: '$3.8M',
      date: '2023-12-05',
      round: 'Pre-seed'
    },
    fundingHistory: [
      { round: 'Pre-seed', amount: '$3.8M', date: '2023-12-05', leadInvestor: 'Balderton Capital' },
      { round: 'Angel', amount: '$1.1M', date: '2022-08-30', leadInvestor: 'Angel Investors' }
    ],
    recentActivity: {
      headline: 'SecureTransfer receives blockchain security certification',
      url: '#',
      date: '2024-01-17'
    },
    recentNews: [
      {
        headline: 'SecureTransfer receives blockchain security certification',
        url: '#',
        date: '2024-01-17'
      },
      {
        headline: 'SecureTransfer partners with major European bank',
        url: '#',
        date: '2024-01-10'
      }
    ],
    riskLevel: 'medium'
  }
];

export const marketTrendData = [
  // FinTech data
  ...Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 40) + 60 + Math.sin(i / 10) * 20,
    keyword: 'fintech'
  })),
  // Digital payments data
  ...Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 35) + 45 + Math.cos(i / 8) * 15,
    keyword: 'digital payments'
  })),
  // Blockchain data
  ...Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 30) + 30 + Math.sin(i / 12) * 10,
    keyword: 'blockchain'
  }))
];

export const trendKeywords = ['fintech', 'digital payments', 'blockchain', 'cryptocurrency', 'neobank', 'open banking'];

export const alertsFeed = [
  {
    id: '1',
    type: 'funding',
    title: 'PayFlow Technologies Raises $12.5M Series A',
    description: 'PayFlow Technologies has successfully closed a $12.5M Series A round led by Andreessen Horowitz. The funding will be used to expand their AI-powered fraud detection capabilities and enter new markets.',
    timestamp: '2 hours ago',
    priority: 'high',
    competitor: 'PayFlow Technologies'
  },
  {
    id: '2',
    type: 'product',
    title: 'CreditFlow Launches Enhanced Mobile App',
    description: 'CreditFlow Inc. has released a major update to their mobile application, featuring improved user interface, faster loan processing, and new credit monitoring tools.',
    timestamp: '4 hours ago',
    priority: 'medium',
    competitor: 'CreditFlow Inc.'
  },
  {
    id: '3',
    type: 'regulation',
    title: 'New EU Fintech Regulations Announced',
    description: 'The European Union has announced new PSD3 directive requirements that will impact how fintech companies handle customer data and payment processing across EU member states.',
    timestamp: '6 hours ago',
    priority: 'medium',
    competitor: null
  },
  {
    id: '4',
    type: 'executive',
    title: 'InstantPay Corp Appoints New CTO',
    description: 'InstantPay Corp has appointed former Google Pay executive Maria Rodriguez as their new Chief Technology Officer, signaling their commitment to scaling their technical infrastructure.',
    timestamp: '8 hours ago',
    priority: 'medium',
    competitor: 'InstantPay Corp'
  },
  {
    id: '5',
    type: 'market',
    title: 'Fintech Investment Down 23% Year-over-Year',
    description: 'According to the latest industry report, fintech investment has decreased by 23% compared to the same period last year, indicating a cooling market environment.',
    timestamp: '12 hours ago',
    priority: 'low',
    competitor: null
  },
  {
    id: '6',
    type: 'product',
    title: 'MoneyBridge Launches Cross-Border Payment API',
    description: 'MoneyBridge Solutions has launched a new API that allows businesses to integrate cross-border payment capabilities directly into their platforms with competitive exchange rates.',
    timestamp: '1 day ago',
    priority: 'medium',
    competitor: 'MoneyBridge Solutions'
  },
  {
    id: '7',
    type: 'funding',
    title: 'SecureTransfer Completes Pre-Seed Round',
    description: 'SecureTransfer Ltd has completed a $3.8M pre-seed funding round led by Balderton Capital to accelerate development of their blockchain-based security solutions.',
    timestamp: '1 day ago',
    priority: 'low',
    competitor: 'SecureTransfer Ltd'
  },
  {
    id: '8',
    type: 'regulation',
    title: 'Federal Reserve Updates Digital Payment Guidelines',
    description: 'The Federal Reserve has updated its guidelines for digital payment processors, introducing new requirements for transaction monitoring and reporting.',
    timestamp: '2 days ago',
    priority: 'high',
    competitor: null
  },
  {
    id: '9',
    type: 'executive',
    title: 'PayFlow Technologies CEO to Speak at FinTech Summit',
    description: 'PayFlow Technologies CEO John Smith will be a keynote speaker at the upcoming FinTech Summit 2024, discussing the future of AI in financial services.',
    timestamp: '2 days ago',
    priority: 'low',
    competitor: 'PayFlow Technologies'
  },
  {
    id: '10',
    type: 'market',
    title: 'Digital Payment Volume Reaches Record High',
    description: 'Global digital payment volume has reached a record high of $7.8 trillion in 2023, representing a 15% increase from the previous year.',
    timestamp: '3 days ago',
    priority: 'medium',
    competitor: null
  }
];

export const reportsData = [
  {
    id: '1',
    title: 'Q4 2023 Competitive Intelligence Report',
    summary: 'Comprehensive analysis of competitive landscape including funding activities, product launches, and market positioning for Q4 2023.',
    dateGenerated: '2024-01-15',
    type: 'comprehensive'
  },
  {
    id: '2',
    title: 'Funding Activity Overview - December 2023',
    summary: 'Detailed breakdown of funding rounds, valuations, and investor activities in the fintech space during December 2023.',
    dateGenerated: '2024-01-08',
    type: 'funding'
  },
  {
    id: '3',
    title: 'Market Trends Analysis - Digital Payments',
    summary: 'Analysis of digital payment trends, keyword performance, and emerging technologies shaping the payment industry.',
    dateGenerated: '2024-01-03',
    type: 'trends'
  },
  {
    id: '4',
    title: 'Competitive Landscape Assessment',
    summary: 'Strategic assessment of key competitors, their strengths, weaknesses, and potential threats to market position.',
    dateGenerated: '2023-12-28',
    type: 'competitive'
  }
];