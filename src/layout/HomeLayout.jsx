import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Sidebar from "../components/HomeCom/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/HomeCom/Footer";

const HomeLayout = () => {
    const location    = useLocation();
    const hideSidebar = location.pathname.startsWith("/home/sports-book");

    return (
        <div className="flex flex-col">
            <Navbar username="demo123" />

            <div className="flex flex-1">
                {/* Hide sidebar on sports-book page */}
                {!hideSidebar && <Sidebar />}

                <main className="flex-1 min-w-0 bg-[#F1F5F8] md:bg-[#787578]">
                    <Suspense fallback={<PageLoader fullScreen={false} />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default HomeLayout;