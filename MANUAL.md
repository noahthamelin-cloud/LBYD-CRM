# LBYD CRM: Instructions Manual

Written for someone with no background at all. If you have just been handed this
system and nobody explained it, start here and read straight through.

---

## 1. What this is

The LBYD CRM is a private website the Live Before You Die team uses to keep track of
everyone who comes near the program, from the first Instagram DM to a paying member
finishing the program. It replaces spreadsheets, screenshots and memory.

It does six jobs:

1. Keeps one record per person, whichever form or conversation they came through.
2. Tells each person on the team what needs doing today.
3. Sends the event invite, the application and the onboarding workbook on WhatsApp
   in one tap, with a personal link.
4. Shows every form answer a person has given, so the sales call and the onboarding
   call start with context.
5. Tracks deals and payments, and shows cash collected against the member goals.
6. Collects every objection, question and struggle into one feed for content ideas.

---

## 2. Demo build vs live build

**This is the demo build.** A yellow banner says so at the top of every screen.

- Data is saved in the browser of whoever is using it. Brett's copy and Noah's copy
  are separate. Clearing the browser clears the data.
- It starts with sixteen made-up contacts called Test 1 to Test 16, spread across
  every stage so every screen has something on it.
- **Do not enter real client details.** Nothing typed here carries over.
- Forms are not connected yet. The sample answers on Test contacts show how real
  submissions will look.

**The live build** (next step) changes four things and leaves the screens the same:

1. Data moves to Supabase, a proper database. Every contact, note and payment is its
   own row, so two people saving at once never overwrite each other. Daily backups.
2. Real logins replace the PINs.
3. The three JotForms send their answers straight into the right contact.
4. Cal.com bookings land on the contact with the Google Meet link.

---

## 3. Who uses it

Four logins. Each opens to the screen that matters most to that person.

| Person | Role | Opens on | Sees |
|---|---|---|---|
| Noah | Sales | Today | Today, Pipeline, Contacts, Money, Insights |
| Abdullahi | Sales | Today | Same as Noah |
| Brett | CEO | Money | Everything |
| Ryan | Client Success | Today (client tasks) | Today, Clients, Contacts, Money, Insights |

Demo PINs: Noah 1001, Abdullahi 1002, Brett 1003, Ryan 1004. They are shown on the
login screen while in demo mode.

---

## 4. Putting the demo online (GitHub, then Netlify)

You only do this once. After that, every change you push to GitHub goes live by itself.

1. Go to github.com and sign in (use the LBYD account if you have one).
2. Click **New repository**. Name it `lbyd-crm`. Set it to **Private**. Create it.
3. On the new repo page, click **uploading an existing file**. Drag in everything from
   this folder: the `public` folder, `netlify.toml`, `README.md`, `MANUAL.md` and
   `.gitignore`. Click **Commit changes**.
   (If `.gitignore` is hidden on your Mac, press Cmd + Shift + . in Finder to show it.
   It is optional for the demo.)
4. Go to app.netlify.com and sign in with GitHub.
5. Click **Add new site**, then **Import an existing project**, then **GitHub**, and
   pick `lbyd-crm`.
6. Leave every build setting as it is. `netlify.toml` already tells Netlify the site
   lives in the `public` folder. Click **Deploy**.
7. After about a minute you get a link ending in `.netlify.app`. Under
   **Site configuration**, then **Change site name**, rename it to something like
   `lbyd-crm`.
8. Send that link to Brett and Ryan with their demo PIN.

**On a phone:** open the link in Safari, tap Share, then **Add to Home Screen**. It
then opens like an app.

**To update it later:** change the file, upload it to the same GitHub repo (it replaces
the old one), and Netlify redeploys on its own within a minute.

---

## 5. The stages

Every contact has a **sales stage**. Once they buy, they also get a **client stage**.

**Sales stages**

| Stage | Means |
|---|---|
| Lead | We know who they are. Nothing sent yet. |
| Invited | Event link sent. They haven't signed up. |
| Registered | Signed up for a free event. |
| Attended | Showed up to the event. |
| Applied | Sent in the program application. |
| Sales call | Call booked or done with Noah. |
| Sold | Paid. Counts as a member. |
| Not a fit | Said no, or we said no. Stays on record. |

