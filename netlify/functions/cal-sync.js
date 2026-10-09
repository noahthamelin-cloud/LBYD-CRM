// LBYD CRM: Cal.com sync.
// Reads bookings from Cal.com so sales calls land on the right person in the CRM.
// The API key lives in Netlify, never in the website code.
//
// Netlify > Site configuration > Environment variables:
//   CAL_API_KEY       required to turn this on. Cal.com > Settings > Developer > API keys.
//   CRM_PINS          already set for the form sync (same PINs).
//   CAL_EVENT_SLUGS   recommended. The LBYD event type slug(s), comma separated, e.g. lbyd-strategy-call
//                     With it set, only LBYD calls come through, and a booking from someone
//                     not yet in the CRM creates them. Without it, every booking on the account
//                     is read but only attached to people already in the CRM.
//   CAL_API_VERSION   optional. Defaults to 2026-05-01 (the version Cal.com's docs require for
//                     "get all bookings"). Change only if Cal.com says the version moved.

export default async (req) => {
  const pins = (process.env.CRM_PINS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!pins.length || !pins.includes(req.headers.get('x-crm-pin') || '')) return Response.json({ error: 'Not authorised' }, { status: 401 });
  const key = process.env.CAL_API_KEY;
  if (!key) return Response.json({ ok: false, notConfigured: true, error: 'CAL_API_KEY is not set in Netlify' }, { status: 200 });
  const version = process.env.CAL_API_VERSION || '2026-05-01';
  const slugs = (process.env.CAL_EVENT_SLUGS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  const headers = { Authorization: 'Bearer ' + key, 'cal-api-version': version };
  const all = [];
  let url = 'https://api.cal.com/v2/bookings', pages = 0;
  try {
    while (url && pages < 10) {
      const r = await fetch(url, { headers });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.status === 'error') {
        const msg = (j.error && (j.error.message || j.error.code)) || j.message || ('HTTP ' + r.status);
        return Response.json({ ok: false, error: msg }, { status: 502 });
      }
      const data = Array.isArray(j.data) ? j.data : (j.data && j.data.bookings) || [];
      all.push(...data);
      pages++;
      const next = (j.pagination && (j.pagination.nextCursor || j.pagination.next)) || null;
      url = next && typeof next === 'string' && !next.startsWith('http')
        ? 'https://api.cal.com/v2/bookings?cursor=' + encodeURIComponent(next)
        : (typeof next === 'string' ? next : null);
    }
  } catch (e) {
    return Response.json({ ok: false, error: String(e.message || e) }, { status: 502 });
  }

  const slugOf = b => String((b.eventType && b.eventType.slug) || b.eventTypeSlug || '').toLowerCase();
  const picked = slugs.length ? all.filter(b => slugs.includes(slugOf(b))) : all;
  const bookings = picked.map(b => ({
    uid: b.uid || String(b.id),
    title: b.title || '',
    start: b.start || b.startTime,
    end: b.end || b.endTime,
    created: b.createdAt || '',
    status: String(b.status || '').toLowerCase(),
    slug: slugOf(b),
    meetingUrl: b.meetingUrl || (typeof b.location === 'string' && /^https?:/.test(b.location) ? b.location : ''),
    attendees: (b.attendees || []).map(a => ({
      name: a.name || '', email: a.email || '',
      phone: a.phoneNumber || (b.bookingFieldsResponses && (b.bookingFieldsResponses.attendeePhoneNumber || b.bookingFieldsResponses.phone)) || ''
    }))
  })).filter(b => b.start && b.attendees.length);

  return Response.json({ ok: true, filtered: slugs.length > 0, bookings }, { headers: { 'cache-control': 'no-store' } });
};
