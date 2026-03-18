import { memo, useCallback } from "react";

const VIEW_OPTIONS = ["TIME", "COMPETITION"];

const FilterBar = memo(({ filters, viewBy, onToggle, onViewBy }) => {
    const handleViewBy = useCallback((e) => onViewBy(e.target.value), [onViewBy]);

    return (
        <div className="w-full flex items-center bg-white md:bg-[#787578] justify-between md:justify-end gap-0.5 py-1 px-1 md:px-0">

            {/* ── Filter pills ── */}
            <div className="flex items-center gap-0.5">
                {[
                    { key: "live",    label: "-LIVE" },
                    { key: "virtual", label: "-VIRTUAL" },
                    { key: "premium", label: "-PREMIUM" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onToggle(key)}
                        className={` px-2 md:px-3 py-1 rounded-full border text-xs
                                    transition-colors duration-150
                                    ${filters[key]
                                        ? "border-0 text-white bg-[#00AD6F]"
                                        : "border-[#126E51] text-[#126E51]"
                                    }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* ── View by dropdown ── */}
            <div className="flex items-center gap-1.5">
                <span className=" text-black font-bold md:text-white text-xs whitespace-nowrap">
                    View by:
                </span>
                <select
                    value={viewBy}
                    onChange={handleViewBy}
                    className="bg-[#126E51] w-26.5 md:w-auto text-white text-xs 
                               border border-gray-800 py-[3px]  md:px-2 md:py-0.5
                               outline-none cursor-pointer transition-colors"
                >
                    {VIEW_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

        </div>
    );
});
FilterBar.displayName = "FilterBar";

export default FilterBar;