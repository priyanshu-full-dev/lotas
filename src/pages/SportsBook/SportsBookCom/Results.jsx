import { useState, useMemo } from "react";
import {
    MdSportsCricket, MdSportsFootball, MdSportsBasketball,
    MdSportsBaseball, MdSportsTennis,
} from "react-icons/md";
import { GiShuttlecock, GiBullseye } from "react-icons/gi";
import { FaSearch, FaChevronDown, FaChevronLeft } from "react-icons/fa";

// ── Sports Config ─────────────────────────────────────────────────────────────
const SPORTS = [
    { id: "Cricket",          label: "Cricket",          icon: <MdSportsCricket /> },
    { id: "Soccer",           label: "Soccer",           icon: <MdSportsFootball /> },
    { id: "Tennis",           label: "Tennis",           icon: <MdSportsTennis /> },
    { id: "SRL",              label: "SRL",              icon: <span className="text-[9px] font-black leading-none">SRL</span> },
    { id: "AmericanFootball", label: "American Football",icon: <MdSportsFootball /> },
    { id: "Badminton",        label: "Badminton",        icon: <GiShuttlecock /> },
    { id: "Baseball",         label: "Baseball",         icon: <MdSportsBaseball /> },
    { id: "Basketball",       label: "Basketball",       icon: <MdSportsBasketball /> },
    { id: "Darts",            label: "Darts",            icon: <GiBullseye /> },
];

// ── Mock Results Data ─────────────────────────────────────────────────────────
const RESULTS_DATA = {
    Cricket: {
        "11": [
            {
                id: 1, time: "MAR 11 11:30 PM",
                label: "JOBURG SUPER KINGS SRL PAARL ROYALS SRL",
                title: "Joburg Super Kings SRL vs. Paarl Royals SRL",
                markets: [
                    { question: "Winner (incl. super over)", outcomes: [{ name: "Joburg Super Kings SRL", result: "Lost" }, { name: "Paarl Royals SRL", result: "Won" }] },
                    { question: "Will there be a tie",        outcomes: [{ name: "Yes", result: "Lost" }, { name: "No", result: "Won" }] },
                    { question: "Which team wins the coin toss", outcomes: [{ name: "Joburg Super Kings SRL", result: "Won" }, { name: "Paarl Royals SRL", result: "Lost" }] },
                    { question: "Team with top bowler",       outcomes: [{ name: "Joburg Super Kings SRL", result: "Lost" }, { name: "Paarl Royals SRL", result: "Won" }] },
                ],
            },
            {
                id: 2, time: "MAR 11 10:55 PM",
                label: "KOLKATA HYDERABAD",
                title: "Kolkata Knight Riders vs. Hyderabad Sunrisers",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Kolkata Knight Riders", result: "Won" }, { name: "Hyderabad Sunrisers", result: "Lost" }] },
                    { question: "Will there be a tie", outcomes: [{ name: "Yes", result: "Lost" }, { name: "No", result: "Won" }] },
                ],
            },
            {
                id: 3, time: "MAR 11 09:45 PM",
                label: "KARACHI REGION WHITES PESHAWAR REGION",
                title: "Karachi Region Whites vs. Peshawar Region",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Karachi Region Whites", result: "Lost" }, { name: "Peshawar Region", result: "Won" }] },
                    { question: "Top Run Scorer", outcomes: [{ name: "Karachi Region Whites", result: "Won" }, { name: "Peshawar Region", result: "Lost" }] },
                ],
            },
            {
                id: 4, time: "MAR 11 09:30 PM",
                label: "GUYANA AMAZON WARRIORS SRL ST KITTS AND NEVIS PATRIOTS SRL",
                title: "Guyana Amazon Warriors SRL vs. St Kitts Patriots SRL",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Guyana Amazon Warriors SRL", result: "Won" }, { name: "St Kitts Patriots SRL", result: "Lost" }] },
                    { question: "Which team wins the coin toss", outcomes: [{ name: "Guyana Amazon Warriors SRL", result: "Lost" }, { name: "St Kitts Patriots SRL", result: "Won" }] },
                ],
            },
            {
                id: 5, time: "MAR 11 08:30 PM",
                label: "MUMBAI INDIANS VS CHENNAI SUPER KINGS",
                title: "Mumbai Indians vs. Chennai Super Kings",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Mumbai Indians", result: "Won" }, { name: "Chennai Super Kings", result: "Lost" }] },
                    { question: "Will there be a tie", outcomes: [{ name: "Yes", result: "Lost" }, { name: "No", result: "Won" }] },
                    { question: "Which team wins the coin toss", outcomes: [{ name: "Mumbai Indians", result: "Won" }, { name: "Chennai Super Kings", result: "Lost" }] },
                ],
            },
        ],
        "12": [
            {
                id: 6, time: "MAR 12 03:00 PM",
                label: "DELHI CAPITALS VS RAJASTHAN ROYALS",
                title: "Delhi Capitals vs. Rajasthan Royals",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Delhi Capitals", result: "Won" }, { name: "Rajasthan Royals", result: "Lost" }] },
                ],
            },
        ],
    },
    Soccer: {
        "11": [
            {
                id: 10, time: "MAR 11 08:00 PM",
                label: "ARSENAL VS CHELSEA",
                title: "Arsenal vs. Chelsea",
                markets: [
                    { question: "Match Winner", outcomes: [{ name: "Arsenal", result: "Won" }, { name: "Draw", result: "Lost" }, { name: "Chelsea", result: "Lost" }] },
                    { question: "Both teams to score", outcomes: [{ name: "Yes", result: "Won" }, { name: "No", result: "Lost" }] },
                ],
            },
        ],
    },
};

