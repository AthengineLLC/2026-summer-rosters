# Roster Page Format Rollout — Spec for Claude Code

## Goal
Apply ONE consistent game-table format to **every roster page** in the repo. The file
`pascual_roster.html` is the finished reference (the "gold standard"). Every other roster
page currently uses the OLD format and must be brought up to match Pascual's format
**exactly** — same CSS, same markup structure — WITHOUT touching any team-specific data
(player names, opponents, scores, dates, venues, pitcher names, navigation, headers, etc.).

## Scope
- IN scope: all `*_roster.html` pages (the per-team schedule/roster pages).
- OUT of scope: `tournament_*.html` composite pages, `index.html`, nav, anything else.
- Confirm the exact file list with me before writing, if it's more than the obvious set.

## The 6 format changes (Pascual already has all of these; the others have NONE or PARTIAL)

### 1. Remove the baseball emoji from the toggle buttons
In every "View ___ Games" toggle button label, delete the leading `⚾ ` (baseball emoji +
space). The button text should start directly with "View". Keep the red button styling and
the ▼ arrow exactly as-is.

### 2. Add the game-result color CSS (if missing)
Some pages may already have `.game-result` color rules; some may not. Ensure every page has
this block, including the `.tie` rule (CBU powder blue) which the old pages lack:

```css
/* GAME RESULTS */
.game-result { padding: 10px 14px; text-align: center; white-space: nowrap; font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 900; letter-spacing: 1px; min-width: 70px; }
.game-result.win  { color: #22c55e; }
.game-result.loss { color: #ef4444; }
.game-result.tie { color: #6daed4; }
.game-result.pending { color: #555e72; font-size: 13px; font-weight: 600; letter-spacing: 0; }
.game-result.rainout { color: #6b8cae; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
@media (max-width: 600px) {
  .game-result { font-size: 13px; padding: 8px 6px; min-width: 52px; }
}
```

### 3. Add the "TABLE LOOK" reskin override block
Insert this AFTER the `.game-result` block above (it overrides the dark table to the new
light look — navy day-header bars, white game rows, navy text, navy dividers between
consecutive games only, drop shadow instead of a hard border, and result colors tuned for
the white background):

```css
/* --- TABLE LOOK: navy day bars, white game rows, navy text + drop shadow --- */
.tourn-game-table {
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35) !important;
}
/* Day header bars -> navy */
.tourn-game-table tr[style*="background:#b91e2d"] td {
  background: #0d1a33 !important;
  color: #ffffff !important;
}
/* Game (data) rows -> white bg, navy text */
.tourn-game-table tr:not([style*="background:#b91e2d"]) td {
  background: #ffffff !important;
  color: #0d1a33 !important;
}
/* Divider only between two consecutive game rows — NOT under the last game of a day */
.tourn-game-table tr:not([style*="background:#b91e2d"]) + tr:not([style*="background:#b91e2d"]) td {
  border-top: 1px solid #0d1a33;
}
.tourn-game-table .game-opp-name { color: #0d1a33 !important; }
.tourn-game-table .game-venue-name { display: block !important; margin-top: 3px; color: #0d1a33 !important; }
.tourn-game-table .game-opp-wrap span[style*="#aab4c8"] { color: #5a6478 !important; }
/* Keep results colour-coded, tuned for the white background */
.tourn-game-table td.game-result.win     { color: #16a34a !important; }
.tourn-game-table td.game-result.loss    { color: #b91e2d !important; }
.tourn-game-table td.game-result.tie     { color: #2d6da4 !important; }
.tourn-game-table td.game-result.rainout { color: #4a6f93 !important; }
.tourn-game-table td.game-result.pending { color: #555e72 !important; }
```

### 4. Add the probable-pitchers CSS
Insert this near the same area (Pascual has it right before the "TABLE LOOK" block):

```css
.probable-pitchers { display: block; margin-top: 5px; font-size: 11px; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.8px; text-transform: uppercase; }
.probable-pitchers .pp-label { color: #b91e2d; font-weight: 900; margin-right: 5px; }
.probable-pitchers .pp-names { color: #0d1a33; font-weight: 600; }
```

### 5. Remove the mobile "hide 4th column" rule (if present)
The old pages hide the 4th table column on phones with a rule like:
`.tourn-game-table tr td:nth-child(4) { display: none; }  /* hide venue on tiny screens */`
DELETE that rule. The 4th column is now the SCORE column (venue is merged into column 3),
so hiding it wipes scores on mobile.

### 6. Convert each game row to the 3-level stacked layout
The OLD game-info cell renders opponent and venue inline, separated by a dot span:
`<span class="game-opp-name">OPP</span><span style="color:#aab4c8;"> · </span><span class="game-venue-name">VENUE</span>`

Change it to stacked (just DELETE the inline dot separator span between them):
`<span class="game-opp-name">OPP</span><span class="game-venue-name">VENUE</span>`

The `display:block` CSS from step 3 makes them stack as: opponent / venue.
Do this for EVERY game row in EVERY roster page. Do NOT alter the opponent or venue text.

## Probable pitchers (data — leave as a pattern, do NOT invent)
The probable-pitchers line is OPTIONAL per game and contains team-specific data I enter by
hand. Do NOT add pitcher data anywhere. Just ensure the CSS (step 4) exists so that when I
later add a line in this exact format, it renders correctly. The markup pattern, placed as
the LAST child inside `.game-opp-wrap` (after the venue span), is:

```html
<span class="probable-pitchers"><span class="pp-label">Probable Pitchers</span><span class="pp-names">Name One · Name Two · Name Three</span></span>
```
Names separated by " · " (space-dot-space). Pascual's three Blue Jays games show working
examples — use them only as a reference for placement, do not copy the names elsewhere.

## Method & safety
- Use `pascual_roster.html` as the canonical reference. Diff each other roster page's
  `<style>` block and game-table markup against Pascual's and reconcile to match.
- Class names are identical across all pages (`tourn-schedule-btn`, `tourn-game-table`,
  `game-opp-wrap`, `game-opp-name`, `game-venue-name`, `game-result`), so these edits are
  mechanical.
- After each file, sanity-check: count `<div>` vs `</div>` should be balanced, exactly one
  `sched-poster` / one `sched-games` / one `sched-footer`, and the toggle button(s) should
  still be red with no emoji.
- Do NOT touch: navigation, page titles, headers, player roster tables, dates, scores,
  opponent names, venues, the red toggle button color, or any team-specific content.
- Show me a summary of which files changed and a diff of one representative file before
  committing. Then commit with a clear message and push.
