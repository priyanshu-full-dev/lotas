import { memo } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { SIDEBAR_BTNS, SPORTS } from "./Sbdata";

const COLLAPSED_ORDER = ["Live", "Events", "My Bets", "Search"];

const SBSidebar = memo(({ activeSport, onSportChange, open, onToggle, activeView, onViewChange }) => (
    <div className="relative flex-shrink-0 bg-[#787578] hidden md:flex">

        {/* Sidebar panel */}
        <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className={`flex-shrink-0 bg-[#EEEEEE] border-r ml-1.5 border-gray-200
                        transition-all duration-200 overflow-y-auto
                        ${open ? "w-62" : "w-17"}`}
        >
            {/* ── COLLAPSED: icon only ── */}
            {!open && (
                <div className="flex flex-col mt-4 items-center">
                    <div className="border-b border-gray-400 w-full pb-3">
                        {COLLAPSED_ORDER.map((name) => {
                            const item = SIDEBAR_BTNS.find(b => b.label === name);
                            if (!item) return null;
                            const { label, Icon } = item;
                            return (
                                <button key={label} title={label}
                                    onClick={() => onViewChange(label)}
                                    className={`w-full flex items-center justify-center py-4 border-b border-gray-100
                                                ${activeView === label
                                                    ? "bg-[#0F2462] text-white"
                                                    : "text-black hover:bg-gray-50"}`}>
                                    <Icon className="text-lg" />
                                </button>
                            );
                        })}
                    </div>
                    <div className="w-full mt-1">
                        {SPORTS.map(({ label, Icon }) => (
                            <button key={label} title={label}
                                onClick={() => onSportChange(label)}
                                className={`w-full flex items-center justify-center py-4 border-b border-gray-300
                                            ${activeSport === label
                                                ? "bg-[#0F2462] text-white"
                                                : "text-gray-500 hover:bg-[#0F2462]"}`}>
                                {label === "SRL"
                                    ? <span className="text-[9px] font-black">SRL</span>
                                    : <Icon className="text-lg" />
                                }
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── EXPANDED: full sidebar ── */}
            {open && (<>
                <div className="grid grid-cols-3 pr-2 pl-7 pb-4 pt-7 gap-1 gap-y-2">
                    {SIDEBAR_BTNS.map(({ label, Icon }) => (
                        <button key={label}
                            onClick={() => onViewChange(label)}
                            className={`flex flex-col items-center rounded-sm justify-center gap-1.5 py-3
                                        text-[11px] font-semibold border-r border-b border-gray-200 transition-colors
                                        ${activeView === label
                                            ? "bg-[#0f2462] text-white"
                                            : "bg-[#CCCCCC] text-gray-900"}`}>
                            <Icon className="text-xl" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="px-3 py-3 border-b pl-5 border-t mt-2 border-gray-300">
                    <span className="text-[11px] text-gray-500 tracking-widest uppercase">All Sports</span>
                </div>

                <div>
                    {SPORTS.map(({ label, Icon }) => (
                        <button key={label}
                            onClick={() => onSportChange(label)}
                            className={`w-full flex items-center gap-2.5 px-3 pr-4 py-2.5 text-sm tracking-wide font-medium
                                        border-b border-gray-100 transition-colors
                                        ${activeSport === label
                                            ? "bg-[#0F2462] text-gray-100 border-l-4 border-l-[#1a4a8e]"
                                            : "text-gray-700 bg-[#EEEEEE] hover:bg-gray-50 border-l-4 border-l-transparent"
                                        }`}>
                            <div className="flex items-center justify-center flex-shrink-0">
                                <Icon className={`text-[25px] ${activeSport === label ? "text-white" : "text-gray-500"}`} />
                            </div>
                            <span className="flex-1 text-left">{label}</span>
                            <FaChevronRight className={`text-[16px] flex-shrink-0
                                                        ${activeSport === label ? "text-white -mr-1 transition-all" : "text-black"}`} />
                        </button>
                    ))}
                </div>
            </>)}
        </div>

        {/* ── Toggle button — BetSlip style ── */}
        {open ? (
            /* Open: thin tab on right edge of sidebar */
            <button
                onClick={onToggle}
                className="absolute z-20 bg-[#0F2462] text-white
                           flex items-center justify-center shadow-md"
                style={{
                    right: "-1px",
                    top: "21%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "70px",
                    borderRadius: "50px 0 0 50px",
                }}
            >
                <FaChevronLeft className="text-[12px]" />
            </button>
        ) : (
            /* Closed: circular button half-visible on right edge */
            <button
                onClick={onToggle}
                className="absolute z-20   bg-[#0F2462]
                           flex items-center justify-center shadow-md"
                style={{
                    right: "-13px",
                    top: "19%",
                    transform: "translateY(-50%)",
                    width: "12px",
                    height: "70px",
                    borderRadius: "0 15px 15px 0",

                }}
            >
                <div className="p-1 text-white  rounded-full ">
                    <FaChevronRight className="text-[12px]" />
                </div>
            </button>
        )}
    </div>
));
SBSidebar.displayName = "SBSidebar";

export default SBSidebar;