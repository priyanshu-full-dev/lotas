import { memo } from "react";

const CasinoGameCard = memo(({ game, onClick }) => (
    <div
        onClick={() => onClick(game.id)}
        className="cursor-pointer overflow-hidden"
    >
        <div className="relative overflow-hidden h-24 md:h-40">
            <img
                src={game.img}
                alt={game.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            />
        </div>
        <div className="text-center py-0.5 md:px-2 bg-gradient-to-b from-[#156B50] to-[#373938]">
            <span className="text-white text-[8px] md:text-[11px] font-bold md:tracking-widest uppercase leading-tight">
                {game.name}
            </span>
        </div>
    </div>
));
CasinoGameCard.displayName = "CasinoGameCard";

export default CasinoGameCard;