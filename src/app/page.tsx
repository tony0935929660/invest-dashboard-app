'use client';

import PlanCard from '@/components/PlanCard';
import EventCard from '@/components/EventCard';
import RiskReminderCard from '@/components/RiskReminderCard';
import DailyRecordCalendar from '@/components/DailyRecordCalendar';
import InfoSummaryCard from '@/components/InfoSummaryCard';
import { 
  mockInvestmentPlans, 
  mockUpcomingEvents, 
  mockRiskReminders,
  mockRecentRecords,
  mockRealizedPnls,
  mockInfoSummary,
  mockInstitutional,
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

          {/* 右側：根據選擇的頁面顯示不同內容 */}
          <div className="flex-1">
            {currentPage === 'home' && (
              <div className="space-y-4">
                {/* 第一行：風險提醒 + 重要事件 + 投資計畫 */}
                <div className="grid grid-cols-3 gap-4">
                  {/* 風險提醒 */}
                  <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-3 border border-slate-700/50 h-[280px] flex flex-col">
                    <h3 className="text-xs font-bold text-white mb-2">風險提醒</h3>
                    <div className="flex-1 overflow-y-auto space-y-1.5">
                      {unacknowledgedReminders.length > 0 ? (
                        unacknowledgedReminders.slice(0, 3).map(reminder => {
                          const colors = {
                            critical: { accent: 'border-l-4 border-rose-400', badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/30', badgeText: '緊急' },
                            warning: { accent: 'border-l-4 border-amber-400', badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', badgeText: '警告' },
                            info: { accent: 'border-l-4 border-blue-400', badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', badgeText: '提示' },
                          }[reminder.level];

                          return (
                            <div key={reminder.id} className={`bg-slate-700/50 ${colors.accent} border border-slate-600/50 rounded-lg p-2.5 backdrop-blur`}>
                              <div className="flex items-start gap-2">
                                <span className={`${colors.badge} text-xs px-2 py-0.5 rounded font-semibold flex-shrink-0`}>{colors.badgeText}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-slate-200 mb-1">{reminder.title}</p>
                                  <p className="text-xs text-slate-300 line-clamp-3">{reminder.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-xs text-slate-400">目前無風險提醒</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 重要事件 */}
                  <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-3 border border-slate-700/50 h-[280px] flex flex-col">
                    <h3 className="text-xs font-bold text-white mb-2">近期重要事件</h3>
                    <div className="flex-1 overflow-y-auto space-y-1.5">
                      {mockUpcomingEvents.slice(0, 3).map(event => {
                        const colors = {
                          high: { accent: 'border-l-4 border-rose-400', badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/30', badgeText: '高' },
                          medium: { accent: 'border-l-4 border-amber-400', badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', badgeText: '中' },
                          low: { accent: 'border-l-4 border-slate-400', badge: 'bg-slate-500/20 text-slate-400 border border-slate-500/30', badgeText: '低' },
                        }[event.importance];

                        return (
                          <div key={event.id} className={`bg-slate-700/50 ${colors.accent} border border-slate-600/50 rounded-lg p-2.5 backdrop-blur`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`${colors.badge} text-xs px-2 py-0.5 rounded font-semibold`}>{colors.badgeText}</span>
                              <span className="text-sm font-semibold text-slate-200 flex-1">{event.title}</span>
                              <span className="text-xs text-slate-400">{event.date.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <p className="text-xs text-slate-300 line-clamp-2">{event.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 今日計畫 */}
                  <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-3 border border-slate-700/50 h-[280px] flex flex-col">
                    <h3 className="text-xs font-bold text-white mb-2">今日計畫</h3>
                    <div className="flex-1 overflow-y-auto space-y-2">
                      {mockInvestmentPlans
                        .filter(plan => followedPlanIds.includes(plan.id))
                        .map(plan => {
                          const colors = {
                            long: { bg: 'bg-slate-700/50', accent: 'border-l-4 border-indigo-400', text: 'text-indigo-400', label: '長' },
                            mid: { bg: 'bg-slate-700/50', accent: 'border-l-4 border-indigo-400', text: 'text-indigo-400', label: '中' },
                            short: { bg: 'bg-slate-700/50', accent: 'border-l-4 border-indigo-400', text: 'text-indigo-400', label: '短' },
                          }[plan.type];
                          
                          const labels = {
                            long: '長期',
                            mid: '中期',
                            short: '短期',
                          }[plan.type];

                          return (
                            <div key={plan.id} className={`${colors.bg} ${colors.accent} rounded-lg p-2 border border-slate-600/50 backdrop-blur`}>
                              <div className="mb-1 flex items-center gap-2">
                                <span className={`${colors.text} text-[10px] font-bold px-1.5 py-0.5 bg-slate-800/80 rounded`}>{labels}</span>
                              </div>
                              <ul className="space-y-0.5">
                                {plan.goals.slice(0, 2).map((goal, index) => (
                                  <li key={index} className="text-[10px] text-slate-300 flex items-start gap-1">
                                    <span className="text-slate-500 mt-0.5">•</span>
                                    <span className="line-clamp-1">{goal}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      
                      {followedPlanIds.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-[10px] text-slate-400">今天還沒有設定計畫</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* 第二行：資訊卡片（分三直列） */}
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col gap-3">
                    <InfoSummaryCard label="外資買賣超 (億元)" value={mockInstitutional.foreign} change={mockInstitutional.foreign} changePercent={0} unit="" />
                    <InfoSummaryCard label="投信買賣超 (億元)" value={mockInstitutional.investment} change={mockInstitutional.investment} changePercent={0} unit="" />
                    <InfoSummaryCard label="自營商買賣超 (億元)" value={mockInstitutional.dealer} change={mockInstitutional.dealer} changePercent={0} unit="" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <InfoSummaryCard {...{...mockInfoSummary[0], label: '加權指數'}} />
                    <InfoSummaryCard {...{...mockInfoSummary[1], label: '櫃買指數'}} />
                    <InfoSummaryCard {...mockInfoSummary[3]} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <InfoSummaryCard {...mockInfoSummary[2]} />
                    <InfoSummaryCard {...mockInfoSummary[4]} />
                    <InfoSummaryCard {...mockInfoSummary[5]} />
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'realized-pnl' && (
              <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-4 border border-slate-700/50">
                <h3 className="text-lg font-bold text-white mb-4">歷史已實現損益</h3>
                {/* 日期區間選擇器 */}
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-xs text-slate-300">起始</label>
                  <input type="date" className="bg-slate-700/50 rounded px-2 py-1 text-xs text-white border border-slate-600 focus:outline-none" value={pnlStartDate.toISOString().slice(0,10)} onChange={e => setPnlStartDate(new Date(e.target.value))} />
                  <span className="text-xs text-slate-400">~</span>
                  <label className="text-xs text-slate-300">結束</label>
                  <input type="date" className="bg-slate-700/50 rounded px-2 py-1 text-xs text-white border border-slate-600 focus:outline-none" value={pnlEndDate.toISOString().slice(0,10)} onChange={e => setPnlEndDate(new Date(e.target.value))} />
                </div>
                <div className="space-y-3">
                  {filteredPnls.length === 0 && (
                    <div className="text-xs text-slate-400">此區間無已實現損益紀錄</div>
                  )}
                  {filteredPnls.map(rec => (
                    <div key={rec.id} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-200">{rec.symbol} {rec.name}</p>
                          <p className="text-xs text-slate-400">{rec.date.toISOString().slice(0,10)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${rec.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{rec.profit >= 0 ? '+' : ''}{rec.profit.toLocaleString()}</p>
                          <p className="text-xs text-slate-400">{rec.profitPercent > 0 ? '+' : ''}{rec.profitPercent}%</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 space-y-0.5">
                        <p>買入：${rec.buyPrice} × {rec.buyQty}股 | 賣出：${rec.sellPrice} × {rec.sellQty}股</p>
                        <p>持有天數：{rec.holdingDays}天{rec.note ? ` | ${rec.note}` : ''}</p>
                      </div>
                    </div>
                  ))}
                  {/* 總計 */}
                  <div className="bg-indigo-500/20 rounded-lg p-3 border border-indigo-500/30 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">本區間總計</span>
                      <span className={`text-lg font-bold ${pnlTotal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pnlTotal >= 0 ? '+' : ''}{pnlTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'weekly-review' && false /* 先隱藏每週回顧 */}
          </div>
        </div>

        {/* 下方預留空間，待後續開發 */}
      </main>
    </div>
  );
}
