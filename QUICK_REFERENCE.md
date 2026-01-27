# 快速開發參考

## 📁 檔案位置速查

### 核心檔案
```
src/app/page.tsx                      # 主頁
src/types/investment.ts               # 所有類型定義
src/lib/investmentMockData.ts         # 模擬資料
```

### 元件
```
src/components/PlanCard.tsx           # 投資計畫卡片
src/components/EventCard.tsx          # 市場事件卡片
src/components/RiskReminderCard.tsx   # 風險提醒卡片
src/components/DailyRecordCalendar.tsx # 紀錄行事曆
```

### 文件
```
PROJECT_DESIGN.md                     # 完整設計文件
SCREENS_COMPLETED.md                  # 畫面完成總結
DEPLOYMENT.md                         # 部署指南
```

## 🚀 常用指令

```bash
# 開發
npm run dev

# 建置
npm run build

# Lint 檢查
npm run lint

# 型別檢查
npx tsc --noEmit
```

## 🎨 顏色系統

### 計畫類型
```typescript
long: {
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  text: 'text-blue-700',
  badge: 'bg-blue-100'
}

mid: {
  bg: 'bg-green-50',
  border: 'border-green-200',
  text: 'text-green-700',
  badge: 'bg-green-100'
}

short: {
  bg: 'bg-orange-50',
  border: 'border-orange-200',
  text: 'text-orange-700',
  badge: 'bg-orange-100'
}
```

### 風險等級
```typescript
critical: {
  bg: 'bg-red-100',
  border: 'border-red-400',
  text: 'text-red-800',
  icon: '🚨'
}

warning: {
  bg: 'bg-yellow-100',
  border: 'border-yellow-400',
  text: 'text-yellow-800',
  icon: '⚠️'
}

info: {
  bg: 'bg-blue-100',
  border: 'border-blue-400',
  text: 'text-blue-800',
  icon: 'ℹ️'
}
```

## 📊 核心資料結構

### DailyRecord（每日紀錄）
```typescript
{
  date: Date,
  marketOverview: { ... },
  dailyJudgment: {
    todayThought: string,
    hasTraded: boolean,
    trades: Trade[],
    deviatedFromPlan: boolean
  },
  emotionalState: {
    mood: 'calm' | 'anxious' | 'excited' | 'fearful' | 'greedy',
    confidence: 1-5,
    notes: string
  },
  planReview: { ... }
}
```

### InvestmentPlan（投資計畫）
```typescript
{
  type: 'long' | 'mid' | 'short',
  title: string,
  goals: string[],
  rules: string[],
  modificationHistory: []
}
```

## 🔧 新增元件模板

### 基本元件
```tsx
interface MyComponentProps {
  data: SomeType;
  onAction?: (id: string) => void;
}

export default function MyComponent({ data, onAction }: MyComponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 內容 */}
    </div>
  );
}
```

### 互動元件
```tsx
'use client';

import { useState } from 'react';

export default function MyInteractiveComponent() {
  const [state, setState] = useState(false);

  return (
    <button onClick={() => setState(!state)}>
      {/* 內容 */}
    </button>
  );
}
```

## 📝 新增頁面

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        {/* Header */}
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Content */}
      </main>
    </div>
  );
}
```

## 🗂️ 新增模擬資料

```typescript
// src/lib/investmentMockData.ts

export const mockNewData: NewType = {
  id: 'id-1',
  // ...
};
```

## 🎯 開發檢查清單

### 新增功能前
- [ ] 檢查 `src/types/investment.ts` 是否需要新類型
- [ ] 在 `src/lib/investmentMockData.ts` 準備測試資料
- [ ] 確認元件需要的 props

### 開發中
- [ ] 使用 TypeScript 嚴格模式
- [ ] 元件要 `'use client'` 嗎？
- [ ] 響應式設計（grid/flex + breakpoints）
- [ ] 錯誤處理

### 完成後
- [ ] npm run build 確認無錯誤
- [ ] 測試互動功能
- [ ] 檢查行動裝置顯示
- [ ] 更新相關文件

## 🐛 常見問題

### "use client" 相關
- 使用 useState/useEffect 的元件需要
- 有 onClick 等事件處理的元件需要
- 純展示元件不需要

### 建置錯誤
```bash
# 清除 cache 重新建置
rm -rf .next out
npm run build
```

### TypeScript 錯誤
```bash
# 檢查類型
npx tsc --noEmit
```

## 📚 學習資源

- Next.js App Router: https://nextjs.org/docs/app
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Azure Static Web Apps: https://docs.microsoft.com/azure/static-web-apps/

## 🎉 下次開發重點

### 優先順序 1: 填寫表單
```
src/app/daily-record/new/page.tsx
src/components/DailyRecordForm.tsx
```

### 優先順序 2: 資料儲存
```
src/lib/storage.ts  # LocalStorage 封裝
```

### 優先順序 3: 紀錄查看
```
src/app/daily-record/[date]/page.tsx
```

---

快速參考隨時更新，讓開發更順暢！ 🚀
