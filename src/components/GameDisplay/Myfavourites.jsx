import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FAVOURITE_GAMES = [
    { id: 1,  label: "AVIATOR X",           img: "/games/favourites/aviator-x.png",           path: "/home/casino/aviator-x" },
    { id: 2,  label: "DRAGON TIGER",         img: "/games/favourites/aviator-x.png",         path: "/home/casino/dragon-tiger" },
    { id: 3,  label: "CHICKEN ROAD CROSS",   img: "/games/favourites/aviator-x.png",   path: "/home/casino/chicken-road-cross" },
    { id: 4,  label: "CHICKEN X",            img: "/games/favourites/aviator-x.png",            path: "/home/casino/chicken-x" },
    { id: 5,  label: "AVIATOR",              img: "/games/favourites/aviator-x.png",              path: "/home/casino/aviator" },
    { id: 6,  label: "DRAGON ", img: "/games/favourites/aviator-x.png", path: "/home/casino/dragon-tiger-phoenix" },
    { id: 7,  label: "AVIABET",              img: "/games/favourites/aviator-x.png",              path: "/home/casino/aviabet" },
    { id: 8,  label: "AVIATOR",              img: "/games/favourites/aviator-x.png",             path: "/home/casino/aviator" },
    { id: 9,  label: "MARBLE RUN",           img: "/games/favourites/aviator-x.png",           path: "/home/casino/marble-run" },
    { id: 10, label: "TEENPATTI 20-20",      img: "/games/favourites/aviator-x.png",      path: "/home/casino/teenpatti-20-20" },
    { id: 11, label: "DRAGON TIGER",         img: "/games/favourites/aviator-x.png",        path: "/home/casino/dragon-tiger" },
    { id: 12, label: "SEXY TEENPATTI 20-20", img: "/games/favourites/aviator-x.png",       path: "/home/casino/sexy-teenpatti" },
    { id: 13, label: "DRAGON TIGER LION",    img: "/games/favourites/aviator-x.png",    path: "/home/casino/dragon-tiger-lion" },
    // { id: 14, label: "1 DAY DRAGON TIGER",   img: "/games/favourites/1day-dragon-tiger.jpg",    path: "/home/casino/1day-dragon-tiger" },
    // { id: 15, label: "BACCARAT ONE DAY",     img: "/games/favourites/baccarat-one-day.jpg",     path: "/home/casino/baccarat-one-day" },
    // { id: 16, label: "BACCARAT",             img: "/games/favourites/baccarat.jpg",             path: "/home/casino/baccarat" },
    // { id: 17, label: "29 CARD BACCARAT",     img: "/games/favourites/29-card-baccarat.jpg",     path: "/home/casino/29-card-baccarat" },
    // { id: 18, label: "SIC BO",               img: "/games/favourites/sic-bo.jpg",               path: "/home/casino/sic-bo" },
    // { id: 19, label: "ROULETTE",             img: "/games/favourites/roulette.jpg",             path: "/home/casino/roulette" },
    // { id: 20, label: "POKER 20-20",          img: "/games/favourites/poker-20-20.jpg",          path: "/home/casino/poker-20-20" },
    // { id: 21, label: "POKER 1 DAY",          img: "/games/favourites/poker-1-day.jpg",          path: "/home/casino/poker-1-day" },
    // { id: 22, label: "LUCKY 7",              img: "/games/favourites/lucky-7.jpg",              path: "/home/casino/lucky-7" },
    // { id: 23, label: "ANDAR BAHAR",          img: "/games/favourites/andar-bahar.jpg",          path: "/home/casino/andar-bahar" },
    // { id: 24, label: "TEENPATTI ONE DAY",    img: "/games/favourites/teenpatti-one-day.jpg",    path: "/home/casino/teenpatti-one-day" },
];



// ✅ Named function — HMR works
function GameCard({ game, onClick }) {
    return (
        <div
            className="fav-thumb cursor-pointer  overflow-hidden  border border-[#1a3a2a]"
            onClick={() => onClick(game.path)}
        >
            <div className="relative h-18 md:h-28 overflow-hidden" >
                <img
                    src={game.img}
                    alt={game.label}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center py-0.5 px-2 bg-gradient-to-b from-[#156B50] to-[#373938]">
                <span className="text-white text-[7px] md:text-[11px]   font-bold  uppercase ">
                    {game.label}
                </span>
            </div>
        </div>
    );
}

// ✅ Named function — HMR works
function MyFavourites() {
    const navigate = useNavigate();
    const handleClick = useCallback((path) => navigate(path), [navigate]);

    return (
        <div className="w-full py-1">

            <div className="flex items-center bg-[#383838] -mt-1 md:-mt-0 gap-2 md:mb-0.5" style={{ height: "30px", overflow: "hidden" }}>
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
                    MY FAVOURITES
                </motion.span>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-7 p-0.5 md:p-0 gap-0.5">
                {FAVOURITE_GAMES.map((game) => (
                    <GameCard key={game.id} game={game} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
}

export default MyFavourites;