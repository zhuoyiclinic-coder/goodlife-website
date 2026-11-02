// /llms.txt：給 AI 讀的站台摘要（格式見 llmstxt.org），內容從 site.ts 產生，和網頁保持一致
import type { APIRoute } from 'astro';
import { brand, features, faqs } from '../data/site';

export const GET: APIRoute = () => {
  const u = (p: string) => brand.url + p;
  const body = `# ${brand.name}（${brand.nameEn}）

> ${brand.description}

- 中文名稱：${brand.nameZh}
- 適合：台灣自費醫美診所、皮膚科自費門診、有兩個統編或多家分店的診所
- 計價：按診所每月計費，不依員工人數計價，員工帳號不限人數
- 使用方式：網頁應用程式，手機與電腦瀏覽器皆可，不需安裝 App
- 實際使用：琢藝美學診所每天營運使用
- 更新日期：${brand.updated}

## 主要頁面

- [首頁](${u('/')})：產品一句話定義、結帳後六件事同時更新的流程
- [醫美診所管理系統](${u('/aesthetic-clinic')})：醫美系統和健保 HIS 的差別、選購五個問題
- [功能總覽](${u('/features')})：八大模組
- [價格](${u('/pricing')})：方案與計價方式（純文字版：${u('/pricing.md')}）
- [資安與個資](${u('/security')})：獨立資料庫、權限、稽核紀錄、備份
- [客戶故事：琢藝美學診所](${u('/stories/zhuoyi')})
- [常見問答](${u('/faq')})
- [預約展示](${u('/demo')})

## 功能模組

${features.map((f) => `- ${f.title}：${f.body}`).join('\n')}

## 常見問答

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Optional

- [完整內容](${u('/llms-full.txt')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
