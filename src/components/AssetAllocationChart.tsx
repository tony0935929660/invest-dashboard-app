import { AssetAllocation } from '@/types/portfolio';

interface AssetAllocationChartProps {
  data: AssetAllocation[];
}

export default function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">資產配置</h3>
      
      {/* 簡單的長條圖 */}
      <div className="mb-6">
        <div className="flex h-8 rounded-lg overflow-hidden">
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              className="transition-all hover:opacity-80"
              title={`${item.type}: ${item.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>

      {/* 圖例 */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.type}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                ${item.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {item.percentage.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">總計</span>
          <span className="text-lg font-bold text-gray-900">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