**Client stages** (Ryan's side)

| Stage | Means |
|---|---|
| Onboarding sent | Workbook link sent. Waiting on them. |
| Workbook done | Workbook submitted. Book the onboarding call. |
| Onboarding call | Call with Brett booked or done. |
| Active | In the program and engaged. |
| At risk | Gone quiet, behind, or unhappy. Needs attention. |
| Completed | Finished the program. |

Change a stage from the dropdown at the top of any contact. Every change is logged
with who did it and when.

---

## 6. Using it day to day

### Today

Your to-do list, built automatically. Sections only appear when something is in them.

- **Follow-ups due:** anyone whose next action date is today or earlier.
- **Applications to review:** applied, no call booked yet.
- **Calls coming up:** booked sales calls, soonest first.
- **Ready for onboarding:** sold, but the workbook hasn't been sent.
- **Going cold:** invited or registered with no activity for 5 days.
- **Workbooks to chase** (Ryan, Brett): workbook sent 2+ days ago, not back yet.
- **Onboarding calls to book** (Ryan, Brett): workbook is in.
- **At risk** (Ryan, Brett): anyone marked At risk.

The number beside **Today** in the menu is how many items are waiting.

### Pipeline

A board with one column per sales stage. Tap any card to open the person.
A star means they've been marked **Serious**. A gold chip is their budget from a form;
gold means $5,000 or more.

### Clients

The same kind of board for everyone who has bought, by client stage. Shows their plan
and whether they still owe money.

### Contacts

Everyone, searchable by name, email, Instagram, WhatsApp, location or hot button.
The dropdown filters by stage, or shows archived contacts.

### Adding a contact by hand

Use **+ Add contact** (on Pipeline or Contacts) for anyone you meet in person or who
didn't come through a form. Name plus one way to reach them is enough.

Before saving, the CRM checks whether that person already exists. If the email,
WhatsApp number or Instagram handle matches someone, it stops and offers to open their
record instead of making a second one. See section 9.

---

## 7. The contact record

Tap anyone to open their record. The top section stays put while you switch tabs.

**Top section**

- Stage dropdowns, and the **Serious** flag.
- **WhatsApp** opens a chat with them.
- **Send event invite / Send application / Send onboarding** opens WhatsApp with a
  ready-written message and their personal form link. You just press send. The
  buttons only show when they make sense: the application button disappears once
  they've applied, and the onboarding button appears once they're sold.
- **Copy link** copies the personal link, for sending on Instagram or anywhere else.
- **Join call** appears when a sales call is booked.

The personal link carries their CRM ID, so in the live build their answers attach to
this exact record, no guessing.

**Tabs**

- **Details:** contact info, source, owner, hot button, next action and date, sales
  call time and Meet link. Edits save when you leave the field. Archive is at the
  bottom. Archiving hides someone; nothing is ever deleted.
- **Forms:** every form they've filled in, newest first, question by question. This is
  where Noah reads the application before a sales call and Brett reads the workbook
  before onboarding.
- **Notes:** add a note and tag it: Note, Objection, Question, Struggle, Their words,
  or FAQ. Anything tagged other than Note also appears on the Insights screen.
- **Payments:** close the deal and log payments (section 8).
- **Activity:** the full history: stage changes, messages sent, payments, edits.

---

## 8. Deals and payments

**Closing a deal.** Open the contact, go to **Payments**, pick 6 months ($5,000) or
12 months ($8,000), adjust the price if it's a custom deal, choose **Paid in full** or
**Payment plan**, and tap **Close the deal**. That marks them Sold and adds them to
the member count.

**Logging a payment.** On the same tab, enter the amount, date and method, then
**Log payment**. The amount box pre-fills with what's still owed. Log each installment
as it comes in. In v1 this is manual. Connecting Stripe (through Skool) to do it
automatically is a later step.

**Contracted vs collected.** A $5,000 deal on a plan is $5,000 contracted but only
the payments logged so far are collected. The CRM shows both, plus what's still owed.

---

## 9. How the CRM avoids duplicate people

One person, one record. When someone is added, the CRM looks for an existing match in
this order:

1. Their CRM ID (only in links sent from the CRM, live build)
2. Email
3. Full WhatsApp number, with country code
4. Instagram handle (ignores capitals and the @)

Phone numbers are matched on the full number, not the last few digits, because the
audience is in many countries. If you type an email, number or handle into a record
that already belongs to someone else, the CRM refuses and tells you who has it.

---

## 10. Money screen

- **The columns at the top** are the six member goals: 10, 50, 100, 250, 500 and
  1,000 members. Each fills as members are added. A filled column turns gold. The one
  outlined in gold is the next goal, and the text above says how many to go.
- **Cash collected, contracted, still owed, deals closed, average deal.**
- **How people are buying:** 6 vs 12 months, and paid in full vs payment plan.
- **Funnel:** how many people reached each stage from Registered to Sold.
- **Owed on payment plans:** who still owes what. Tap to open them.

Everyone can see this screen.

---

## 11. Insights

Every tagged note from every contact in one feed: objections, questions, struggles,
the exact words people use, and FAQs. Filter by tag. This is the content idea bank
and the raw material for sales scripts and FAQs. The habit that makes it work: after
every call or DM conversation, add one tagged note.

---

## 12. Settings

- **Download CSV:** a spreadsheet of every contact.
- **Download full backup (JSON):** everything, for safekeeping.
- **Forms:** the three JotForm links.
- **Reset demo data:** puts Test 1 to Test 16 back and clears anything added.

---

## 13. Changing things

All in `public/index.html`, near the top of the script, in clearly named blocks:

| To change | Edit the block |
|---|---|
| Form links | `FORMS` |
| Logins and PINs, which tabs each person sees | `ROLES` |
| Stages | `SALES_STAGES`, `CS_STAGES` |
| Prices | `PLANS` |
| Member goal numbers and names | `TIERS` |
| WhatsApp messages | `MSG` (client-facing: no em dashes) |
| Note tags | `TAGS` |

---

## 14. Not built yet (in order)

1. **Supabase database and real logins.** Shared data, daily backups, privacy
   enforced by the database.
2. **Form intake.** One webhook for all three JotForms, matching people as in
   section 9 and keeping every raw answer.
3. **Cal.com.** Bookings move the contact to Sales call with the Meet link attached.
4. **Weekly export to Google Drive.** A second backup outside Supabase.
5. **Stripe through Skool.** Payments logged automatically, if Skool payments show in
   Brett's Stripe with the buyer's email.
6. **Claude connector.** Brett sends a screenshot and a note to Claude, and Claude
   updates the contact.

---

## 15. If something goes wrong

- **Screen is blank or stuck:** refresh. If still stuck, try another browser.
- **The demo data looks messy:** Settings, then Reset demo data.
- **Fonts look plain:** the custom font didn't load. Everything still works.
- **WhatsApp button opens a chat picker instead of the person:** their number is
  missing or has no country code. Fix it in Details.

---

## 16. Files in this project

| File | What it is |
|---|---|
| `public/index.html` | The whole app |
| `netlify.toml` | Tells Netlify where the site is |
| `README.md` | Short technical summary |
| `MANUAL.md` | This guide |
| `.gitignore` | Keeps junk files out of GitHub |
