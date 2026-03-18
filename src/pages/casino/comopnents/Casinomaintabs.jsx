import { memo, useRef, useCallback } from "react";
import { CASINO_CATEGORIES } from "./Casinodata";



const CasinoMainTabs = memo(({ activeCategory, onCategoryChange }) => {
    const ref        = useRef(null);
    const isDragging = useRef(false);
    const startX     = useRef(0);
    const scrollStart= useRef(0);

    const onMouseDown = useCallback((e) => {
        isDragging.current  = true;
        startX.current      = e.pageX - ref.current.offsetLeft;
        scrollStart.current = ref.current.scrollLeft;
        ref.current.style.cursor = "grabbing";
    }, []);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
        if (ref.current) ref.current.style.cursor = "grab";
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        ref.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.5;
    }, []);

    return (
        <div className="w-full   border-b border-[#333]">
            <div
                ref={ref}
                className="casino-main-scroll md:pb-5 overflow-x-auto select-none cursor-grab"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="flex min-w-max gap-px  md:bg-[#333]">
                    {CASINO_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={` px-3 md:px-4  py-1.5 md:py-1 text-[12px] md:text-[16px] font-bold md:font-normal whitespace-nowrap
                                        transition-all duration-150
                                        ${activeCategory === cat
                                            ? " bg-[#126E51] md:bg-[#383838] -mr-0.5 md:-mr-0  text-white"
                                            : "text-white bg-[#383838] md:bg-[#494949]"
                                        }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
CasinoMainTabs.displayName = "CasinoMainTabs";

export default CasinoMainTabs;