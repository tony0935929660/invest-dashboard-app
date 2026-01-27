import { Portfolio, Asset, AssetAllocation } from '@/types/portfolio';

// 示範資料 - 實際應用中應該從 API 或資料庫獲取
export const mockAssets: Asset[] = [
  {
    id: '1',
    name: '台積電',
    symbol: '2330.TW',
    type: 'stock',
    quantity: 10,
    averagePrice: 580,
    currentPrice: 620,
    totalValue: 6200,
    profit: 400,
    profitPercentage: 6.9,
  },
  {
    id: '2',
    name: '聯發科',
    symbol: '2454.TW',
    type: 'stock',
    quantity: 5,
    averagePrice: 1000,
    currentPrice: 1150,
    totalValue: 5750,
    profit: 750,
    profitPercentage: 15.0,
  },
  {
    id: '3',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'crypto',
    quantity: 0.1,
    averagePrice: 50000,
    currentPrice: 60000,
    totalValue: 6000,
    profit: 1000,
    profitPercentage: 20.0,
  },
  {
    id: '4',
    name: 'Vanguard Total Stock Market ETF',
    symbol: 'VTI',
    type: 'etf',
    quantity: 20,
    averagePrice: 220,
    currentPrice: 240,
    totalValue: 4800,
    profit: 400,
    profitPercentage: 9.1,
  },
  {
    id: '5',
    name: '現金',
    symbol: 'CASH',
    type: 'cash',
    quantity: 1,
    averagePrice: 50000,
    currentPrice: 50000,
    totalValue: 50000,
    profit: 0,
    profitPercentage: 0,
  },
];

export const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  name: '我的投資組合',
  totalValue: 72750,
  totalCost: 70250,
  totalProfit: 2550,
  totalProfitPercentage: 3.63,
  assets: mockAssets,
  lastUpdated: new Date(),
};

export const mockAssetAllocation: AssetAllocation[] = [
  { type: '股票', value: 11950, percentage: 16.4, color: '#3b82f6' },
  { type: '加密貨幣', value: 6000, percentage: 8.2, color: '#f59e0b' },
  { type: 'ETF', value: 4800, percentage: 6.6, color: '#10b981' },
  { type: '現金', value: 50000, percentage: 68.8, color: '#6b7280' },
];

export const mockPerformanceData = [
  { date: '2026-01-01', value: 68000 },
  { date: '2026-01-05', value: 69500 },
  { date: '2026-01-10', value: 70200 },
  { date: '2026-01-15', value: 71000 },
  { date: '2026-01-20', value: 71800 },
  { date: '2026-01-27', value: 72750 },
];
