import { useState } from "react";
import { FaCalendarAlt, FaChevronDown, FaChevronLeft, FaChevronRight, FaTh } from "react-icons/fa";

const SPORTS = ["All Sports", "Cricket", "Soccer", "Tennis", "Basketball", "Baseball"];
const BET_STATUSES = ["All", "Open", "Won", "Lost", "Void", "Cashout"];
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const TABLE_HEADERS = [
    { label: "PLACED DATE & TIME", className: "w-48 text-left" },
    { label: "MATCH",              className: "flex-1 text-left" },
    { label: "MARKET/RUNNER",      className: "flex-1 text-left" },
    { label: "ODDS",               className: "w-20 text-center" },
    { label: "STAKE",              className: "w-20 text-center" },
    { label: "BET STATUS",         className: "w-28 text-center" },
    { label: "RESULT",             className: "w-20 text-center" },
    { label: "RETURNS",            className: "w-24 text-right" },
];

const CSS = `
    .date-input::-webkit-calendar-picker-indicator { opacity: 0; position: absolute; right: 0; width: 100%; cursor: pointer; }
    .date-input::-webkit-inner-spin-button { display: none; }
    .date-input { color-scheme: light; }
`;

// ── Date Input — floating label + calendar + grid icon ────────────────────────
const DateInput = ({ label, value, onChange }) => {
    // Convert YYYY-MM-DD to DD-MM-YYYY for display, keep internal as YYYY-MM-DD
    return (
        <div className="relative flex-1 min-w-[160px]">
            {/* Floating label */}
            <label className="absolute -top-3 left-3 text-[11px] text-gray-900  px-1 z-10 leading-none">
                {label}
            </label>
            {/* Input box */}
            <div className="flex items-center bg-[#CCCCCC] border border-gray-400 rounded-sm
                            shadow-[0_1px_4px_rgba(0,0,0,0.92)] overflow-hidden">
                {/* Editable date input */}
                <input
                    type="date"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="date-input flex-1 bg-transparent text-[13px] 
                               text-white font-bold pl-3 py-2.5 outline-none border-none
                               appearance-none cursor-pointer min-w-0"
                />
                {/* Calendar icon */}
                <div className="flex items-center gap-1.5 pr-3 flex-shrink-0 pointer-events-none">
                    <FaCalendarAlt className="text-gray-500 text-[13px]" />
                    
                </div>
            </div>
        </div>
    );
};

