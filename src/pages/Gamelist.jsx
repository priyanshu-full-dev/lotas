import React, { useState, useCallback } from 'react'
import LiveMatchBar from '../components/HomeCom/Livenatchbar'
import FilterBar from '../components/HomeCom/Filterbar'
import SportTable from '../components/HomeCom/Sporttable'
import GameCarousel from '../components/GameDisplay/Gamecarousel '
import NewLaunch from '../components/GameDisplay/Newlaunch'
import MyFavourites from '../components/GameDisplay/Myfavourites'
import OurProviders from '../components/GameDisplay/Ourproviders'
import { useParams } from 'react-router-dom'
import { getMatchesBySport } from '../data/Matchdata'

const SPORT_LABELS = {
    "inplay": "INPLAY",
    "cricket": "CRICKET",
    "football": "FOOTBALL",
    "tennis": "TENNIS",
    "horse-racing": "HORSE RACING",
    "greyhound-racing": "GREYHOUND RACING",
    "basketball": "BASKETBALL",
    "baseball": "BASEBALL",
    "table-tennis": "TABLE TENNIS",
    "volleyball": "VOLLEYBALL",
    "boxing": "BOXING",
    "kabaddi": "KABADDI",
    "politics": "POLITICS",
    "binary": "BINARY",
    "snooker": "SNOOKER",
    "darts": "DARTS",
    "cycling": "CYCLING",
    "rugby": "RUGBY",
};

// Casino sections only for these sports
const CASINO_SPORTS = ["cricket", "football", "tennis"];

const Gamelist = () => {
    const { games } = useParams();
    const key = games ?? "inplay";
    const matches = getMatchesBySport(key === "inplay" ? "all" : key);
    const label = SPORT_LABELS[key] ?? key.toUpperCase();

    const [filters, setFilters] = useState({ live: false, virtual: false, premium: false });
    const [viewBy, setViewBy] = useState("TIME");

    const handleToggle = useCallback((k) => {
        setFilters(prev => ({ ...prev, [k]: !prev[k] }));
    }, []);

    const showCasino = CASINO_SPORTS.includes(key);

    return (
        <div className='pt-2 px-2'>
            <LiveMatchBar />

            {/* ── Sport label badge ── */}
            <div className=" mb-1">
                <span className="inline-block bg-[#383838] text-white text-[15px] 
                                  px-4 py-1 uppercase ">
                    {label}
                </span>
            </div>

            <FilterBar
                filters={filters}
                viewBy={viewBy}
                onToggle={handleToggle}
                onViewBy={setViewBy}
            />

            <SportTable
                matches={matches}
                label={label}
                basePath={`/home/gamelist/${key}`}
                filters={filters}
                viewBy={viewBy}
            />

            {/* Casino sections — only for cricket, football, tennis */}
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
}

export default Gamelist;