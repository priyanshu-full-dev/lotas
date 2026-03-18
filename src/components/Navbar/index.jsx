import { memo } from "react";
import { GLOBAL_CSS } from "./NavCom/navData";
import MobileNav from "./NavCom/MobileNav";
import DesktopNav from "./NavCom/DesktopNav";
import { useLocation } from "react-router-dom";
import LiveMatchBar from "../HomeCom/Livenatchbar";

const Navbar = memo(({ username = "demo123" }) => {
  const location = useLocation();
  const hideSidebar = location.pathname.startsWith("/home/sports-book");

  return (
    <header className="w-full shadow-2xl">
      <style>{GLOBAL_CSS}</style>

      <MobileNav username={username} />
      <DesktopNav username={username} />

      <div className="flex md:hidden">
        {hideSidebar && <LiveMatchBar />}
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;