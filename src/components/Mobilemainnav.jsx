import { memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MOBILE_NAV_ITEMS = [
    { label: "INPLAY",       path: "/home" },
    { label: "SPORTS",       path: "/home/sports" },
    { label: "CASINO",       path: "/home/casino" },
    { label: "SPORTS BOOK",  path: "/home/sports-book" },
    { label: "OTHERS",       path: "/home/gamelist/others" },
];

const MobileMainNav = memo(() => {
    const navigate  = useNavigate();
    const location  = useLocation();

    const isActive = useCallback((path) => {
        if (path === "/home") return location.pathname === "/home" || location.pathname === "/home/";
        return location.pathname.startsWith(path);
    }, [location.pathname]);

    return (
        <div className="md:hidden w-full bg-[#126E51]">
            <div className="flex items-center">
                {MOBILE_NAV_ITEMS.map(({ label, path }, i) => (
                    <div key={label} className="flex items-center flex-1">
                        <button
                            onClick={() => navigate(path)}
                            className={`flex-1 py-2.5 px-1.5 text-[12px] font-bold 
                                        text-center transition-colors whitespace-nowrap
                                        ${isActive(path)
                                            ? "text-white border-t-2 border-white"
                                            : "text-white hover:text-white"
                                        }`}
                        >
                            {label}
                        </button>
                        {/* Divider between items */}
                        {i < MOBILE_NAV_ITEMS.length - 1 && (
                            <div className="w-px h-4 bg-white flex-shrink-0" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});
MobileMainNav.displayName = "MobileMainNav";

export default MobileMainNav;