// ── Generate rolling 7-day date tabs ─────────────────────────────────────────
const generateDates = () => {
    const DAYS = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - 6 + i);
        return { day: d.getDate(), label: DAYS[d.getDay()], key: String(d.getDate()) };
    });
};
const DATE_TABS = generateDates();

// ── Outcome Card ──────────────────────────────────────────────────────────────
const OutcomeCard = ({ name, result }) => (
    <div className="flex items-center justify-between bg-[#0F2462] text-white
                    px-4 py-2.5 rounded-sm text-[13px] font-semibold flex-1 min-w-[140px]">
        <span className="truncate pr-2">{name}</span>
        <span className={`text-xs font-bold flex-shrink-0 ${result === "Won" ? "text-green-400" : "text-red-400"}`}>
            {result}
        </span>
    </div>
);

// ── Market Block ──────────────────────────────────────────────────────────────
const MarketBlock = ({ question, outcomes }) => (
    <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px] font-semibold text-gray-700">{question}</span>
            <span className="text-gray-400 text-sm">∧</span>
        </div>
        <div className="flex gap-2 flex-wrap">
            {outcomes.map((o, i) => <OutcomeCard key={i} {...o} />)}
        </div>
    </div>
);

// ── Match Detail Panel ────────────────────────────────────────────────────────
const MatchDetail = ({ match, onBack }) => (
    <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile back button */}
        {onBack && (
            <button
                onClick={onBack}
                className="flex md:hidden items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200 text-[13px] font-semibold text-[#0F2462]"
            >
                <FaChevronLeft className="text-[11px]" />
                Back to list
            </button>
        )}
        <div className="bg-[#0F2462] text-white px-5 py-3 text-[14px] font-bold">
            {match.title}
        </div>
        <div className="bg-[#EFEFEF] border-b border-gray-300 px-5 pt-2 pb-0">
            <span className="inline-block pb-2 border-b-2 border-[#0F2462]
                             text-[12px] font-bold text-[#0F2462] tracking-wide">
                ALL
            </span>
        </div>
        <div className="bg-[#EFEFEF] p-5 overflow-y-auto flex-1"
             style={{ maxHeight: "480px" }}>
            {match.markets.map((m, i) => <MarketBlock key={i} {...m} />)}
        </div>
    </div>
);

