// /llms-full.txt：完整文字內容，給需要細節的 AI 一次讀完
import type { APIRoute } from 'astro';
import { brand, features, moneyFlow, roles, pricing, faqs, custom } from '../data/site';

export const GET: APIRoute = () => {
  const body = `# ${brand.name}（${brand.nameEn}／${brand.nameZh}）

${brand.description}

網址：${brand.url}
更新日期：${brand.updated}

## 一句話

${brand.tagline}。

## 結帳一次，六件事同時更新

${moneyFlow.map((m, i) => `${i + 1}. ${m.title}：${m.body}`).join('\n')}

## 八大模組

${features.map((f) => `- ${f.title}：${f.body}`).join('\n')}

## 各角色看到什麼

${roles.map((r) => `- ${r.title}：${r.body}`).join('\n')}

## ${custom.title}

${custom.lead}

${custom.steps.map((s, i) => `${i + 1}. ${s.t}：${s.d}`).join('\n')}

${custom.scope}

## 計價方式

- ${pricing.unit}
${pricing.notes.map((n) => `- ${n}`).join('\n')}
- ${pricing.pilot}
${pricing.plans.map((p) => `- ${p.name}方案（${p.for}）：${pricing.published && p.price ? '月費 NT$ ' + p.price.toLocaleString('en-US') + (p.from ? ' 起' : '') + '（未稅），導入費 NT$ ' + (p.setup || 0).toLocaleString('en-US') + (p.from ? ' 起' : '') : '金額即將公布'}；包含 ${p.items.join('、')}`).join('\n')}

## 資安與個資

- 每家診所使用獨立的資料庫與網址
- 連線全程 HTTPS 加密，資料庫儲存加密
- 角色權限可逐項設定，資料庫層級檢查存取權
- 退費、改價、改金額、作廢等重要操作留下稽核紀錄

## 客戶故事

GoodLife 好境是在琢藝美學診所每天的營運中做出來的系統，櫃台、諮詢師、醫師、護理師、美容師、會計、店長與老闆每天使用，並以兩個統編分開記帳。

## 常見問答

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
