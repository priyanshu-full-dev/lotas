import { memo, useMemo } from "react";
import { ALL_EVENTS } from "./navData";

// desktop: dark bg, wide | mobile: white bg, full width
const SuggestionList = memo(({ query, onSelect, mobile = false }) => {
    const filtered = useMemo(() =>
        query.trim().length === 0
            ? []
            : ALL_EVENTS.filter((e) =>
                e.match.toLowerCase().includes(query.toLowerCase()) ||
                e.sport.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10),
        [query]
    );

    if (filtered.length === 0) return null;

    return (
        <div className={`absolute z-50 overflow-y-auto shadow-2xl
            ${mobile
                ? "left-0 right-0 top-full max-h-[70vh] bg-white border border-gray-200"
                : "right-0 top-full min-w-[520px] max-h-80 bg-[#2a2a2a] border border-gray-700"
            }`}
        >
            {filtered.map((item, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(item)}
                    className={`w-full flex items-start justify-between px-4 py-3
                                text-left transition-colors border-b last:border-0
                                ${mobile
                                    ? "hover:bg-gray-50 border-gray-200"
                                    : "hover:bg-[#3a3a3a] border-gray-700/60"
                                }`}
                >
                    <div className="flex flex-col min-w-0 pr-4">
                        <span className={`text-sm font-bold leading-tight
                            ${mobile ? "text-gray-900" : "text-white"}`}>
                            {item.sport}
                        </span>
                        <span className={`text-sm leading-tight mt-0.5
                            ${mobile ? "text-gray-600" : "text-gray-300"}`}>
                            {item.match}
                        </span>
                    </div>
                    <span className={`text-xs whitespace-nowrap flex-shrink-0 mt-0.5
                        ${mobile ? "text-gray-500" : "text-gray-400"}`}>
                        {item.time}
                    </span>
                </button>
            ))}
        </div>
    );
});
SuggestionList.displayName = "SuggestionList";

export default SuggestionList;
