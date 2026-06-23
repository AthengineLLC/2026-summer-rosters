'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/bread/Desktop/VS CODE/2026-summer-rosters';
const M = '·'; // middot
const N = '–'; // en-dash

function replaceOnce(s, find, repl, label) {
  const i = s.indexOf(find);
  if (i < 0) throw new Error(`NOT FOUND: ${label}\n  snippet: ${JSON.stringify(find.slice(0, 100))}`);
  if (s.indexOf(find, i + 1) >= 0) throw new Error(`NOT UNIQUE: ${label}`);
  return s.slice(0, i) + repl + s.slice(i + find.length);
}

function read(name) {
  const p = path.join(BASE, name);
  const c = fs.readFileSync(p, 'utf8');
  return { p, c, eol: c.includes('\r\n') ? '\r\n' : '\n' };
}

function save(p, c, orig, label) {
  fs.writeFileSync(p, c, 'utf8');
  const delta = c.length - orig;
  console.log(`✓ ${label}  (${delta >= 0 ? '+' : ''}${delta} chars)`);
}

// ============================================================
// A. CREATE COMPOSITE: tournament_pg_wwba_florida.html
// ============================================================

{
  const template = read('tournament_pg_wwba_2027.html');
  let html = template.c;
  const E = template.eol;

  // Replace headers
  html = replaceOnce(html, `<h1>2027s PG WWBA</h1>`, `<h1>WWBA FL Championship</h1>`, 'h1');
  html = replaceOnce(html, `<p>Atlanta, GA · June 23-27, 2026</p>`, `<p>Auburndale, FL · June 26-29, 2026</p>`, 'location');
  html = replaceOnce(html, `<div class="event-title">PG 17U WWBA National Championship</div>`, `<div class="event-title">PG 16U WWBA Florida Championship</div>`, 'event-title');
  html = replaceOnce(html, `<div class="event-sub">2027s · Atlanta, GA · June 23–27, 2026</div>`, `<div class="event-sub">2026 · Auburndale, FL · June 26–29, 2026</div>`, 'event-sub');

  // Update legend
  html = replaceOnce(html,
    `<div class="legend-item"><div class="legend-dot" style="background:#b91e2d"></div>17U Division (2027)</div>`,
    `<div class="legend-item"><div class="legend-dot" style="background:#06b6d4"></div>16U Championship</div>`,
    'legend');

  // Update filter optgroup - use single line anchor with correct EOL
  const optgroupFind = `<optgroup label="2027 Teams">${E}          <option value="2027-scout-olasin">2027 Scout Olasin</option>${E}          <option value="2027-scout-mccoy">2027 Scout McCoy</option>${E}          <option value="2027-scout-menendez">2027 Scout Menendez</option>${E}          <option value="2027-united-thomas">2027 United Thomas</option>${E}        </optgroup>`;
  const optgroupRepl = `<optgroup label="FL Championship Teams">${E}          <option value="2026-united-merrell">2026 United Merrell</option>${E}          <option value="2026-united-severidt">2026 United Severidt</option>${E}        </optgroup>`;
  html = replaceOnce(html, optgroupFind, optgroupRepl, 'filter optgroup');

  // Replace entire day-sections with new ones
  const oldDays = html.substring(
    html.indexOf('<div class="day-section">'),
    html.indexOf('</div></div>\n    </div>\n  </main>') + 5
  );

  const newDays = `<div class="day-section">
        <div class="day-header">FRIDAY · June 26</div>
        <table class="tourn-schedule-table">
        <thead>
          <tr style="background:#06b6d4;">
            <th class="time-col">Time</th>
            <th class="team-col">Team</th>
            <th class="opp-col">Opponent</th>
            <th class="venue-col">Venue</th>
            <th class="pool-col">Game</th>
            <th class="result-col">Result</th>
          </tr>
        </thead>
        <tbody>
        <tr data-team="2026-united-merrell">
          <td class="time-col">8:00 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Merrell</strong></td>
          <td class="opp-col">vs. <span class="opp-name">SWFL Rockies Scout 2028</span></td>
          <td class="venue-col">Lake Myrtle Sports Complex ${M} Auburndale, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        <tr data-team="2026-united-severidt">
          <td class="time-col">10:15 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Severidt</strong></td>
          <td class="opp-col">vs. <span class="opp-name">Empire Baseball 16U American</span></td>
          <td class="venue-col">Field 1 @ Chain O'Lakes Park ${M} Howey-in-the-Hills, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        <tr data-team="2026-united-merrell">
          <td class="time-col">10:15 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Merrell</strong></td>
          <td class="opp-col">vs. <span class="opp-name">WBC 16u</span></td>
          <td class="venue-col">Lake Myrtle Sports Complex ${M} Auburndale, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        </tbody>
        </table>
      </div>
      <div class="day-section">
        <div class="day-header">SATURDAY · June 27</div>
        <table class="tourn-schedule-table">
        <thead>
          <tr style="background:#06b6d4;">
            <th class="time-col">Time</th>
            <th class="team-col">Team</th>
            <th class="opp-col">Opponent</th>
            <th class="venue-col">Venue</th>
            <th class="pool-col">Game</th>
            <th class="result-col">Result</th>
          </tr>
        </thead>
        <tbody>
        <tr data-team="2026-united-severidt">
          <td class="time-col">8:00 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Severidt</strong></td>
          <td class="opp-col">vs. <span class="opp-name">Freshwater Storm 16u National</span></td>
          <td class="venue-col">Field 2 @ Northeast Regional Park ${M} Palatka, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        <tr data-team="2026-united-merrell">
          <td class="time-col">10:15 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Merrell</strong></td>
          <td class="opp-col">@ <span class="opp-name">HR14-City Elite</span></td>
          <td class="venue-col">Field 3 @ Northeast Regional Park ${M} Palatka, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        <tr data-team="2026-united-severidt">
          <td class="time-col">10:15 AM</td>
          <td class="team-col"><span class="div-badge" style="background:#06b6d4">16U</span><br><strong>2026 United Severidt</strong></td>
          <td class="opp-col">vs. <span class="opp-name">Lake County Gators</span></td>
          <td class="venue-col">Field 2 @ Northeast Regional Park ${M} Palatka, FL</td>
          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>
          <td class="result-col pending">${N}</td>
        </tr>
        </tbody>
        </table>
      </div>`;

  html = replaceOnce(html, oldDays, newDays, 'day sections');

  fs.writeFileSync(path.join(BASE, 'tournament_pg_wwba_florida.html'), html, 'utf8');
  console.log(`✓ tournament_pg_wwba_florida.html  (created)`);
}

