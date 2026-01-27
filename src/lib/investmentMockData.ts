import { DailyRecord, InvestmentPlan, MarketEvent, RiskReminder } from '@/types/investment';

// 模擬今日日期
const today = new Date('2026-01-27');

// 今日紀錄
export const mockTodayRecord: DailyRecord = {
  id: 'record-20260127',
  date: today,
  
  marketOverview: {
    majorIndices: [
      { name: '加權指數', value: 23580, change: 150, changePercent: 0.64 },
      { name: 'S&P 500', value: 5980, change: -25, changePercent: -0.42 },
      { name: 'NASDAQ', value: 19500, change: -80, changePercent: -0.41 },
    ],
    marketSentiment: 'neutral',
    notes: '美股休市影響，台股量能偏低，觀望氣氛濃厚',
  },
  
  dailyJudgment: {
    todayThought: '市場觀望氣氛濃厚，暫不操作',
    hasTraded: false,
    deviatedFromPlan: false,
  },
  
  emotionalState: {
    mood: 'calm',
    confidence: 3,
    notes: '情緒穩定，沒有追高衝動',
  },
  
  planReview: {
    followedPlans: ['plan-long', 'plan-mid'], // 明天延續長期和中期計畫
  },
};

// 近期紀錄（用於行事曆）
export const mockRecentRecords: DailyRecord[] = [
  mockTodayRecord,
  {
    id: 'record-20260124',
    date: new Date('2026-01-24'),
    marketOverview: {
      majorIndices: [
        { name: '加權指數', value: 23430, change: -120, changePercent: -0.51 },
      ],
      marketSentiment: 'bearish',
      notes: '量能萎縮，外資持續賣超',
    },
    dailyJudgment: {
      todayThought: '市場氣氛不佳，減少曝險',
      hasTraded: true,
      trades: [
        {
          id: 'trade-1',
          time: '10:30',
          symbol: '2330',
          name: '台積電',
          action: 'sell',
          quantity: 2,
          price: 618,
          reason: '減少持股，觀望為主',
        },
      ],
      deviatedFromPlan: false,
    },
    emotionalState: {
      mood: 'anxious',
      confidence: 2,
      notes: '擔心市場持續下跌',
    },
    planReview: {
      followedPlans: ['plan-long', 'plan-mid'],
    },
  },
];

// 投資計畫
export const mockInvestmentPlans: InvestmentPlan[] = [
  {
    id: 'plan-long',
    type: 'long',
    title: '長期投資計畫（5-10年）',
    description: '以科技龍頭股和 ETF 為主，定期定額投資',
    goals: [
      '累積退休金',
      '年化報酬率目標 8-10%',
      '持有優質資產不受短期波動影響',
    ],
    rules: [
      '每月固定投入 3 萬元',
      '台積電、ETF 各佔 50%',
      '不因短期波動賣出',
      '除非基本面改變，否則持續持有',
    ],
    createdAt: new Date('2026-01-01'),
    lastModified: new Date('2026-01-01'),
    modificationHistory: [],
    isActive: true,
    lastFollowedDate: new Date('2026-01-27'),
  },
  {
    id: 'plan-mid',
    type: 'mid',
    title: '中期投資計畫（6個月-2年）',
    description: '掌握產業趨勢，波段操作',
    goals: [
      '把握 AI、5G 產業趨勢',
      '目標獲利 15-20%',
      '控制單一部位不超過總資產 20%',
    ],
    rules: [
      '只買研究過的股票',
      '設定停損點 -10%',
      '獲利 15% 考慮減碼',
      '不追高',
    ],
    createdAt: new Date('2026-01-01'),
    lastModified: new Date('2026-01-15'),
    modificationHistory: [
      {
        id: 'mod-1',
        date: new Date('2026-01-15'),
        changes: '調整停損點從 -8% 到 -10%',
        reason: '市場波動較大，避免過早停損',
      },
    ],
    isActive: true,
    lastFollowedDate: new Date('2026-01-27'),
  },
  {
    id: 'plan-short',
    type: 'short',
    title: '短期交易計畫（1週-3個月）',
    description: '小額靈活操作，練習技術面判斷',
    goals: [
      '提升盤感',
      '單筆獲利目標 5-8%',
      '快進快出',
    ],
    rules: [
      '單筆不超過 5 萬元',
      '嚴格停損 -5%',
      '不留倉過週末（除非強勢股）',
      '每天檢視部位',
    ],
    createdAt: new Date('2026-01-01'),
    lastModified: new Date('2026-01-20'),
    modificationHistory: [
      {
        id: 'mod-2',
        date: new Date('2026-01-20'),
        changes: '新增「不留倉過週末」規則',
        reason: '週末國際事件風險高',
      },
    ],
    isActive: false,
    lastFollowedDate: new Date('2026-01-24'),
  },
];

// 市場事件（未來一週）
export const mockUpcomingEvents: MarketEvent[] = [
  {
    id: 'event-1',
    date: new Date('2026-01-29'),
    title: 'Fed 利率決議',
    description: '聯準會公布利率決策與政策聲明',
    importance: 'high',
    category: 'economic',
    expectation: '預期維持利率不變，關注鮑爾談話',
  },
  {
    id: 'event-2',
    date: new Date('2026-01-30'),
    title: 'Apple 財報',
    description: 'Apple 公布 Q4 財報',
    importance: 'high',
    category: 'earnings',
    expectation: 'iPhone 銷售可能略低於預期',
  },
  {
    id: 'event-3',
    date: new Date('2026-01-31'),
    title: '台積電法說會',
    description: '台積電舉行法人說明會',
    importance: 'high',
    category: 'earnings',
    expectation: '關注 3nm 進度與 2026 年展望',
  },
];

// 風險提醒
export const mockRiskReminders: RiskReminder[] = [
  {
    id: 'risk-1',
    createdAt: new Date('2026-01-27'),
    title: '本週重大事件密集',
    description: 'Fed 決議、Apple 財報、台積電法說會都在本週，市場波動可能加劇',
    level: 'warning',
    acknowledged: false,
  },
  {
    id: 'risk-2',
    createdAt: new Date('2026-01-26'),
    title: '持股過度集中',
    description: '台積電部位佔總資產 35%，超過原定 30% 上限',
    level: 'warning',
    acknowledged: true,
    acknowledgedAt: new Date('2026-01-27'),
    action: '已賣出 2 張台積電，降低比重',
  },
  {
    id: 'risk-3',
    createdAt: new Date('2026-01-25'),
    title: '市場連續下跌',
    description: '台股已連續三天收黑，注意支撐位',
    level: 'info',
    acknowledged: true,
    acknowledgedAt: new Date('2026-01-27'),
    action: '暫停加碼，觀望為主',
  },
];
