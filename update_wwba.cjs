'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/bread/Desktop/VS CODE/2026-summer-rosters';
const M = '·'; // middot
const N = '–'; // en-dash

const DAY_HDR_STYLE = "padding:8px 12px;font-weight:900;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#fff;font-family:'Barlow Condensed',sans-serif;";
const TIME_STYLE = "padding:12px 14px;font-weight:900;font-size:16px;color:#ffffff;white-space:nowrap;font-family:'Barlow Condensed',sans-serif;";
const DIR_STYLE  = "padding:12px 8px;font-size:14px;font-weight:900;color:#aab4c8;font-family:'Barlow Condensed',sans-serif;";
const OPP_STYLE  = "padding:12px 14px;font-size:16px;font-weight:700;color:#ffffff;font-family:'Barlow Condensed',sans-serif;";

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

function pp(names) {
  return `<span class="probable-pitchers"><span class="pp-label">Probable Pitchers</span><span class="pp-names">${names}</span></span>`;
}

function dayHdr(day, date) {
  return `<tr style="background:#b91e2d;"><td colspan="4" style="${DAY_HDR_STYLE}">${day} ${M} ${date}</td></tr>`;
}

function rosterGameRow(time, dir, opp, venue, pitchers) {
  return `<tr><td style="${TIME_STYLE}">${time}</td><td style="${DIR_STYLE}">${dir}</td><td style="${OPP_STYLE}"><div class="game-opp-wrap"><span class="game-opp-name">${opp}</span><span class="game-venue-name">${venue}</span>${pp(pitchers)}</div></td><td class="game-result pending">${N}</td></tr>`;
}

// ============================================================
// A.  2030 WWBA RESULTS (composite + madsen roster + kirst roster + home cards)
// ============================================================

// A1. tournament_pg_wwba_2030.html
{
  const f = read('tournament_pg_wwba_2030.html');
  let s = f.c;
  const E = f.eol;
  const orig = s.length;

  // Madsen G2: pending → win W 3-2
  s = replaceOnce(s,
    `vs. <span class="opp-name">SmarTense 14U</span></td>${E}          <td class="venue-col">Jerry D. Young Memorial Field ${M} UAB ${M} Birmingham, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col pending">${N}</td>`,
    `vs. <span class="opp-name">SmarTense 14U</span></td>${E}          <td class="venue-col">Jerry D. Young Memorial Field ${M} UAB ${M} Birmingham, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col win"><span class="result-pill">W 3-2</span></td>`,
    'madsen g2 composite result');

  // Kirst G2: pending → loss L 1-7
  s = replaceOnce(s,
    `@ <span class="opp-name">Canes American 14U</span></td>${E}          <td class="venue-col">Spain Park High School ${M} Varsity ${M} Hoover, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col pending">${N}</td>`,
    `@ <span class="opp-name">Canes American 14U</span></td>${E}          <td class="venue-col">Spain Park High School ${M} Varsity ${M} Hoover, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col loss"><span class="result-pill">L 1-7</span></td>`,
    'kirst g2 composite result');

  // Kirst G3: pending → win W 12-1
  s = replaceOnce(s,
    `vs. <span class="opp-name">ZT Southeast</span></td>${E}          <td class="venue-col">Spain Park High School ${M} Varsity ${M} Hoover, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col pending">${N}</td>`,
    `vs. <span class="opp-name">ZT Southeast</span></td>${E}          <td class="venue-col">Spain Park High School ${M} Varsity ${M} Hoover, AL</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col win"><span class="result-pill">W 12-1</span></td>`,
    'kirst g3 composite result');

  save(f.p, s, orig, 'tournament_pg_wwba_2030.html');
}

// A2. madsen_roster.html
{
  const f = read('madsen_roster.html');
  let s = f.c;
  const orig = s.length;

  // WWBA G2 result pending → win
  s = replaceOnce(s,
    `<span class="game-opp-name">SmarTense 14U</span><span class="game-venue-name">Jerry D. Young Memorial Field ${M} UAB ${M} Birmingham, AL</span></div></td><td class="game-result pending">${N}</td>`,
    `<span class="game-opp-name">SmarTense 14U</span><span class="game-venue-name">Jerry D. Young Memorial Field ${M} UAB ${M} Birmingham, AL</span></div></td><td class="game-result win"><span class="result-pill">W 3-2</span></td>`,
    'madsen g2 roster result');

  // Header badge 6-2 → 7-2
  s = replaceOnce(s, `page-record-badge">6-2</span>`, `page-record-badge">7-2</span>`, 'madsen header badge');

  save(f.p, s, orig, 'madsen_roster.html');
}