// ============================================================
// B. ADD NAV ENTRIES to all 27 tournament-nav pages
// ============================================================

const navLabel = 'June 26 - WWBA FL Championship';
const navHref = 'tournament_pg_wwba_florida.html';

// All 27 pages that need nav updates
const navPages = [
  'index.html',
  'tournament_pg_memorial.html', 'tournament_pg_ubc.html', 'tournament_pg_wwba_2027.html', 'tournament_pg_wwba_2030.html',
  'tournament_ps_black_bear.html', 'tournament_ps_futures.html', 'tournament_prospect_select.html',
  'madsen_roster.html', 'kirst_roster.html', 'chappell_roster.html', 'santiago_roster.html',
  'olasin_roster.html', 'mccoy_roster.html', 'menendez_roster.html', 'thomas_roster.html',
  'merrell_roster.html', 'severidt_roster.html',
  'unite_hudgins_roster.html', 'united_hudgins_roster.html', 'united_severidt_roster.html',
  'cates_roster.html', 'dibella_roster.html', 'lawson_roster.html', 'pascual_roster.html',
  'scout_lawson_roster.html'
];

for (const page of navPages) {
  if (!fs.existsSync(path.join(BASE, page))) continue;

  const f = read(page);
  let s = f.c;
  const orig = s.length;

  // Find anchor: "June 23 - 2027s PG WWBA" (most recent nav item before this)
  const desktopAnchor = `<li><a href="tournament_pg_wwba_2027.html" class="dropdown-item scout-item">June 23 - 2027s PG WWBA</a></li>`;
  const mobileAnchor  = `<a href="tournament_pg_wwba_2027.html" class="mobile-nav-link">June 23 - 2027s PG WWBA</a>`;

  if (!s.includes(desktopAnchor) || !s.includes(mobileAnchor)) continue; // Skip if anchors not found

  // Add after both anchors
  const desktopInsert = `<li><a href="${navHref}" class="dropdown-item scout-item">${navLabel}</a></li>`;
  const mobileInsert  = `<a href="${navHref}" class="mobile-nav-link">${navLabel}</a>`;

  // Insert desktop after anchor
  s = replaceOnce(s, desktopAnchor,
    desktopAnchor + '\n        ' + desktopInsert,
    `${page} desktop nav`);

  // Insert mobile after anchor
  s = replaceOnce(s, mobileAnchor,
    mobileAnchor + '\n        ' + mobileInsert,
    `${page} mobile nav`);

  // Verify not after </html>
  const htmlIdx = s.indexOf('</html>');
  const navIdx = s.indexOf(navLabel);
  if (htmlIdx >= 0 && navIdx >= 0 && navIdx > htmlIdx) {
    throw new Error(`${page}: nav inserted after </html>`);
  }

  save(f.p, s, orig, page);
}

