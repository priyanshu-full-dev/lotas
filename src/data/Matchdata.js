import { MdSportsCricket, MdSportsSoccer, MdSportsTennis, MdVideogameAsset } from "react-icons/md";
import { FaFistRaised } from "react-icons/fa";

export const ALL_MATCHES = [
    // ── CRICKET ──────────────────────────────────────────────────────────────
    {
        id: 1, sport: "cricket", type: "live", Icon: MdSportsCricket,
        title: "Southern Rocks v Mountaineers / Mar 08 2026 13:30 (IST)",
        date: "2026-03-08T13:30", competition: "Zimbabwe T20",
        flags: ["live", "tv", "premium"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 2, sport: "cricket", type: "live", Icon: MdSportsCricket,
        title: "Karachi Region Whites v Bahawalpur Region / Mar 09 2026 16:45 (IST)",
        date: "2026-03-09T16:45", competition: "Pakistan T20",
        flags: ["live", "tv", "fancy", "bm"],
        odds: { h: ["1.31", "1.32"], d: ["-", "-"], a: ["4.1", "4.2"] },
    },
    {
        id: 3, sport: "cricket", type: "virtual", Icon: MdSportsCricket,
        title: "Hobart Hurricanes SRL V Sydney Thunder SRL / Mar 09 2026 18:30 (IST)",
        date: "2026-03-09T18:30", competition: "Big Bash SRL",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 4, sport: "cricket", type: "virtual", Icon: MdSportsCricket,
        title: "Delhi Capitals SRL V Royal Challengers Bangalore SRL / Mar 09 2026 19:30 (IST)",
        date: "2026-03-09T19:30", competition: "IPL SRL",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 5, sport: "cricket", type: "virtual", Icon: MdVideogameAsset,
        title: "NEW ZEALAND T10 VS PAKISTAN T10 / Mar 09 2026 19:30 (IST)",
        date: "2026-03-09T19:30", competition: "T10 League",
        flags: ["live", "tv", "fancy", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 6, sport: "cricket", type: "virtual", Icon: MdVideogameAsset,
        title: "PUNJAB KINGS SO V DELHI CAPITALS SO / Mar 09 2026 19:45 (IST)",
        date: "2026-03-09T19:45", competition: "IPL SRL",
        flags: ["live", "tv", "bm", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 7, sport: "cricket", type: "premium", Icon: MdSportsCricket,
        title: "India V New Zealand / Mar 10 2026 14:00 (IST)",
        date: "2026-03-10T14:00", competition: "ICC Test Series",
        flags: ["live", "tv", "bm", "premium"],
        odds: { h: ["1.5", "1.52"], d: ["-", "-"], a: ["2.8", "2.9"] },
    },
    {
        id: 8, sport: "cricket", type: "premium", Icon: MdSportsCricket,
        title: "Australia V England / Mar 10 2026 09:30 (IST)",
        date: "2026-03-10T09:30", competition: "The Ashes",
        flags: ["live", "bm", "premium"],
        odds: { h: ["1.9", "2.0"], d: ["-", "-"], a: ["2.1", "2.2"] },
    },

    // ── FOOTBALL ─────────────────────────────────────────────────────────────
    {
        id: 9, sport: "football", type: "live", Icon: MdSportsSoccer,
        title: "UEFA Champions League / Feb 26 2026 08:05 (IST)",
        date: "2026-02-26T08:05", competition: "UEFA Champions League",
        flags: ["live", "bm"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 10, sport: "football", type: "live", Icon: MdSportsSoccer,
        title: "Daejeon Citizen v Gimcheon Sangmu / Mar 14 2026 12:15 (IST)",
        date: "2026-03-14T12:15", competition: "K League",
        flags: ["live", "tv", "g"],
        odds: { h: ["15", "0"], d: ["1.08", "1.11"], a: ["22", "0"] },
    },
    {
        id: 11, sport: "football", type: "live", Icon: MdSportsSoccer,
        title: "Shandong Taishan v Beijing Guoan / Mar 14 2026 12:15 (IST)",
        date: "2026-03-14T12:15", competition: "Chinese Super League",
        flags: ["live", "tv", "g"],
        odds: { h: ["1.1", "1.11"], d: ["10.5", "12.5"], a: ["90", "270"] },
    },
    {
        id: 12, sport: "football", type: "virtual", Icon: MdSportsSoccer,
        title: "Gyeongnam v Cheongju FC / Mar 14 2026 12:15 (IST)",
        date: "2026-03-14T12:15", competition: "K League 2",
        flags: ["live", "tv", "g"],
        odds: { h: ["12.5", "29"], d: ["1.09", "1.11"], a: ["21", "270"] },
    },
    {
        id: 13, sport: "football", type: "virtual", Icon: MdSportsSoccer,
        title: "Zhejiang Greentown v Shanghai Shenhua / Mar 14 2026 12:15 (IST)",
        date: "2026-03-14T12:15", competition: "Chinese Super League",
        flags: ["live", "tv", "g"],
        odds: { h: ["8", "9.2"], d: ["1.3", "1.32"], a: ["7.6", "9"] },
    },
    {
        id: 14, sport: "football", type: "premium", Icon: MdSportsSoccer,
        title: "Real Madrid V Manchester City / Mar 12 2026 20:00 (IST)",
        date: "2026-03-12T20:00", competition: "UEFA Champions League",
        flags: ["live", "tv", "bm", "premium"],
        odds: { h: ["2.1", "2.2"], d: ["3.5", "3.6"], a: ["3.2", "3.3"] },
    },
    {
        id: 15, sport: "football", type: "premium", Icon: MdSportsSoccer,
        title: "Barcelona V Arsenal / Mar 13 2026 22:00 (IST)",
        date: "2026-03-13T22:00", competition: "UEFA Champions League",
        flags: ["live", "bm", "premium"],
        odds: { h: ["1.8", "1.9"], d: ["3.8", "4.0"], a: ["4.5", "4.6"] },
    },

    // ── TENNIS ───────────────────────────────────────────────────────────────
    {
        id: 16, sport: "tennis", type: "live", Icon: MdSportsTennis,
        title: "Cobolli V Tiafoe / Mar 09 2026 05:10 (IST)",
        date: "2026-03-09T05:10", competition: "ATP Masters",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 17, sport: "tennis", type: "live", Icon: MdSportsTennis,
        title: "G Diallo V F Auger-Aliassime / Mar 09 2026 05:10 (IST)",
        date: "2026-03-09T05:10", competition: "ATP Masters",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 18, sport: "tennis", type: "live", Icon: MdSportsTennis,
        title: "C Gauff V Al Eala / Mar 09 2026 05:15 (IST)",
        date: "2026-03-09T05:15", competition: "WTA Masters",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 19, sport: "tennis", type: "virtual", Icon: MdSportsTennis,
        title: "Djokovic V Alcaraz / Mar 10 2026 17:00 (IST)",
        date: "2026-03-10T17:00", competition: "ATP Finals",
        flags: ["live", "tv"],
        odds: { h: ["1.6", "1.7"], d: ["-", "-"], a: ["2.3", "2.4"] },
    },
    {
        id: 20, sport: "tennis", type: "premium", Icon: MdSportsTennis,
        title: "Sinner V Medvedev / Mar 11 2026 15:00 (IST)",
        date: "2026-03-11T15:00", competition: "ATP Masters 1000",
        flags: ["live", "bm", "premium"],
        odds: { h: ["1.4", "1.5"], d: ["-", "-"], a: ["2.9", "3.0"] },
    },

    // ── HORSE RACING ─────────────────────────────────────────────────────────
    {
        id: 21, sport: "horse-racing", type: "live", Icon: MdSportsCricket,
        title: "Cheltenham Gold Cup / Mar 14 2026 16:30 (IST)",
        date: "2026-03-14T16:30", competition: "Cheltenham Festival",
        flags: ["live", "tv"],
        odds: { h: ["3.5", "4.0"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 22, sport: "horse-racing", type: "live", Icon: MdSportsCricket,
        title: "Royal Ascot Race 1 / Mar 15 2026 14:00 (IST)",
        date: "2026-03-15T14:00", competition: "Royal Ascot",
        flags: ["live"],
        odds: { h: ["5.0", "5.5"], d: ["-", "-"], a: ["-", "-"] },
    },

    // ── KABADDI ──────────────────────────────────────────────────────────────
    {
        id: 23, sport: "kabaddi", type: "live", Icon: MdSportsCricket,
        title: "Patna Pirates V U Mumba / Mar 14 2026 20:00 (IST)",
        date: "2026-03-14T20:00", competition: "Pro Kabaddi League",
        flags: ["live", "bm"],
        odds: { h: ["1.8", "1.9"], d: ["-", "-"], a: ["2.0", "2.1"] },
    },
    {
        id: 24, sport: "kabaddi", type: "live", Icon: MdSportsCricket,
        title: "Bengaluru Bulls V Jaipur Pink Panthers / Mar 15 2026 21:00 (IST)",
        date: "2026-03-15T21:00", competition: "Pro Kabaddi League",
        flags: ["live"],
        odds: { h: ["2.2", "2.3"], d: ["-", "-"], a: ["1.7", "1.8"] },
    },

    // ── WRESTLING ─────────────────────────────────────────────────────────────
    {
        id: 25, sport: "wrestling", type: "premium", Icon: FaFistRaised,
        title: "ASUKA VS SKYE BLUE / Mar 09 2026 20:00 (IST)",
        date: "2026-03-09T20:00", competition: "WWE",
        flags: ["live", "tv", "bm", "game", "premium"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 26, sport: "wrestling", type: "premium", Icon: FaFistRaised,
        title: "KANE VS ROMAN REIGNS / Mar 09 2026 20:30 (IST)",
        date: "2026-03-09T20:30", competition: "WWE",
        flags: ["live", "bm", "game", "premium"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
];

// ── Helper — filter by sport key ──────────────────────────────────────────────
export const getMatchesBySport = (sport) =>
    sport === "all" ? ALL_MATCHES : ALL_MATCHES.filter((m) => m.sport === sport);