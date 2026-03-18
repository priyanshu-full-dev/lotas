import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_GAMES } from "./Casinodata";
import CasinoGameCard from "./Casinogamecard";

const CasinoGameGrid = memo(({ activeCategory, activeSubCategory, searchQuery }) => {
    const navigate = useNavigate();

    const handleClick = useCallback((id) => {
        navigate(`/home/casino/game/${id}`);
    }, [navigate]);

    const visibleGames = useMemo(() => {
        // 1. Filter by main category
        let list = activeCategory === "ALL" || activeCategory === "RECENT"
            ? [...ALL_GAMES]
            : ALL_GAMES.filter((g) => g.category === activeCategory);

        // 2. Filter by sub-category (skip if ALL)
        if (activeSubCategory && activeSubCategory !== "ALL") {
            list = list.filter((g) => g.subCategory === activeSubCategory);
        }

        // 3. Filter by search
        if (searchQuery?.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter((g) => g.name.toLowerCase().includes(q));
        }

        return list;
    }, [activeCategory, activeSubCategory, searchQuery]);

    if (visibleGames.length === 0) {
        return (
            <div className="text-center text-gray-500 text-sm py-16">
                No games found{searchQuery ? ` for "${searchQuery}"` : ""}.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 md:grid-cols-4 md:grid-cols-6 gap-0.5 md:gap-1 mt-1.5 mb-0.5">
            {visibleGames.map((game) => (
                <CasinoGameCard
                    key={game.id}
                    game={game}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
});
CasinoGameGrid.displayName = "CasinoGameGrid";

export default CasinoGameGrid;