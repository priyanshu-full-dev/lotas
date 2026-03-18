import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const RACING_DATA = {
    "HORSE RACING": {
        countries: ["US", "NZ", "AU"],
        venues: {
            US: [
                { id: 1, name: "Turf Paradise (US) 10th Mar", times: ["05:17"] },
                { id: 2, name: "Santa Anita (US) 10th Mar",  times: ["06:00", "06:30", "07:00"] },
            ],
            NZ: [
                { id: 3, name: "Ascot Park (NZL) 11th Mar",  times: ["05:05","05:22","05:39","05:55","06:13","06:30","06:48","07:05","07:22"] },
                { id: 4, name: "Trentham (NZL) 11th Mar",    times: ["08:00","08:30"] },
            ],
            AU: [
                { id: 5, name: "Flemington (AUS) 11th Mar",  times: ["04:30","05:00","05:30","06:00"] },
                { id: 6, name: "Randwick (AUS) 11th Mar",    times: ["05:15","05:45","06:15"] },
            ],
        },
    },
    "GREYHOUND RACING": {
        countries: ["UK", "AU", "IE"],
        venues: {
            UK: [
                { id: 7,  name: "Romford (UK) 11th Mar",     times: ["05:04","05:19","05:34","05:49","06:04"] },
                { id: 8,  name: "Crayford (UK) 11th Mar",    times: ["06:10","06:25","06:40"] },
            ],
            AU: [
                { id: 9,  name: "Sandown (AUS) 11th Mar",    times: ["04:52","05:10","05:28","05:46"] },
            ],
            IE: [
                { id: 10, name: "Shelbourne Park (IRE) 11th Mar", times: ["07:00","07:15","07:30"] },
            ],
        },
    },
};

const CSS = `
  .time-btn:hover { background: #126E51; color: white; }
`;

const VenueRow = memo(({ venue, onTimeClick }) => (
    <div className="border-b border-[#e0e0e0] bg-[#F2F2F2]">

        {/* ── DESKTOP ── */}
        <div className="hidden md:flex items-center gap-48 px-5 py-2.5">
            <div className="flex items-center gap-3 min-w-[220px] flex-shrink-0">
                <span className="text-[10px] border border-orange-400 text-orange-400
                                 px-1 rounded-sm font-bold flex-shrink-0">□</span>
                <span className="text-black text-[14px]">{venue.name}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
                {venue.times.map((time) => (
                    <button key={time} onClick={() => onTimeClick(venue.id, time)}
                        className="time-btn px-2 bg-[#d0d0d0] text-black text-[16px]
                                   rounded-sm transition-colors duration-150">
                        {time}
                    </button>
                ))}
            </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="flex md:hidden flex-col px-3 py-2 gap-2">
            {/* Venue name row */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] border border-orange-400 text-orange-400
                                 px-1 rounded-sm font-bold flex-shrink-0">□</span>
                <span className="text-black text-[13px] font-medium">{venue.name}</span>
            </div>
            {/* Time buttons — wrap freely */}
            <div className="flex flex-wrap gap-1.5">
                {venue.times.map((time) => (
                    <button key={time} onClick={() => onTimeClick(venue.id, time)}
                        className="time-btn px-3 py-1.5 bg-[#d0d0d0] text-black text-[13px]
                                   font-medium rounded-sm transition-colors duration-150">
                        {time}
                    </button>
                ))}
            </div>
        </div>
    </div>
));
VenueRow.displayName = "VenueRow";

const RacingTable = memo(({ activeSport, showHeading = false }) => {
    const navigate = useNavigate();
    const data = RACING_DATA[activeSport];
    const [activeCountry, setActiveCountry] = useState(data?.countries[0] ?? "");

    const handleCountryChange = useCallback((country) => setActiveCountry(country), []);

    const handleTimeClick = useCallback((venueId, time) => {
        navigate(`/home/${activeSport === "HORSE RACING" ? "horse-racing" : "greyhound-racing"}/${venueId}/${time.replace(":", "-")}`);
    }, [navigate, activeSport]);

    if (!data) return null;

    const venues = data.venues[activeCountry] ?? [];

    return (
        <div className="w-full bg-[#787578]">
            <style>{CSS}</style>

            {/* Sport heading — only shown when navigating directly via NavMenu */}
            {showHeading && (
                <div className="px-4 py-1 w-fit md:bg-[#494949] bg-[#787578]">
                    <span className="text-white text-[15px] tracking-wide uppercase">
                        {activeSport}
                    </span>
                </div>
            )}

            {/* Country tabs */}
            <div className="flex bg-[#787578]">
                {data.countries.map((country) => (
                    <button
                        key={country}
                        onClick={() => handleCountryChange(country)}
                        className={`flex-1 md:flex-none md:px-4 py-1.5 border-[0.5px] border-[#383838]
                                    text-[14px] md:text-[15px] tracking-wider transition-colors font-bold
                                    ${activeCountry === country
                                        ? "bg-[#126E51] text-white"
                                        : "text-white bg-[#494949]"
                                    }`}
                    >
                        {country}
                    </button>
                ))}
            </div>

            {/* Venue rows */}
            {venues.length === 0 ? (
                <div className="text-center text-gray-400 text-xs py-8">
                    No races available.
                </div>
            ) : (
                venues.map((venue) => (
                    <VenueRow
                        key={venue.id}
                        venue={venue}
                        onTimeClick={handleTimeClick}
                    />
                ))
            )}
        </div>
    );
});
RacingTable.displayName = "RacingTable";

export default RacingTable;