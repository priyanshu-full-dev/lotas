import { memo } from "react";
import { FaStar, FaLock } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { useFavourites } from "../FavouriteContext/Favouritescontext";

// ── Odds Button ───────────────────────────────────────────────────────────────
export const OddsBtn = memo(({ value, small = false }) => {
    const isLocked = value === null || value === undefined;
    return (
        <button
            disabled={isLocked}
            className={`
                rounded-sm flex items-center justify-center flex-1 transition-all
                ${small
                    ? " h-[35px] md:h-[30px] text-[14px] font-semibold px-1"
                    : " md:min-w-[80px] h-[34px] text-[16px] px-2"
                }
                ${isLocked
                    ? "bg-[#4e6680] cursor-not-allowed"
                    : "bg-[#0F2462] hover:bg-[#2e4a6e] active:scale-95 cursor-pointer"
                }
                text-white
            `}
        >
            {isLocked ? <FaLock className="text-[11px] opacity-60" /> : value}
        </button>
    );
});
OddsBtn.displayName = "OddsBtn";

// ── Match Card ────────────────────────────────────────────────────────────────
const MatchCard = memo(({ match, onFavouriteClick }) => {
    const { isFavourite, toggleFavourite } = useFavourites();
    const starred = isFavourite(match.id);

    const handleStar = (e) => {
        e.stopPropagation();
        toggleFavourite(match);
    };

    return (
        <div className="bg-[#F2F2F2] border border-gray-200 my-1 rounded-sm hover:shadow-sm transition-shadow">

            {/* ── DESKTOP (md+) ── */}
            <div className="hidden md:flex items-center pr-42 px-10 py-2 gap-2">

                {/* Date / Live / Time */}
                <div className="w-24 flex-shrink-0">
                    <div className="flex gap-2">
                        <div className="text-[14px] text-gray-800 font-bold leading-tight">{match.date}</div>
                        {match.live && (
                            <span className="text-red-500 text-[14px] font-black animate-pulse leading-none block">
                                ((·))
                            </span>
                        )}
                    </div>
                    <div className="text-sm font-bold text-black leading-tight">{match.time}</div>
                </div>

                {/* Competition + Teams */}
                <div className="flex-1 min-w-0 px-3">
                    <div className="text-[11px] tracking-wider text-gray-600 mb-1 truncate">{match.competition}</div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <MdSportsCricket className="text-green-500 text-[20px] flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-800 truncate">{match.team1}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MdSportsCricket className="text-orange-300 text-[20px] flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-800 truncate">{match.team2}</span>
                    </div>
                </div>

                {/* Favourite Star */}
                <button
                    onClick={handleStar}
                    className="transition-colors mx-3 flex-shrink-0"
                >
                    <FaStar className={`text-md ${starred ? "text-[#0F2462]" : "text-gray-300 hover:text-yellow-400"}`} />
                </button>

                {/* Score + 1x2 Odds */}
                <div className="flex items-start gap-3 flex-shrink-0">
                    <div className="flex flex-col items-center">
                        <span className="text-[14px] text-gray-500 mb-1">Score</span>
                        <div className="bg-[#D7D6D6] border min-w-[100px] font-medium border-gray-300 text-black text-[16px]
                                        h-[34px] px-4 rounded-sm flex items-center justify-center whitespace-nowrap min-w-[80px]">
                            {match.score ?? "0 : 0"}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[14px] px-4 text-gray-500 mb-1">1x2</span>
                        <div className="flex gap-4">
                            {match.odds.map((val, i) => (
                                <OddsBtn key={i} value={val} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MOBILE (< md) ── */}
            <div className="flex md:hidden flex-col px-2.5 py-2 gap-1.5">

                {/* Row 1: date · time · live */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-gray-900">{match.date}</span>
                    <span className="text-[13px] font-bold text-gray-900">{match.time}</span>
                    {match.live && (
                        <span className="text-red-500 text-[13px] font-black animate-pulse">((·))</span>
                    )}
                </div>

                {/* Row 2: competition */}
                <div className="text-[11px] text-gray-500 leading-tight">{match.competition}</div>

                {/* Row 3: team1  Vs  team2 */}
                <div className="flex items-center">
                    <span className="text-[13px] font-semibold text-gray-900 flex-1">{match.team1}</span>
                    <div className="h-6 w-6 flex items-center justify-center bg-[#CCCCCC] rounded-full">
                        <span className="text-[9px] text-white mt-1 flex-shrink-0">Vs</span>
                    </div>
                    <span className="text-[13px] font-semibold text-gray-900 flex-1 text-right">{match.team2}</span>
                </div>

                {/* Row 4: Score + 1x2 + star */}
                <div className="flex gap-1.5 items-end">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span className="text-[9px] text-gray-700">Score</span>
                        <div className="bg-[#D7D6D6] text-black text-[14px] font-medium
                                        h-[35px] px-3 rounded-sm flex items-center justify-center whitespace-nowrap min-w-[72px]">
                            {match.score ?? "0 : 0"}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[9px] text-gray-700">1x2</span>
                        <div className="flex gap-2 w-full">
                            {match.odds.map((val, i) => (
                                <OddsBtn key={i} value={val} small />
                            ))}
                        </div>
                    </div>
                    {/* Star on mobile */}
                    <button onClick={handleStar} className="flex-shrink-0 pb-1">
                        <FaStar className={`text-[16px] ${starred ? "text-[#0F2462]" : "text-gray-300"}`} />
                    </button>
                </div>
            </div>
        </div>
    );
});
MatchCard.displayName = "MatchCard";

export default MatchCard;