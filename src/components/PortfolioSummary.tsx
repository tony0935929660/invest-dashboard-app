import { Portfolio } from '@/types/portfolio';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

export default function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const profitColor = portfolio.totalProfit >= 0 ? 'text-green-600' : 'text-red-600';
  const profitBg = portfolio.totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">{portfolio.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-blue-200 text-sm mb-2">總資產價值</p>
          <p className="text-3xl font-bold">
            ${portfolio.totalValue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-blue-200 text-sm mb-2">總成本</p>
          <p className="text-2xl font-semibold">
            ${portfolio.totalCost.toLocaleString()}
          </p>
        </div>

        <div className={`${profitBg} rounded-lg p-4 -m-1`}>
          <p className="text-gray-700 text-sm mb-2 font-medium">總損益</p>
          <p className={`text-2xl font-bold ${profitColor}`}>
            {portfolio.totalProfit >= 0 ? '+' : ''}
            ${portfolio.totalProfit.toLocaleString()}
          </p>
          <p className={`text-sm font-semibold ${profitColor} mt-1`}>
            {portfolio.totalProfit >= 0 ? '+' : ''}
            {portfolio.totalProfitPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-blue-200">
        最後更新: {portfolio.lastUpdated.toLocaleString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
}
