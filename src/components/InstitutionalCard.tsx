import React from 'react';

interface InstitutionalCardProps {
  foreign: number;
  investment: number;
  dealer: number;
}

export default function InstitutionalCard({ foreign, investment, dealer }: InstitutionalCardProps) {
  const total = foreign + investment + dealer;
  const color = total > 0 ? 'text-rose-400' : total < 0 ? 'text-emerald-400' : 'text-white';
  return (
    <div className={`bg-slate-700/50 rounded-lg border ${color === 'text-rose-400' ? 'border-rose-400/40' : color === 'text-emerald-400' ? 'border-emerald-400/40' : 'border-slate-600/50'} shadow flex flex-col justify-between flex-1 min-w-[160px] max-w-[240px] min-h-[90px] p-4 relative m-0`}>
      <span className="text-xs font-bold text-slate-300 mb-2 text-left">三大法人買賣超</span>
      <div className="flex flex-wrap gap-6">
        <span className="text-sm text-slate-200">外資 <span className={foreign > 0 ? 'text-rose-400' : foreign < 0 ? 'text-emerald-400' : 'text-white'}>{foreign > 0 ? '+' : ''}{foreign} 億</span></span>
        <span className="text-sm text-slate-200">投信 <span className={investment > 0 ? 'text-rose-400' : investment < 0 ? 'text-emerald-400' : 'text-white'}>{investment > 0 ? '+' : ''}{investment} 億</span></span>
        <span className="text-sm text-slate-200">自營商 <span className={dealer > 0 ? 'text-rose-400' : dealer < 0 ? 'text-emerald-400' : 'text-white'}>{dealer > 0 ? '+' : ''}{dealer} 億</span></span>
        <span className="text-sm text-slate-200 font-bold ml-2">合計 <span className={`font-bold ${color}`}>{total > 0 ? '+' : ''}{total} 億</span></span>
      </div>
    </div>
  );
}
