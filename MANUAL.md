# LBYD CRM: Instructions Manual (v3, test build)

Written for someone with no background at all. If you were just handed this system and
nobody explained it, start here and read straight through.

---

## 1. What this is

A private website the Live Before You Die team uses to run everyone who comes near the
program: how we met them, which events they were invited to and came to, the forms they
filled in, when they joined, what they pay each month, and how they're progressing
through the course.

**The offer it's built around (October 2026):**

| Tier | Price | Includes |
|---|---|---|
| Base | $500 / month | Group access, weekly group calls, the 12-week course |
| Premium | set per client for now | Everything in Base, plus one-on-ones |

There is one 12-week course today. More courses can be added later (section 14).

**The lead flow:** meet people (Instagram and social, in person, WhatsApp, personal
connections), invite them to the **Friday Night Hangout** (the main push: high energy,
music, dancing, karaoke), invite good fits to **in-person events**, and run the
**online workshop** every two weeks. People who show up and get involved move toward
joining.

---

## 2. Test build: what is live and what is not

A yellow bar at the top of every screen explains this.

- **Live and shared:** JotForm submissions and Cal.com bookings.
- **Saved in this browser only:** everything else (stages, notes, events, memberships,
  payments, to-dos). Each person's copy is separate until the database move (Supabase).
- **Test data:** Test 1 to Test 16 and a few test events, all marked "Test". Untick
  **Show test data** in the yellow bar to see only real people. Settings has a reset.

---

## 3. Who uses it

| Person | Role | PIN | Opens on | Built for |
|---|---|---|---|---|
| Noah | Sales | 333 | Today | Doing: next moves, invites, follow-ups |
| Ryan | Client Success | 444 | Today | Doing: onboarding, check-ins, member care |
| Brett | CEO | 222 | Pulse | Seeing: what happened, what's coming, what to know |

PINs keep casual visitors out. They are not strong security, because they sit inside the
page code. Real logins come with the database move.

---

## 4. Setup (one time)

### 4a. Put it online

1. GitHub: open the `lbyd-crm` repo (or create a private one with that name).
2. Upload everything in this folder: `public`, `netlify`, `netlify.toml`, `package.json`,
   `README.md`, `MANUAL.md`, `.gitignore`. Replace the old files. Commit.
3. Netlify: if the site is already connected to the repo, it redeploys by itself.
   If not: Add new site, Import an existing project, GitHub, pick `lbyd-crm`, Deploy.
   Leave the build settings alone; `netlify.toml` handles them.

### 4b. Connect the forms (needed for sign-ups to appear)

1. **Get a JotForm API key.** JotForm, profile picture, Settings, API, Create New Key.
   Set it to **Read Access**. Copy it.
2. **Add four settings in Netlify.** Site configuration, Environment variables,
   Add a variable, one at a time:

| Key | Value |
|---|---|
| `JOTFORM_API_KEY` | the key from step 1 |
| `CRM_PINS` | `333,222,444` |
| `FORM_ALLOWLIST` | `262708463844061,262762618270056,262763667814065` |

   `FORM_ALLOWLIST` makes sure the CRM can only ever read LBYD forms, never other
   clients' forms on the same JotForm account. **Every time you add an event with a new
   JotForm, add its form ID here too** (the number at the end of the form link).

   Only if your JotForm account is on the EU server, also add
   `JOTFORM_API_BASE` = `https://eu-api.jotform.com`.
3. **Redeploy.** Deploys, Trigger deploy, Deploy site. Settings only take effect after
   a deploy.
4. **Check it.** Log in. The pill at the top right should say "Forms synced just now".
   The Oct 7 Free Live Session should show its real sign-ups as RSVPs.

If the pill says "Sync failed", tap it to see why. Section 13 lists the fixes.

### 4c. Connect Cal.com (sales calls)

1. **Get a Cal.com API key.** Cal.com, Settings, Developer, API keys, create one.
2. **Find the slug of the LBYD call event type.** It's the last part of the booking
   link: in `cal.com/noah/lbyd-strategy-call` the slug is `lbyd-strategy-call`.
3. **Add two settings in Netlify** (Environment variables):

| Key | Value |
|---|---|
| `CAL_API_KEY` | the key from step 1 |
| `CAL_EVENT_SLUGS` | the slug from step 2 (several allowed, comma separated) |

   `CAL_EVENT_SLUGS` keeps your other Cal.com meetings (IPB, XPLR clients) out of the
   LBYD CRM. With it set, a booking from someone not yet in the CRM creates them.
4. **Redeploy.**
5. Put the same booking link in `CAL_LINK` near the top of `public/index.html`, so the
   "Book the call" WhatsApp message includes it.

What happens after that: each sync (on login, or the Sync button) reads the bookings.
A booking attaches to the person by email, then phone, moves them to Sales call, and fills
in the time and Google Meet link. A reschedule updates the time. A cancellation marks the
call Cancelled and puts "Rebook" in Next moves. Bookings show up on the next sync, not
the instant they're made. Instant updates come with the database move.

