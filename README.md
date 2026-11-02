# GoodLife 顧德萊 官網

GoodLife Clinic Management System（顧德萊診所營運管理系統）的官網，網域 goodlife-clinic.tw。Astro 產生靜態網頁，部署在 Vercel。

## 常用指令

```
npm install
npx astro dev      # 本機開發 http://localhost:4321
npx astro build    # 產生 dist/
npx astro preview  # 預覽 dist/
```

## 改內容

- 品牌、導覽、功能、角色、價格、常見問答：`src/data/site.ts`（頁面、llms.txt、pricing.md、結構化標記都讀這裡）
- 價格金額：`pricing.plans[].price` 填數字，再把 `pricing.published` 改成 `true`
- 系統截圖：`src/assets/shots/`，全部取自示範診所的虛構資料，不放任何真實診所畫面

## 給 AI 與搜尋引擎

- `public/robots.txt`：所有 AI 爬蟲（含訓練用）全部放行
- `/llms.txt`、`/llms-full.txt`、`/pricing.md`：建置時由 `src/data/site.ts` 產生
- `/sitemap-index.xml`：@astrojs/sitemap 自動產生

## 預約展示表單

`api/demo.js` 是 Vercel Function，用 Resend 寄信。要在 Vercel 專案設定三個環境變數（不進 repo）：
`RESEND_API_KEY`、`DEMO_TO_EMAIL`、`DEMO_FROM_EMAIL`。沒設定時表單會顯示「送出失敗」。