// ── Select Dropdown ───────────────────────────────────────────────────────────
const SelectInput = ({ placeholder, options, value, onChange }) => (
    <div className="relative flex-1 min-w-[160px]">
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-[#CCCCCC] border border-gray-400 rounded-sm text-[13px] font-bold
                       text-gray-000 pl-4 pr-10 py-2.5 appearance-none cursor-pointer
                       focus:outline-none shadow-[0_1px_4px_rgba(0,0,0,0.92)]"
        >
            <option value="">{placeholder}</option>
            {options.map(o => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px] pointer-events-none" />
    </div>
);

// ── Pagination ────────────────────────────────────────────────────────────────
const Pagination = ({ rowsPerPage, setRowsPerPage, pageLabel, totalRows }) => (
    <div className="flex items-center justify-end gap-4 mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-600">Rows per page:</span>
            <div className="relative">
                <select
                    value={rowsPerPage}
                    onChange={e => setRowsPerPage(Number(e.target.value))}
                    className="appearance-none bg-transparent pr-6 font-bold text-[13px] cursor-pointer focus:outline-none text-gray-800"
                >
                    {ROWS_PER_PAGE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <FaChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] text-gray-600 pointer-events-none" />
            </div>
        </div>
        <span className="text-[13px] font-medium text-gray-700">{pageLabel}</span>
        <div className="flex items-center gap-1">
            <button
                disabled={totalRows === 0}
                className="p-1.5 rounded-sm hover:bg-gray-200 disabled:opacity-30 transition-colors disabled:cursor-default"
            >
                <FaChevronLeft className="text-[12px] text-gray-700" />
            </button>
            <button
                disabled={totalRows === 0}
                className="p-1.5 rounded-sm hover:bg-gray-200 disabled:opacity-30 transition-colors disabled:cursor-default"
            >
                <FaChevronRight className="text-[12px] text-gray-700" />
            </button>
        </div>
    </div>
);

// ── MyBets ────────────────────────────────────────────────────────────────────
const MyBets = () => {
    const today   = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const fmt = (d) => d.toISOString().split("T")[0];

    const [fromDate,      setFromDate]      = useState(fmt(weekAgo));
    const [toDate,        setToDate]        = useState(fmt(today));
    const [selectedSport, setSelectedSport] = useState("");
    const [betStatus,     setBetStatus]     = useState("");
    const [rowsPerPage,   setRowsPerPage]   = useState(10);

    const bets      = [];
    const totalRows = bets.length;
    const pageLabel = totalRows === 0 ? "0–0 of 0" : `1–${Math.min(rowsPerPage, totalRows)} of ${totalRows}`;

    return (
        <div className=" min-h-screen font-sans">
            <style>{CSS}</style>

            {/* ── DESKTOP ── */}
            <div className="hidden md:block pt-3 px-2"
            // style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
                <div className="max-w-5xl">

                    <h2 className="text-[20px] font-bold text-gray-900 tracking-widest mb-5 uppercase">
                        My Bets
                    </h2>

                    {/* Filters row */}
                    <div className="flex items-center gap-4 mb-6">
                        <DateInput   label="From Date"    value={fromDate}      onChange={setFromDate} />
                        <DateInput   label="To Date"      value={toDate}        onChange={setToDate} />
                        <SelectInput placeholder="Select Sports" options={SPORTS}       value={selectedSport} onChange={setSelectedSport} />
                        <SelectInput placeholder="Bet Status"    options={BET_STATUSES} value={betStatus}     onChange={setBetStatus} />
                    </div>

                    {/* Table */}
                    <div className="bg-[#a5a3a3] rounded-t-2xl  overflow-hidden
                                    shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center bg-[#CCCCCC]  border-b border-gray-200 px-4 py-3 gap-2">
                            {TABLE_HEADERS.map(({ label, className }) => (
                                <div key={label} className={`text-[12px] font-medium text-[#0F2462] tracking-wider uppercase ${className}`}>
                                    {label}
                                </div>
                            ))}
                        </div>
                        {bets.length === 0 ? (
                            <div className="flex items-center justify-center py-8 bg-[#F5F5F5]">
                                <span className="text-sm font-medium text-gray-500">Bets are not available</span>
                            </div>
                        ) : (
                            bets.map((bet, i) => (
                                <div key={i} className="flex items-center px-4 py-3 gap-2 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                    <div className="w-48">{bet.placedAt}</div>
                                    <div className="flex-1">{bet.match}</div>
                                    <div className="flex-1">{bet.market}</div>
                                    <div className="w-20 text-center">{bet.odds}</div>
                                    <div className="w-20 text-center">{bet.stake}</div>
                                    <div className="w-28 text-center">{bet.status}</div>
                                    <div className="w-20 text-center">{bet.result}</div>
                                    <div className="w-24 text-right">{bet.returns}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <Pagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} pageLabel={pageLabel} totalRows={totalRows} />
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div className="flex md:hidden flex-col p-3 gap-4">

                <div className="flex gap-3">
                    <DateInput label="From Date" value={fromDate} onChange={setFromDate} />
                    <DateInput label="To Date"   value={toDate}   onChange={setToDate} />
                </div>

                <div className="flex gap-3">
                    <SelectInput placeholder="Select Sports" options={SPORTS}       value={selectedSport} onChange={setSelectedSport} />
                    <SelectInput placeholder="Bet Status"    options={BET_STATUSES} value={betStatus}     onChange={setBetStatus} />
                </div>

                <div className="bg-white b rounded-sm overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm" style={{ minWidth: "480px" }}>
                            <thead>
                                <tr className="border-b border-gray-200 bg-[#CCCCCC]">
                                    <th className="text-[11px] font-black text-[#0F2462] uppercase tracking-wide text-left px-3 py-2.5">Match</th>
                                    <th className="text-[11px] font-black text-[#0F2462] uppercase tracking-wide text-center px-3 py-2.5">Odds</th>
                                    <th className="text-[11px] font-black text-[#0F2462] uppercase tracking-wide text-center px-3 py-2.5">Stake</th>
                                    <th className="text-[11px] font-black text-[#0F2462] uppercase tracking-wide text-center px-3 py-2.5">Status</th>
                                    <th className="text-[11px] font-black text-[#0F2462] uppercase tracking-wide text-right px-3 py-2.5">Returns</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6  text-sm text-gray-500 bg-[#F5F5F5]">
                                            Bets are not available
                                        </td>
                                    </tr>
                                ) : (
                                    bets.map((bet, i) => (
                                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-3 py-2.5 text-gray-800">{bet.match}</td>
                                            <td className="px-3 py-2.5 text-center">{bet.odds}</td>
                                            <td className="px-3 py-2.5 text-center">{bet.stake}</td>
                                            <td className="px-3 py-2.5 text-center">{bet.status}</td>
                                            <td className="px-3 py-2.5 text-right">{bet.returns}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} pageLabel={pageLabel} totalRows={totalRows} />
            </div>
        </div>
    );
};

export default MyBets;