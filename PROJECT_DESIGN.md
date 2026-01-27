# 個人投資決策平台 - Phase 0 & 1 設計文件

## 專案目標

建立一個以「每日紀律」為核心的投資決策平台，幫助投資人：
- 每天填寫投資紀錄（3-5分鐘內完成）
- 追蹤投資計畫執行情況
- 管理風險提醒和重要事件
- 培養投資紀律，減少情緒化決策

## 當前實作功能（Phase 0-1）

### ✅ 已完成

#### 1. 主頁 Dashboard
- **今日市場概況**: 顯示主要指數漲跌
- **今日狀態**: 情緒、信心程度、交易狀態、執行紀律
- **本月統計**: 填寫率、交易天數、偏離次數
- **快速操作**: 一鍵填寫今日紀錄

#### 2. 紀錄行事曆
- **月曆視圖**: 可視化查看每日紀錄狀態
- **狀態標記**: 
  - ✓ 已填寫紀錄（綠色背景）
  - 💰 有交易
  - ⚠️ 偏離計畫
  - 虛線框表示未填寫
- **日期選擇**: 點擊日期可查看該日詳細紀錄

#### 3. 投資計畫管理
三個層級的計畫卡片：

**長期計畫（5-10年）**
- 顏色：藍色
- 內容：退休規劃、定期定額、核心持股
- 紀律：堅持長期持有，不受短期波動影響

**中期計畫（6個月-2年）**
- 顏色：綠色
- 內容：產業趨勢、波段操作、部位控管
- 紀律：設定停損停利、控制倉位

**短期計畫（1週-3個月）**
- 顏色：橘色
- 內容：技術面操作、快進快出
- 紀律：嚴格停損、小額操作

**功能特點**：
- 可展開查看修改歷史
- 記錄每次調整的原因
- 一目了然的目標和紀律

#### 4. 市場事件提醒
- **重要性分級**:
  - 🔴 高度重要（紅色）
  - 🟡 中度關注（黃色）
  - ⚪ 一般提醒（灰色）
- **事件類型**:
  - 📈 財報
  - 💰 經濟數據
  - 🏛️ 政治事件
  - 📊 技術面
- **時間顯示**: 幾天後、明天、今天
- **預期記錄**: 可記錄事前預期和事後結果

#### 5. 風險提醒系統
- **風險等級**:
  - 🚨 嚴重警告（紅色）
  - ⚠️ 注意警告（黃色）
  - ℹ️ 一般提醒（藍色）
- **確認機制**: 
  - 必須確認已看到提醒
  - 記錄採取的行動
  - 避免遺漏重要風險

## 資料結構

### DailyRecord（每日紀錄）
```typescript
{
  date: Date,
  marketOverview: {
    majorIndices: [],      // 主要指數
    marketSentiment: '',   // 市場情緒
    notes: ''              // 備註
  },
  dailyJudgment: {
    todayThought: '',      // 今日想法
    hasTraded: boolean,    // 是否交易
    trades: [],            // 交易明細
    deviatedFromPlan: boolean,  // 是否偏離計畫
    deviationReason: ''    // 偏離原因
  },
  emotionalState: {
    mood: '',              // 情緒（calm/anxious/excited/fearful/greedy）
    confidence: number,    // 信心程度 1-5
    notes: ''              // 備註
  },
  planReview: {
    followedLongTerm: boolean,   // 是否遵守長期計畫
    followedMidTerm: boolean,    // 是否遵守中期計畫
    followedShortTerm: boolean   // 是否遵守短期計畫
  }
}
```

### InvestmentPlan（投資計畫）
```typescript
{
  type: 'long' | 'mid' | 'short',
  title: string,
  description: string,
  goals: string[],           // 投資目標
  rules: string[],           // 投資紀律
  modificationHistory: []    // 修改歷史
}
```

### MarketEvent（市場事件）
```typescript
{
  date: Date,
  title: string,
  description: string,
  importance: 'high' | 'medium' | 'low',
  category: 'earnings' | 'economic' | 'political' | 'technical',
  expectation: string,       // 事前預期
  actualResult: string       // 實際結果
}
```

### RiskReminder（風險提醒）
```typescript
{
  title: string,
  description: string,
  level: 'critical' | 'warning' | 'info',
  acknowledged: boolean,     // 是否已確認
  action: string             // 採取的行動
}
```

## 設計原則

### 1. 快速填寫（3-5分鐘）
- 重要資訊優先
- 避免過多輸入欄位
- 提供預設選項
- 可複製前一日內容

