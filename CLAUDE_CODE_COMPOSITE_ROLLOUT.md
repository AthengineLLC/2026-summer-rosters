# Composite Schedule Page — NEW STANDARD Rollout

## Goal
`tournament_prospect_select.html` is the finished gold-standard COMPOSITE schedule page.
Bring **every other `tournament_*.html` page** up to match it, adding two features WITHOUT
changing any existing game data (teams, opponents, venues, times, dates, scores, divisions):

1. A **Team filter dropdown** at the top (defaults to "All Teams", grouped by graduation year).
2. **Probable-pitchers support** (CSS + the ability to add a pitcher line per game).

Use `tournament_prospect_select.html` as the canonical reference. Diff each other composite
page against it and reconcile.

## Scope
- IN: all `tournament_*.html` composite schedule pages.
- OUT: `*_roster.html` team pages (separate standard), `index.html`, nav.
- Confirm the full `tournament_*.html` file list with me before applying.

## Structural assumptions (verified consistent across composite pages)
Every composite page uses the same building blocks, so these edits are mechanical:
- Each game is a `<tr>` containing `<td class="team-col">…<strong>TEAM NAME</strong></td>`
  and `<td class="opp-col">vs./@ <span class="opp-name">OPPONENT</span></td>`.
- Games are grouped in `<div class="day-section">` blocks, each with a day header row.
- Blank `<tr class="time-spacer"><td colspan="6"></td></tr>` rows separate games.

---

## PART A — Team filter dropdown (per page)

### A1. Stamp `data-team` on every game row
For each game `<tr>` that contains a `team-col`, add `data-team="<slug>"` to the `<tr>` tag,
where `<slug>` is the team's `<strong>` name lowercased with non-alphanumerics turned to
hyphens. Example: `<strong>2027 Scout McCoy</strong>` → `data-team="2027-scout-mccoy"`.
Do NOT stamp `time-spacer` rows or day-header rows.

### A2. Insert the dropdown UI
Immediately AFTER the `<div class="legend">…</div>` block, insert the team-filter markup
(copy the structure from the reference). The `<select>` must contain:
- A first option: `<option value="all">All Teams</option>`
- Then `<optgroup label="YYYY Teams">` groups, ONE per graduation year that actually appears
  on THIS page, each containing an `<option value="<slug>">Team Display Name</option>` for
  every distinct team on the page. **Generate this list from the page's own `<strong>` team
  names** — do NOT hardcode Prospect Select's teams. Sort years ascending; within a year,
  keep teams in the order they first appear (or alphabetical — be consistent).
- A "Show All" reset button (copy from reference).

### A3. Add the filter CSS
Copy the `/* TEAM FILTER */` CSS block from the reference verbatim (the navy dropdown,
powder-blue label/accents, red Show-All button, `.day-section.filtered-empty { display:none }`,
and the mobile rules). Place it right after the `/* LEGEND */` rules.

### A4. Add the filter script
Copy the `filterByTeam(team)` `<script>` from the reference verbatim, placed before
`</body>`. It must: show/hide game rows by `data-team`; collapse `time-spacer` rows so a
spacer only shows when it sits between two visible games (no double gaps); and add/remove
`filtered-empty` on each `day-section` so empty days hide their headers. Default state = all
visible.

> NOTE: the CSS appears TWICE in these files (duplicated style block). Insert the new CSS
> once, anchored to the FIRST occurrence of the `/* LEGEND */` comment so it isn't ambiguous.

---

## PART B — Probable-pitchers support (per page)

### B1. Add the probable-pitchers CSS
Copy this block (composite version — light text tuned for the DARK table rows; do NOT use
the roster page's navy `.pp-names`, it's invisible on dark rows). Place it right after the
FIRST `.opp-name` rule:
```css
/* PROBABLE PITCHERS (composite — light text on dark rows) */
.probable-pitchers { display: block; margin-top: 6px; font-size: 12px; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.8px; text-transform: uppercase; }
.probable-pitchers .pp-label { color: #6daed4; font-weight: 900; margin-right: 6px; }
.probable-pitchers .pp-names { color: #aab4c8; font-weight: 600; }
```

### B2. Do NOT invent pitcher data
Just install the CSS so the feature is READY. Pitcher lines are hand-entered per game by me.
When present, the markup goes as the LAST child of the `opp-col`, right after the
`</span>` that closes `.opp-name`:
```html
<td class="opp-col">vs. <span class="opp-name">OPPONENT</span><span class="probable-pitchers"><span class="pp-label">Probable Pitchers</span><span class="pp-names">Name One · Name Two · Name Three</span></span></td>
```
Names separated by " · " (space-dot-space). If a page already has pitcher data in some other
format from a past event, leave that game's existing data alone unless I ask you to convert it.

---

## Method & safety
- `tournament_prospect_select.html` is canonical. Reconcile each page to it.
- Class names (`team-col`, `opp-col`, `opp-name`, `day-section`, `time-spacer`, `legend`)
  are identical across pages, so Part A1/A3/A4 and B1 are mechanical/verbatim copies. Only
  the dropdown's `<option>`/`<optgroup>` list (A2) is generated per page from that page's teams.
- Per page, sanity-check after editing: `<div>`/`</div>` balanced; the count of `data-team`
  attributes equals the number of game rows (= count of `team-col`); exactly one `#teamFilter`;
  the dropdown's option count (minus the "All Teams" option) equals the number of distinct
  teams on the page; the page still loads with everything visible by default.
- Do NOT touch: nav, page titles, event titles, day headers, game times, opponents, venues,
  divisions, scores, or the legend.
- **Two review checkpoints before mass-applying:** (1) a diff of one representative page
  showing the dropdown + CSS + script added, and (2) for EACH page, the generated team list
  (year groups + teams) so I can confirm the dropdowns are correct. Wait for my OK on both,
  then apply to all, commit with a clear message, and push.
