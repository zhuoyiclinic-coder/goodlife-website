// 預約展示表單 → 寄 Email 給業主（Vercel Function，用 Resend 寄信）
// 需要的環境變數（在 Vercel 專案設定，不進 repo）：
//   RESEND_API_KEY   Resend 的 API key
//   DEMO_TO_EMAIL    收件人
//   DEMO_FROM_EMAIL  寄件人，要用 Resend 驗證過的網域，例如 GoodLife <demo@goodlife-clinic.tw>

const LIMITS = { name: 40, clinic: 80, contact: 80, note: 1000 };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});
  // 機器人會把隱藏欄位填掉：假裝成功，不寄信
  if (body.website) return res.status(200).json({ ok: true });

  const data = {};
  for (const [k, max] of Object.entries(LIMITS)) data[k] = String(body[k] || '').trim().slice(0, max);
  if (!data.name || !data.clinic || !data.contact || !body.consent) return res.status(400).json({ ok: false, error: 'missing' });

  const { RESEND_API_KEY, DEMO_TO_EMAIL, DEMO_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !DEMO_TO_EMAIL || !DEMO_FROM_EMAIL) return res.status(503).json({ ok: false, error: 'mail-not-configured' });

  const html = `<h2>新的預約展示</h2>
<p><b>姓名</b>：${esc(data.name)}</p>
<p><b>診所</b>：${esc(data.clinic)}</p>
<p><b>手機或 LINE</b>：${esc(data.contact)}</p>
<p><b>想了解</b>：${esc(data.note || '（沒填）').replace(/\n/g, '<br>')}</p>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: DEMO_FROM_EMAIL, to: [DEMO_TO_EMAIL], subject: `預約展示：${data.clinic}（${data.name}）`, html }),
  });
  if (!r.ok) return res.status(502).json({ ok: false, error: 'mail-failed' });
  return res.status(200).json({ ok: true });
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
