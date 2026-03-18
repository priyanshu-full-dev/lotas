import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NEW_LAUNCH_GAMES = [
    { id: 1, label: "CRICKET BATTLE", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/cricket-battle" },
    { id: 2, label: "VOLT RUN", img: "/games/new-launch/volt-run.png", path: "/home/casino/volt-run" },
    { id: 3, label: "SOLITAIRE", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/solitaire" },
    { id: 4, label: "PACKS", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/packs" },
    { id: 5, label: "NAUGHTY BUTTON", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/naughty-button" },
    { id: 6, label: "INSTANT RUMMY", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/instant-rummy" },
    { id: 7, label: "JHANDI MUNDA", img: "/games/new-launch/cricket-battle.png", path: "/home/casino/jhandi-munda" },
];



function GameCard({ game, onClick }) {
    return (
        <div
            className="game-thumb  overflow-hidden  border border-[#1a3a2a]"
            onClick={() => onClick(game.path)}
        >
            <div className="relative overflow-hidden h-18 md:h-40" >
                <img
                    src={game.img}
                    alt={game.label}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center py-0.5  bg-gradient-to-b from-[#156B50] to-[#373938]">
                <span className="text-white text-[8px] md:text-[11px]  font-bold  uppercase">
                    {game.label}
                </span>
            </div>
        </div>
    );
}

function NewLaunch() {
    const navigate = useNavigate();
    const handleClick = useCallback((path) => navigate(path), [navigate]);

    return (
        <div className="w-full ">

            <div className="flex items-center bg-[#383838] gap-2 md:mb-0.5" style={{ height: "30px", overflow: "hidden" }}>
                <motion.span
                    animate={{
                        scale: [1, 1.08, 1],
                        color: ["#ADE8FF", "#ffffff", "#ADE8FF"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="font-black px-3 tracking-widest uppercase"
                    style={{ display: "inline-block" }}
                >
                    NEW LAUNCH
                </motion.span>
            </div>

            <div className="grid grid-cols-4 p-0.5 md:p-0 gap-0.5">
                {NEW_LAUNCH_GAMES.map((game) => (
                    <GameCard key={game.id} game={game} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
}

export default NewLaunch;