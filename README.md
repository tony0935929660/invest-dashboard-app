# 個人投資決策平台 (Personal Investment Decision Platform)

一個以「每日紀律」為核心的投資決策管理平台，幫助投資人培養良好的投資習慣。

## 📋 專案理念

投資成功的關鍵不只是選股技術，更重要的是**決策紀律**和**情緒管理**。這個平台的設計目標是：

- ✅ 每天 3-5 分鐘快速記錄投資決策
- ✅ 追蹤計畫執行情況，減少情緒化操作
- ✅ 管理市場事件和風險提醒
- ✅ 培養長期投資紀律

## 功能特點

### 當前已實作（Phase 0-1）

- 📊 **每日市場概況** - 快速掌握市場狀態
- 🎯 **投資計畫管理** - 短、中、長期計畫分開管理
- � **紀錄行事曆** - 視覺化查看填寫狀態
- ⚠️ **風險提醒系統** - 避免遺漏重要風險
- 📌 **市場事件追蹤** - 提前掌握重要事件
- 📈 **每月統計** - 追蹤填寫率和執行紀律

### 開發 Roadmap

- **Phase 0**: 基礎骨架 ✅
- **Phase 1**: 每日決策與紀律（進行中）
- **Phase 2**: 市場事件與風險感知
- **Phase 3**: 個股研究與追蹤
- **Phase 4**: 回顧與自我學習
- **Phase 5**: 進階自動化

詳細 Roadmap 請參考 [PROJECT_DESIGN.md](./PROJECT_DESIGN.md)

## 技術棧

- **框架**: Next.js 16+ (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4
- **部署**: Azure Static Web Apps
- **導出模式**: 靜態導出 (Static Export)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 專案結構

```
invest-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 根佈局
│   │   ├── page.tsx      # 主頁 Dashboard
│   │   └── globals.css   # 全域樣式
│   ├── components/       # React 元件
│   │   ├── PlanCard.tsx              # 投資計畫卡片
│   │   ├── EventCard.tsx             # 市場事件卡片
│   │   ├── RiskReminderCard.tsx      # 風險提醒卡片
│   │   ├── DailyRecordCalendar.tsx   # 紀錄行事曆
│   │   ├── AssetCard.tsx             # 資產卡片（舊版）
│   │   ├── PortfolioSummary.tsx      # 組合總覽（舊版）
│   │   └── AssetAllocationChart.tsx  # 配置圖表（舊版）
│   ├── lib/             # 工具函數和資料
│   │   ├── investmentMockData.ts  # 投資決策模擬資料
│   │   └── mockData.ts            # 投資組合模擬資料（舊版）
│   └── types/           # TypeScript 類型定義
│       ├── investment.ts  # 投資決策相關類型
│       └── portfolio.ts   # 投資組合類型（舊版）
├── public/              # 靜態資源
├── .github/
│   ├── copilot-instructions.md       # Copilot 指令
│   └── workflows/
│       └── azure-static-web-apps.yml # CI/CD workflow
├── next.config.ts       # Next.js 配置（已設定靜態導出）
├── tailwind.config.ts   # Tailwind CSS 配置
├── tsconfig.json        # TypeScript 配置
├── staticwebapp.config.json  # Azure Static Web Apps 配置
├── PROJECT_DESIGN.md    # 專案設計文件
├── DEPLOYMENT.md        # 部署指南
└── README.md            # 本檔案
```

## 開始使用

### 安裝依賴

```bash
npm install
```

### 開發環境運行

```bash
npm run dev
```

在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建立生產版本

```bash
npm run build
```

這將在 `out` 目錄中生成靜態檔案，可直接部署到 Azure Static Web Apps。

## 部署到 Azure Static Web Apps

### 方法 1: 使用 Azure Portal

1. 在 Azure Portal 建立新的 Static Web App
2. 連接你的 GitHub 儲存庫
3. 設定建置配置：
   - **App location**: `/`
   - **Api location**: 留空
   - **Output location**: `out`
   - **Build command**: `npm run build`

### 方法 2: 使用 Azure CLI

```bash
# 建立靜態檔案
npm run build

# 使用 Azure CLI 部署
az staticwebapp create \
  --name invest-dashboard \
  --resource-group your-resource-group \
  --source ./ \
  --location "East Asia" \
  --branch main \
  --output-location out
```

## 自訂化

### 當前功能（模擬資料）

目前所有資料都是模擬資料，存放在：
- `src/lib/investmentMockData.ts` - 投資決策相關資料
- `src/lib/mockData.ts` - 投資組合資料（舊版功能）

### 下一步開發

查看 [PROJECT_DESIGN.md](./PROJECT_DESIGN.md) 了解：
- 完整的資料結構設計
- Phase 1-5 開發計畫
- 每日操作流程設計
- 使用者介面設計原則

### 修改模擬資料

編輯 `src/lib/investmentMockData.ts` 來自訂：
- 每日紀錄內容
- 投資計畫
- 市場事件
- 風險提醒

## 設計原則

1. **快速操作** - 每天 3-5 分鐘內完成填寫
2. **視覺優先** - 用顏色和圖示快速傳達資訊
3. **紀律強化** - 每天檢視計畫，標記偏離行為
4. **漸進式** - 從簡單開始，逐步增加功能

## Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/) - learn about Azure deployment.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.

## 授權

MIT License
