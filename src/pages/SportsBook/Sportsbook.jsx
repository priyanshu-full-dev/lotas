import { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import SBSidebar   from "./SportsBookCom/Sbsidebar";
import SBBanner    from "./SportsBookCom/Sbbanner";
import SBSportTabs from "./SportsBookCom/Sbsporttabs";
import SBMobileNav from "./SportsBookCom/Sbmobilenav";
import { FavouritesProvider } from "./FavouriteContext/Favouritescontext";

// ── Lazy loaded ───────────────────────────────────────────────────────────────
const SBEvents     = lazy(() => import("./SportsBookCom/Sbevents"));
const SBFavourites = lazy(() => import("./SportsBookCom/Sbfavourites"));
const MyBets       = lazy(() => import("./SportsBookCom/Mybits"));
const Results      = lazy(() => import("./SportsBookCom/Results"));
const QuickSearch  = lazy(() => import("./SportsBookCom/Quicksearch"));
const BetSlip      = lazy(() => import("./SportsBookCom/Betslip"));

const SportsBook = () => {
    const [activeSport,   setActiveSport]   = useState("Cricket");
    const [sidebarOpen,   setSidebarOpen]   = useState(true);
    const [activeView,    setActiveView]    = useState("Events");
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [betSlipOpen,   setBetSlipOpen]   = useState(false);
    const [isMobile,      setIsMobile]      = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const handleSportChange    = useCallback((sport) => setActiveSport(sport), []);
    const handleToggle         = useCallback(() => setSidebarOpen(p => !p), []);
    const handleViewChange     = useCallback((view) => setActiveView(view), []);
    const handleFavouriteClick = useCallback((match) => {
        // Navigate to Favourite view and switch to the match's sport
        setActiveView("Favourite");
        if (match.sport) setActiveSport(match.sport);
    }, []);

    useEffect(() => {
        const navbar = document.querySelector("header");
        const el     = contentRef.current;
        if (!navbar || !el) return;

        const onScroll = () => {
            if (el.scrollTop > 0) {
                navbar.style.position = "sticky";
                navbar.style.top      = "0";
                navbar.style.zIndex   = "50";
            } else {
                navbar.style.position = "";
                navbar.style.top      = "";
                navbar.style.zIndex   = "";
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => {
            el.removeEventListener("scroll", onScroll);
            navbar.style.position = "";
            navbar.style.top      = "";
            navbar.style.zIndex   = "";
        };
    }, []);

    return (
        <FavouritesProvider>
        <div
            className="flex w-full bg-[#D7D6D6]"
            style={{ fontFamily: "Montserrat, sans-serif", height: "calc(100vh - 60px)" }}
        >
            {/* ── DESKTOP sidebar ── */}
            <div className="hidden md:flex">
                <SBSidebar
                    activeSport={activeSport}
                    onSportChange={handleSportChange}
                    open={sidebarOpen}
                    onToggle={handleToggle}
                    activeView={activeView}
                    onViewChange={handleViewChange}
                />
            </div>

            {/* ── MOBILE nav overlay ── */}
            {isMobile && (
                <SBMobileNav
                    open={mobileNavOpen}
                    onOpen={() => setMobileNavOpen(true)}
                    onClose={() => setMobileNavOpen(false)}
                    activeView={activeView}
                    onViewChange={handleViewChange}
                />
            )}

            {/* ── MAIN CONTENT ── */}
            <div
                ref={contentRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="flex-1 min-w-0 flex px-1 md:px-4 md:pr-8 py-1 md:py-1.5 flex-col overflow-y-auto"
            >
                {activeView === "My Bets" ? (
                    <Suspense fallback={null}>
                        <MyBets />
                    </Suspense>

                ) : activeView === "Results" ? (
                    <Suspense fallback={null}>
                        <Results />
                    </Suspense>

                ) : activeView === "Search" ? (
                    <Suspense fallback={null}>
                        <QuickSearch />
                    </Suspense>

                ) : (
                    <>
                        {activeView === "Events" && <SBBanner />}

                        {activeView === "Live" && (
                            <div className="px-3 py-3 -mb-4 flex items-center gap-2">
                                <h2 className="text-[20px] font-bold text-gray-900 tracking-widest uppercase">
                                    Live
                                </h2>
                            </div>
                        )}

                        {activeView === "Favourite" && (
                            <div className="px-3 py-3 -mb-4 flex items-center gap-2">
                                <h2 className="text-[20px] font-bold text-gray-900 tracking-widest uppercase">
                                    My favourite
                                </h2>
                            </div>
                        )}

                        <SBSportTabs
                            activeSport={activeSport}
                            onSportChange={handleSportChange}
                            activeView={activeView}
                            onViewChange={handleViewChange}
                        />

                        <Suspense fallback={null}>
                            {activeView === "Favourite"
                                ? <SBFavourites activeSport={activeSport} />
                                : <SBEvents activeSport={activeSport} activeView={activeView} onFavouriteClick={handleFavouriteClick} />
                            }
                        </Suspense>
                    </>
                )}
            </div>

            {/* ── BET SLIP — desktop only ── */}
            {!isMobile && (
                <Suspense fallback={null}>
                    <BetSlip open={betSlipOpen} onToggle={() => setBetSlipOpen(p => !p)} />
                </Suspense>
            )}
        </div>
        </FavouritesProvider>
    );
};

export default SportsBook;