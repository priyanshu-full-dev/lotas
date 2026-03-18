import { memo, useState, useCallback, useRef } from "react";
import { FaSearch, FaDice } from "react-icons/fa";

const CASINO_CATEGORIES = [
    "ALL", "RECENT", "MAC88 LIVE", "MAC88 LIVE PREDICTION",
    "MAC88 FUN GAMES", "MAC88 VIRTUALS", "LIGHTNING", "MACSEXY",
    "COLOR AND CHANCE", "INSTANT GAMES", "CARD GAMES",
    "TABLE GAMES", "SLOTS", "CRASH GAMES",
];

// Sub-categories with icons (images — update src paths)
const SUB_CATEGORIES = [
    { label: "DRAGON TIGER", img: "/public/casino-icons/dragon-tiger.png" },
    { label: "BACCARAT",     img: "/public/casino-icons/baccarat.png" },
    { label: "SICBO",        img: "/public/casino-icons/sicbo.png" },
    { label: "ROULETTE",     img: "/public/casino-icons/roulette.png" },
    { label: "POKER",        img: "/public/casino-icons/poker.png" },
    { label: "LUCKY7",       img: "/public/casino-icons/lucky7.png" },
    { label: "ANDARBAHAR",   img: "/public/casino-icons/andarbahar.png" },
    { label: "TEENPATTI",    img: "/public/casino-icons/teenpatti.png" },
    { label: "32CARDS",      img: "/public/casino-icons/32cards.png" },
    { label: "OTHERS",       img: "/public/casino-icons/others.png" },
    { label: "LOTTERY",      img: "/public/casino-icons/lottery.png" },
    { label: "CRICKET",      img: "/public/casino-icons/cricket.png" },
];

const CSS = `
  .casino-nav-scroll::-webkit-scrollbar       { height: 4px; }
  .casino-nav-scroll::-webkit-scrollbar-track { background: #1a1a1a; }
  .casino-nav-scroll::-webkit-scrollbar-thumb { background: #555; border-radius: 2px; }
  .casino-nav-scroll { scrollbar-width: thin; scrollbar-color: #555 #1a1a1a; }
  .sub-nav-scroll::-webkit-scrollbar       { height: 4px; }
  .sub-nav-scroll::-webkit-scrollbar-track { background: #2a2a2a; }
  .sub-nav-scroll::-webkit-scrollbar-thumb { background: #555; border-radius: 2px; }
  .sub-nav-scroll { scrollbar-width: thin; scrollbar-color: #555 #2a2a2a; }
`;

// ── Drag hook ─────────────────────────────────────────────────────────────────
const useDrag = () => {
    const ref        = useRef(null);
    const isDragging = useRef(false);
    const startX     = useRef(0);
    const scrollStart= useRef(0);

    const onMouseDown = useCallback((e) => {
        isDragging.current  = true;
        startX.current      = e.pageX - ref.current.offsetLeft;
        scrollStart.current = ref.current.scrollLeft;
        ref.current.style.cursor = "grabbing";
    }, []);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        ref.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.5;
    }, []);

    return { ref, onMouseDown, onMouseUp, onMouseMove };
};

const CasinoNavBar = memo(({ activeCategory, onCategoryChange, activeSubCategory, onSubCategoryChange, onSearch }) => {
    const [query, setQuery] = useState("");
    const catDrag = useDrag();
    const subDrag = useDrag();

    const handleSearch = useCallback((e) => {
        setQuery(e.target.value);
        onSearch?.(e.target.value);
    }, [onSearch]);

    const handleSearchSubmit = useCallback(() => {
        onSearch?.(query);
    }, [onSearch, query]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") handleSearchSubmit();
    }, [handleSearchSubmit]);

    return (
        <div className="w-full">
            <style>{CSS}</style>

            {/* ── Row 1: CASINO title + search ── */}
            <div className="w-full bg-[#126E51] flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                    <FaDice className="text-white text-lg" />
                    <span className="text-white font-black text-sm tracking-widest uppercase">
                        CASINO
                    </span>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        placeholder="Search Game..."
                        className="bg-white text-gray-800 text-xs px-3 py-1.5 outline-none
                                   w-48 placeholder-gray-400"
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 transition-colors"
                    >
                        <FaSearch className="text-xs" />
                    </button>
                </div>
            </div>

            {/* ── Row 2: Main category tabs ── */}
            <div className="w-full bg-[#1a1a1a] border-b border-[#333]">
                <div
                    ref={catDrag.ref}
                    className="casino-nav-scroll overflow-x-auto select-none cursor-grab"
                    onMouseDown={catDrag.onMouseDown}
                    onMouseUp={catDrag.onMouseUp}
                    onMouseLeave={catDrag.onMouseUp}
                    onMouseMove={catDrag.onMouseMove}
                >
                    <div className="flex min-w-max gap-px bg-[#333]">
                        {CASINO_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-4 py-1 text-[16px] whitespace-nowrap
                                            transition-all duration-150
                                            ${activeCategory === cat
                                                ? "bg-[#383838] text-white"
                                                : "text-white bg-[#494949]"
                                            }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Row 3: Sub-category tabs with icons ── */}
            <div className="w-full bg-[#2a2a2a] border-b border-[#444]">
                <div
                    ref={subDrag.ref}
                    className="sub-nav-scroll overflow-x-auto select-none cursor-grab"
                    onMouseDown={subDrag.onMouseDown}
                    onMouseUp={subDrag.onMouseUp}
                    onMouseLeave={subDrag.onMouseUp}
                    onMouseMove={subDrag.onMouseMove}
                >
                    <div className="flex min-w-max gap-px bg-[#444]">
                        {SUB_CATEGORIES.map(({ label, img }) => (
                            <button
                                key={label}
                                onClick={() => onSubCategoryChange(label)}
                                className={`flex flex-col items-center px-4 py-2 min-w-[80px]
                                            whitespace-nowrap transition-all duration-150
                                            ${activeSubCategory === label
                                                ? "bg-[#126E51] text-white"
                                                : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333] hover:text-white"
                                            }`}
                            >
                                <img
                                    src={img}
                                    alt={label}
                                    className="w-8 h-8 object-contain mb-1"
                                    onError={(e) => { e.target.style.display = "none"; }}
                                />
                                <span className="text-[10px] font-bold tracking-wider">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
});
CasinoNavBar.displayName = "CasinoNavBar";

export default CasinoNavBar;