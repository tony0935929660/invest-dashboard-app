'use client';

import { useState } from 'react';
import { mockInvestmentPlans } from '@/lib/investmentMockData';

export default function NewRecordPage() {
  const today = new Date();
  const todayString = today.toLocaleDateString('zh-TW', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  // 表單狀態
  const [marketNotes, setMarketNotes] = useState('');
  const [todayThought, setTodayThought] = useState('');
  const [hasTraded, setHasTraded] = useState(false);
  const [deviatedFromPlan, setDeviatedFromPlan] = useState(false);
  const [mood, setMood] = useState<'calm' | 'anxious' | 'excited' | 'fearful' | 'greedy'>('calm');
  const [confidence, setConfidence] = useState(3);
  const [emotionalNotes, setEmotionalNotes] = useState('');
  const [followedPlans, setFollowedPlans] = useState<string[]>([]);

  const handlePlanToggle = (planId: string) => {
    setFollowedPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 儲存資料
    console.log({
      marketNotes,
      todayThought,
      hasTraded,
      deviatedFromPlan,
      mood,
      confidence,
      emotionalNotes,
      followedPlans,
    });
    alert('紀錄已儲存！');
  };

  const moodLabels = {
    calm: '冷靜',
    anxious: '焦慮',
    excited: '興奮',
    fearful: '恐懼',
    greedy: '貪婪',
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">填寫今日紀錄</h1>
            <p className="text-sm text-slate-400 mt-1">{todayString}</p>
          </div>
          <a 
            href="/"
            className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-600 transition-colors"
          >
            返回首頁
          </a>
        </div>

        {/* 表單 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 市場概況 */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-6 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4">市場概況</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                市場筆記
              </label>
              <textarea
                value={marketNotes}
                onChange={(e) => setMarketNotes(e.target.value)}
                placeholder="記錄今天的市場狀況、重要指數表現、市場氛圍等..."
                className="w-full px-4 py-3 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* 投資判斷與操作 */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-6 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4">投資判斷與操作</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  今日想法
                </label>
                <textarea
                  value={todayThought}
                  onChange={(e) => setTodayThought(e.target.value)}
                  placeholder="記錄你今天的投資想法、看法、觀察..."
                  className="w-full px-4 py-3 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasTraded}
                    onChange={(e) => setHasTraded(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-slate-200">今天有交易</span>
                </label>

                <label className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={deviatedFromPlan}
                    onChange={(e) => setDeviatedFromPlan(e.target.checked)}
                    className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm font-medium text-slate-200">偏離計畫</span>
                </label>
              </div>
            </div>
          </div>

          {/* 情緒狀態 */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-6 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4">情緒狀態</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  心情
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(Object.keys(moodLabels) as Array<keyof typeof moodLabels>).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMood(key)}
                      className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                        mood === key
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {moodLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  信心程度：{confidence} / 5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>很低</span>
                  <span>普通</span>
                  <span>很高</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  情緒筆記
                </label>
                <textarea
                  value={emotionalNotes}
                  onChange={(e) => setEmotionalNotes(e.target.value)}
                  placeholder="記錄你的情緒狀態、是否有衝動操作的念頭..."
                  className="w-full px-4 py-3 bg-slate-700/50 text-slate-200 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* 明天要延續的計畫 */}
          <div className="bg-slate-800/50 backdrop-blur rounded-lg shadow-lg p-6 border border-slate-700/50">
            <h2 className="text-lg font-bold text-white mb-4">明天要延續的計畫</h2>
            <p className="text-sm text-slate-400 mb-4">選擇明天開盤要遵循的投資計畫</p>
            <div className="space-y-3">
              {mockInvestmentPlans.map((plan) => {
                const isSelected = followedPlans.includes(plan.id);
                const labels = {
                  long: '長期',
                  mid: '中期',
                  short: '短期',
                };
                
                return (
                  <label
                    key={plan.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500/50'
                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePlanToggle(plan.id)}
                      className="w-5 h-5 mt-0.5 rounded bg-slate-600 border-slate-500 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-400 bg-slate-800/80 px-2 py-0.5 rounded">
                          {labels[plan.type]}
                        </span>
                        <span className="text-sm font-semibold text-slate-200">{plan.title}</span>
                      </div>
                      <p className="text-xs text-slate-400">{plan.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-500 transition-colors shadow-lg text-lg"
            >
              儲存紀錄
            </button>
            <a
              href="/"
              className="px-6 py-4 bg-slate-700 text-slate-200 rounded-lg font-semibold hover:bg-slate-600 transition-colors text-center"
            >
              取消
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
