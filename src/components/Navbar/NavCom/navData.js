// ── Nav menu items — add/change paths here anytime ───────────────────────────
export const NAV_ITEMS = [
    { label: "HOME",             path: "/home" },
    { label: "CRICKET",          path: "/home/cricket" },
    { label: "FOOTBALL",         path: "/home/football" },
    { label: "TENNIS",           path: "/home/tennis" },
    { label: "CASINO",           path: "/home/casino" },
    { label: "SPORTS BOOK",      path: "/home/sports-book" },
    { label: "HORSE RACING",     path: "/home/horse-racing" },
    { label: "GREYHOUND RACING", path: "/home/greyhound-racing" },
    { label: "BINARY",           path: "/home/binary" },
    { label: "KABADDI",          path: "/home/kabaddi" },
    { label: "POLITICS",         path: "/home/politics" },
    { label: "BASKETBALL",       path: "/home/basketball" },
    { label: "BASEBALL",         path: "/home/baseball" },
    { label: "TABLE TENNIS",     path: "/home/table-tennis" },
    { label: "VOLLEYBALL",       path: "/home/volleyball" },
    { label: "BOXING",           path: "/home/boxing" },
    { label: "SNOOKER",          path: "/home/snooker" },
    { label: "DARTS",            path: "/home/darts" },
    { label: "CYCLING",          path: "/home/cycling" },
    { label: "RUGBY",            path: "/home/rugby" },
];

// ── Ticker message ────────────────────────────────────────────────────────────
export const TICKER =
    "CUP WINNER BETS STARTED IN OUR EXCHANGE ⚽ 🏏 \u00a0\u00a0 PLAY THE GENIE COMBO SPECIAL BET IN OUR EXCHANGE AND MULTIPLY YOUR WINNINGS 🎯 \u00a0\u00a0 ICC MEN'S T20 WORLD CUP 2026 🏆 \u00a0\u00a0 GET THE BEST ODDS ON ALL SPORTS ✨ \u00a0\u00a0 LIVE BETTING AVAILABLE NOW 🔥 \u00a0\u00a0 ";

// ── Search events — replace with real API call later ─────────────────────────
export const ALL_EVENTS = [
    { sport: "Cricket",    match: "ICC Men's T20 World Cup",                         time: "07/02/2026 11:00:00" },
    { sport: "Football",   match: "UEFA Champions League",                           time: "26/02/2026 05:05:00" },
    { sport: "Tennis",     match: "Prizmic v Fils",                                  time: "07/03/2026 10:28:00" },
    { sport: "Football",   match: "AS Arapiraquense AL vs. CR Brasil AL",            time: "08/03/2026 00:30:00" },
    { sport: "Darts",      match: "Gurney, Daryl vs. Cross, Rob",                    time: "08/03/2026 01:30:00" },
    { sport: "Baseball",   match: "Alabama Crimson Tide vs. North Florida Ospreys",  time: "08/03/2026 01:30:00" },
    { sport: "Football",   match: "Sporting Cristal v Alianza Atletico",             time: "08/03/2026 02:00:00" },
    { sport: "Football",   match: "Criciuma EC SC vs. Camboriu FC SC",               time: "08/03/2026 02:30:00" },
    { sport: "Ice Hockey", match: "Sacred Heart Pioneers vs. Niagara Purple Eagles", time: "08/03/2026 03:30:00" },
    { sport: "Football",   match: "Santa Cruz Acre EC AC vs. Adesg AC",              time: "08/03/2026 03:45:00" },
    { sport: "Cricket",    match: "India v New Zealand",                             time: "08/03/2026 19:00:00" },
    { sport: "Basketball", match: "LA Lakers vs. Boston Celtics",                    time: "09/03/2026 20:00:00" },
];

// ── Global CSS — keyframes & scrollbar only ───────────────────────────────────
export const GLOBAL_CSS = `
  @keyframes ticker-move {
    0%   { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .ticker-run {
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    animation: ticker-move 30s linear infinite;
  }
  
  @keyframes search-expand {
    from { width: 0; opacity: 0; }
    to   { width: 320px; opacity: 1; }
  }   
  .search-expand {
    animation: search-expand 0.25s ease-out forwards;
    width: 320px;
  }
`;
