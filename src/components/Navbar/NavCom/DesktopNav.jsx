import { memo, useCallback, useRef, useState, useEffect } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Chevron from "./Chevron";
import DropdownMenu from "./DropdownMenu";
import TickerText from "./TickerText";
import SuggestionList from "./SuggestionList";
import NavMenu from "./NavMenu";

const DesktopNav = memo(({ username }) => {
    const [open, setOpen]               = useState(false);
    const [searchOpen, setSearchOpen]   = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef                = useRef(null);
    const searchWrapRef                 = useRef(null);
    const navigate                      = useNavigate();

    // ── Toggle search input open/close (re-click icon = close) ───────────────
    const toggleSearch = useCallback(() => {
        setSearchOpen((prev) => {
            if (!prev) setTimeout(() => searchInputRef.current?.focus(), 50);
            else setSearchQuery("");
            return !prev;
        });
    }, []);
  

    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), []);

    // ── Click suggestion → fill input, keep input open, close suggestions ────
    const handleSuggestionSelect = useCallback((item) => {
        setSearchQuery(item.match);
    }, []);

    // ── Click outside search wrapper → close suggestions only ────────────────
    useEffect(() => {
        if (!searchOpen) return;
        const handleClickOutside = (e) => {
            if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
                setSearchQuery(""); // clears query → hides suggestion list
                // searchOpen stays true → input stays visible
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchOpen]);

    return (
        <div className="hidden md:block">

            {/* ── Top bar ── */}
            <div className="flex items-stretch gap-4 px-4 pt-2 pb-1 bg-[#126E51]">

                {/* Logo */}
                <div className="flex-shrink-0 self-center">
                    <img
                        className="w-auto h-[65px]"
                        src="../../public/logo/99lotus.com.png"
                        alt="99Lotus"
                    />
                </div>

                <div className="flex-1" />

                {/* Right column: controls + ticker */}
                <div className="flex flex-col justify-end mt-2   items-end min-w-0">

                    {/* User controls row */}
                    <div className="flex items-center gap-5">

                        {/* Search — inline expanding or icon */}
                        {searchOpen ? (
                            <div ref={searchWrapRef} className="relative flex items-center">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="All Events"
                                    className="search-expand bg-white text-gray-800 placeholder-gray-500
                                               text-sm px-3 py-1.5 outline-none"
                                />
                                {/* Re-click icon to close input */}
                                <button
                                    onClick={toggleSearch}
                                    aria-label="Close Search"
                                    className="flex items-center  justify-center text-[24px] text-white
                                            "
                                >
                                    <FaSearchPlus />
                                </button>
                                <SuggestionList
                                    query={searchQuery}
                                    onSelect={handleSuggestionSelect}
                                    mobile={false}
                                />
                            </div>
                        ) : (
                            <button
                                onClick={toggleSearch}
                                aria-label="Open Search"
                                className="flex items-center -mt-1.5 font-bold justify-center text-[24px]
                                           text-white"
                            >
                                <FaSearchPlus />
                            </button>
                        )}

                        <button
    onClick={() => navigate("/home/rule")}
    className="text-white text-md font-bold 
               whitespace-nowrap">
    Rules
</button>

                        <div className="flex flex-col leading-4 whitespace-nowrap">
                            <span className="text-white  text-md">
                                Balance: <span className="font-bold">0.00</span>
                            </span>
                            <span className="text-white underline   text-md">
                                Exposure: <span className="font-bold">0</span>
                            </span>
                        </div>

                        {/* Username dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button className="flex items-center gap-2 mt-2 text-white   ">
                                <span>{username}</span>
                                <span className="font-bold"><Chevron open={open} /></span>
                            </button>
                            <DropdownMenu open={open} />
                        </div>
                    </div>

                    {/* Ticker */}
                    <div className="overflow-hidden -mb-1 w-[83%] ">
                        <TickerText />
                    </div>
                </div>
            </div>

            {/* ── Scrollable nav menu ── */}
            <NavMenu />
        </div>
    );
});
DesktopNav.displayName = "DesktopNav";

export default DesktopNav;
