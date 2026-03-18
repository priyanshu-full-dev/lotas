import { useState, useCallback } from 'react'
import InnerNavBar from '../../components/HomeCom/Innernavbar'
import FilterBar from '../../components/HomeCom/Filterbar'
import MatchTable from '../../components/HomeCom/Matchtable'
import LiveMatchBar from '../../components/HomeCom/Livenatchbar'
import MobileMainNav from '../../components/Mobilemainnav'

const Sports = () => {
    const [activeSport, setActiveSport] = useState("INPLAY");
    const [filters, setFilters] = useState({ live: false, virtual: false, premium: false });
    const [viewBy, setViewBy] = useState("TIME");

    const handleSportChange = useCallback((sport) => setActiveSport(sport), []);
    const toggleFilter = useCallback((key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    }, []);

    return (
        <div className="">
            <LiveMatchBar/>
            <MobileMainNav/>
            <InnerNavBar
                activeSport={activeSport}
                onSportChange={handleSportChange}
            />
            <FilterBar
                filters={filters}
                viewBy={viewBy}
                onToggle={toggleFilter}
                onViewBy={setViewBy}
            />
            <MatchTable
                activeSport={activeSport}
                filters={filters}
                viewBy={viewBy}
            />
        </div>
    );
}

export default Sports;