import { memo, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { MdVideogameAsset } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";

// ── Flag Badges ───────────────────────────────────────────────────────────────
const FlagBadges = memo(({ flags }) => (
    <div className="flex flex-col items-end gap-0.5 flex-shrink-0 w-16">
        <div className="flex items-center gap-1">
            {flags.includes("live")    && <FaCircle className="text-[#00FF3A] text-[12px]" />}
            {flags.includes("tv")      && <FaTv className="text-black md:text-[#F9D210] text-[14px]" />}
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

// ── Mobile Match Row ──────────────────────────────────────────────────────────
const MobileMatchRow = memo(({ match, basePath, selected, onSelect, onNavigate }) => {
    const parts = match.title.split(" / ");
    const name  = parts[0];
    const date  = parts.slice(1).join(" / ");

    return (
        <div className="bg-white border-b border-gray-200 mb-1">
            <div
                className="flex items-start justify-between px-2 pt-2 pb-0.5 cursor-pointer"
                onClick={() => onNavigate(`${basePath}/${match.id}`)}
            >
                <span className="text-gray-900 text-sm font-semibold leading-tight flex-1 pr-2">
                    {name}
                </span>
                <FlagBadges flags={match.flags} />
            </div>
            <div className="px-2 pb-1">
                <span className="text-red-500 text-xs font-medium">{date}</span>
            </div>
            <div className="grid grid-cols-6 border-t border-gray-100">
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5 border-r border-gray-100">1</div>
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5 border-r border-gray-100">X</div>
                <div className="col-span-2 text-center text-xs font-bold text-gray-800 py-0.5">2</div>
            </div>
            <div className="grid grid-cols-6">
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

// ── Desktop Match Row ─────────────────────────────────────────────────────────
const DesktopMatchRow = memo(({ match, basePath, selected, onSelect, onNavigate }) => (
    <div
        className="grid border-b border-0.5 border-l border-r border-white"
        style={{ gridTemplateColumns: "1fr 67px 67px 67px 67px 67px 67px", minHeight: "25px" }}
    >
        <div className="flex items-center gap-2 px-1 pr-5 py-0.5 bg-[#787578] transition-colors">
            {match.Icon && <match.Icon className="text-white text-base flex-shrink-0" />}
            <span
                onClick={() => onNavigate(`${basePath}/${match.id}`)}
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

// ── SportTable (merged) ───────────────────────────────────────────────────────
// Props:
//   matches    — array of match objects
//   basePath   — base navigation path e.g. "/home/cricket"
//   filters    — { live, virtual, premium } booleans
//   viewBy     — "TIME" | "COMPETITION"
const SportTable = memo(({ matches = [], basePath = "/home", filters = { live: false, virtual: false, premium: false }, viewBy = "TIME" }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const handleNavigate = useCallback((path) => navigate(path), [navigate]);
    const handleSelect   = useCallback((key) => setSelected(prev => prev === key ? null : key), []);

    const visibleMatches = useMemo(() => {
        let list = [...matches];

        const anyActive = filters.live || filters.virtual || filters.premium;
        if (anyActive) {
            list = list.filter(m =>
                (filters.live    && m.type === "live")    ||
                (filters.virtual && m.type === "virtual") ||
                (filters.premium && m.type === "premium")
            );
        }

        if (viewBy === "TIME") {
            list = list.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
        } else if (viewBy === "COMPETITION") {
            list = list.sort((a, b) => (a.competition ?? "").localeCompare(b.competition ?? ""));
        }

        return list;
    }, [matches, filters, viewBy]);

    const emptyState = (
        <div className="text-start bg-[#CCCCCC] text-white px-4 text-md py-2">
            No real-time records found
        </div>
    );

    return (
        <div className="w-full">

            {/* ── MOBILE ── */}
            <div className="md:hidden bg-gray-50">
                {visibleMatches.length === 0 ? emptyState : visibleMatches.map(match => (
                    <MobileMatchRow
                        key={match.id}
                        match={match}
                        basePath={basePath}
                        selected={selected}
                        onSelect={handleSelect}
                        onNavigate={handleNavigate}
                    />
                ))}
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:block w-full bg-[#1e1e1e] overflow-x-auto">
                <div
                    className="grid bg-[#F9D210] border border-[#CCCCCC]"
                    style={{ gridTemplateColumns: "1fr 67px 67px 67px 67px 67px 67px", minHeight: "32px" }}
                >
                    <div className="flex items-center px-3 py-1">
                        <span className="text-gray-800 text-xs font-bold">Game</span>
                    </div>
                    {[["2 / 4", "1"], ["4 / 6", "X"], ["6 / 8", "2"]].map(([col, lbl]) => (
                        <div key={lbl}
                             className="flex items-center justify-center py-1.5 border-l border-[#CCCCCC]"
                             style={{ gridColumn: col }}>
                            <span className="text-gray-700 text-xs font-bold">{lbl}</span>
                        </div>
                    ))}
                </div>

                {visibleMatches.length === 0 ? emptyState : visibleMatches.map(match => (
                    <DesktopMatchRow
                        key={match.id}
                        match={match}
                        basePath={basePath}
                        selected={selected}
                        onSelect={handleSelect}
                        onNavigate={handleNavigate}
                    />
                ))}
            </div>

        </div>
    );
});
SportTable.displayName = "SportTable";

export default SportTable;