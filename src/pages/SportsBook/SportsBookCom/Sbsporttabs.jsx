import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { SPORTS } from "./sbData";

const SBSportTabs = memo(({ activeSport, onSportChange, activeView, onViewChange }) => (
    <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="overflow-x-auto flex-shrink-0 pt-3 md:pt-7"
    >
        <div className="flex gap-1 md:gap-2 min-w-max">

            {/* Favourite button — changes VIEW */}
            <button
                onClick={() => onViewChange("Favourite")}
                className={`relative flex flex-col md:flex-row items-center justify-center
                            gap-1 py-2 px-3 md:px-5 md:py-3
                            border-r border-gray-200 rounded whitespace-nowrap transition-colors
                            ${activeView === "Favourite" ? "bg-[#0F2462]" : "bg-[#CCCCCC]"}`}
            >
                <FaStar className={`text-[20px] ${activeView === "Favourite" ? "text-white" : "text-gray-600"}`} />
                <span className={`text-[11px] md:hidden font-medium ${activeView === "Favourite" ? "text-white" : "text-gray-700"}`}>
                    Fav
                </span>
            </button>

            {/* Live button — mobile only — changes VIEW */}
            <button
                onClick={() => onViewChange("Live")}
                className={`relative flex flex-col items-center justify-center md:hidden
                            gap-1 py-2 px-3
                            border-r border-gray-200 rounded whitespace-nowrap transition-colors
                            ${activeView === "Live" ? "bg-[#0F2462]" : "bg-[#CCCCCC]"}`}
            >
                <span className={`text-[13px] font-black leading-none
                                  ${activeView === "Live" ? "text-white" : "text-red-500"}`}>
                    ((·))
                </span>
                <span className={`text-[11px] font-medium ${activeView === "Live" ? "text-white" : "text-gray-700"}`}>
                    Live
                </span>
            </button>

            {/* Sports list — changes SPORT */}
            {SPORTS.map(({ label, Icon, count }) => (
                <button
                    key={label}
                    onClick={() => onSportChange(label)}
                    className={`relative flex flex-col md:flex-row items-center justify-center
                                gap-1 md:gap-1.5 py-2 px-3 md:px-4 md:py-2.5
                                text-[14px] font-medium tracking-wider
                                border-r border-gray-200 rounded whitespace-nowrap transition-colors
                                ${activeSport === label ? "bg-[#0F2462] text-white" : "text-gray-800 bg-[#CCCCCC]"}`}
                >
                    {count > 0 && (
                        <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-bold
                                          w-5 h-5 flex items-center justify-center rounded-full
                                          ${activeSport === label ? "bg-white text-[#0F2462]" : "bg-[#0F2462] text-white"}`}>
                            {count}
                        </span>
                    )}
                    <Icon className="text-[20px]" />
                    <span className="text-[12px] md:text-[14px]">
                        {label}
                    </span>
                </button>
            ))}
        </div>
    </div>
));
SBSportTabs.displayName = "SBSportTabs";

export default SBSportTabs;