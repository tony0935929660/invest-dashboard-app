import React from 'react';

interface InfoSummaryCardProps {
  label: string;
  value: number;
  change: number;
  changePercent: number;
  unit?: string;
  note?: string;
}

export default function InfoSummaryCard({ label, value, change, changePercent, unit, note }: InfoSummaryCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;
  const color = isUp ? 'text-rose-400' : isDown ? 'text-emerald-400' : 'text-white';
  const border = isUp ? 'border-rose-400/40' : isDown ? 'border-emerald-400/40' : 'border-slate-600/50';
  const showPercent = label.includes('加權指數') || label.includes('櫃買指數');
  // 不顯示右下角漲跌的條件
  const hideChange = label.includes('外資買賣超') || label.includes('投信買賣超') || label.includes('自營商買賣超');
  return (
    <div className={`bg-slate-700/50 rounded-lg border ${border} shadow flex flex-col justify-between flex-1 min-w-[160px] max-w-[240px] min-h-[90px] p-4 relative m-0`}>
      <span className="text-base font-bold text-slate-300 mb-2 text-left">{label}</span>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <span className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</span>
        <div className="flex items-end gap-2">
          {unit && <span className="text-xs text-slate-400 mb-1">{unit}</span>}
          {note && <span className="text-xs text-emerald-400 ml-2">{note}</span>}
        </div>
      </div>
      {!hideChange && typeof change === 'number' && typeof changePercent === 'number' && (
        <span className={`absolute right-4 bottom-2 text-xs font-semibold ${color}`}>{change > 0 ? '+' : ''}{change}{showPercent ? ` (${changePercent > 0 ? '+' : ''}${changePercent}%)` : ''}</span>
      )}
    </div>
  );
}
