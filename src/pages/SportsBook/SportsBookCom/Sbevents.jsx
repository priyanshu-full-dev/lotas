import { memo, useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { LIVE_EVENTS as LIVE_EVENTS_DATA, VIRTUAL_EVENTS as VIRTUAL_EVENTS_DATA } from "./sbData";
import MatchCard from "./Matchcard";

const UPCOMING_EVENTS_DATA = [
    { id: 101, sport: "Cricket",    date: "Today", time: "09:00 AM", live: false, competition: "India / T20 Ayodhya Premier League",     team1: "Yamuna Super Kings", team2: "Chambal Chargers",  score: "0 : 0", odds: ["2.16", null,  "1.62"] },
    { id: 102, sport: "Cricket",    date: "Today", time: "10:10 AM", live: false, competition: "India / Thunderbolt T10 League",          team1: "Gujarat Tigers",     team2: "Chennai Warlords",  score: "0 : 0", odds: ["1.727",null,  "1.98"] },
    { id: 103, sport: "Cricket",    date: "Today", time: "12:30 PM", live: false, competition: "Uganda / Sabula T20 Cricket Challenge",   team1: "Kachanga Giants",    team2: "Nsonga Royals",     score: "0 : 0", odds: ["2.42", null,  "1.5"]  },
    { id: 104, sport: "Cricket",    date: "Today", time: "12:45 PM", live: false, competition: "India / Thunderbolt T10 League",          team1: "Mumbai Mavericks",   team2: "Delhi Champions",   score: "0 : 0", odds: ["3.4",  null,  "1.26"] },
    { id: 105, sport: "Cricket",    date: "Today", time: "01:30 PM", live: false, competition: "India / T20 Ayodhya Premier League",     team1: "Ganga Warriors",     team2: "Gomti Thunder",     score: "0 : 0", odds: ["1.62", null,  "2.16"] },
    { id: 106, sport: "Soccer",     date: "Today", time: "09:00 AM", live: false, competition: "Australia / U23 Victoria Premier League", team1: "Melbourne City",     team2: "Brisbane Roar",     score: "0 : 0", odds: ["1.9",  "3.2", "4.1"]  },
    { id: 107, sport: "Soccer",     date: "Today", time: "10:00 AM", live: false, competition: "EPL / Premier League",                   team1: "Arsenal",            team2: "Chelsea",           score: "0 : 0", odds: ["2.1",  "3.4", "3.5"]  },
    { id: 108, sport: "Soccer",     date: "Today", time: "11:30 AM", live: false, competition: "La Liga / Spain",                        team1: "Real Madrid",        team2: "Atletico Madrid",   score: "0 : 0", odds: ["1.8",  "3.6", "4.2"]  },
    { id: 109, sport: "Tennis",     date: "Today", time: "08:00 AM", live: false, competition: "ATP / Masters 1000 Miami",               team1: "Sinner J.",          team2: "Medvedev D.",       score: "0 : 0", odds: ["1.4",  null,  "2.9"]  },
    { id: 110, sport: "Tennis",     date: "Today", time: "09:30 AM", live: false, competition: "WTA / Miami Open",                       team1: "Swiatek I.",         team2: "Keys M.",           score: "0 : 0", odds: ["1.3",  null,  "3.5"]  },
    { id: 111, sport: "Basketball", date: "Today", time: "10:00 AM", live: false, competition: "NBA / Playoffs",                         team1: "Celtics",            team2: "Heat",              score: "0 : 0", odds: ["1.6",  null,  "2.4"]  },
    { id: 112, sport: "Baseball",   date: "Today", time: "11:00 AM", live: false, competition: "MLB / Regular Season",                   team1: "Cubs",               team2: "Cardinals",         score: "0 : 0", odds: ["1.7",  null,  "2.1"]  },
];

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = memo(({ title, isLive, open, onToggle }) => (
    <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mt-1 py-3 border-b border-gray-500"
    >
        <div className="flex items-center gap-2">
            {isLive && (
                <span className="text-red-500 text-xs font-black animate-pulse">((·))</span>
            )}
            <span className="text-[18px] font-medium text-gray-800 uppercase tracking-wide leading-0">
                {title}
            </span>
        </div>
        {open
            ? <FaChevronUp className="text-black text-xs" />
            : <FaChevronDown className="text-black text-xs" />
        }
    </button>
));
SectionHeader.displayName = "SectionHeader";

// ── Collapsible Section ───────────────────────────────────────────────────────
const EventSection = memo(({ title, matches, isLive = false, viewAllLabel, onViewAll, onFavouriteClick }) => {
    const [open, setOpen] = useState(true);
    const bodyRef = useRef(null);
    const [height, setHeight] = useState("auto");

    useEffect(() => {
        const el = bodyRef.current;
        if (!el) return;
        if (open) {
            setHeight(`${el.scrollHeight}px`);
            const onEnd = () => setHeight("auto");
            el.addEventListener("transitionend", onEnd, { once: true });
            return () => el.removeEventListener("transitionend", onEnd);
        } else {
            setHeight(`${el.scrollHeight}px`);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setHeight("0px"));
            });
        }
    }, [open]);

    return (
        <div className="border-b border-gray-200">
            <SectionHeader
                title={title}
                isLive={isLive}
                open={open}
                onToggle={() => setOpen(p => !p)}
            />
            <div
                ref={bodyRef}
                style={{
                    height,
                    overflow: "hidden",
                    transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {matches.map(match => (
                    <MatchCard key={match.id} match={match} onFavouriteClick={onFavouriteClick} />
                ))}
                {viewAllLabel && (
                    <button
                        onClick={onViewAll}
                        className="w-full py-3 text-sm font-semibold text-gray-600
                                   hover:bg-gray-100 transition-colors border-t border-gray-100
                                   flex items-center justify-center gap-1"
                    >
                        {viewAllLabel} <span className="text-[#3d5a80]">&raquo;</span>
                    </button>
                )}
            </div>
        </div>
    );
});
EventSection.displayName = "EventSection";

