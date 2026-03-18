import { memo, useState, useCallback } from "react";

const SPORTS_OPTIONS = ["All Sports", "Cricket", "Football", "Tennis", "Casino", "Horse Racing"];
const STATUS_OPTIONS = ["Matched", "Unmatched", "Deleted", "Settled"];

const BetHistory = memo(() => {
    const [sport,    setSport]    = useState("All Sports");
    const [status,   setStatus]   = useState("Matched");
    const [fromDate, setFromDate] = useState("2026-03-13");
    const [toDate,   setToDate]   = useState("2026-03-16");
    const [rows,     setRows]     = useState([]);
    const [page,     setPage]     = useState(1);
    const totalPages = Math.max(1, Math.ceil(rows.length / 10));

    const handleSubmit = useCallback(() => {
        setRows([]);
        setPage(1);
    }, [sport, status, fromDate, toDate]);

    const COLS = ["Event Name", "Nation", "Bet Type", "User Rate", "Amount", "Profit/loss", "Place Date", "Match Date"];

    return (
        <div className="min-h-screen bg-[#FFFFFF] md:bg-[#787878] md:px-1.5 md:py-1.5">
            <div className="w-full mx-auto">
                <div className="md:border md:border-[#696868] md:rounded-sm overflow-hidden">

                    {/* ── Header ── */}
                    <div className="bg-[#383838] md:bg-[#126E51] px-2 py-1 md:py-0 md:px-4">
                        <h2 className="text-white text-lg md:text-[24px] tracking-wide">
                            Bet History
                        </h2>
                    </div>

                    {/* ── Mobile Filters ── */}
                    <div className="md:hidden px-2 py-3 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <select value={sport} onChange={(e) => setSport(e.target.value)}
                                className="flex-1 border border-[#CCCCCC] rounded-sm px-2 py-2 text-sm text-gray-700 outline-none cursor-pointer">
                                {SPORTS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 border border-[#CCCCCC] rounded-sm px-2 py-2 text-sm text-gray-700 outline-none cursor-pointer">
                                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <input type="date" value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="flex-1 border border-[#CCCCCC] rounded-sm px-2 py-2 text-sm text-gray-700 outline-none cursor-pointer" />
                            <input type="date" value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="flex-1 border border-[#CCCCCC] rounded-sm px-2 py-2 text-sm text-gray-700 outline-none cursor-pointer" />
                        </div>
                        <button onClick={handleSubmit}
                            className="w-full bg-[#126E51] hover:bg-[#0f5a42] text-white text-sm py-1 rounded-sm transition-colors">
                            Submit
                        </button>
                    </div>

                    {/* ── Desktop Filters ── */}
                    <div className="hidden md:flex flex-wrap items-center gap-2 px-2 py-2 pt-4">
                        <select value={sport} onChange={(e) => setSport(e.target.value)}
                            className="border border-[#FFF] rounded-sm px-3 py-2 text-sm text-white outline-none cursor-pointer w-48">
                            {SPORTS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}
                            className="border border-[#FFF] rounded-sm px-3 py-2 text-sm text-white outline-none cursor-pointer w-48">
                            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
                            className="border border-[#FFF] rounded-sm px-3 w-46 pr-10 py-2 text-sm text-white outline-none cursor-pointer" />
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
                            className="border border-[#FFF] rounded-sm px-3 w-46 pr-10 py-2 text-sm text-white outline-none cursor-pointer" />
                        <button onClick={handleSubmit}
                            className="bg-[#1a6b4a] hover:bg-[#126E51] text-white text-md px-5 py-2 rounded-sm transition-colors">
                            Submit
                        </button>
                    </div>

                    {/* ── Table ── */}
                    <div className="overflow-x-auto px-2">
                        <table className="w-full text-sm border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-[#383838]  md:bg-transparent text-white border-b-2 border-t border-l border-r border-[#555] md:border-white">
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
                                        <td colSpan={8} className="px-2 py-2 text-[12px] md:text-[16px] text-gray-800 md:text-white border border-[#ddd]">
                                            No Data To Display
                                        </td>
                                    </tr>
                                ) : (
                                    rows.slice((page - 1) * 10, page * 10).map((row, i) => (
                                        <tr key={i} className="border-b border-[#ddd] hover:bg-white/5">
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.eventName}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.nation}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.betType}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.userRate}</td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white">{row.amount}</td>
                                            <td className={`px-2 md:px-3 py-2 text-center border-r border-[#ddd] font-semibold
                                                            ${row.profitLoss >= 0 ? "text-green-600 md:text-green-400" : "text-red-500 md:text-red-400"}`}>
                                                {row.profitLoss}
                                            </td>
                                            <td className="px-2 md:px-3 py-2 text-center border-r border-[#ddd] text-gray-800 md:text-white whitespace-nowrap">{row.placeDate}</td>
                                            <td className="px-2 md:px-3 py-2 text-center text-gray-800 md:text-white whitespace-nowrap">{row.matchDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Pagination ── */}
                    <div className=" items-center hidden md:flex justify-center gap-1 py-3 border-t border-[#ddd] md:border-0 pb-4">
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
                                                ? "bg-[#007BFF] text-white border-blue-600"
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
BetHistory.displayName = "BetHistory";

export default BetHistory;