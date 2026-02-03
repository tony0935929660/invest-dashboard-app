import React from 'react';

export interface StockPosition {
  symbol: string;
  name: string;
  shares: number;
  profit: number;
  action: '持有' | '長高賣出' | '建立部位';
}

export default function StockTable({ data }: { data: StockPosition[] }) {
  return (
    <div className="bg-slate-700/50 rounded-lg border border-slate-600/50 p-4 mt-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-400">
            <th>標的</th>
            <th>持有張數</th>
            <th>損益</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pos) => (
            <tr key={pos.symbol} className="border-t border-slate-600">
              <td>{pos.name}</td>
              <td>{pos.shares}</td>
              <td className={pos.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {pos.profit >= 0 ? '+' : ''}{pos.profit}
              </td>
              <td>{pos.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
