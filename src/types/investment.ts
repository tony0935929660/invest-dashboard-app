// 每日投資紀錄類型定義

export interface DailyRecord {
  id: string;
  date: Date;
  
  // 市場概況
  marketOverview: {
    majorIndices: {
      name: string;
      value: number;
      change: number;
      changePercent: number;
    }[];
    marketSentiment: 'bullish' | 'bearish' | 'neutral'; // 多頭/空頭/中性
    notes: string;
  };
  
  // 投資判斷與操作
  dailyJudgment: {
    todayThought: string; // 今日想法
    hasTraded: boolean; // 是否有交易
    trades?: Trade[];
    deviatedFromPlan: boolean; // 是否偏離計畫
    deviationReason?: string;
  };
  
  // 情緒狀態
  emotionalState: {
    mood: 'calm' | 'anxious' | 'excited' | 'fearful' | 'greedy'; // 冷靜/焦慮/興奮/恐懼/貪婪
    confidence: number; // 1-5 信心程度
    notes: string;
  };
  
  // 計畫檢視
  planReview: {
    followedPlans: string[]; // 明天要延續的計畫 ID 列表
    adjustmentNotes?: string;
  };
}

export interface Trade {
  id: string;
  time: string;
  symbol: string;
  name: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  reason: string; // 操作理由
}

// 投資計畫類型
export interface InvestmentPlan {
  id: string;
  type: 'long' | 'mid' | 'short'; // 長期/中期/短期
  title: string;
  description: string;
  goals: string[];
  rules: string[]; // 投資紀律
  createdAt: Date;
  lastModified: Date;
  modificationHistory: PlanModification[];
  isActive: boolean; // 計畫是否啟用
  lastFollowedDate?: Date; // 最後延續日期
}

export interface PlanModification {
  id: string;
  date: Date;
  changes: string;
  reason: string;
}

// 市場事件與提醒
export interface MarketEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  category: 'earnings' | 'economic' | 'political' | 'technical' | 'other';
  expectation?: string; // 事前預期
  actualResult?: string; // 實際結果
  impact?: string; // 對投資組合的影響
}

export interface RiskReminder {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  level: 'critical' | 'warning' | 'info'; // 嚴重/警告/提醒
  acknowledged: boolean; // 是否已確認
  acknowledgedAt?: Date;
  action?: string; // 採取的行動
}

// 個股研究
export interface StockResearch {
  id: string;
  symbol: string;
  name: string;
  addedAt: Date;
  
  // 投資邏輯
  investmentThesis: string;
  
  // 狀態標記
  status: 'watching' | 'building' | 'holding' | 'overheated' | 'waiting';
  
  // 新聞與筆記
  notes: ResearchNote[];
  
  // 價格提醒
  targetPrice?: number;
  stopLoss?: number;
}

export interface ResearchNote {
  id: string;
  date: Date;
  title: string;
  content: string;
  source?: string;
  importance: 'high' | 'medium' | 'low';
}

// 回顧
export interface WeeklyReview {
  id: string;
  weekStart: Date;
  weekEnd: Date;
  
  goodDecisions: string[];
  mistakes: string[];
  lessonsLearned: string[];
  nextWeekFocus: string[];
}

export interface MonthlyReview {
  id: string;
  month: string; // "2026-01"
  
  decisionQuality: number; // 1-5
  commonMistakes: string[];
  improvements: string[];
  nextMonthStrategy: string;
}
