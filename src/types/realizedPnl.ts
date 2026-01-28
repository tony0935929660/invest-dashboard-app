// 已實現損益型別
export interface RealizedPnlRecord {
  id: string;
  date: Date;
  symbol: string;
  name: string;
  buyPrice: number;
  buyQty: number;
  sellPrice: number;
  sellQty: number;
  profit: number; // 正負
  profitPercent: number; // %
  holdingDays: number;
  note?: string;
}
