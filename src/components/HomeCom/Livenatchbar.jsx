import { memo } from "react";
import { MdSportsTennis, MdSportsSoccer, MdSportsCricket, MdSportsMotorsports } from "react-icons/md";

// ── Data — replace with real API ──────────────────────────────────────────────
const MATCHES = [
    { id: 1, Icon: "../../public/livematchbar/4.png", title: "CHINESE GRAND PRIX 🇨🇳 - RACE WINNER", date: "15/03/2026 12:30" },
    { id: 2, Icon: "../../public/livematchbar/1.png", title: "Cobolli V Tiafoe", date: "09/03/2026 05:10" },
    { id: 3, Icon: "../../public/livematchbar/1.png", title: "G Diallo V F Auger-Aliassime", date: "09/03/2026 05:10" },
    { id: 4, Icon: "../../public/livematchbar/1.png", title: "C Gauff V Al Eala", date: "09/03/2026 05:15" },
    { id: 5, Icon: "../../public/livematchbar/4.png", title: "Galatasaray V Liverpool", date: "10/03/2026 23:15" },
    { id: 6, Icon: "../../public/livematchbar/2.png", title: "Atletico Madrid V Tottenham", date: "11/03/2026 01:30" },
    { id: 7, Icon: "../../public/livematchbar/4.png", title: "India V New Zealand", date: "08/03/2026 19:00" },
    { id: 8, Icon: "../../public/livematchbar/4.png", title: "Real Madrid V Manchester City", date: "12/03/2026 20:00" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @keyframes blink-all {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .blink-card {
    animation: blink-all 1s ease-in-out infinite;
  }
  
`;

// ── Match Card ────────────────────────────────────────────────────────────────
const MatchCard = memo(({ match }) => (
    <div className="flex items-center gap-1 md:gap-3 px-1 pb-0.5 pt-1  md:py-1.5 flex-shrink-0
                    bg-[#383838] rounded border border-[#3a3a3a]"
        
    >
        {/* ✅ Everything inside blinks together */}
        <div className="blink-card flex items-center gap-1 w-full">

            {/* Circle sport icon */}
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#3a3a3a]
                            flex items-center justify-center">
                <img src={match.Icon} alt="" />

            </div>

            {/* Title + date with bg */}
            <div className="flex flex-col min-w-0">
                <span className="text-white hover:underline text-[12px] md:text-[14px] font-bold leading-tight truncate">
                    {match.title}
                </span>
                {/* ✅ Date with green background — also blinks with parent */}
                <span className="inline-block px-3 md:px-1.5  rounded-sm
                                 bg-[#167122] hover:underline -ml-0.5 text-white text-[12px] font-semibold
                                 w-fit">
                    {match.date}
                </span>
            </div>

        </div>
    </div>
));
MatchCard.displayName = "MatchCard";

// ── LiveMatchBar ──────────────────────────────────────────────────────────────
const LiveMatchBar = memo(() => (
    <div className="w-full pt-1.5 bg-[#0f6f51]  md:bg-[#787578] md:pt-0 ">
        <style>{CSS}</style>
        <div className="match-scroll overflow-x-auto">
            <div className="flex gap-1 md:gap-2 pb-1 md:pb-4 ">
                {MATCHES.map((match, i) => (
                    <MatchCard
                        key={match.id}
                        match={match}
                    />
                ))}
            </div>
        </div>
    </div>
));
LiveMatchBar.displayName = "LiveMatchBar";

export default LiveMatchBar;