'use client';

import { InvestmentPlan } from '@/types/investment';
import { useState } from 'react';

interface PlanCardProps {
  plan: InvestmentPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColors = {
    long: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' },
    mid: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100' },
    short: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100' },
  };

  const typeLabels = {
    long: '長期計畫',
    mid: '中期計畫',
    short: '短期計畫',
  };

  const colors = typeColors[plan.type];

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} ${colors.text} mb-2`}>
            {typeLabels[plan.type]}
          </span>
          <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* 目標 */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">投資目標</h4>
        <ul className="space-y-1">
          {plan.goals.map((goal, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 投資紀律 */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">投資紀律</h4>
        <ul className="space-y-1">
          {plan.rules.map((rule, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 展開詳細資訊 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>建立時間: {plan.createdAt.toLocaleDateString('zh-TW')}</p>
            <p>最後修改: {plan.lastModified.toLocaleDateString('zh-TW')}</p>
          </div>

          {plan.modificationHistory.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">修改歷史</h5>
              <div className="space-y-2">
                {plan.modificationHistory.map((mod) => (
                  <div key={mod.id} className="text-xs bg-white bg-opacity-50 rounded p-2">
                    <p className="font-medium text-gray-700">{mod.date.toLocaleDateString('zh-TW')}</p>
                    <p className="text-gray-600 mt-1">修改: {mod.changes}</p>
                    <p className="text-gray-500 mt-1">原因: {mod.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
