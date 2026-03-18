import { memo, useCallback, useRef, useState } from "react";
import { FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { PiBank } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Chevron from "./Chevron";
import TickerText from "./TickerText";
import SuggestionList from "./SuggestionList";

const MobileNav = memo(({ username }) => {
    const [open, setOpen]               = useState(false);
    const [searchOpen, setSearchOpen]   = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef                = useRef(null);
    const navigate                      = useNavigate();

    const goHome = useCallback(() => navigate("/home"), [navigate]);

    const openSearch = useCallback(() => {
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
    }, []);

    const closeSearch = useCallback(() => {
        setSearchOpen(false);
        setSearchQuery("");
    }, []);

    const handleSearchChange     = useCallback((e) => setSearchQuery(e.target.value), []);
    const handleSuggestionSelect = useCallback((item) => {
        setSearchQuery(item.match);
        setSearchOpen(false);
    }, []);

    // Navigate and close dropdown
    const handleNav = useCallback((path) => {
        navigate(path);
        setOpen(false);
    }, [navigate]);

    return (
        <div className="md:hidden">

            {/* Row 1: logo | balance + username */}
            <div className="flex items-center justify-between px-3 py-1 bg-[#126E51]">
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={goHome}>
                    <FaHome className="text-white text-2xl" />
                    <span className="font-extrabold select-none leading-1 text-[1.6rem]">
                        <span className="text-yellow-400">99</span>
                        <span className="text-white">LOTUS</span>
                    </span>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1.5">
                        <PiBank className="text-black bg-[#358583] text-lg" />
                        <span className="text-white font-bold text-sm">0.00</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                        <span className="text-white underline underline-offset-2">Exp: 0</span>

                        {/* Username + dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setOpen(prev => !prev)}
                                className="flex items-center gap-0.5 text-white underline underline-offset-2 transition-colors"
                            >
                                <span>{username}</span>
                                <Chevron open={open} />
                            </button>

                            {/* Mobile dropdown */}
                            {open && (
                                <div className="fixed top-14 right-2 w-52 shadow-2xl z-[999]
                                                bg-white border border-gray-200 overflow-hidden">
                                    {[
                                        { label: "Home",               path: "/home"                       },
                                        { label: "Account Statement",  path: "/home/account-statement"     },
                                        { label: "Profit Loss Report", path: "/home/profit-loss"           },
                                        { label: "Bet History",        path: "/home/bet-history"           },
                                        { label: "Unsetteled Bet",     path: "/home/unsettled-bet"         },
                                        { label: "Set Button Values",  path: "/home/change-button-values"  },
                                        { label: "Change Password",    path: "/home/change-password"       },
                                        { label: "Rule",               path: "/home/rule"                  },
                                    ].map(item => (
                                        <button
                                            key={item.label}
                                            onClick={() => handleNav(item.path)}
                                            className="w-full text-left px-4 py-2.5 text-[13px] text-gray-800
                                                       border-b border-gray-100 hover:bg-gray-100"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                    <div className="border-t border-gray-200" />
                                    <button
                                        onClick={() => handleNav("/")}
                                        className="w-full text-left px-4 py-2.5 text-[13px] text-red-500
                                                   font-bold hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: search + ticker */}
            {searchOpen ? (
                <div className="relative flex items-center gap-2 px-3 bg-[#126E51]">
                    <div className="flex items-center bg-white rounded-full overflow-hidden px-3 py-1 w-56 flex-shrink-0">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            onFocus={() => setSearchOpen(true)}
                            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
                        />
                        <button onClick={closeSearch} className="text-black ml-1 flex-shrink-0">
                            <FaTimes className="text-sm text-black" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <TickerText />
                    </div>
                    {searchQuery.length > 0 && (
                        <div className="absolute left-3 right-3 top-full z-50">
                            <SuggestionList
                                query={searchQuery}
                                onSelect={handleSuggestionSelect}
                                mobile={true}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex pb-1 items-center gap-2 px-2.5 bg-[#126E51]">
                    <button
                        onClick={openSearch}
                        aria-label="Open Search"
                        className="flex-shrink-0 bg-white p-2 flex items-center justify-center
                                   rounded-full bg-transparent text-black text-[14px]"
                    >
                        <FaSearch className="text-black" />
                    </button>
                    <div className="flex-1 mb-1 overflow-hidden">
                        <TickerText />
                    </div>
                </div>
            )}
        </div>
    );
});
MobileNav.displayName = "MobileNav";

export default MobileNav;