### 2. 視覺化優先
- 用顏色區分重要性
- 圖表化顯示狀態
- 一眼看出異常情況

### 3. 紀律強化
- 每天強制檢視計畫
- 標記偏離行為
- 記錄情緒狀態
- 累積統計數據

### 4. 漸進式功能
- Phase 0: 手動輸入所有資料
- Phase 1: 完整的每日紀錄功能
- Phase 2: 市場事件管理
- Phase 3: 個股研究追蹤
- Phase 4: 回顧與學習
- Phase 5: 自動化（未來考慮）

## 下一步開發（Phase 1 完整實作）

### 待開發功能

1. **每日紀錄填寫頁面**
   - [ ] 建立獨立的填寫表單頁面
   - [ ] 表單驗證
   - [ ] 儲存功能（LocalStorage 或資料庫）
   - [ ] 複製前一日功能

2. **紀錄查看頁面**
   - [ ] 點擊日期顯示該日完整紀錄
   - [ ] 可編輯歷史紀錄
   - [ ] 比較不同日期的變化

3. **計畫編輯功能**
   - [ ] 新增/編輯/刪除計畫
   - [ ] 記錄修改原因
   - [ ] 查看修改歷史

4. **資料持久化**
   - [ ] 使用 LocalStorage 儲存資料
   - [ ] 或整合後端 API
   - [ ] 資料匯出功能（JSON/CSV）

5. **提醒功能強化**
   - [ ] 未填寫提醒
   - [ ] 重要事件前一天提醒
   - [ ] 風險確認提醒

## 技術架構

- **前端框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **狀態管理**: React useState (未來考慮 Zustand 或 Context)
- **資料儲存**: 
  - Phase 1: LocalStorage
  - Phase 2+: 考慮 Supabase 或 Firebase
- **部署**: Azure Static Web Apps

## 使用流程

### 每日操作流程（目標：3-5分鐘）

1. **早上開盤前**（1分鐘）
   - 查看今日重要事件
   - 查看風險提醒
   - 確認是否需要調整計畫

2. **盤中/盤後**（2-4分鐘）
   - 填寫今日市場概況
   - 記錄投資判斷和操作
   - 記錄情緒狀態
   - 檢視是否偏離計畫

3. **週末/月底**（選擇性）
   - 回顧本週/本月表現
   - 調整下週/下月計畫
   - 檢討錯誤模式

## 成功指標

### Phase 0-1 完成條件
- [x] 每天可以在 3-5 分鐘內完成填寫（UI 已就緒）
- [x] 即使沒有交易也有紀錄（設計已包含）
- [x] 系統每天一定會被打開一次（提醒機制設計中）
- [x] 能清楚看到當天的想法與行為（UI 已完成）
- [ ] 實際填寫功能（待開發）
- [ ] 資料儲存功能（待開發）

### 長期目標
- 養成每日填寫習慣（連續 30 天）
- 減少偏離計畫次數
- 提升決策品質
- 降低情緒化操作

## 檔案結構

```
src/
├── app/
│   ├── page.tsx                    # 主頁（已完成）
│   ├── daily-record/              # 每日紀錄頁面（待開發）
│   ├── plans/                     # 計畫管理頁面（待開發）
│   └── review/                    # 回顧頁面（待開發）
├── components/
│   ├── PlanCard.tsx               # 計畫卡片（已完成）
│   ├── EventCard.tsx              # 事件卡片（已完成）
│   ├── RiskReminderCard.tsx       # 風險提醒卡片（已完成）
│   ├── DailyRecordCalendar.tsx    # 行事曆（已完成）
│   └── DailyRecordForm.tsx        # 紀錄表單（待開發）
├── types/
│   ├── investment.ts              # 投資相關類型（已完成）
│   └── portfolio.ts               # 投資組合類型（舊版）
└── lib/
    └── investmentMockData.ts      # 模擬資料（已完成）
```

## 注意事項

1. **資料隱私**: 所有投資資料都是敏感資訊，需要妥善保護
2. **備份機制**: 定期備份資料，避免遺失
3. **跨裝置同步**: 未來考慮支援多裝置同步
4. **效能優化**: 隨著紀錄增加，需要考慮資料分頁和快取

## 貢獻指南

這是個人專案，但歡迎參考和改進。如有建議請提出 Issue。

---

**最後更新**: 2026-01-27  
**當前狀態**: Phase 0-1 UI 完成，待開發填寫和儲存功能
