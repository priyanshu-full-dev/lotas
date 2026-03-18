import { div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ── Collapsible Section ───────────────────────────────────────────────────────
const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-300">
            <button
                onClick={() => setOpen(p => !p)}
                className="w-full flex items-center border-b border-gray-300 justify-between px-3 pt-4 py-2"
            >
                <span className="text-[15px]  text-[#364b89] font-mono font-black uppercase">
                    {title}
                </span>
                {open
                    ? <FaChevronUp className="text-gray-600 text-[11px]" />
                    : <FaChevronDown className="text-gray-600 text-[11px]" />
                }
            </button>
            {open && children}
        </div>
    );
};

// ── BetSlip ───────────────────────────────────────────────────────────────────
const BetSlip = ({ open, onToggle }) => {
    const [betId, setBetId] = useState("");
    const [matchedOpen, setMatchedOpen] = useState(true);
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

    return (
        <>
            {/* Right-edge tab handle */}
            <button
                onClick={onToggle}
                className={`fixed z-50 border-2 ${open ? "hidden" : ""} rounded-full bg-[#0F2462]
              flex items-center justify-center shadow-md`}
                style={{
                    right: open ? "300px" : "-55px",
                    top: `calc(${headerH}px + 22%)`,
                    transform: "translateY(-50%)",
                    width: "90px",
                    height: "100px",
                    transition: "right 0.3s ease",
                }}
            >
                {!open && (
                    <img
                        className="-ml-16"
                        src="/svg/svg-viewer.svg"
                        alt="icon"
                    />
                )}

                {open ? (
                    <FaChevronRight className="text-[10px] mr-2" />
                ) : (
                    <div className="p-1 border-2 border-black text-white pr-1 bg-[#0F2462] rounded-full -ml-10">
                        <FaChevronLeft className="text-[10px]" />
                    </div>
                )}
            </button>
            {/* Sliding panel */}
            <div
                className="fixed top-0 py-4 right-0 z-40 bg-[#F0F0F0] overflow-y-auto
                           border-l-3 border-[#0F2462] shadow-2xl transition-transform duration-300"
                style={{
                    width: "382px",
                    top: `${headerH}px`,
                    height: `calc(100vh - ${headerH}px)`,
                    transform: open ? "translateX(0)" : "translateX(100%)",
                }}
            >
                <button
                    onClick={onToggle}
                    className={`fixed z-50 ${open ? "flex" : "hidden"} bg-[#0F2462] text-white
              items-center justify-center shadow-md`}
                    style={{
                        right: open ? "370px" : "0%",
                        top: `calc(${headerH}px + -12%)`,
                        transform: "translateY(-50%)",
                        width: "15px",
                        height: "70px",
                        borderRadius: "0px 4px 4px 0px",
                        transition: "right 0.3s ease",
                    }}
                >
                    {open && <FaChevronRight className="text-[10px]" />}
                </button>

                {/* ── 1. BET SLIP ── */}
                <Section   title="Bet Slip">
                    <div className="mx-6  my-3 bg-[#D7D6D6] flex flex-col
                                    items-center justify-center py-6 px-4 text-center">
                        <p className="text-[14px] font-bold text-gray-700 mb-1">Place your bets</p>
                        <p className="text-[12px] text-gray-500">Your selection will appear here</p>
                    </div>
                </Section>

                {/* ── 2. OPEN BETS ── */}
                <Section title="Open Bets (0)" defaultOpen={false}>
                    <div className="mx-2 mb-3 border border-gray-300 bg-white overflow-hidden">

                        {/* Matched Bets sub-section */}
                        <button
                            onClick={() => setMatchedOpen(p => !p)}
                            className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F8F8F8] border-b border-gray-200"
                        >
                            <span className="text-[12px] font-bold text-[#0F2462] uppercase tracking-wide">
                                Matched Bets (0)
                            </span>
                            {matchedOpen
                                ? <FaChevronUp className="text-gray-500 text-[10px]" />
                                : <FaChevronDown className="text-gray-500 text-[10px]" />
                            }
                        </button>

                        {matchedOpen && (
                            <>
                                {/* Table header */}
                                <div className="flex items-center px-3 py-1.5 bg-white border-b border-gray-200">
                                    <span className="flex-1 text-[11px] font-semibold text-gray-600">Market</span>
                                    <span className="w-14 text-right text-[11px] font-semibold text-gray-600">Odds</span>
                                    <span className="w-14 text-right text-[11px] font-semibold text-gray-600">Stake</span>
                                </div>
                                {/* Empty state */}
                                <div className="px-3 py-5 text-center">
                                    <span className="text-[12px] font-semibold text-gray-600">
                                        No Matched Bets Found.
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </Section>

                {/* ── 3. BET DETAILS ── */}
                <Section title="Bet Details" defaultOpen={false}>
                    <div className="px-4 pb-5 pt-1">
                        <div className="flex gap-2 items-stretch">
                            {/* Bet ID input with floating label */}
                            <div className="flex-1 relative">
                                <label className="absolute -top-2 left-3 text-[10px] text-gray-500 bg-[#F0F0F0] px-1 z-10">
                                    Bet ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Bet ID"
                                    value={betId}
                                    onChange={e => setBetId(e.target.value)}
                                    className="w-full h-full border border-gray-400 px-3 py-3
                                               text-[13px] text-gray-700 placeholder-gray-400
                                               bg-white focus:outline-none focus:border-[#0F2462]"
                                />
                            </div>
                            <button
                                className="bg-[#2c4a8e] hover:bg-[#0F2462] text-white text-[13px]
                                           font-semibold px-5 transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Section>

            </div>
        </>
    );
};

export default BetSlip;