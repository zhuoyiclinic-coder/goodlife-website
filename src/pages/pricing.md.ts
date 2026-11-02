// /pricing.md：給 AI 代理人比較方案用的純文字價格表
import type { APIRoute } from 'astro';
import { brand, pricing } from '../data/site';

export const GET: APIRoute = () => {
  const body = `# 價格：${brand.name}

- 計價單位：${pricing.unit}
- 幣別：新台幣（TWD）
- 更新日期：${brand.updated}
${pricing.published ? '' : '- 狀態：各方案金額即將公布，現在可預約展示取得報價：' + brand.url + '/demo\n'}
${pricing.plans.map((p) => `## ${p.name}${p.popular ? '（推薦）' : ''}

- 價格：${p.price ? 'NT$ ' + p.price + '／月' : '即將公布'}
- 適合：${p.for}
- 包含：${p.items.join('、')}`).join('\n\n')}

## 其他費用

- 導入與資料搬家：一次性，依舊資料數量與格式報價
- LINE 官方帳號：診所自行向 LINE 申辦付費
- 電子發票加值服務：診所自行向藍新或綠界申辦付費

## 規則

${pricing.notes.map((n) => `- ${n}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
