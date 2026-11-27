# GoodLife 好境 官網（goodlife-website）

好境醫美診所營運系統的官網 https://goodlife-clinic.tw 。Astro 靜態網站，部署在 Vercel。
系統本體在另一個 repo `clinic-system`；這裡只有官網。

## 品牌（不要自己改）

- 品牌名：**GoodLife 好境**；中文全名：**好境醫美診所營運系統**；英文：GoodLife Clinic Management System。
- 公司：**格霖永續科技有限公司**（頁尾版權、表單個資同意、結構化標記 legalName）。統編先不放。
- 定位：**醫美診所**（也寫全自費、流程像醫美的診所類型），不要改成「全方位」「所有診所」。
- 顏色：深藍 `#0B2B57`（標題）、按鈕藍 `#0F6FD6`、亮藍 `#168BFF`、湖水藍 `#19C7BE`、綠 `#76D54E`。
  全部寫成 `src/styles/global.css` 開頭的變數，頁面裡用 `var(--…)`，不要另外寫色碼。
- **只有淺色版**，不跟手機深色模式（`<meta name="color-scheme" content="only light">`）。
- Logo 在 `public/brand/`，都是 PNG；沒有向量檔、商標還沒查，不要自己重畫。

## 改內容去哪裡改

- **`src/data/site.ts` 是唯一來源**：品牌、導覽、價格、功能、角色、常見問答、客製化導入。
  頁面、`/llms.txt`、`/llms-full.txt`、`/pricing.md`、結構化標記都讀它，改一處全站跟著變。
- 功能頁、角色頁、診所類型頁：`src/data/details.ts`。
- 知識庫文章：`src/content/learn/*.md`（要附資料來源，法規寫條號）。
- 系統截圖：`src/assets/shots/`。**只能用示範診所的虛構資料**，不能放任何真實診所的畫面或病患資料。
- 分享預覽圖 `public/og.png`：改品牌字樣後要重做（`scripts/og.html` → `scripts/make-og.cjs`，要有 Playwright）。

## 文案鐵則（寫錯就是對外的錯誤承諾）

- **只寫系統現在做得到的事。** 不確定就問業主，不要自己推論。已知不能寫的：
  - 一套系統管多家分店（不支援；「集團」方案＝同一間診所有兩個以上統編，分店各自一套另外報價）。
  - 每日自動備份（還沒做過還原演練）。
  - 檢驗報告串接。
  - 沒有根據的社會認同（「最多診所選擇」「XX 家診所使用」）、捏造的客戶推薦語。
- ⚠️ **待確認**：官網寫「串接藍新、綠界電子發票」，但系統文件寫「沒有串接電子發票平台，只記錄單據號碼」。
  業主確認前，不要再新增任何電子發票串接的說法。
- 價格（未稅）：基本 4,500／營運 9,800／集團 16,800 起（每月）；導入費 19,800／39,800／59,800 起；
  年繳 9 折；月繳不綁約；創始診所前 5 家試點 60 天導入費減半。導入費含依流程調整介面與功能，
  需求表以外的全新功能另外報價（通常一個工作天）。改價格要業主拍板。
- 琢藝美學診所可以具名，**只出現在客戶故事**相關段落；故事裡的數字是業主同意公開的，不要自己加新數字。
- 服務條款、服務與支援頁（客服時間、退費、責任上限、資料交還）是草稿，業主還沒逐條確認，改之前先問。
- 醫療廣告：不寫療效、不保證效果；寫的是系統，不是療程。

## 版面

- 內容最寬 1280px（`--wrap`）；知識文章 960px。手機寬 390px 不能左右滑動。
- 電腦版截圖一律整排顯示（縮成半寬字會太小）；手機截圖可以兩張並排。
- 每頁一個 H1；圖片都要有中文 alt。

## 指令

```
npm install
npx astro dev       # 本機開發 http://localhost:4321
npx astro build     # 一定要過，才能推
npx astro preview   # 預覽建好的 dist/
```

## 上線

- 目前用 Vercel CLI 部署：在專案根目錄 `vercel deploy --prod --yes`。
  改了 `api/` 底下的函式要加 `--force`，不然會沿用舊函式。
- ⛔ **只能部署到 Vercel 專案 `goodlife-website`**。同一個 Vercel 團隊裡有琢藝的正式系統（專案名 `demo`、`zhuoyi-*`），
  絕對不可以 link 或部署到它們。`.vercel/project.json` 指的必須是 goodlife-website。
- 預約表單 `api/demo.js` 用 Resend 寄信；`RESEND_API_KEY`、`DEMO_TO_EMAIL`、`DEMO_FROM_EMAIL` 在 Vercel 環境變數，
  **不要寫進程式或 repo**，也不要把值印出來。
- 網域 DNS 在 GoDaddy（A @ → 76.76.21.21，www 轉主網址）。不要動 DNS 的信箱記錄（MX、TXT、`send`、`resend._domainkey`）。

## 工作方式（業主要求）

- 回覆、文案、commit 訊息都用**繁體中文**。
- **每批動工前先逐條列「現況 → 改法」給業主確認**，確認後再改。
- 改完要檢查：`npx astro build` 通過；手機（390px）和電腦（1440px）都看過，沒有錯誤、不會左右滑動。
- 畫面有變就**截圖給業主看**（存在 `docs/screenshots/`，檔名用流水號＋中文說明）。
- 兩個人共用這個 repo：動工前先 `git pull`；只加自己改的檔（不要 `git add -A`）；一件事一個 commit；不要 force push。
- 不要提交任何密碼、金鑰、`.env*`、`.vercel/`。
