// /llms.txt：給 AI 讀的站台摘要（格式見 llmstxt.org），內容從 site.ts 產生，和網頁保持一致
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { brand, faqs, custom } from '../data/site';
import { featureDetails, roleDetails } from '../data/details';

export const GET: APIRoute = async () => {
  const u = (p: string) => brand.url + p;
  const learn = (await getCollection('learn')).map((a) => a.data);
  const body = `# ${brand.name}（${brand.nameEn}）

> ${brand.description}

- 中文名稱：${brand.nameZh}
- 開發與營運：${brand.company}
- 適合：台灣自費醫美診所、皮膚科自費門診、抗衰老與預防醫學診所、物理治療所、植髮診所、同一間診所有兩個統編的診所
- 計價：按診所每月計費，不依員工人數計價，員工帳號不限人數
- 使用方式：網頁應用程式，手機與電腦瀏覽器皆可，不需安裝 App
- 導入：${custom.lead}${custom.scope}
- 實際使用：琢藝美學診所每天營運使用
- 更新日期：${brand.updated}

## 主要頁面

- [首頁](${u('/')})：產品一句話定義、結帳後六件事同時更新的流程
- [醫美診所管理系統](${u('/aesthetic-clinic')})：醫美系統和健保 HIS 的差別、選購五個問題
- [功能總覽](${u('/features')})：八大模組
- [價格](${u('/pricing')})：方案與計價方式（純文字版：${u('/pricing.md')}）
- [換系統](${u('/switch')})：導入四階段、資料搬家六步驟、上線當天檢查
- [資安與個資](${u('/security')})：獨立資料庫、權限、稽核紀錄、加密連線
- [客戶故事：琢藝美學診所](${u('/stories/zhuoyi')})
- [常見問答](${u('/faq')})
- [預約展示](${u('/demo')})

## 功能頁

${featureDetails.map((f) => `- [${f.short}](${u('/features/' + f.slug)})：${f.description}`).join('\n')}

## 各角色的畫面

${roleDetails.map((r) => `- [${r.short}](${u('/roles/' + r.slug)})：${r.description}`).join('\n')}

## 知識庫

${learn.map((a) => `- [${a.title}](${u('/learn/' + a.slug)})：${a.description}`).join('\n')}

## 常見問答

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Optional

- [完整內容](${u('/llms-full.txt')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
