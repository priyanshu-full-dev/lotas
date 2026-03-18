import { useState, useMemo, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import MatchCard from "./Matchcard";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const ALL_MATCHES = [
    { id: 1,  competition: "Simulated Reality League / Caribbean Premier League SRL", team1: "Antigua And Barbuda Falcons SRL", team2: "St Kitts And Nevis Patriots SRL", date: "Today", time: "06:30 AM", live: true,  score: "15 : 0",   odds: ["1.83", null,  "1.95"] },
    { id: 2,  competition: "Simulated Reality League / Super Smash SRL",              team1: "Auckland SRL",                   team2: "Wellington SRL",                  date: "Today", time: "05:30 AM", live: true,  score: "44 : 193", odds: [null,   null,  null]  },
    { id: 3,  competition: "Virtual Cricket / Virtual Cricket In-Play",               team1: "Delhi",                          team2: "Punjab",                          date: "Today", time: "04:11 AM", live: true,  score: "97 : 179", odds: ["1.7",  null,  "3.6"] },
    { id: 4,  competition: "Australia / Sheffield Shield",                            team1: "New South Wales",                team2: "Queensland",                      date: "Today", time: "03:00 AM", live: false, score: "0 : 0",    odds: ["1.9",  null,  "1.8"] },
    { id: 5,  competition: "International / T20 International",                      team1: "India",                          team2: "South Africa",                    date: "Today", time: "02:00 PM", live: false, score: "0 : 0",    odds: ["1.4",  null,  "2.8"] },
    { id: 6,  competition: "Simulated Reality League / Caribbean Premier League SRL", team1: "Barbados Royals SRL",            team2: "Jamaica Tallawahs SRL",           date: "Today", time: "08:00 AM", live: false, score: "0 : 0",    odds: ["2.1",  null,  "1.7"] },
    { id: 7,  competition: "India / T20 Ayodhya Premier League",                     team1: "Yamuna Super Kings",             team2: "Chambal Chargers",                date: "Today", time: "09:00 AM", live: false, score: "0 : 0",    odds: ["2.16", null,  "1.62"] },
    { id: 8,  competition: "Simulated Reality League / Super Smash SRL",              team1: "Canterbury SRL",                 team2: "Otago SRL",                       date: "Today", time: "07:30 AM", live: false, score: "0 : 0",    odds: ["1.6",  null,  "2.2"] },
    { id: 9,  competition: "Virtual Cricket / Virtual Cricket In-Play",               team1: "Mumbai",                         team2: "Kolkata",                         date: "Today", time: "03:45 AM", live: true,  score: "120 : 88", odds: ["1.3",  null,  "3.1"] },
    { id: 10, competition: "International / T20 International",                      team1: "Australia",                      team2: "England",                         date: "Today", time: "11:00 AM", live: false, score: "0 : 0",    odds: ["1.8",  null,  "2.0"] },
];

// ── Competition Chip ──────────────────────────────────────────────────────────
const CompChip = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[11px] font-semibold
                    whitespace-nowrap flex-shrink-0 transition-colors
                    ${active
                        ? "bg-[#0F2462] text-white border-[#0F2462]"
                        : "bg-[#E5E5E5] text-gray-600 border-gray-300 hover:bg-gray-300"
                    }`}
    >
        <BsGlobe className="text-[11px]" />
        {label}
    </button>
);

// ── Category Card ─────────────────────────────────────────────────────────────
const CategoryCard = ({ competition, query, active, onClick }) => {
    const short = competition.split("/").map(s => s.trim());
    const highlight = (text) => {
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <span className="text-[#0F2462] font-black">{text.slice(idx, idx + query.length)}</span>
                {text.slice(idx + query.length)}
            </>
        );
    };
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center px-3 py-3 rounded-sm border
                        text-[11px] text-center transition-colors min-w-[90px] flex-shrink-0
                        ${active
                            ? "bg-[#0F2462] text-white border-[#0F2462]"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
        >
            {short.map((s, i) => (
                <div key={i} className="leading-tight truncate w-full">{highlight(s)}</div>
            ))}
        </button>
    );
};

// ── Quick Search ──────────────────────────────────────────────────────────────
const QuickSearch = () => {
    const [query,      setQuery]      = useState("");
    const [activeComp, setActiveComp] = useState(null);
    const inputRef = useRef(null);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return ALL_MATCHES.filter(m =>
            m.team1.toLowerCase().includes(q) ||
            m.team2.toLowerCase().includes(q) ||
            m.competition.toLowerCase().includes(q)
        );
    }, [query]);

    const competitions = useMemo(() =>
        [...new Set(results.map(m => m.competition))],
        [results]
    );

    const displayed = useMemo(() =>
        activeComp ? results.filter(m => m.competition === activeComp) : results,
        [results, activeComp]
    );

    const clearSearch    = () => { setQuery(""); setActiveComp(null); inputRef.current?.focus(); };
    const handleCompClick = (c) => setActiveComp(prev => prev === c ? null : c);

    return (
        <div className="bg-[#D9D9D9] min-h-screen py-3 px-2 font-sans">
            <div className="max-w-5xl">

                <h2 className="text-[20px] font-bold text-gray-900 tracking-widest md:mb-5 uppercase">
                    Quick Search
                </h2>

                {/* Search Bar */}
                <div className="relative mb-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActiveComp(null); }}
                        className="w-full pl-10 pr-10 py-2 md:py-3 bg-[#CCCCCC] border border-gray-300
                                   rounded-sm text-[14px] outline-none text-gray-800 placeholder-gray-400
                                  "
                    />
                    {query && (
                        <button onClick={clearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            
                        </button>
                    )}
                </div>

                {query.trim() ? (
                    <>
                        {/* Competition filter chips */}
                        {competitions.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 mb-3 border-b border-gray-300 pt-2"
                                 style={{ scrollbarWidth: "none" }}>
                                {competitions.map(c => (
                                    <CompChip key={c} label={c} active={activeComp === c} onClick={() => handleCompClick(c)} />
                                ))}
                            </div>
                        )}

                        {/* Result count */}
                        <div className="text-center text-[20px] md:text-[15px] font-bold text-gray-700 md:my-4">
                            {results.length} Results Found
                        </div>

                        {/* Category cards */}
                        {competitions.length > 0 && (
                            <div className="md:flex gap-2  hidden overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "none" }}>
                                {competitions.map(c => (
                                    <CategoryCard key={c} competition={c} query={query}
                                        active={activeComp === c} onClick={() => handleCompClick(c)} />
                                ))}
                            </div>
                        )}

                        <div className="border-b border-gray-300 mb-2" />

                        {/* ── Match cards using shared MatchCard component ── */}
                        {displayed.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-8">No matches found</p>
                        ) : (
                            displayed.map(m => <MatchCard key={m.id} match={m} />)
                        )}
                    </>
                ) : (
                    <>
                        <div className="border-b border-gray-300 my-4" />
                        <div className="flex justify-center mt-8">
                            <div className="bg-[#CCCCCC] border border-gray-300 rounded-sm px-16 py-8 text-center">
                                <p className="text-[15px] font-bold text-gray-800 mb-1">Quickly Search</p>
                                <p className="text-[13px] text-gray-500">Finding for something special?</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuickSearch;