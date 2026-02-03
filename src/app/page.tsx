'use client';

import PlanCard from '@/components/PlanCard';
import EventCard from '@/components/EventCard';
import RiskReminderCard from '@/components/RiskReminderCard';
import DailyRecordCalendar from '@/components/DailyRecordCalendar';
import InfoSummaryCard from '@/components/InfoSummaryCard';
import StockTable from '@/components/StockTable';
import { 
  mockInvestmentPlans, 
  mockUpcomingEvents, 
  mockRiskReminders,
  mockRecentRecords,
  mockRealizedPnls,
  mockInfoSummary,
  mockInstitutional,
  mockStockPositions,
} from '@/lib/investmentMockData';
import { useState } from 'react';

type NavPage = 'home' | 'realized-pnl' | 'weekly-review';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  
  const today = new Date();
  const todayString = today.toLocaleDateString('zh-TW', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  // 未確認的風險提醒
  const unacknowledgedReminders = mockRiskReminders.filter(r => !r.acknowledged);

  // 取得今天的紀錄（如果有的話）
  const todayRecord = mockRecentRecords.find(r => 
    r.date.toDateString() === today.toDateString()
  );
  
  // 從今天的紀錄中取得要延續的計畫 ID
  const followedPlanIds = todayRecord?.planReview.followedPlans || [];

  // 歷史已實現損益區間狀態
  const [pnlStartDate, setPnlStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // 本月1日
  });
  const [pnlEndDate, setPnlEndDate] = useState(() => new Date());

  // 過濾損益資料
  const filteredPnls = mockRealizedPnls.filter(
    (rec) => rec.date >= pnlStartDate && rec.date <= pnlEndDate
  );
  const pnlTotal = filteredPnls.reduce((sum, rec) => sum + rec.profit, 0);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* 主要內容 */}
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">個人投資決策平台</h1>
            <p className="text-sm text-slate-400 mt-1">{todayString}</p>
          </div>
          <a 
            href="/record/new"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors shadow-lg"
          >
            填寫今日紀錄
          </a>
        </div>

        {/* 主要內容區域 */}
        <div className="flex gap-4 mb-4">
          {/* 左側：行事曆 + 導航列 */}
          <div className="flex-shrink-0 flex flex-col gap-4">
            {/* 行事曆 */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-3 w-60 border border-slate-700/50">
              <h3 className="text-xs font-bold text-white mb-2">行事曆</h3>
              <DailyRecordCalendar 
                records={mockRecentRecords}
                onDateSelect={setSelectedDate}
              />
            </div>

            {/* 導航列 */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-2 w-60 border border-slate-700/50">
              <nav className="flex flex-col gap-1">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentPage === 'home'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  首頁
                </button>
                <button
                  onClick={() => setCurrentPage('realized-pnl')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    currentPage === 'realized-pnl'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  歷史已實現損益
                </button>
              </nav>
            </div>
          </div>
          {/* 右側：自選股表格 */}
          <div className="flex-shrink-0 min-w-[420px] max-w-[520px]">
            <StockTable data={mockStockPositions} />
          </div>
        </div>
      </main>
    </div>
  );
}