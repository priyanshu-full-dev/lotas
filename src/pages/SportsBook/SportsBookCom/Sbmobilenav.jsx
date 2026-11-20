import { memo, useState, useEffect } from "react";
import { FaHome, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { SIDEBAR_BTNS } from "./Sbdata";

const SBMobileNav = memo(({ open, onClose, onOpen, activeView, onViewChange }) => {
    const [headerH, setHeaderH] = useState(60);

    useEffect(() => {
        const measure = () => {
            const h = document.querySelector("header")?.offsetHeight ?? 60;
            setHeaderH(h);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const handleHome = () => {
        onViewChange("Events");
        onClose();
    };

    return (
        <>
            {/* Transparent backdrop — tap outside to close */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={onClose}
                />
            )}

            {/* ── CLOSED: circular button on right edge ── */}
            {!open && (
                <button
                    onClick={onOpen}
                    className="fixed z-50   bg-[#0F2462]
                               flex items-center justify-center shadow-md"
                    style={{
                        right: "0px",
                        top: `calc(${headerH}px + 59%)`,
                        transform: "translateY(-50%)",
                        width: "9px",
                        height: "80px",
                         borderRadius: "10px 0px 0px 10px",
                    }}
                >
                    <div className="p-1 border-0.5 border-white text-white bg-[#0F2462] rounded-full -ml-2">
                        <FaChevronLeft className="text-[10px]" />
                    </div>
                </button>
            )}

            {/* ── OPEN: thin tab on left side of panel + panel ── */}
            {open && (
                <div
                    className="fixed z-50 flex items-center"
                    style={{
                        top: `calc(${headerH}px + 50%)`,
                        right: 0,
                        transform: "translateY(-50%)",
                    }}
                >
                    {/* Chevron close tab */}
                    <button
                        onClick={onClose}
                        className="bg-[#0F2462] text-white -mr-2 z-51 flex items-center justify-center flex-shrink-0"
                        style={{
                            width: "10px",
                            height: "90px",
                            borderRadius: "0px 4px 4px 0px",
                        }}
                    >
                        <FaChevronRight className="text-[10px]" />
                    </button>

                    {/* Nav card */}
                    <div
                        className="bg-[#CCCCCC] rounded-[10px] py-2 overflow-hidden"
                        style={{
                            width: "140px",
                            border: "1px solid #e0e0e0",
                            borderLeft: "none",
                            boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
                        }}
                    >
                        {/* Home */}
                        <button
                            onClick={handleHome}
                            className={`w-full flex items-center gap-2 px-4 py-3
                                        ${activeView === "Events" ? "bg-[#0F2462]" : " text-gray-800  opacity-80 hover:opacity-100"}`}
                        >
                            <FaHome className="text-gray-800 text-lg" />
                            <span className="text-gray-800 font-semibold text-[15px]">Home</span>
                        </button>

                        {/* Nav items */}
                        <div>
                            {SIDEBAR_BTNS.filter(b => b.label !== "Events").map(({ label, Icon }) => {
                                const isActive = activeView === label;
                                const isLive   = label === "Live";
                                return (
                                    <button
                                        key={label}
                                        onClick={() => { onViewChange(label); onClose(); }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 
                                                    text-[14px] font-medium transition-colors
                                                    ${isActive
                                                        ? "bg-[#0F2462] text-white"
                                                        : "text-gray-800 "
                                                    }`}
                                    >
                                        {isLive ? (
                                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-sm leading-none
                                                              ${isActive ? "bg-white text-[#0F2462]" : "bg-[#0F2462] text-white"}`}>
                                                LIVE
                                            </span>
                                        ) : (
                                            <Icon className={`text-[18px] flex-shrink-0 ${isActive ? "text-white" : "text-gray-600"}`} />
                                        )}
                                        <span>{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

SBMobileNav.displayName = "SBMobileNav";
export default SBMobileNav;