// ── Results Page ──────────────────────────────────────────────────────────────
const Results = () => {
    const [activeDate,    setActiveDate]    = useState(null);
    const [activeSport,   setActiveSport]   = useState(null);
    const [activeMatch,   setActiveMatch]   = useState(null);
    const [search,        setSearch]        = useState("");
    const [searchOpen,    setSearchOpen]    = useState(false); // mobile search dropdown open

    const matches = useMemo(() => {
        if (!activeSport || !activeDate) return [];
        return RESULTS_DATA[activeSport]?.[activeDate] ?? [];
    }, [activeSport, activeDate]);

    const filtered = useMemo(() =>
        matches.filter(m => m.label.toLowerCase().includes(search.toLowerCase())),
        [matches, search]
    );

    const handleDate  = (key) => { setActiveDate(key);  setActiveMatch(null); setSearch(""); setSearchOpen(false); };
    const handleSport = (id)  => { setActiveSport(id);  setActiveMatch(null); setSearch(""); setSearchOpen(false); };
    const showPanel   = activeSport && activeDate;

    return (
        <div className="bg-[#D9D9D9] min-h-screen font-sans">

            {/* ══════════════════════════════════════════════════════
                DESKTOP
            ══════════════════════════════════════════════════════ */}
            <div className="hidden md:block py-3 px-1">
                <div className="max-w-5xl">
                    <h2 className="text-[20px] font-bold text-gray-900 tracking-widest mb-5 uppercase">
                        Results
                    </h2>

                    {/* Date Tabs */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {DATE_TABS.map(({ day, label, key }) => (
                            <button key={key} onClick={() => handleDate(key)}
                                className={`px-4 py-2 rounded-sm text-[12px] font-bold tracking-wide border transition-colors
                                    ${activeDate === key
                                        ? "bg-[#0F2462] text-white border-[#0F2462]"
                                        : "bg-[#CCCCCC] text-gray-600 border-gray-300 hover:bg-gray-300"
                                    }`}>
                                {day} {label}
                            </button>
                        ))}
                    </div>

                    {/* Sport Tabs */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {SPORTS.map(({ id, label, icon }) => (
                            <button key={id} onClick={() => handleSport(id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[13px] tborder transition-colors
                                    ${activeSport === id
                                        ? "bg-[#0F2462] text-white border-[#0F2462]"
                                        : "bg-[#CCCCCC] text-gray-600 border-gray-300 hover:bg-gray-300"
                                    }`}>
                                <span className="text-[17px] leading-none">{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Split Panel */}
                    {showPanel && (
                        <div className="flex border border-gray-300 rounded-sm overflow-hidden shadow-sm"
                             style={{ minHeight: "300px" }}>
                            <div className="w-[270px] flex-shrink-0 bg-[#F2F2F2] border-r border-gray-200 flex flex-col">
                                <div className="relative border-b border-gray-200">
                                    <input type="text" placeholder="Search Event" value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full pl-8 pr-3 py-3 text-[16px] hover:border text-black placeholder-black bg-[#F2F2F2] focus:outline-none" />
                                </div>
                                <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
                                    {filtered.length === 0 ? (
                                        <p className="px-4 py-6 text-xs text-gray-400 text-center">No results found</p>
                                    ) : filtered.map(match => (
                                        <button key={match.id} onClick={() => setActiveMatch(match)}
                                            className={`w-full text-left px-4 py-3 border-b border-gray-100 transition-colors
                                                ${activeMatch?.id === match.id
                                                    ? "bg-[#0F2462] text-white"
                                                    : "hover:bg-gray-50 text-gray-800"
                                                }`}>
                                            <div className={`text-[10px] font-semibold mb-1 tracking-wide uppercase
                                                ${activeMatch?.id === match.id ? "text-blue-300" : "text-gray-400"}`}>
                                                {match.time}
                                            </div>
                                            <div className="text-[12px] font-bold leading-snug uppercase">
                                                {match.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {activeMatch ? (
                                <MatchDetail match={activeMatch} />
                            ) : (
                                <div className="flex-1 flex items-center justify-center bg-[#F0F0F0] text-gray-400 text-sm">
                                    Select a match to view results
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════
                MOBILE
            ══════════════════════════════════════════════════════ */}
            <div className="flex md:hidden flex-col">

                {/* Title */}
                <div className=" pt-3 px-0.5 pb-2">
                    <h2 className="text-[18px] font-bold text-gray-900 tracking-widest uppercase">Results</h2>
                </div>

                {/* ── Step 1: Date Tabs (horizontal scroll) ── */}
                <div className="overflow-x-auto px-0.5  pb-2" style={{ scrollbarWidth: "none" }}>
                    <div className="flex gap-2 w-max">
                        {DATE_TABS.map(({ day, label, key }) => (
                            <button key={key} onClick={() => handleDate(key)}
                                className={`px-2 py-1 rounded-sm text-[15px] font-extralight tracking-wide border transition-colors whitespace-nowrap
                                    ${activeDate === key
                                        ? "bg-[#0F2462] text-white border-[#0F2462]"
                                        : "bg-[#CCCCCC] text-gray-600 border-gray-300"
                                    }`}>
                                {day} {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Sport icon tabs (always visible) ── */}
                <div className="overflow-x-auto px-0.5 mt-2 pb-3" style={{ scrollbarWidth: "none" }}>
                    <div className="flex gap-2 w-max">
                        {SPORTS.map(({ id, icon, label }) => (
                            <button key={id} onClick={() => handleSport(id)}
                                title={label}
                                className={`w-15 h-9 flex items-center justify-center rounded-sm border text-[18px] transition-colors
                                    ${activeSport === id
                                        ? "bg-[#0F2462] text-white border-[#0F2462]"
                                        : "bg-[#CCCCCC] text-gray-600 border-gray-300"
                                    }`}>
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Step 3+4: Search dropdown + inline match detail ── */}
                {showPanel && (
                    <div className=" mb-3 flex flex-col gap-0">

                        {/* Search Event dropdown */}
                        <div className="bg-transparent border border-gray-300 rounded-sm overflow-hidden mb-2">
                            <button
                                onClick={() => setSearchOpen(p => !p)}
                                className="w-full flex items-center justify-between px-3 border rounded py-4 bg-transparent"
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    
                                    <span className="text-[16px] text-gray-500 truncate">
                                        {activeMatch ? activeMatch.title : "Search Event"}
                                    </span>
                                </div>
                                <FaChevronDown className="text-gray-500 text-[11px] flex-shrink-0 ml-2" />
                            </button>

                            {/* Dropdown list */}
                            {searchOpen && (
                                <div className="border-t border-gray-200">
                                    {/* Search input */}
                                    <div className="relative border-b border-gray-200">
                                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[11px]" />
                                        <input
                                            type="text"
                                            placeholder="Search Event"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            autoFocus
                                            className="w-full pl-8 pr-3 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none trans"
                                        />
                                    </div>
                                    {/* Match options */}
                                    <div className="overflow-y-auto" style={{ maxHeight: "40vh" }}>
                                        {filtered.length === 0 ? (
                                            <p className="px-4 py-4 text-xs text-gray-400 text-center">No results found</p>
                                        ) : filtered.map(match => (
                                            <button key={match.id}
                                                onClick={() => { setActiveMatch(match); setSearchOpen(false); }}
                                                className={`w-full text-left px-4 py-3 border-b border-gray-100 text-[13px] font-medium
                                                    ${activeMatch?.id === match.id ? "bg-[#f0f4ff] text-[#0F2462]" : "text-gray-800 hover:bg-gray-50"}`}>
                                                {match.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Inline match detail — shown below dropdown */}
                        {activeMatch && (
                            <div className="bg-white border border-gray-300 rounded-sm overflow-hidden">
                                {/* Match title header */}
                                <div className="bg-[#0F2462] text-white px-4 py-3 text-[13px] font-bold text-center">
                                    {activeMatch.title}
                                </div>
                                {/* ALL tab */}
                                <div className="bg-[#EFEFEF] border-b border-gray-300 px-4 pt-2 pb-0">
                                    <span className="inline-block pb-2 border-b-2 border-[#0F2462] text-[12px] font-bold text-[#0F2462] tracking-wide">
                                        ALL
                                    </span>
                                </div>
                                {/* Markets */}
                                <div className="bg-[#EFEFEF] px-3 py-3">
                                    {activeMatch.markets.map((m, i) => (
                                        <div key={i} className="mb-4">
                                            <div className="flex items-center gap-1 mb-2">
                                                <span className="text-[13px] font-semibold text-gray-700">{m.question}</span>
                                                <span className="text-gray-400 text-sm">∧</span>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                {m.outcomes.map((o, j) => (
                                                    <div key={j} className="flex items-center justify-between bg-[#0F2462] text-white px-3 py-2 rounded-sm text-[13px] font-semibold">
                                                        <span className="truncate pr-2">{o.name}</span>
                                                        <span className={`text-xs font-bold flex-shrink-0 ${o.result === "Won" ? "text-green-400" : "text-red-400"}`}>
                                                            {o.result}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Results;