// A3. kirst_roster.html
{
  const f = read('kirst_roster.html');
  let s = f.c;
  const orig = s.length;

  // WWBA G2: Canes American → L 1-7
  s = replaceOnce(s,
    `<span class="game-opp-name">Canes American 14U</span><span class="game-venue-name">Spain Park High School ${M} Varsity ${M} Hoover, AL</span></div></td><td class="game-result pending">${N}</td>`,
    `<span class="game-opp-name">Canes American 14U</span><span class="game-venue-name">Spain Park High School ${M} Varsity ${M} Hoover, AL</span></div></td><td class="game-result loss"><span class="result-pill">L 1-7</span></td>`,
    'kirst g2 roster result');

  // WWBA G3: ZT Southeast → W 12-1
  s = replaceOnce(s,
    `<span class="game-opp-name">ZT Southeast</span><span class="game-venue-name">Spain Park High School ${M} Varsity ${M} Hoover, AL</span></div></td><td class="game-result pending">${N}</td>`,
    `<span class="game-opp-name">ZT Southeast</span><span class="game-venue-name">Spain Park High School ${M} Varsity ${M} Hoover, AL</span></div></td><td class="game-result win"><span class="result-pill">W 12-1</span></td>`,
    'kirst g3 roster result');

  // Header badge 5-4 → 6-5
  s = replaceOnce(s, `page-record-badge">5-4</span>`, `page-record-badge">6-5</span>`, 'kirst header badge');

  save(f.p, s, orig, 'kirst_roster.html');
}

// A4. index.html home cards
{
  const f = read('index.html');
  let s = f.c;
  const orig = s.length;

  // Madsen (record-row wrapper) 6-2 → 7-2
  s = replaceOnce(s,
    `<div class="team-name">Madsen</div><div class="record-row"><div class="team-record">6-2</div>`,
    `<div class="team-name">Madsen</div><div class="record-row"><div class="team-record">7-2</div>`,
    'madsen home card');

  // Kirst (simple, no record-row) 5-4 → 6-5
  s = replaceOnce(s,
    `<div class="team-name">Kirst</div><div class="team-record">5-4</div>`,
    `<div class="team-name">Kirst</div><div class="team-record">6-5</div>`,
    'kirst home card');

  save(f.p, s, orig, 'index.html');
}

// ============================================================
// B.  2027 WWBA COMPOSITE: add result-col cells + pitcher spans + Menendez Thu G3
// ============================================================

