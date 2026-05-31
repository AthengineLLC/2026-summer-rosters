# Roster Page — NEW STANDARD Rollout (v2)

## Goal
`pascual_roster.html` is the finished gold-standard roster page. Bring **every other
`*_roster.html` page** up to match it EXACTLY in structure and CSS for the **schedule poster
header**, the **expandable game tables**, and all **mobile behavior** — WITHOUT changing any
team-specific data (player rosters, opponents, scores, dates, venues, pitcher names, event
names, navigation, page titles).

Use `pascual_roster.html` as the canonical reference. For each other roster page, diff its
`<style>` block and its schedule markup against Pascual's and reconcile to match.

## Scope
- IN: all `*_roster.html` team pages.
- OUT: `tournament_*.html`, `index.html`, nav, anything else.
- Confirm the full roster-file list with me before applying.

---

## PART A — Global CSS (make identical to Pascual)
Every roster page must end up with the SAME schedule/game-table CSS that `pascual_roster.html`
has. The simplest reliable method: copy Pascual's relevant `<style>` rules verbatim into each
page (replacing the old equivalents). This single step brings over ALL of the following:

1. **No baseball emoji** on the "View ___ Games" toggle buttons (delete any leading `⚾ `).
2. **Game-result colors** including `.game-result.tie` (powder blue).
3. **TABLE LOOK reskin**: white game rows, navy day-header bars, navy text, drop shadow
   (no hard border), and a divider line ONLY between two consecutive games on the same day
   (never under the last game of a day).
4. **Probable-pitchers CSS** (`.probable-pitchers`, `.pp-label` red, `.pp-names` navy).
5. **3-level stacked game info**: opponent / venue / pitchers each on their own line
   (delete any inline `<span style="color:#aab4c8;"> · </span>` dot separators between
   opponent and venue).
6. **RESULT PILLS** (see Part C for the markup): pill CSS where win=green `#16a34a`,
   loss=red `#b91e2d`, tie=navy `#0d1a33`, rainout=slate `#4a6f93`, all white text.
7. **GAME TAGS** consolation / bracket / championship: shared base class, flush-left,
   on their own line (consolation=red, bracket=navy, championship=gold).
8. **Mobile (`max-width:600px`) stacked CARD layout**: when a tournament is expanded on a
   phone, the game table collapses to a vertical stack — navy day bar on top, then each game
   stacked one item per line (time, vs/@, opponent, venue, pitchers, score), left aligned.
9. **Mobile expanded = hide side date**: `.sched-game-card:has(.tourn-game-table.open)`
   drops the side date block and goes full width (the day shows inside the table). Pure CSS.
10. **Mobile score buffer**: the score cell has a 14px bottom buffer matching the top gap
    (the rule uses the `tr:not([...]) td.game-result` selector so it isn't overridden).
11. **Remove** any old mobile rule that hides the 4th table column
    (`td:nth-child(4){display:none}`) — that column is now the score.

> Net: after Part A, each page's `<style>` schedule/table section should be byte-for-byte the
> same as Pascual's. Show me a diff of one page's style block before applying to all.

---

## PART B — Header nameplate + team-type accent (per page)
Replace the OLD team label on every page:
```html
<div class="sched-team-label"><span class="sched-line"></span><span>✦</span>CBU 2029 SCOUT TEAM NAME<span>✦</span><span class="sched-line"></span></div>
```
with the NEW two-tier nameplate:
```html
<div class="sched-teambar"><span class="tb-kicker">CBU 2029 Scout Team</span><span class="tb-name">Pascual</span></div>
```

**How to split the old label into kicker + hero name:**
The old label text always reads `CBU [YEAR] [SCOUT TEAM | UNITED] [NAME]`.
- The **hero name** (`.tb-name`) = the team's distinguishing name = the trailing word(s)
  after "SCOUT TEAM" or "UNITED". Examples: `…SCOUT TEAM PASCUAL` → `Pascual`;
  `…UNITED CATES` → `Cates`.
- The **kicker** (`.tb-kicker`) = everything before the hero name, in Title Case.
  Examples: `CBU 2029 Scout Team`; `CBU 2029 United`.
- Use Title Case for both (not ALL CAPS in the markup — the CSS uppercases them).

**Team-type accent — THE RULE (no exceptions):**
- If the label contains **"Scout"** → it is a **SCOUT** team → accent = **powder blue** `#6daed4`.
- If the label contains **"United"** → it is a **UNITED** team → accent = **red** `#b91e2d`.
Apply by adding the matching class to the schedule poster:
```html
<div class="sched-poster scout">     <!-- scout team: powder kicker + powder divider -->
<div class="sched-poster united">    <!-- united team: red kicker + red divider -->
```
The CSS already defines:
```css
.sched-poster.scout  .tb-kicker { color:#6daed4; }
.sched-poster.scout  .sched-logo-underline { background: linear-gradient(90deg, transparent, #6daed4 20%, #6daed4 80%, transparent); }
.sched-poster.united .tb-kicker { color:#b91e2d; }
.sched-poster.united .sched-logo-underline { background: linear-gradient(90deg, transparent, #b91e2d 20%, #b91e2d 80%, transparent); }
```
So: **scout = powder, united = red, every time.** The `.tb-name` stays white and the big
`2026 SUMMER SCHEDULE` title stays white on all pages.

> Because the kicker/name split is per-page content, show me a table of every page with its
> detected team type (scout/united) and the proposed kicker + hero name BEFORE applying, so I
> can correct any odd names.

---

## PART C — Score pills (markup wrap)
Wrap the text inside each win/loss/tie/rainout result cell in a pill span:
```html
<td class="game-result loss">L 0-3</td>
```
becomes
```html
<td class="game-result loss"><span class="result-pill">L 0-3</span></td>
```
Apply to result classes `win`, `loss`, `tie`, `rainout`. Do NOT wrap `pending` cells or
empty cells. Do NOT change the score text itself.

---

## Method & safety
- `pascual_roster.html` is canonical. Reconcile each page to it; do not invent content.
- Class names are identical across pages (`tourn-schedule-btn`, `tourn-game-table`,
  `game-opp-wrap`, `game-result`, `sched-poster`, `sched-game-card`, etc.), so Part A and C
  are mechanical.
- Per page, sanity-check after editing: `<div>`/`</div>` balanced; exactly one schedule
  poster, one games container, one footer; toggle buttons red with no emoji; the poster has
  exactly one of `scout` or `united`; the nameplate has one `.tb-kicker` and one `.tb-name`.
- Do NOT touch: navigation, page titles, headers other than the team nameplate, player
  roster tables, dates, scores, opponents, venues, event names, or pitcher data.
- **Two review checkpoints before mass-applying:** (1) a diff of one representative page's
  style block (Part A), and (2) the per-page team-type + kicker/name split table (Part B).
  Wait for my OK on both, then apply to all, commit with a clear message, and push.