---

## 5. Stages

```
Lead → Invited → Showed up → Engaged → Applied → Call → Member (Base) → Member (Premium)
```

**Not a fit** is a separate outcome.

| Stage | Means |
|---|---|
| Lead | We know who they are. Nothing sent. |
| Invited | Invited to at least one event. |
| Showed up | Came to an event. |
| Engaged | Came and took part (talked, joined in, stayed involved). |
| Applied | Sent in the application. |
| Call | Call booked or held. |
| Member (Base) / (Premium) | Paying monthly. Set from the Membership tab, never by hand. |

People move forward automatically: inviting makes them Invited, "Showed" makes them
Showed up, "Participated" makes them Engaged, an application makes them Applied, a
Cal.com booking makes them Call, starting a membership makes them a Member. Nothing ever
moves anyone backward.

**Client stages (Ryan's side):** Onboarding sent, Workbook done, Onboarding call,
Active, At risk, Completed.

**Call outcomes:** Booked, Showed (deciding), No-show, Joined, Not yet, Cancelled.

---

## 6. Lead sources and "How we met"

Every person has a **lead source**: Instagram / social, In person, WhatsApp, or
Personal connection. And a **How we met / the conversation** note: where you met, what
you talked about, what they care about. For example: "Met at the café in Pererenan.
He's a coach, we talked about surfing and building online."

That note shows at the top of their record, on their pipeline card, and under their
name in Next moves, so it's in front of you before every message. Search on the
Contacts page covers it too, so "surf" finds everyone you talked surfing with.

The **+ Add prospect** button (top of every screen) asks for it straight away.

**Location** is plain text. Type it however you like.

---

## 7. Events

Three types: **Friday Night Hangout**, **In-person event** (invite only), **Online
workshop**.

**+ New event:** type, name, date and time, location, WhatsApp group link, and an
optional JotForm sign-up link. **Repeat** creates a run of events in one go (every week
or every two weeks, 4, 6 or 8 of them). Each one gets its own page, so update the
WhatsApp group link on each as you create the groups.

**Each person's attendance is tracked in four steps:**

| Step | Means | Stage it sets |
|---|---|---|
| Invited | We invited them | Invited |
| RSVP | They said yes, or signed up on the form | |
| Showed | They came | Showed up |
| Participated | They got involved | Engaged |

Plus **Missed** for anyone who said yes and didn't come.

**Inviting someone:** from the event page ("Invite someone"), from the person's Events
tab, or straight from Next moves. **Invite on WhatsApp** opens the right invite message
for that event type with the date filled in. **Mark invited** just records it, for when
you invited them in person.

**On the event page:** everyone invited with their four steps, plus Nudge (no RSVP
yet), Remind (said yes) and Follow up (came) buttons. On the right: all the details and
the **debrief** (what worked, what didn't, notes, recording link).

**Numbers per event:** invited, RSVP'd, showed up, participated, joined, and new monthly
revenue from people who joined after it. Money, By event compares every event side by
side, so you can see which events actually bring in members.

---

## 8. Form standing

Every record shows where each form stands: **Not sent**, **Sent**, or **In**.

- **Event:** Sent once they're invited, In once they RSVP or sign up.
- **Application:** Sent when you send it from the CRM, In when it's submitted.
- **Onboarding:** same, for the workbook.

Links sent from the CRM carry the person's CRM ID, so what they submit lands on their
record.

---

## 9. Noah's Today

**Numbers:** RSVPs for the next event, new leads this week, invites this week, showed up
this week, new members this month, monthly recurring revenue.

**Next moves**, in order of urgency, each with how-we-met, stage, and a one-tap
WhatsApp button with the message written:

1. New from a form, not contacted: say hi.
2. Call within a day: reminder.
3. Missed or cancelled a call: rebook.
4. Applied: book the call, or Review if they're not ready to invest.
5. Had the call, not joined: follow up.
6. RSVP'd to an event within a day and a half: reminder.
7. Came to an event in the last 5 days: follow up while it's fresh.
8. Engaged but no application: send it.
9. Invited 2+ days ago with no RSVP: nudge.
10. Follow-up date reached.
11. Not invited to anything coming up: invite to the next hangout.

**Done** marks someone handled for now. On the right: the next two events, calls
coming up, and the shared to-do list.

---

## 10. Ryan's Today and the client profile

**Numbers:** active members, who needs a check-in, workbooks out, at risk.
**Lists:** send onboarding, check in (no contact for 7+ days, with their course week),
workbooks to chase, onboarding calls to book, at risk, and no payment logged this month
(from the 5th of the month).

**Clients** shows a card per member: tier, week of the course with a progress bar,
current goal, client stage, last contact. Tap for the **client profile**: tier and
price, week X of 12, start date, whether this month is paid, how we met, how they like
to be held accountable, their journey line, goals ("Working on"), their vision from the
workbook, life ratings, a check-in composer, and the full timeline.

The rest of client success waits on Ryan's SOPs.

---

## 11. Brett's Pulse

Brett's portal is for seeing, not doing. No to-do lists, no next moves.

- **This week in numbers:** active members, monthly recurring, new members this week,
  new leads, invites sent, show-ups.
- **Recent client connections:** every check-in, win, struggle and note on members from
  the last three weeks, newest first, with who logged it.
- **This week across the business:** joins, upgrades, cancellations, sign-ups,
  applications, show-ups, calls booked, goals completed.
- **Coming up:** events in the next week with RSVP counts, sales calls, onboarding calls
  to book.
- **Worth knowing:** members gone quiet (10+ days) or at risk, recent wins, and where
  every member is in the 12 weeks.

Tap anything to open it. Brett can still add notes on a client profile.

---

## 12. Memberships and money

**Starting a membership:** open the person, **Membership** tab, pick Base or Premium,
check the monthly price (Premium needs a price typed in), the start date and the
course, then **Start membership**. That makes them a Member, starts their 12 weeks, and
adds them to the count. Then log the first payment and send onboarding.

**Each month:** **Log payment** on the same tab (it pre-fills their monthly price).
Anyone without a payment logged this month shows on Ryan's list from the 5th and on the
Money page. Connecting Stripe through Skool to do this automatically is a later step.

**Upgrade to Premium** (enter the Premium price), **Cancel membership** (history stays),
and **Restart membership** are on the same tab.

**Money page:** the six member goals (10, 50, 100, 250, 500, 1,000), monthly recurring
revenue, cash this month and all time, new members, upgrades and cancellations this
month, Base vs Premium split, the funnel, who hasn't paid this month, and results by
event.

---

## 13. If something goes wrong

| What you see | Fix |
|---|---|
| "Sync starts on Netlify" | You opened the file on your computer. Use the Netlify link. |
| "JOTFORM_API_KEY is not set" or "CRM_PINS is not set" | Add it in Netlify (section 4b), then redeploy. |
| "Not authorised" | `CRM_PINS` in Netlify doesn't match the PINs. Fix and redeploy. |
| An event shows no sign-ups from its form | The event's JotForm link is missing, or its form ID isn't in `FORM_ALLOWLIST`. |
| Calls not coming in from Cal.com | Check `CAL_API_KEY` and `CAL_EVENT_SLUGS` and redeploy. Tap the sync pill for the message. If it mentions the API version, set `CAL_API_VERSION` to what Cal.com's docs show. |
| WhatsApp opens a contact picker | Their number is missing or has no country code. Fix it in Details. |
| A real person appears twice | Their email, phone and IG differ between sources. Archive one, add notes to the other. The database move adds a proper merge. |

---

## 14. Changing things

All in `public/index.html`, near the top of the script:

| To change | Edit |
|---|---|
| Tiers, prices, what's included | `TIERS_PLAN` (set Premium's price once it's fixed) |
| Courses (add a new 12-week course) | `COURSES`, `COURSE_WEEKS` |
| Application and workbook form links | `FORMS` |
| Cal.com link for "Book the call" | `CAL_LINK` |
| Logins, PINs, tabs per person | `ROLES` (also update `CRM_PINS` in Netlify) |
| Stages, call outcomes, lead sources | `SALES_STAGES`, `CS_STAGES`, `CALL_OUTCOMES`, `SOURCES` |
| Event types | `EVENT_TYPES` |
| Member goals | `TIERS` |
| Check-in and quiet timing | `CHECKIN_DAYS`, `QUIET_DAYS` |
| Every WhatsApp message | `MSG` (client-facing: no em dashes) |

---

## 15. Not built yet

1. **Database (Supabase) and real logins.** Everything shared, daily backups.
2. **Instant updates.** JotForm and Cal.com webhooks instead of syncing on login.
3. **Client success SOPs** built into Ryan's portal.
4. **Local time for any contact,** looked up from their location (saved for a future
   release).
5. **Stripe through Skool,** so monthly payments log themselves.
6. **Weekly export to Google Drive.**
7. **Claude connector:** send a screenshot and a note, the CRM updates.
8. **LBYD branding** (black, gold and white) once the logo is final.

---

## 16. Files

| File | What it is |
|---|---|
| `public/index.html` | The whole app |
| `netlify/functions/jotform-sync.js` | Reads JotForm submissions (API key lives in Netlify) |
| `netlify/functions/cal-sync.js` | Reads Cal.com bookings (API key lives in Netlify) |
| `netlify.toml` | Tells Netlify where the site and functions live |
| `package.json` | Project info for Netlify |
| `README.md` | Short technical summary |
| `MANUAL.md` | This guide |