{
  const f = read('tournament_pg_wwba_2027.html');
  let s = f.c;
  const E = f.eol;
  const orig = s.length;

  // Update one composite row: adds pitcher span to opp-col + result-col pending cell
  function updateRow(opp, venue, dir, pitchers) {
    const find = `${dir} <span class="opp-name">${opp}</span></td>${E}          <td class="venue-col">${venue}</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}        </tr>`;
    const repl = `${dir} <span class="opp-name">${opp}</span>${pp(pitchers)}</td>${E}          <td class="venue-col">${venue}</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col pending">${N}</td>${E}        </tr>`;
    s = replaceOnce(s, find, repl, `2027 composite row: ${opp}`);
  }

  // --- OLASIN (5 games) ---
  updateRow("Ghost Nation '27",                          `East Cobb Complex ${M} Field 2 ${M} Marietta, GA`,            'vs.', `Aiden Cary ${M} Kaleb Stockwell`);
  updateRow("Southside Crew",                            `Georgia State University ${M} Stadium ${M} Atlanta, GA`,      '@',   `Ethan Savinon ${M} Austin Stalbird`);
  updateRow("Ninth Inning Prime National 17U",           `Foley Field ${M} University of Georgia ${M} Athens, GA`,     '@',   `Jack Fracklin ${M} Austin Stalbird ${M} Alex Wise`);
  updateRow("Marucci Elite Texas Massengale",            `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,            'vs.', `Preston Matricardi ${M} Aiden Cary ${M} Lucas Farrar`);
  updateRow("Elite Baseball Training West - 17u Halverson", `Pickens County High School ${M} Jasper, GA`,              'vs.', `Rocco Baer ${M} Sterling Reed`);

  // --- MCCOY (4 existing games; Thursday missing - no opponent info yet) ---
  updateRow("MLB Breakthrough Series 2027",              `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,            '@',   `Nolan Parmer ${M} Austin Smith`);
  updateRow("PBG Select National",                       `Georgia State University ${M} Stadium ${M} Atlanta, GA`,      '@',   `Dominic Ferreira ${M} Jaegar Bedford ${M} Kevin Sullivan`);
  updateRow("17u East Cobb Select",                      `North Atlanta High School ${M} Atlanta, GA`,                  'vs.', `Bryson Mitchell`);
  updateRow("USA Prime Coastal Scout",                   `Pickens County High School ${M} Jasper, GA`,                  'vs.', `Gavin Shefsky`);

  // --- MENENDEZ (4 existing games; G3 Thu to be inserted below; G6 bracket TBD) ---
  updateRow("Stars Marucci 2027",                        `East Cobb Complex ${M} Field 5 ${M} Marietta, GA`,            '@',   `Josh Rogerson ${M} Matej Spimr ${M} Trey Glaser`);
  updateRow("Elite National 2027",                       `Georgia State University ${M} Stadium ${M} Atlanta, GA`,      '@',   `Eddie Orchard ${M} Teegan Turner ${M} Kiano Noa`);
  updateRow("Canes Indiana Scout 2027",                  `North Atlanta High School ${M} Atlanta, GA`,                  'vs.', `Teegan Turner ${M} Jaden Sosa ${M} Matej Spimr`);
  updateRow("NorCal U 2027 Cardinal",                    `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,            'vs.', `Bryan Eberly ${M} Ryan Dejnak ${M} Trey Glaser`);

  // --- THOMAS (5 games) ---
  updateRow("Stacked Baseball 17U",                      `Duluth High School ${M} Duluth, GA`,                          '@',   `David Paredes ${M} Brady Lavenia`);
  updateRow("Dirtbags American",                         `Milton Pro Players Park ${M} Milton, GA`,                     'vs.', `AJ Wright ${M} Kenneth Martinez ${M} Simon Hanos`);
  updateRow("Canes Tri-State 17U",                       `North Atlanta High School ${M} Atlanta, GA`,                  '@',   `Bryce Moody ${M} Dylan Willams`);
  updateRow("Factory National",                          `Starr's Mill High School ${M} Fayetteville, GA`,              '@',   `Gavin Dealy ${M} Joshua Stembridge`);
  updateRow("The Dream 17u American",                    `Morrow High School ${M} Morrow, GA`,                          'vs.', `Peyton Woodward ${M} Jackson Palmer`);

  // --- Insert Menendez G3 Thursday after Thomas Thursday row ---
  // Anchor: updated Thomas Thursday row (Canes Tri-State) ends before </tbody>
  const thomasThuTail =
    `<span class="opp-name">Canes Tri-State 17U</span>${pp(`Bryce Moody ${M} Dylan Willams`)}</td>${E}          <td class="venue-col">North Atlanta High School ${M} Atlanta, GA</td>${E}          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}          <td class="result-col pending">${N}</td>${E}        </tr>${E}      </tbody>`;

  const menG3CompRow =
    `        <tr data-team="2027-scout-menendez">${E}` +
    `          <td class="time-col">${N}</td>${E}` +
    `          <td class="team-col"><span class="div-badge" style="background:#b91e2d">17U</span><br><strong>2027 Scout Menendez</strong></td>${E}` +
    `          <td class="opp-col">@ <span class="opp-name">Top Tier GA 2027</span>${pp(`Nico Perez ${M} Alejandro Fernandez ${M} JoJo Guevara`)}</td>${E}` +
    `          <td class="venue-col">University of Georgia ${M} Athens, GA</td>${E}` +
    `          <td class="pool-col"><span class="pool-play-tag">Pool Play</span></td>${E}` +
    `          <td class="result-col pending">${N}</td>${E}` +
    `        </tr>`;

  s = replaceOnce(s, thomasThuTail,
    thomasThuTail.replace(`</tbody>`, `${menG3CompRow}${E}      </tbody>`),
    'menendez g3 thursday composite insert');

  save(f.p, s, orig, 'tournament_pg_wwba_2027.html');
}

// ============================================================
// C.  2027 WWBA ROSTER PAGES: add pitcher spans + Menendez Thu G3
// ============================================================

function addRosterPitchers(filename, games, extraFn) {
  const f = read(filename);
  let s = f.c;
  const orig = s.length;

  for (const g of games) {
    const find = `<span class="game-opp-name">${g.opp}</span><span class="game-venue-name">${g.venue}</span></div></td>`;
    const repl = `<span class="game-opp-name">${g.opp}</span><span class="game-venue-name">${g.venue}</span>${pp(g.pitchers)}</div></td>`;
    s = replaceOnce(s, find, repl, `${filename}: ${g.opp}`);
  }

  if (extraFn) s = extraFn(s);

  save(f.p, s, orig, filename);
}

// OLASIN (5 games)
addRosterPitchers('olasin_roster.html', [
  { opp: "Ghost Nation '27",                             venue: `East Cobb Complex ${M} Field 2 ${M} Marietta, GA`,             pitchers: `Aiden Cary ${M} Kaleb Stockwell` },
  { opp: "Southside Crew",                               venue: `Georgia State University ${M} Stadium ${M} Atlanta, GA`,       pitchers: `Ethan Savinon ${M} Austin Stalbird` },
  { opp: "Ninth Inning Prime National 17U",              venue: `Foley Field ${M} University of Georgia ${M} Athens, GA`,      pitchers: `Jack Fracklin ${M} Austin Stalbird ${M} Alex Wise` },
  { opp: "Marucci Elite Texas Massengale",               venue: `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,             pitchers: `Preston Matricardi ${M} Aiden Cary ${M} Lucas Farrar` },
  { opp: "Elite Baseball Training West - 17u Halverson", venue: `Pickens County High School ${M} Jasper, GA`,                   pitchers: `Rocco Baer ${M} Sterling Reed` },
]);

// McCOY (4 existing games — Thursday game opponent unknown, skip for now)
addRosterPitchers('mccoy_roster.html', [
  { opp: "MLB Breakthrough Series 2027",                 venue: `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,             pitchers: `Nolan Parmer ${M} Austin Smith` },
  { opp: "PBG Select National",                          venue: `Georgia State University ${M} Stadium ${M} Atlanta, GA`,       pitchers: `Dominic Ferreira ${M} Jaegar Bedford ${M} Kevin Sullivan` },
  { opp: "17u East Cobb Select",                         venue: `North Atlanta High School ${M} Atlanta, GA`,                   pitchers: `Bryson Mitchell` },
  { opp: "USA Prime Coastal Scout",                      venue: `Pickens County High School ${M} Jasper, GA`,                   pitchers: `Gavin Shefsky` },
]);

// MENENDEZ (4 existing games + insert Thursday G3 after Elite National / before Friday)
addRosterPitchers('menendez_roster.html', [
  { opp: "Stars Marucci 2027",                           venue: `East Cobb Complex ${M} Field 5 ${M} Marietta, GA`,             pitchers: `Josh Rogerson ${M} Matej Spimr ${M} Trey Glaser` },
  { opp: "Elite National 2027",                          venue: `Georgia State University ${M} Stadium ${M} Atlanta, GA`,       pitchers: `Eddie Orchard ${M} Teegan Turner ${M} Kiano Noa` },
  { opp: "Canes Indiana Scout 2027",                     venue: `North Atlanta High School ${M} Atlanta, GA`,                   pitchers: `Teegan Turner ${M} Jaden Sosa ${M} Matej Spimr` },
  { opp: "NorCal U 2027 Cardinal",                       venue: `East Cobb Complex ${M} Field 3 ${M} Marietta, GA`,             pitchers: `Bryan Eberly ${M} Ryan Dejnak ${M} Trey Glaser` },
], s => {
  // Insert Thursday G3 between Elite National row and Friday header
  const eliteEnd = `<span class="game-opp-name">Elite National 2027</span><span class="game-venue-name">Georgia State University ${M} Stadium ${M} Atlanta, GA</span>${pp(`Eddie Orchard ${M} Teegan Turner ${M} Kiano Noa`)}</div></td><td class="game-result pending">${N}</td></tr>`;
  const friHdr   = dayHdr('FRIDAY', 'June 26');
  const thuHdr   = dayHdr('THURSDAY', 'June 25');
  const menG3Row = rosterGameRow(N, '@', 'Top Tier GA 2027', `University of Georgia ${M} Athens, GA`, `Nico Perez ${M} Alejandro Fernandez ${M} JoJo Guevara`);
  return replaceOnce(s,
    eliteEnd + friHdr,
    eliteEnd + thuHdr + menG3Row + friHdr,
    'menendez thursday g3 roster insert');
});

// THOMAS (5 games)
addRosterPitchers('thomas_roster.html', [
  { opp: "Stacked Baseball 17U",                         venue: `Duluth High School ${M} Duluth, GA`,                           pitchers: `David Paredes ${M} Brady Lavenia` },
  { opp: "Dirtbags American",                            venue: `Milton Pro Players Park ${M} Milton, GA`,                      pitchers: `AJ Wright ${M} Kenneth Martinez ${M} Simon Hanos` },
  { opp: "Canes Tri-State 17U",                         venue: `North Atlanta High School ${M} Atlanta, GA`,                   pitchers: `Bryce Moody ${M} Dylan Willams` },
  { opp: "Factory National",                             venue: `Starr's Mill High School ${M} Fayetteville, GA`,               pitchers: `Gavin Dealy ${M} Joshua Stembridge` },
  { opp: "The Dream 17u American",                       venue: `Morrow High School ${M} Morrow, GA`,                           pitchers: `Peyton Woodward ${M} Jackson Palmer` },
]);

console.log('\nAll done.');
