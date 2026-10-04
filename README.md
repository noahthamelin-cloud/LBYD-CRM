# LBYD CRM

Client pipeline for Live Before You Die: leads, applications, sales calls, payments,
member tiers and client success, in one place.

**Read `MANUAL.md` first.** It is the plain-language guide.

## Status

Demo build. Data saves in each person's browser only, and a banner says so on every
screen. Use it to show the team and collect changes. The live build swaps the storage
block for Supabase and connects the three JotForms and Cal.com.

## Quick start

Open `public/index.html` in a browser. PINs: Noah 333, Brett 222, Ryan 444.

## Deploy

Push to GitHub, import the repo in Netlify, deploy. `netlify.toml` handles the settings.
No build step.

## Stack

Vanilla JS in one HTML file. No framework, no dependencies. Font: Bricolage Grotesque
from Google Fonts, with system fallbacks.

## Where to change things

| What | Where in `public/index.html` |
|---|---|
| Form links | `FORMS` |
| Logins, PINs, which tabs each person sees | `ROLES` |
| Sales and client stages | `SALES_STAGES`, `CS_STAGES` |
| Program prices | `PLANS` |
| Member tiers and their names | `TIERS` |
| WhatsApp messages sent to clients | `MSG` |
| Note tags (objection, question...) | `TAGS` |
| Demo contacts | `seed()` |
| Where data is saved | `Store` (the only block that changes for Supabase) |
