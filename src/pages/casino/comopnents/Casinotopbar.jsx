import { memo, useState, useCallback } from "react";
import { FaSearch, FaDice } from "react-icons/fa";

const CasinoTopBar = memo(({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = useCallback((e) => {
        setQuery(e.target.value);
        onSearch?.(e.target.value);
    }, [onSearch]);

    const handleSubmit = useCallback(() => {
        onSearch?.(query);
    }, [onSearch, query]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") handleSubmit();
    }, [handleSubmit]);

    return (
        <div className="w-full bg-[#126E51] flex h-8.5 md:h-auto items-center mb-0.5 justify-between md:px-1 pl-2 md:py-1">
            <div className="flex items-center gap-1">
                <FaDice className="text-white text-md md:text-lg" />
                <span className="text-white font-black text-[13px] md:text-[16px]  uppercase">
                    CASINO
                </span>
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Game..."
                    className="bg-white text-gray-900 text-xs px-1 py-2 md:py-1.5 outline-none
                             w-42.5  md:w-38.5 placeholder-gray-400 placeholder:text-[12px] md:placeholder:text-[16px] placeholder:text-gray-500"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-[#BB1919] text-white px-1.5 md:px-2.5 py-2.5 md:py-1.5 transition-colors"
                >
                    <FaSearch className="text-[13px] md:text-[16px]" />
                </button>
            </div>
        </div>
    );
});
CasinoTopBar.displayName = "CasinoTopBar";

export default CasinoTopBar;