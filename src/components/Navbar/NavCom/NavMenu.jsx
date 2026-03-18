import { memo, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navData";

const NavMenu = memo(() => {
    const navigate    = useNavigate();
    const location    = useLocation();
    const scrollRef   = useRef(null);
    const isDragging  = useRef(false);
    const startX      = useRef(0);
    const scrollStart = useRef(0);

    const handleClick = useCallback((label) => {
        if (label === "HOME")              navigate("/home");
        else if (label === "CASINO")       navigate("/home/casino");
        else if (label === "SPORTS BOOK")  navigate("/home/sports-book");
        else if (label === "HORSE RACING") navigate("/home/horse-racing");
        else if (label === "GREYHOUND RACING") navigate("/home/greyhound-racing");
        else {
            const slug = label.toLowerCase().replace(/\s+/g, "-");
            navigate(`/home/gamelist/${slug}`);
        }
    }, [navigate]);

    const isActive = useCallback((label) => {
        if (label === "HOME")                  return location.pathname === "/home";
        if (label === "CASINO")                return location.pathname.startsWith("/home/casino");
        if (label === "SPORTS BOOK")           return location.pathname === "/home/sports-book";
        if (label === "HORSE RACING")          return location.pathname === "/home/horse-racing";
        if (label === "GREYHOUND RACING")      return location.pathname === "/home/greyhound-racing";
        const slug = label.toLowerCase().replace(/\s+/g, "-");
        return location.pathname === `/home/gamelist/${slug}`;
    }, [location.pathname]);

    const onMouseDown = useCallback((e) => {
        isDragging.current  = true;
        startX.current      = e.pageX - scrollRef.current.offsetLeft;
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

    return (
        <div
            ref={scrollRef}
            className="nav-scroll w-full overflow-x-auto select-none bg-[#383838] cursor-grab"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <div className="flex min-w-max">
                {NAV_ITEMS.map(({ label }) => (
                    <button
                        key={label}
                        onClick={() => handleClick(label)}
                        className={`px-4 py-2 text-[0.86rem] font-bold whitespace-nowrap
                                    transition-all duration-150 border-b-2
                                    ${isActive(label)
                                        ? "text-white  "
                                        : "text-white border-transparent "
                                    }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
});
NavMenu.displayName = "NavMenu";

export default NavMenu;