# Azure Static Web Apps 部署指南

本文件說明如何將投資儀表板部署到 Azure Static Web Apps。

## 前置需求

1. Azure 帳戶
2. GitHub 帳戶
3. 已推送專案到 GitHub

## 部署步驟

### 方法 1: 透過 Azure Portal（推薦）

#### 步驟 1: 在 Azure Portal 建立 Static Web App

1. 登入 [Azure Portal](https://portal.azure.com)
2. 點擊「建立資源」
3. 搜尋「Static Web App」並選擇
4. 點擊「建立」

#### 步驟 2: 設定基本資訊

- **訂用帳戶**: 選擇你的 Azure 訂閱
- **資源群組**: 建立新的或選擇現有的
- **名稱**: `invest-dashboard` (或你喜歡的名稱)
- **計畫類型**: 選擇「免費」
- **區域**: 選擇最近的區域（例如：East Asia）

#### 步驟 3: 連接 GitHub

1. 點擊「使用 GitHub 登入」
2. 授權 Azure Static Web Apps 存取你的 GitHub
3. 選擇組織、儲存庫和分支：
   - **組織**: 你的 GitHub 使用者名稱
   - **儲存庫**: invest-dashboard
   - **分支**: main

#### 步驟 4: 建置詳細資料

設定建置配置：

- **建置預設值**: Custom
- **App location**: `/`
- **Api location**: 留空
- **Output location**: `out`

#### 步驟 5: 檢閱並建立

1. 點擊「檢閱 + 建立」
2. 確認設定無誤後，點擊「建立」
3. 等待部署完成（約 2-3 分鐘）

#### 步驟 6: 查看部署結果

1. 部署完成後，前往資源
2. 在「概觀」頁面找到 URL
3. 點擊 URL 查看你的投資儀表板

### 方法 2: 使用 Azure CLI

```bash
# 登入 Azure
az login

# 建立資源群組
az group create \
  --name invest-dashboard-rg \
  --location eastasia

# 建立 Static Web App
az staticwebapp create \
  --name invest-dashboard \
  --resource-group invest-dashboard-rg \
  --source https://github.com/<YOUR-USERNAME>/invest-dashboard \
  --location eastasia \
  --branch main \
  --app-location "/" \
  --output-location "out" \
  --login-with-github
```

### 方法 3: 使用 GitHub Actions（自動化）

專案已包含 GitHub Actions workflow 檔案 (`.github/workflows/azure-static-web-apps.yml`)。

#### 設定步驟：

1. 在 Azure Portal 中取得部署 Token：
   - 前往你的 Static Web App 資源
   - 點擊「管理部署 Token」
   - 複製 Token

2. 在 GitHub 儲存庫設定 Secret：
   - 前往 GitHub 儲存庫
   - Settings → Secrets and variables → Actions
   - 點擊「New repository secret」
   - 名稱：`AZURE_STATIC_WEB_APPS_API_TOKEN`
   - 值：貼上剛才複製的 Token
   - 點擊「Add secret」

3. 推送程式碼到 main 分支：
   ```bash
   git add .
   git commit -m "Add deployment workflow"
   git push origin main
   ```

4. GitHub Actions 會自動觸發部署

## 驗證部署

### 檢查建置狀態

在 Azure Portal 中：
1. 前往 Static Web App 資源
2. 點擊左側選單的「GitHub Actions 執行」
3. 查看最新的部署狀態

在 GitHub 中：
1. 前往儲存庫
2. 點擊「Actions」頁籤
3. 查看 workflow 執行狀態

### 測試應用程式

訪問你的 Static Web App URL，應該能看到：
- ✅ 投資儀表板首頁
- ✅ 投資組合總覽卡片
- ✅ 資產配置圖表
- ✅ 資產明細列表

## 自訂網域（選用）

1. 在 Azure Portal 的 Static Web App 中
2. 點擊「自訂網域」
3. 點擊「+ 新增」
4. 輸入你的網域名稱
5. 按照指示設定 DNS 記錄
6. 等待驗證完成

## 環境變數（如需要）

如果需要設定環境變數：

1. 在 Azure Portal 的 Static Web App 中
2. 點擊「環境變數」
3. 選擇環境（Production/Staging）
4. 新增變數

注意：因為這是靜態導出，環境變數只在建置時有效。

## 監控和診斷

### Application Insights

1. 在 Azure Portal 的 Static Web App 中
2. 點擊「Application Insights」
3. 啟用監控以追蹤：
   - 頁面瀏覽量
   - 使用者數量
   - 效能指標

### 日誌

查看建置和部署日誌：
1. Azure Portal → Static Web App
2. 點擊「GitHub Actions 執行」
3. 選擇特定的執行查看詳細日誌

## 疑難排解

### 建置失敗

如果建置失敗：
1. 檢查 GitHub Actions 日誌
2. 確認 `next.config.ts` 中已設定 `output: 'export'`
3. 確認 `package.json` 中的依賴正確

### 404 錯誤

如果遇到 404 錯誤：
1. 檢查 `staticwebapp.config.json` 設定
2. 確認 output location 設定為 `out`
3. 確認路由設定正確

### 樣式沒有載入

如果樣式沒有正確顯示：
1. 檢查 Tailwind CSS 配置
2. 確認建置過程沒有錯誤
3. 清除瀏覽器快取

## 更新部署

每次推送到 main 分支時，GitHub Actions 會自動重新部署：

```bash
git add .
git commit -m "Update dashboard"
git push origin main
```

## 成本

Azure Static Web Apps 免費層包含：
- ✅ 100 GB 頻寬/月
- ✅ 無限制的 SSL 憑證
- ✅ 全球 CDN
- ✅ 自訂網域

對於個人專案來說，免費層通常已經足夠。

## 相關資源

- [Azure Static Web Apps 文檔](https://docs.microsoft.com/azure/static-web-apps/)
- [Next.js 靜態導出文檔](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions 文檔](https://docs.github.com/actions)

## 需要幫助？

如果遇到問題：
1. 查看 [Azure Static Web Apps 疑難排解](https://docs.microsoft.com/azure/static-web-apps/troubleshooting)
2. 檢查 GitHub Issues
3. 聯繫 Azure 支援
