import { memo, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircle, FaFistRaised } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { MdSportsCricket, MdSportsSoccer, MdVideogameAsset } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";

const MATCHES = [
    {
        id: 1, Icon: MdSportsCricket, path: "/home/cricket", type: "live", sport: "CRICKET",
        title: "Southern Rocks v Mountaineers / Mar 08 2026 13:30 (IST)",
        date: "2026-03-08T13:30", competition: "Zimbabwe T20",
        flags: ["live", "tv", "premium"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 2, Icon: MdSportsCricket, path: "/home/cricket", type: "live", sport: "CRICKET",
        title: "Karachi Region Whites v Bahawalpur Region / Mar 09 2026 16:45 (IST)",
        date: "2026-03-09T16:45", competition: "Pakistan T20",
        flags: ["live", "tv", "fancy", "bm"],
        odds: { h: ["1.31", "1.32"], d: ["-", "-"], a: ["4.1", "4.2"] },
    },
    {
        id: 3, Icon: MdSportsCricket, path: "/home/cricket", type: "virtual", sport: "CRICKET",
        title: "Hobart Hurricanes SRL V Sydney Thunder SRL / Mar 09 2026 18:30 (IST)",
        date: "2026-03-09T18:30", competition: "Big Bash SRL",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 4, Icon: MdSportsCricket, path: "/home/cricket", type: "virtual", sport: "CRICKET",
        title: "Delhi Capitals SRL V Royal Challengers Bangalore SRL / Mar 09 2026 19:30 (IST)",
        date: "2026-03-09T19:30", competition: "IPL SRL",
        flags: ["live"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 5, Icon: MdVideogameAsset, path: "/home/cricket", type: "virtual", sport: "CRICKET",
        title: "NEW ZEALAND T10 VS PAKISTAN T10 / Mar 09 2026 19:30 (IST)",
        date: "2026-03-09T19:30", competition: "T10 League",
        flags: ["live", "tv", "fancy", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 6, Icon: MdVideogameAsset, path: "/home/cricket", type: "virtual", sport: "CRICKET",
        title: "PUNJAB KINGS SO V DELHI CAPITALS SO / Mar 09 2026 19:45 (IST)",
        date: "2026-03-09T19:45", competition: "IPL SRL",
        flags: ["live", "tv", "bm", "game", "t"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 7, Icon: MdVideogameAsset, path: "/home/cricket", type: "virtual", sport: "CRICKET",
        title: "AUSTRALIA T10 VS ENGLAND T10 / Mar 09 2026 19:45 (IST)",
        date: "2026-03-09T19:45", competition: "T10 League",
        flags: ["live", "tv", "bm", "game", "t"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 8, Icon: FaFistRaised, path: "/home/wrestling", type: "premium", sport: "FOOTBALL",
        title: "ASUKA VS SKYE BLUE / Mar 09 2026 20:00 (IST)",
        date: "2026-03-09T20:00", competition: "WWE",
        flags: ["live", "tv", "bm", "game", "t"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 9, Icon: MdSportsSoccer, path: "/home/football", type: "live", sport: "FOOTBALL",
        title: "Argentina v Suriname / Mar 09 2026 20:00 (IST)",
        date: "2026-03-09T20:00", competition: "CONMEBOL",
        flags: ["live", "premium"],
        odds: { h: ["1.22", "-"], d: ["-", "-"], a: ["3.85", "-"] },
    },
    {
        id: 10, Icon: FaFistRaised, path: "/home/wrestling", type: "premium", sport: "FOOTBALL",
        title: "KANE VS ROMAN REIGNS / Mar 09 2026 20:30 (IST)",
        date: "2026-03-09T20:30", competition: "WWE",
        flags: ["live", "bm", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 11, Icon: FaFistRaised, path: "/home/wrestling", type: "premium", sport: "FOOTBALL",
        title: "REY MYSTERIO VS BRONSON REED / Mar 09 2026 21:00 (IST)",
        date: "2026-03-09T21:00", competition: "WWE",
        flags: ["live", "bm", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
    {
        id: 12, Icon: FaFistRaised, path: "/home/wrestling", type: "premium", sport: "FOOTBALL",
        title: "ALBA FYRE VS NIKKI BELLA / Mar 09 2026 21:25 (IST)",
        date: "2026-03-09T21:25", competition: "WWE",
        flags: ["live", "bm", "game"],
        odds: { h: ["-", "-"], d: ["-", "-"], a: ["-", "-"] },
    },
];

// ── Flag Badges ───────────────────────────────────────────────────────────────
const FlagBadges = memo(({ flags }) => (
    <div className="flex flex-col items-end gap-0.5 flex-shrink-0 w-16">
        <div className="flex items-center gap-1">
            {flags.includes("live")    && <FaCircle className="text-[#00FF3A] text-[12px]" />}
            {flags.includes("tv")      && <span className="px-1 rounded-sm leading-none py-0.5"><FaTv className=" text-black md:text-[#F9D210] text-[14px]" /></span>}
            {flags.includes("fancy")   && <span className="text-[15px] text-black md:text-white font-bold">f</span>}
            {flags.includes("g")       && <span className="text-[14px] text-black md:text-white">G</span>}
            {flags.includes("premium") && <span className="text-[10px] bg-purple-400 px-1 rounded-sm font-bold">P</span>}
            {flags.includes("bm")      && <span className="text-[13px] text-black font-bold md:text-white px-1 rounded-sm">BM</span>}
            {flags.includes("game")    && <IoLogoGameControllerB className="text-black text-[20px]" />}
            {flags.includes("t")       && <span className="text-[14px] text-black md:text-white px-1.5 rounded-sm">T</span>}
        </div>
    </div>
));
FlagBadges.displayName = "FlagBadges";

// ── Odds Cell ─────────────────────────────────────────────────────────────────
const OddsCell = memo(({ value, color, cellKey, selected, onSelect }) => (
    <div
        onClick={() => onSelect(cellKey)}
        className={`flex items-center justify-center text-xs font-semibold cursor-pointer
                     transition-all duration-100 py-1 md:py-1.5
                     ${color === "blue" ? "bg-[#72BBEF]" : "bg-[#FAA9BA]"}
                     ${value === "-" ? "text-gray-600" : "text-gray-900"}
                     ${selected === cellKey ? "ring-2 ring-inset ring-black" : ""}`}
    >
        {value}
    </div>
));
OddsCell.displayName = "OddsCell";

// ── Mobile Card ───────────────────────────────────────────────────────────────
const MobileMatchRow = memo(({ match, onNavigate, selected, onSelect }) => {
    const parts = match.title.split(" / ");
    const name  = parts[0];
    const date  = parts.slice(1).join(" / ");

    return (
        <div className="border-b border-gray-200">
            <div
                className="flex items-start justify-between px-2 pt-2 pb-0.5 cursor-pointer"
                onClick={() => onNavigate(match.path, match.id)}
            >
                <span className="text-gray-900  text-sm font-semibold leading-tight flex-1 pr-2">
                    {name}
                </span>
                <FlagBadges flags={match.flags} />
            </div>
            <div className="px-2 leading-0 ">
                <span className="text-red-500 text-xs   font-medium">{date}</span>
            </div>
            <div className="grid grid-cols-6 border-t border-gray-100">
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5 border-r border-gray-100">1</div>
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5 border-r border-gray-100">X</div>
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5">2</div>
            </div>
            <div className="grid px-1 grid-cols-6">
                <OddsCell value={match.odds.h[0]} color="blue" cellKey={`${match.id}-h0`} selected={selected} onSelect={onSelect} />
                <OddsCell value={match.odds.h[1]} color="pink" cellKey={`${match.id}-h1`} selected={selected} onSelect={onSelect} />
                <OddsCell value={match.odds.d[0]} color="blue" cellKey={`${match.id}-d0`} selected={selected} onSelect={onSelect} />
                <OddsCell value={match.odds.d[1]} color="pink" cellKey={`${match.id}-d1`} selected={selected} onSelect={onSelect} />
                <OddsCell value={match.odds.a[0]} color="blue" cellKey={`${match.id}-a0`} selected={selected} onSelect={onSelect} />
                <OddsCell value={match.odds.a[1]} color="pink" cellKey={`${match.id}-a1`} selected={selected} onSelect={onSelect} />
            </div>
        </div>
    );
});
MobileMatchRow.displayName = "MobileMatchRow";

// ── Desktop Row — unchanged ───────────────────────────────────────────────────
const DesktopMatchRow = memo(({ match, onNavigate, selected, onSelect }) => (
    <div
        className="grid border-b border-0.5 border-l border-r border-white"
        style={{ gridTemplateColumns: "1fr 67px 67px 67px 67px 67px 67px", minHeight: "25px" }}
    >
        <div className="flex items-center gap-2 px-1 pr-5 py-0.5 bg-[#787578] transition-colors">
            <match.Icon className="text-white text-base flex-shrink-0" />
            <span
                onClick={() => onNavigate(match.path, match.id)}
                className="text-gray-200 text-[15px] leading-tight flex-1 cursor-pointer
                           hover:underline hover:text-white transition-colors"
            >
                {match.title}
            </span>
            <FlagBadges flags={match.flags} />
        </div>
        <OddsCell value={match.odds.h[0]} color="blue" cellKey={`${match.id}-h0`} selected={selected} onSelect={onSelect} />
        <OddsCell value={match.odds.h[1]} color="pink" cellKey={`${match.id}-h1`} selected={selected} onSelect={onSelect} />
        <OddsCell value={match.odds.d[0]} color="blue" cellKey={`${match.id}-d0`} selected={selected} onSelect={onSelect} />
        <OddsCell value={match.odds.d[1]} color="pink" cellKey={`${match.id}-d1`} selected={selected} onSelect={onSelect} />
        <OddsCell value={match.odds.a[0]} color="blue" cellKey={`${match.id}-a0`} selected={selected} onSelect={onSelect} />
        <OddsCell value={match.odds.a[1]} color="pink" cellKey={`${match.id}-a1`} selected={selected} onSelect={onSelect} />
    </div>
));
DesktopMatchRow.displayName = "DesktopMatchRow";

// ── MatchTable ────────────────────────────────────────────────────────────────
const MatchTable = memo(({ activeSport = "INPLAY", filters = { live: false, virtual: false, premium: false }, viewBy = "TIME" }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const handleNavigate = useCallback((path, id) => navigate(`${path}/${id}`), [navigate]);
    const handleSelect   = useCallback((key) => setSelected(prev => prev === key ? null : key), []);

    const visibleMatches = useMemo(() => {
        let list = activeSport === "INPLAY"
            ? MATCHES.filter((m) => m.flags.includes("live"))
            : MATCHES.filter((m) => m.sport === activeSport);

        const anyActive = filters.live || filters.virtual || filters.premium;
        if (anyActive) {
            list = list.filter((m) =>
                (filters.live    && m.type === "live")    ||
                (filters.virtual && m.type === "virtual") ||
                (filters.premium && m.type === "premium")
            );
        }

        if (viewBy === "TIME") {
            list = [...list].sort((a, b) => a.date.localeCompare(b.date));
        } else if (viewBy === "COMPETITION") {
            list = [...list].sort((a, b) => a.competition.localeCompare(b.competition));
        }

        return list;
    }, [activeSport, filters, viewBy]);

    const emptyState = (
        <div className="text-start bg-[#CCCCCC] text-white px-4 text-md py-2">
            No real-time records found
        </div>
    );

    return (
        <div className="w-full">

            {/* ── MOBILE ── */}
            <div className="md:hidden">
                {visibleMatches.length === 0 ? emptyState : visibleMatches.map((match) => (
                    <MobileMatchRow
                        key={match.id}
                        match={match}
                        onNavigate={handleNavigate}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            {/* ── DESKTOP — exactly as before ── */}
            <div className="hidden md:block w-full bg-[#1e1e1e] overflow-x-auto">
                <div
                    className="grid bg-[#F9D210] border border-[#CCCCCC]"
                    style={{ gridTemplateColumns: "1fr 67px 67px 67px 67px 67px 67px", minHeight: "32px" }}
                >
                    <div className="flex items-center px-3 py-1">
                        <span className="text-gray-800 text-xs font-bold">Game</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-1.5 border-l border-[#CCCCCC]"
                         style={{ gridColumn: "2 / 4" }}>
                        <span className="text-gray-700 text-xs font-bold">1</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-1.5 border-l border-[#CCCCCC]"
                         style={{ gridColumn: "4 / 6" }}>
                        <span className="text-gray-700 text-xs font-bold">X</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center py-1.5 border-l border-[#CCCCCC]"
                         style={{ gridColumn: "6 / 8" }}>
                        <span className="text-gray-700 text-xs font-bold">2</span>
                    </div>
                </div>
                {visibleMatches.length === 0 ? emptyState : visibleMatches.map((match) => (
                    <DesktopMatchRow
                        key={match.id}
                        match={match}
                        onNavigate={handleNavigate}
                        selected={selected}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

        </div>
    );
});
MatchTable.displayName = "MatchTable";

export default MatchTable;