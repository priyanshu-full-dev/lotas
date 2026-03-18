import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { useFavourites } from "../FavouriteContext/Favouritescontext";

// ── Favourite Card ────────────────────────────────────────────────────────────
const FavouriteCard = memo(({ match }) => {
    const { toggleFavourite } = useFavourites();

    const validOdds = (match.odds ?? []).filter(v => v !== null);
    const oddsLabels = ["over 3.5", "under 3.5", "yes", "no", "1", "2"];

    return (
        <div
            className="flex bg-gray-100 overflow-hidden"
            style={{
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                maxWidth: "380px",
            }}
        >
            {/* ── LEFT: match info ── */}
            <div
                className="flex-shrink-0 flex flex-col"
                style={{ width: "200px", borderRight: "1px solid #e0e0e0" }}
            >
                {/* Breadcrumb */}
                <div
                    className="px-2 py-1.5 text-[11px] text-gray-500 leading-tight"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    {match.sport ?? "Cricket"} &gt; {match.competition?.split("/").map(s => s.trim()).join(" / ")}
                </div>

                {/* Live + time */}
                <div className="px-2 pt-1.5 flex items-center gap-1">
                    {match.live && (
                        <span className="text-red-500 text-[11px] font-black animate-pulse">((·))</span>
                    )}
                    <span className="text-[12px] text-red-500 font-semibold">{match.time}</span>
                </div>

                {/* Teams + scores */}
                <div className="px-2 pb-2 flex-1">
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-[12px] text-gray-800 font-medium" style={{ maxWidth: "130px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {match.team1}
                        </span>
                        <span className="text-[12px] font-bold text-gray-800 ml-2 flex-shrink-0">
                            {match.score?.split(":")[0]?.trim() ?? ""}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[12px] text-gray-800 font-medium" style={{ maxWidth: "130px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {match.team2}
                        </span>
                        <span className="text-[12px] font-bold text-gray-800 ml-2 flex-shrink-0">
                            {match.score?.split(":")[1]?.trim() ?? ""}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── STAR ── */}
            <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "36px", borderRight: "1px solid #e0e0e0" }}
            >
                <button onClick={() => toggleFavourite(match)}>
                    <FaStar className="text-[#0F2462] text-[15px]" />
                </button>
            </div>

            {/* ── RIGHT: market header + odds ── */}
            <div className="flex-1 flex flex-col">
                {/* Market label */}
                <div
                    className="px-2 py-1.5 text-[11px] text-gray-600 font-medium truncate"
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    {match.marketLabel ?? "1st innings over ..."}
                </div>

                {/* Odds cells */}
                <div className="flex flex-1">
                    {validOdds.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-[11px] text-gray-400">
                            No markets
                        </div>
                    ) : validOdds.map((val, i) => (
                        <div
                            key={i}
                            className="flex-1 flex flex-col items-center justify-center py-2 cursor-pointer transition-colors"
                            style={{ borderRight: i < validOdds.length - 1 ? "1px solid #e0e0e0" : "none" }}
                        >
                            <span className="text-[10px] text-gray-500 mb-0.5">{oddsLabels[i] ?? `opt${i + 1}`}</span>
                            <span className="text-[13px] font-bold text-[#0F2462]">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
FavouriteCard.displayName = "FavouriteCard";

// ── SBFavourites ──────────────────────────────────────────────────────────────
const SBFavourites = memo(({ activeSport }) => {
    const { favourites } = useFavourites();

    const filtered = favourites.filter(m =>
        !activeSport ||
        (m.sport && m.sport.toLowerCase() === activeSport.toLowerCase()) ||
        (m.competition && m.competition.toLowerCase().includes(activeSport.toLowerCase()))
    );

    // Group by competition
    const grouped = filtered.reduce((acc, m) => {
        const key = m.competition;
        if (!acc[key]) acc[key] = [];
        acc[key].push(m);
        return acc;
    }, {});

    return (
        <div className="p-3">
            {filtered.length === 0 ? (
                <div className="py-2 font-bold text-sm text-gray-700">
                    !!! No {activeSport} favourites !!!
                </div>
            ) : (
                Object.entries(grouped).map(([competition, matches]) => (
                    <div key={competition} className=" bg-[#CCCCCC] w-fit  rounded-t-3xl mb-6">
                        {/* Competition heading */}
                        <div className="flex items-center gap-2 mb-2">
                            <FaStar className="text-[#0F2462] text-sm" />
                            <span className="text-[14px] font-semibold text-gray-800">{competition}</span>
                        </div>

                        {/* Cards */}
                        <div className="flex flex-col gap-2">
                            {matches.map(match => (
                                <FavouriteCard key={match.id} match={match} />
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
});
SBFavourites.displayName = "SBFavourites";

export default SBFavourites;