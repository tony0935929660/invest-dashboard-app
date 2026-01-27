'use client';

import { RiskReminder } from '@/types/investment';
import { useState } from 'react';

interface RiskReminderCardProps {
  reminder: RiskReminder;
  onAcknowledge?: (id: string, action: string) => void;
}

export default function RiskReminderCard({ reminder, onAcknowledge }: RiskReminderCardProps) {
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const [actionInput, setActionInput] = useState('');

  const levelColors = {
    critical: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-800' },
    warning: { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-800' },
    info: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800' },
  };

  const levelLabels = {
    critical: '嚴重警告',
    warning: '注意警告',
    info: '一般提醒',
  };

  const colors = levelColors[reminder.level];

  const handleAcknowledge = () => {
    if (onAcknowledge) {
      onAcknowledge(reminder.id, actionInput);
      setIsAcknowledging(false);
      setActionInput('');
    }
  };

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 ${reminder.acknowledged ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold ${colors.text} uppercase`}>
              {levelLabels[reminder.level]}
            </span>
            <span className="text-xs text-gray-500">
              {reminder.createdAt.toLocaleDateString('zh-TW')}
            </span>
          </div>
          
          <h4 className="font-bold text-gray-900 mb-2">{reminder.title}</h4>
          <p className="text-sm text-gray-700 mb-3">{reminder.description}</p>

          {reminder.acknowledged ? (
            <div className="bg-white bg-opacity-50 rounded p-3 mt-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">
                已確認 - {reminder.acknowledgedAt?.toLocaleDateString('zh-TW')}
              </p>
              {reminder.action && (
                <p className="text-sm text-gray-700">採取行動: {reminder.action}</p>
              )}
            </div>
          ) : (
            <div className="mt-3">
              {!isAcknowledging ? (
                <button
                  onClick={() => setIsAcknowledging(true)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  確認已處理
                </button>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value)}
                    placeholder="記錄你採取的行動..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAcknowledge}
                      className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      確認
                    </button>
                    <button
                      onClick={() => {
                        setIsAcknowledging(false);
                        setActionInput('');
                      }}
                      className="px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
