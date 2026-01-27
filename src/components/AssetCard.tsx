import { Asset } from '@/types/portfolio';

interface AssetCardProps {
  asset: Asset;
}

export default function AssetCard({ asset }: AssetCardProps) {
  const profitColor = asset.profit >= 0 ? 'text-green-600' : 'text-red-600';
  const profitBgColor = asset.profit >= 0 ? 'bg-green-50' : 'bg-red-50';

  const getAssetTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      stock: '股票',
      bond: '債券',
      crypto: '加密貨幣',
      etf: 'ETF',
      cash: '現金',
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
          <p className="text-sm text-gray-500">{asset.symbol}</p>
        </div>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {getAssetTypeLabel(asset.type)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">持有數量</span>
          <span className="text-sm font-medium text-gray-900">{asset.quantity}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">當前價格</span>
          <span className="text-sm font-medium text-gray-900">
            ${asset.currentPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">總價值</span>
          <span className="text-sm font-semibold text-gray-900">
            ${asset.totalValue.toLocaleString()}
          </span>
        </div>

        <div className={`flex justify-between items-center p-3 rounded-lg ${profitBgColor}`}>
          <span className="text-sm font-medium text-gray-700">損益</span>
          <div className="text-right">
            <div className={`text-sm font-semibold ${profitColor}`}>
              {asset.profit >= 0 ? '+' : ''}${asset.profit.toLocaleString()}
            </div>
            <div className={`text-xs ${profitColor}`}>
              {asset.profit >= 0 ? '+' : ''}{asset.profitPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
