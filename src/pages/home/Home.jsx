import { useState, useCallback, lazy, Suspense } from "react";
import LiveMatchBar  from "../../components/HomeCom/Livenatchbar";
import InnerNavBar   from "../../components/HomeCom/Innernavbar";
import FilterBar     from "../../components/HomeCom/Filterbar";
import MobileMainNav from "../../components/Mobilemainnav";
import PageLoader from "../../components/PageLoader";

// ── Lazy loaded heavy components ──────────────────────────────────────────────
const MatchTable   = lazy(() => import("../../components/HomeCom/Matchtable"));
const RacingTable  = lazy(() => import("../Racing/Racingtable"));
const GameCarousel = lazy(() => import("../../components/GameDisplay/Gamecarousel "));
const NewLaunch    = lazy(() => import("../../components/GameDisplay/Newlaunch"));
const MyFavourites = lazy(() => import("../../components/GameDisplay/Myfavourites"));
const OurProviders = lazy(() => import("../../components/GameDisplay/Ourproviders"));

const MATCH_SPORTS     = ["INPLAY", "CRICKET", "FOOTBALL", "TENNIS"];
const RACING_SPORTS    = ["HORSE RACING", "GREYHOUND RACING"];
const NO_CASINO_SPORTS = [
    "BINARY", "KABADDI", "POLITICS", "BASKETBALL",
    "BASEBALL", "TABLE TENNIS", "VOLLEYBALL",
    "BOXING", "SNOOKER", "DARTS", "CYCLING", "RUGBY",
];

const Home = () => {
    const [activeSport, setActiveSport] = useState("INPLAY");
    const [filters, setFilters]         = useState({ live: false, virtual: false, premium: false });
    const [viewBy, setViewBy]           = useState("TIME");

    const toggleFilter      = useCallback((key) => setFilters(prev => ({ ...prev, [key]: !prev[key] })), []);
    const handleSportChange = useCallback((sport) => setActiveSport(sport), []);

    const isRacing   = RACING_SPORTS.includes(activeSport);
    const showCasino = MATCH_SPORTS.includes(activeSport);
    const showMatch  = MATCH_SPORTS.includes(activeSport) || NO_CASINO_SPORTS.includes(activeSport);

    return (
        <div className="md:p-1.5 p-0 pb-0.5">
            <LiveMatchBar />

            <div className="md:hidden">
                <MobileMainNav />
            </div>

            <InnerNavBar activeSport={activeSport} onSportChange={handleSportChange} />

            {!isRacing && (
                <FilterBar filters={filters} viewBy={viewBy} onToggle={toggleFilter} onViewBy={setViewBy} />
            )}

            {isRacing && (
                <Suspense fallback={<PageLoader />}>
                    <RacingTable activeSport={activeSport} />
                </Suspense>
            )}

            {showMatch && (
                <Suspense fallback={<PageLoader />}>
                    <MatchTable activeSport={activeSport} filters={filters} viewBy={viewBy} />
                </Suspense>
            )}

            {(showCasino || true) && (
                <div className={!showCasino ? "md:hidden" : ""}>
                    <Suspense fallback={<PageLoader />}>
                        <GameCarousel />
                        <NewLaunch />
                        <MyFavourites />
                        <OurProviders />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default Home;