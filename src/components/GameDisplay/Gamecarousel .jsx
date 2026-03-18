import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const GAMES = [
    { id: 1, label: "COCK FIGHT",         gif: "/public/games/cock-fight.gif",         path: "/home/casino/cock-fight" },
    { id: 2, label: "LIGHTNING",          gif: "/public/games/lightning.gif",           path: "/home/casino/lightning" },
    { id: 3, label: "MARBLE RUN",         gif: "/public/games/marble-run.gif",          path: "/home/casino/marble-run" },
    { id: 4, label: "SEXY",               gif: "/public/games/sexy.gif",                path: "/home/casino/sexy" },
    { id: 5, label: "AVIATOR",            gif: "/public/games/aviator.gif",             path: "/home/casino/aviator" },
    { id: 6, label: "MINES",              gif: "/public/games/mines.gif",               path: "/home/casino/mines" },
    { id: 7, label: "BIKINI GAMES",       gif: "/public/games/bikini-games.gif",        path: "/home/casino/bikini-games" },
    { id: 8, label: "CHICKEN ROAD CROSS", gif: "/public/games/chicken-road-cross.gif",  path: "/home/casino/chicken-road-cross" },
];

const CSS = `
  .game-scroll::-webkit-scrollbar        { height: 4px; }
  .game-scroll::-webkit-scrollbar-track  { background: #111; }
  .game-scroll::-webkit-scrollbar-thumb  { background: #555; border-radius: 2px; }
  .game-scroll { scrollbar-width: thin; scrollbar-color: #555 #111; }
  .game-card img { transition: transform 0.2s ease; }
  .game-card:hover img { transform: scale(1.04); }
`;

// ── Mobile card — fills grid cell ─────────────────────────────────────────────
const MobileGameCard = memo(({ game, onClick }) => (
    <div
        className="game-card relative cursor-pointer overflow-hidden"
        onClick={() => onClick(game.path)}
    >
        <img
            src={game.gif}
            alt={game.label}
            className="w-full object-cover"
            style={{ aspectRatio: "4/3" }}
        />
        
    </div>
));
MobileGameCard.displayName = "MobileGameCard";

// ── Desktop card — fixed height, fills flex width ─────────────────────────────
const DesktopGameCard = memo(({ game, onClick }) => (
    <div
        className="game-card relative cursor-pointer overflow-hidden flex-1 min-w-[100px]"
        onClick={() => onClick(game.path)}
    >
        <img
            src={game.gif}
            alt={game.label}
            className="w-full object-cover"
            style={{ height: "110px" }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1
                        bg-gradient-to-t from-black/70 to-transparent">
          
        </div>
    </div>
));
DesktopGameCard.displayName = "DesktopGameCard";

// ── GameCarousel ──────────────────────────────────────────────────────────────
const GameCarousel = memo(() => {
    const navigate    = useNavigate();
    const handleClick = useCallback((path) => navigate(path), [navigate]);

    return (
        <div className="w-full  pb-0.5 pt-1 md:pt-0 mt-1 border-t border-gray-300 md:mt-9">
            <style>{CSS}</style>

            {/* ── Mobile: 2-column grid ── */}
            <div className="md:hidden grid grid-cols-4 gap-0.5 p-0.5">
                {GAMES.map((game) => (
                    <MobileGameCard key={game.id} game={game} onClick={handleClick} />
                ))}
            </div>

            {/* ── Desktop: full width flex row ── */}
            <div className="hidden md:flex gap-0.5 p-0.5">
                {GAMES.map((game) => (
                    <DesktopGameCard key={game.id} game={game} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
});
GameCarousel.displayName = "GameCarousel";

export default GameCarousel;