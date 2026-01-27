import { MarketEvent } from '@/types/investment';

interface EventCardProps {
  event: MarketEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const importanceColors = {
    high: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-100' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-100' },
    low: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gray-100' },
  };

  const categoryLabels = {
    earnings: '財報',
    economic: '經濟數據',
    political: '政治',
    technical: '技術面',
    other: '其他',
  };

  const importanceLabels = {
    high: '高度重要',
    medium: '中度關注',
    low: '一般提醒',
  };

  const colors = importanceColors[event.importance];
  const daysUntil = Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-4 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{categoryLabels[event.category]}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} ${colors.text} font-medium`}>
              {importanceLabels[event.importance]}
            </span>
          </div>
          <h4 className="font-bold text-gray-900">{event.title}</h4>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm font-semibold text-gray-900">
            {event.date.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })}
          </div>
          <div className="text-xs text-gray-500">
            {daysUntil === 0 ? '今天' : daysUntil === 1 ? '明天' : `${daysUntil}天後`}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-2">{event.description}</p>

      {event.expectation && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">預期</p>
          <p className="text-sm text-gray-700">{event.expectation}</p>
        </div>
      )}

      {event.actualResult && (
        <div className="mt-2">
          <p className="text-xs font-semibold text-gray-600 mb-1">實際結果</p>
          <p className="text-sm text-gray-700">{event.actualResult}</p>
        </div>
      )}
    </div>
  );
}
