// LBYD CRM: form sync.
// Reads submissions for the LBYD forms straight from JotForm and hands them to the CRM.
// The JotForm API key lives in Netlify (environment variable), never in the website code.
//
// Netlify > Site configuration > Environment variables:
//   JOTFORM_API_KEY   required. JotForm > Settings > API > Create new key (Read Access).
//   CRM_PINS          required. The portal PINs, comma separated, e.g. 333,222,444
//   FORM_ALLOWLIST    optional. Comma-separated form IDs this function may read.
//                     Set it so the CRM can never read your other clients' forms.
//   JOTFORM_API_BASE  optional. Only for EU accounts: https://eu-api.jotform.com

const SKIP = ['control_head','control_button','control_pagebreak','control_text','control_divider','control_image','control_collapse'];

export default async (req) => {
  const url = new URL(req.url);
  const pins = (process.env.CRM_PINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const pin = req.headers.get('x-crm-pin') || '';
  if (!pins.length) return Response.json({ error: 'CRM_PINS is not set in Netlify' }, { status: 500 });
  if (!pins.includes(pin)) return Response.json({ error: 'Not authorised' }, { status: 401 });

  const key = process.env.JOTFORM_API_KEY;
  if (!key) return Response.json({ error: 'JOTFORM_API_KEY is not set in Netlify' }, { status: 500 });
  const base = process.env.JOTFORM_API_BASE || 'https://api.jotform.com';
  const allow = (process.env.FORM_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);

  let ids = (url.searchParams.get('forms') || '').split(',').map(s => s.trim()).filter(s => /^\d{6,}$/.test(s));
  if (allow.length) ids = ids.filter(id => allow.includes(id));
  ids = [...new Set(ids)].slice(0, 25);

  const submissions = [], errors = [];
  for (const id of ids) {
    try {
      const r = await fetch(`${base}/form/${id}/submissions?limit=1000&orderby=created_at`, { headers: { APIKEY: key } });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || (j.responseCode && j.responseCode !== 200)) { errors.push({ form: id, error: j.message || ('HTTP ' + r.status) }); continue; }
      for (const s of j.content || []) {
        if (s.status && s.status !== 'ACTIVE') continue;
        const answers = Object.values(s.answers || {})
          .filter(a => !SKIP.includes(a.type))
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map(a => {
            let v = a.prettyFormat ?? a.answer ?? '';
            if (v && typeof v === 'object') v = Object.values(v).filter(Boolean).join(', ');
            return { q: a.text || a.name || '', n: a.name || '', t: a.type || '', a: String(v ?? '').replace(/<br\s*\/?>/gi, ', ').trim() };
          });
        submissions.push({ id: s.id, form_id: String(s.form_id || id), created_at: s.created_at, answers });
      }
    } catch (e) { errors.push({ form: id, error: String(e.message || e) }); }
  }
  return Response.json({ ok: true, submissions, errors }, { headers: { 'cache-control': 'no-store' } });
};
