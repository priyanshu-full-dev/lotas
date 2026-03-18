import { FaCalendarAlt, FaPlay, FaStar, FaFileAlt, FaSearch } from "react-icons/fa";
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis, MdSportsBasketball, MdSportsBaseball, MdSportsHandball } from "react-icons/md";

export const SIDEBAR_BTNS = [
    { label: "Events",    Icon: FaCalendarAlt, active: true },
    { label: "Live",      Icon: FaPlay },
    { label: "Favourite", Icon: FaStar },
    { label: "My Bets",   Icon: FaFileAlt },
    { label: "Results",   Icon: FaCalendarAlt },
    { label: "Search",    Icon: FaSearch },
];

export const SPORTS = [
    { label: "Cricket",          Icon: MdSportsCricket,   count: 23 },
    { label: "Soccer",           Icon: MdSportsSoccer,    count: 185 },
    { label: "Tennis",           Icon: MdSportsTennis,    count: 75 },
    { label: "SRL",              Icon: MdSportsCricket,   count: 20 },
    { label: "American Football",Icon: MdSportsHandball,  count: 0 },
    { label: "Badminton",        Icon: MdSportsTennis,    count: 0 },
    { label: "Baseball",         Icon: MdSportsBaseball,  count: 17 },
    { label: "Basketball",       Icon: MdSportsBasketball,count: 0 },
];

export const BANNERS = [
    { id: 1, bg: "#1a3a5c", title: "SOUTH AFRICA TOUR OF NEW ZEALAND 2026", sub: "5 T20S • 15 MAR – 25 MAR, 2026" },
    { id: 2, bg: "#2a1a4a", title: "ICC CHAMPIONS TROPHY 2026",              sub: "Win Big Every Match" },
    { id: 3, bg: "#1a4a2a", title: "IPL 2026 SEASON",                        sub: "Best Odds Guaranteed" },
    { id: 4, bg: "#4a2a1a", title: "UEFA CHAMPIONS LEAGUE",                  sub: "Quarter Finals Live" },
    { id: 5, bg: "#3a1a1a", title: "WIMBLEDON 2026",                         sub: "Tennis Grand Slam" },
    { id: 6, bg: "#1a4a4a", title: "NBA PLAYOFFS 2026",                      sub: "Live Betting Available" },
];

export const LIVE_EVENTS = [
    // CRICKET
    { id: 1, sport: "Cricket", type: "live", date: "Today", time: "07:00 AM", live: true, competition: "International / ODI Series Malaysia vs Bah..", team1: "Malaysia", team2: "Bahrain", score: "134 : 0", odds: ["1.46", null, "2.52"] },
    { id: 2, sport: "Cricket", type: "live", date: "Mar 14", time: "05:00 AM", live: true, competition: "Australia / Sheffield Shield", team1: "Victoria", team2: "South Australia Redbacks", score: "298 : 305", odds: [null, null, null] },
    { id: 3, sport: "Cricket", type: "live", date: "Today", time: "08:30 AM", live: true, competition: "India / Ranji Trophy", team1: "Mumbai", team2: "Delhi", score: "145 : 201", odds: ["1.22", null, "3.85"] },

    // SOCCER
    { id: 10, sport: "Soccer", type: "live", date: "Today", time: "07:30 AM", live: true, competition: "Mexico / Liga MX, Women, Clausura", team1: "CF Tigres UANL [W]", team2: "Queretaro FC [W]", score: "3 : 0", odds: ["1", "10.7", "30"] },
    { id: 11, sport: "Soccer", type: "live", date: "Today", time: "07:00 AM", live: true, competition: "Colombia / Liga DIMAYOR", team1: "CD Junior FC", team2: "Fortaleza FC", score: "1 : 1", odds: ["6.1", "1.19", "7.9"] },
    { id: 12, sport: "Soccer", type: "live", date: "Today", time: "07:00 AM", live: true, competition: "USA / MLS Next Pro", team1: "Whitecaps FC 2", team2: "Minnesota United FC 2", score: "2 : 1", odds: ["1.14", "5.53", "12.26"] },
    { id: 13, sport: "Soccer", type: "live", date: "Today", time: "07:00 AM", live: true, competition: "Honduras / Liga Nacional, Clausura", team1: "CD Victoria La Ceiba", team2: "Platense FC Puerto Cortes", score: "0 : 0", odds: ["3", "3.15", "2.3"] },

    // TENNIS
    { id: 20, sport: "Tennis", type: "live", date: "Today", time: "06:00 AM", live: true, competition: "ATP / Masters 1000", team1: "Djokovic N.", team2: "Alcaraz C.", score: "6 : 4", odds: ["1.5", null, "2.6"] },
    { id: 21, sport: "Tennis", type: "live", date: "Today", time: "07:30 AM", live: true, competition: "WTA / Premier", team1: "Swiatek I.", team2: "Gauff C.", score: "3 : 6", odds: ["1.8", null, "2.0"] },

    // SRL
    { id: 30, sport: "SRL", type: "live", date: "Today", time: "07:00 AM", live: true, competition: "SRL / Virtual T20", team1: "SRL Mumbai", team2: "SRL Delhi", score: "120 : 0", odds: ["1.9", null, "1.9"] },

    // BASKETBALL
    { id: 40, sport: "Basketball", type: "live", date: "Today", time: "08:00 AM", live: true, competition: "NBA / Regular Season", team1: "Lakers", team2: "Warriors", score: "88 : 92", odds: ["2.1", null, "1.7"] },

    // BASEBALL
    { id: 50, sport: "Baseball", type: "live", date: "Today", time: "09:00 AM", live: true, competition: "MLB / Regular Season", team1: "Yankees", team2: "Red Sox", score: "4 : 2", odds: ["1.6", null, "2.3"] },
];

export const VIRTUAL_EVENTS = [
    { id: 4, sport: "Cricket", type: "virtual", date: "Today", time: "06:34 AM", live: true, competition: "Virtual Cricket / Virtual Cricket In-Play", team1: "Rajasthan", team2: "Bangalore", score: "128 : 18", odds: ["13.5", null, "1.04"] },
    { id: 5, sport: "Cricket", type: "virtual", date: "Today", time: "07:15 AM", live: true, competition: "Virtual Cricket / Virtual Cricket In-Play", team1: "Chennai", team2: "Kolkata", score: "87 : 92", odds: ["2.1", null, "1.7"] },
    { id: 6, sport: "Soccer",  type: "virtual", date: "Today", time: "07:00 AM", live: true, competition: "Virtual Soccer / In-Play", team1: "Virtual Madrid", team2: "Virtual Barca", score: "1 : 0", odds: ["1.8", "3.5", "2.2"] },
    { id: 7, sport: "Tennis",  type: "virtual", date: "Today", time: "07:30 AM", live: true, competition: "Virtual Tennis / In-Play", team1: "V. Federer", team2: "V. Nadal", score: "4 : 3", odds: ["1.5", null, "2.5"] },
];