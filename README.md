# LBYD CRM

Client pipeline for Live Before You Die: leads, events, applications, sales calls,
payments, member tiers and client success. **Read `MANUAL.md` first.**

## Status

v2 test build. JotForm submissions and Cal.com bookings are live through a Netlify function. Everything
else saves per browser until the Supabase move.

## Deploy

Push to GitHub, connect in Netlify. Then set environment variables (MANUAL section 4b):
`JOTFORM_API_KEY`, `CRM_PINS`, `FORM_ALLOWLIST`, optional `JOTFORM_API_BASE`; for Cal.com
(section 4c) `CAL_API_KEY`, `CAL_EVENT_SLUGS`, optional `CAL_API_VERSION`. Redeploy.

## Stack

Vanilla JS in one HTML file, two Netlify Functions (no dependencies, Node 18+ fetch).

## Where to change things

| What | Where |
|---|---|
| Forms, Cal.com, logins, stages, prices, tiers, messages | Settings block, top of the script in `public/index.html` |
| Storage (swap for Supabase) | `Store` block |
| Form field matching | `mergeSubmission()` |
| Next-move rules | `nextMove()` |
| JotForm reading | `netlify/functions/jotform-sync.js` |
| Cal.com reading | `netlify/functions/cal-sync.js`, matching in `syncCal()` |