// ============================================================
// C. CREATE ROSTER GAME TABLES: united_merrell_roster.html, united_severidt_roster.html
// ============================================================

function addRosterGameTable(filename, teamKey, games) {
  const f = read(filename);
  let s = f.c;
  const orig = s.length;
  const E = f.eol;

  // Find the placeholder - look for any PG WWBA FL variant
  const placeholder = `<div class="sched-game-info"><div class="sched-event-name">PG WWBA FL Champs</div><div class="sched-venue">Auburndale, FL</div></div>`;

  if (!s.includes(placeholder)) {
    throw new Error(`${filename}: placeholder not found`);
  }

  const DAY_STYLE = "padding:8px 12px;font-weight:900;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#fff;font-family:'Barlow Condensed',sans-serif;";
  const TIME_STYLE = "padding:12px 14px;font-weight:900;font-size:16px;color:#ffffff;white-space:nowrap;font-family:'Barlow Condensed',sans-serif;";
  const DIR_STYLE = "padding:12px 8px;font-size:14px;font-weight:900;color:#aab4c8;font-family:'Barlow Condensed',sans-serif;";
  const OPP_STYLE = "padding:12px 14px;font-size:16px;font-weight:700;color:#ffffff;font-family:'Barlow Condensed',sans-serif;";

  // Build game table - split games by day
  let fridayGames = '';
  let saturdayGames = '';

  for (const g of games) {
    if (!g.time) continue; // Skip day-marker entries
    const row = `<tr><td style="${TIME_STYLE}">${g.time}</td><td style="${DIR_STYLE}">${g.dir}</td><td style="${OPP_STYLE}"><div class="game-opp-wrap"><span class="game-opp-name">${g.opp}</span><span class="game-venue-name">${g.venue}</span></div></td><td class="game-result pending">${N}</td></tr>`;
    if (g.day === 'FRIDAY') {
      fridayGames += row;
    } else if (g.day === 'SATURDAY') {
      saturdayGames += row;
    }
  }

  const gameTable = `<button class="tourn-schedule-btn" onclick="toggleGameSchedule(this, 'games_${teamKey}_wwbaflorida')">
            View Schedule <span class="btn-arrow">▼</span>
          </button>
          <table class="tourn-game-table" id="games_${teamKey}_wwbaflorida">
            <tbody><tr style="background:#06b6d4;"><td colspan="4" style="${DAY_STYLE}">FRIDAY · June 26</td></tr>${fridayGames}<tr style="background:#06b6d4;"><td colspan="4" style="${DAY_STYLE}">SATURDAY · June 27</td></tr>${saturdayGames}</tbody>
          </table>
          <a href="tournament_pg_wwba_florida.html" class="full-sched-link">View full composite schedule →</a>`;

  s = replaceOnce(s, placeholder, gameTable, `${filename} game table`);

  save(f.p, s, orig, filename);
}

// Merrell games (3 games: 2 Friday, 1 Saturday)
addRosterGameTable('united_merrell_roster.html', 'merrell', [
  { day: 'FRIDAY', time: '8:00 AM', dir: 'vs.', opp: 'SWFL Rockies Scout 2028', venue: `Lake Myrtle Sports Complex ${M} Auburndale, FL` },
  { day: 'FRIDAY', time: '10:15 AM', dir: 'vs.', opp: 'WBC 16u', venue: `Lake Myrtle Sports Complex ${M} Auburndale, FL` },
  { day: 'SATURDAY' },
  { day: 'SATURDAY', time: '10:15 AM', dir: '@', opp: 'HR14-City Elite', venue: `Northeast Regional Park ${M} Palatka, FL` },
]);

// Severidt games (3 games: 1 Friday, 2 Saturday)
addRosterGameTable('united_severidt_roster.html', 'severidt', [
  { day: 'FRIDAY', time: '10:15 AM', dir: 'vs.', opp: 'Empire Baseball 16U American', venue: `Field 1 @ Chain O'Lakes Park ${M} Howey-in-the-Hills, FL` },
  { day: 'SATURDAY' },
  { day: 'SATURDAY', time: '8:00 AM', dir: 'vs.', opp: 'Freshwater Storm 16u National', venue: `Field 2 @ Northeast Regional Park ${M} Palatka, FL` },
  { day: 'SATURDAY', time: '10:15 AM', dir: 'vs.', opp: 'Lake County Gators', venue: `Field 2 @ Northeast Regional Park ${M} Palatka, FL` },
]);

console.log('\nAll done.');
