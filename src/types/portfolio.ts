// 投資組合類型定義

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'bond' | 'crypto' | 'etf' | 'cash';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profit: number;
  profitPercentage: number;
}

export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalProfit: number;
  totalProfitPercentage: number;
  assets: Asset[];
  lastUpdated: Date;
}

export interface AssetAllocation {
  type: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  date: string;
  value: number;
}