// ── SBEvents ──────────────────────────────────────────────────────────────────
const SBEvents = memo(({ activeView, activeSport, onFavouriteClick }) => {
    const bySport = (arr) => arr.filter(m => m.sport === activeSport);

    const liveMatches     = bySport(LIVE_EVENTS_DATA);
    const virtualMatches  = bySport(VIRTUAL_EVENTS_DATA);
    const upcomingMatches = bySport(UPCOMING_EVENTS_DATA);

    const hasNoData =
        liveMatches.length === 0 &&
        virtualMatches.length === 0 &&
        upcomingMatches.length === 0;

    if (hasNoData) {
        return (
            <div className="bg-white flex-1 px-4 py-3 text-sm text-gray-600">
                No {activeSport} events
            </div>
        );
    }

    if (activeView === "Live") {
        const allLive = [...liveMatches, ...virtualMatches];
        if (allLive.length === 0) {
            return (
                <div className="bg-white flex-1 px-4 py-3 text-sm text-gray-600">
                    No {activeSport} live events
                </div>
            );
        }
        return (
            <div className="flex-1">
                {allLive.map(match => <MatchCard key={match.id} match={match} onFavouriteClick={onFavouriteClick} />)}
            </div>
        );
    }

    return (
        <div className="flex-1">
            <EventSection title="Live Events"     matches={liveMatches}    isLive onFavouriteClick={onFavouriteClick} />
            <EventSection title="Virtual Events"  matches={virtualMatches} isLive onFavouriteClick={onFavouriteClick} />
            <EventSection
                title="Upcoming Events"
                matches={upcomingMatches}
                viewAllLabel={`View all ${activeSport} upcoming events (21)`}
                onFavouriteClick={onFavouriteClick}
            />
        </div>
    );
});
SBEvents.displayName = "SBEvents";

export default SBEvents;