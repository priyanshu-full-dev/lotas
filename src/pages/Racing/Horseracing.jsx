import { useState, useCallback } from "react";
import LiveMatchBar from "../../components/HomeCom/Livenatchbar";
import InnerNavBar from "../../components/HomeCom/Innernavbar";
import FilterBar from "../../components/HomeCom/Filterbar";
import RacingTable from "./Racingtable";
import MatchTable from "../../components/HomeCom/Matchtable";
import GameCarousel from "../../components/GameDisplay/Gamecarousel ";
import NewLaunch from "../../components/GameDisplay/Newlaunch";
import MyFavourites from "../../components/GameDisplay/Myfavourites";
import OurProviders from "../../components/GameDisplay/Ourproviders";
import MobileMainNav from "../../components/Mobilemainnav";

const MATCH_SPORTS    = ["INPLAY", "CRICKET", "FOOTBALL", "TENNIS"];
const RACING_SPORTS   = ["HORSE RACING", "GREYHOUND RACING"];
const NO_CASINO_SPORTS = [
    "BINARY", "KABADDI", "POLITICS", "BASKETBALL",
    "BASEBALL", "TABLE TENNIS", "VOLLEYBALL",
    "BOXING", "SNOOKER", "DARTS", "CYCLING", "RUGBY",
];

const HorseRacing = () => {
    const [activeSport, setActiveSport] = useState("HORSE RACING");
    const [filters, setFilters]         = useState({ live: false, virtual: false, premium: false });
    const [viewBy, setViewBy]           = useState("TIME");

    const toggleFilter    = useCallback((key) => setFilters(prev => ({ ...prev, [key]: !prev[key] })), []);
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
            <div className="md:hidden">
                <InnerNavBar activeSport={activeSport} onSportChange={handleSportChange} />
            </div>

            {!isRacing && (
                <FilterBar filters={filters} viewBy={viewBy} onToggle={toggleFilter} onViewBy={setViewBy} />
            )}

            {isRacing && <RacingTable activeSport={activeSport} showHeading />}

            {showMatch && <MatchTable activeSport={activeSport} filters={filters} viewBy={viewBy} />}

            {showCasino && (
                <>
                    <GameCarousel />
                    <NewLaunch />
                    <MyFavourites />
                    <OurProviders />
                </>
            )}
        </div>
    );
};

export default HorseRacing;