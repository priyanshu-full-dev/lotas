import { memo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    MdSportsCricket, MdSportsSoccer, MdSportsTennis, MdCasino,
    MdSportsBasketball, MdSportsVolleyball, MdSportsBaseball,
    MdSportsMartialArts, MdSports
} from "react-icons/md";
import { FaHorse, FaDog, FaBullseye, FaBiking, FaFistRaised } from "react-icons/fa";
import { BsController } from "react-icons/bs";

const INNER_NAV_ITEMS = [
    { label: "INPLAY",           Icon: BsController },
    { label: "CRICKET",          Icon: MdSportsCricket },
    { label: "FOOTBALL",         Icon: MdSportsSoccer },
    { label: "TENNIS",           Icon: MdSportsTennis },
    { label: "CASINO",           Icon: MdCasino },
    { label: "HORSE RACING",     Icon: FaHorse },
    { label: "GREYHOUND RACING", Icon: FaDog },
    { label: "BINARY",           Icon: BsController },
    { label: "KABADDI",          Icon: MdSportsMartialArts },
    { label: "POLITICS",         Icon: MdSports },
    { label: "BASKETBALL",       Icon: MdSportsBasketball },
    { label: "BASEBALL",         Icon: MdSportsBaseball },
    { label: "TABLE TENNIS",     Icon: MdSportsTennis },
    { label: "VOLLEYBALL",       Icon: MdSportsVolleyball },
    { label: "BOXING",           Icon: FaFistRaised },
    { label: "SNOOKER",          Icon: MdSports },
    { label: "DARTS",            Icon: FaBullseye },
    { label: "CYCLING",          Icon: FaBiking },
    { label: "RUGBY",            Icon: MdSports },
];

const InnerNavBar = memo(({ activeSport, onSportChange }) => {
    const navigate    = useNavigate();
    const scrollRef   = useRef(null);
    const isDragging  = useRef(false);
    const startX      = useRef(0);
    const scrollStart = useRef(0);

    const handleClick = useCallback((label) => {
        if (label === "CASINO") {
            navigate("/home/casino");
        } else {
            onSportChange(label);
        }
    }, [navigate, onSportChange]);

    const onMouseDown = useCallback((e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollStart.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = "grabbing";
    }, []);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        scrollRef.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.5;
    }, []);

    // First non-INPLAY item is default active on mobile
    const mobileActive = activeSport === "INPLAY" ? "CRICKET" : activeSport;

    return (
        <div className="w-full bg-[#1a1a1a]  border-b border-[#333]">
            <div
                ref={scrollRef}
                className="inner-nav-scroll overflow-x-auto select-none cursor-grab"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="flex min-w-max md:gap-px bg-[#333]">
                    {INNER_NAV_ITEMS.map(({ label, Icon }) => (
                        <button
                            key={label}
                            onClick={() => handleClick(label)}
                            className={`
                                whitespace-nowrap transition-all duration-150
                                ${label === "INPLAY" ? "hidden md:inline-flex" : ""}
                                ${/* Desktop active */ ""}
                                ${activeSport === label
                                    ? "md:bg-[#383838] md:text-white"
                                    : "md:text-white md:bg-[#494949]"
                                }
                                ${/* Mobile active — green */ ""}
                                ${mobileActive === label
                                    ? "bg-[#126E51] text-white"
                                    : "bg-[#383838] text-white"
                                }
                            `}
                        >
                            {/* Mobile: icon + label stacked */}
                            <span className="flex flex-col  items-center gap-0.5 px-1.5 py-1.5 md:hidden">
                                <Icon className="text-2xl" />
                                <span className="text-[12px] font-bold">{label}</span>
                            </span>

                            {/* Desktop: label only */}
                            <span className="hidden md:inline px-4 py-1 text-[16px]">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
InnerNavBar.displayName = "InnerNavBar";

export default InnerNavBar;