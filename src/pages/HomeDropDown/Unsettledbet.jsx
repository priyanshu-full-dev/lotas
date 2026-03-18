import { memo, useState, useCallback } from "react";

const STATUS_OPTIONS = ["Matched", "Un-Matched", "Deleted"];

const UnSettledBet = memo(() => {
    const [status, setStatus] = useState("Matched");
    const [rows,   setRows]   = useState([]);
    const [page,   setPage]   = useState(1);
    const totalPages = Math.max(1, Math.ceil(rows.length / 10));

    const handleStatusChange = useCallback((val) => {
        setStatus(val);
        setRows([]);
        setPage(1);
    }, []);

    const COLS = ["No", "Event Name", "Nation", "Event Type", "Market Name", "Side", "Rate", "Amount", "Place Date", "Match Date"];

    return (
        <div className="min-h-screen bg-[#FFFFFF] md:bg-[#787878] md:px-1.5 md:py-1.5">
            <div className="w-full mx-auto">
                <div className="md:border md:border-[#696868] md:rounded-sm overflow-hidden">

                    {/* ── Header ── */}
                    <div className="bg-[#383838] md:bg-[#126E51] px-2 py-1 md:py-0 md:px-4">
                        <h2 className="text-white text-lg md:text-[24px] tracking-wide">
                            Un-Setteled Bet
                        </h2>
                    </div>

                    {/* ── Radio filters ── */}
                    <div className="px-2 py-3 flex items-center gap-4 md:gap-6">
                        {STATUS_OPTIONS.map((opt) => (
                            <label
                                key={opt}
                                className="flex items-center gap-1.5 cursor-pointer text-sm
                                           text-gray-800 md:text-white font-medium select-none"
                            >
                                <input
                                    type="radio"
                                    name="betStatus"
                                    value={opt}
                                    checked={status === opt}
                                    onChange={() => handleStatusChange(opt)}
                                    className="accent-green-600 w-4 h-4 cursor-pointer"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>

                    {/* ── Table ── */}
                    <div className="overflow-x-auto px-2">
                        <table className="w-full text-sm border-collapse min-w-[700px]">
                            <thead>
                                <tr className="bg-[#383838] md:bg-transparent text-white border-b-2 border-t border-l border-r border-[#555] md:border-white">
                                    {COLS.map((col) => (
                                        <th key={col}
                                            className="md:px-3 py-1.5 md:py-2.5 text-center font-semibold
                                                       border-r border-[#555] md:border-white last:border-r-0
                                                       tracking-wide text-[13px] md:text-[15px] whitespace-nowrap">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={10}
                                            className="px-2 py-2 text-[12px] md:text-[16px] text-gray-800 md:text-white border border-[#ddd]">
                                            No Data To Display
                                        </td>
                                    </tr>
                                ) : (
                                    rows.slice((page - 1) * 10, page * 10).map((row, i) => (
                                        <tr key={i} className="border-b border-[#ddd] hover:bg-white/5">
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.no}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.eventName}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.nation}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.eventType}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.marketName}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.side}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.rate}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.amount}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white whitespace-nowrap">{row.placeDate}</td>
                                            <td className="px-2 md:px-3 py-2 text-center text-gray-800 md:text-white whitespace-nowrap">{row.matchDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Pagination ── */}
                    <div className="flex items-center justify-center gap-1 py-3 border-t border-[#ddd] md:border-0 pb-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 text-sm border border-[#CCCCCC] md:border-[#FFF]
                                       text-gray-700 md:text-white bg-white md:bg-transparent
                                       hover:bg-gray-100 md:hover:bg-white/10
                                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            « Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button key={p} onClick={() => setPage(p)}
                                className={`w-8 h-7 text-sm border font-semibold transition-colors
                                            ${page === p
                                                ? "bg-[#383838] text-white border-[#126E51]"
                                                : "border-[#CCCCCC] md:border-[#FFF] text-gray-700 md:text-white bg-white md:bg-transparent hover:bg-gray-100 md:hover:bg-white/10"
                                            }`}>
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 text-sm border border-[#CCCCCC] md:border-[#FFF]
                                       text-gray-700 md:text-white bg-white md:bg-transparent
                                       hover:bg-gray-100 md:hover:bg-white/10
                                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            Next »
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
});
UnSettledBet.displayName = "UnSettledBet";

export default UnSettledBet;