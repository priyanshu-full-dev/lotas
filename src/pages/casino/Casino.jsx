import { useState, useCallback, lazy, Suspense } from "react";
import { SUB_CATEGORIES } from "./comopnents/Casinodata";
import CasinoTopBar   from "./comopnents/Casinotopbar";
import CasinoMainTabs from "./comopnents/Casinomaintabs";
import CasinoSubTabs  from "./comopnents/Casinosubtabs";
import LiveMatchBar   from "../../components/HomeCom/Livenatchbar";
import MobileMainNav  from "../../components/Mobilemainnav";
import PageLoader from "../../components/PageLoader";

// ── Lazy — heaviest component ─────────────────────────────────────────────────
const CasinoGameGrid = lazy(() => import("./comopnents/Casinogamegrid"));

const Casino = () => {
    const [activeCategory,    setActiveCategory]    = useState("ALL");
    const [activeSubCategory, setActiveSubCategory] = useState("ALL");
    const [searchQuery,       setSearchQuery]       = useState("");

    const handleCategoryChange = useCallback((cat) => {
        setActiveCategory(cat);
        const firstSub = SUB_CATEGORIES[cat]?.[0]?.label ?? "ALL";
        setActiveSubCategory(firstSub);
        setSearchQuery("");
    }, []);

    const handleSubCategoryChange = useCallback((sub) => {
        setActiveSubCategory(sub);
        setSearchQuery("");
    }, []);

    const handleSearch = useCallback((q) => {
        setSearchQuery(q);
        if (q) {
            setActiveCategory("ALL");
            setActiveSubCategory("ALL");
        }
    }, []);

    return (
        <>
            <div className="md:hidden">
                <LiveMatchBar />
                <MobileMainNav />
            </div>

            <div className="w-full pt-1 md:pt-2 px-1.5 min-h-screen">

                <CasinoTopBar onSearch={handleSearch} />

                <CasinoMainTabs
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                <CasinoSubTabs
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    onSubCategoryChange={handleSubCategoryChange}
                />

                <Suspense fallback={<PageLoader />}>
                    <CasinoGameGrid
                        activeCategory={activeCategory}
                        activeSubCategory={activeSubCategory}
                        searchQuery={searchQuery}
                    />
                </Suspense>

            </div>
        </>
    );
};

export default Casino;