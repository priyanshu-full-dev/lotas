import { memo, useRef, useCallback } from "react";
import { SUB_CATEGORIES } from "./Casinodata";



const CasinoSubTabs = memo(({ activeCategory, activeSubCategory, onSubCategoryChange }) => {
    const ref        = useRef(null);
    const isDragging = useRef(false);
    const startX     = useRef(0);
    const scrollStart= useRef(0);

    // Get sub-categories for current main category, fallback to ALL
    const subCats = SUB_CATEGORIES[activeCategory] ?? SUB_CATEGORIES["ALL"];

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
        <div className="w-full   mt-1 " style={{ overflow: "hidden" }}>
           
            <div
                ref={ref}
                className="casino-sub-scroll overflow-x-auto select-none cursor-grab "
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="flex pb-1.5 min-w-max h-full  ">
                    {subCats.map(({ label, img }) => (
                        <button
                            key={label}
                            onClick={() => onSubCategoryChange(label)}
                           
                            className={`flex flex-col items-center  border-[#2A2A2A] justify-center py-1  px-4 min-w-[40px]
                                        whitespace-nowrap transition-all duration-150 flex-shrink-0
                                        ${activeSubCategory === label
                                            ? "bg-[#383838] text-white"
                                            : " mg-white md:bg-[#494949] border-t border-b border-r md:border-0 md:border-r text-black md:text-gray-300 "
                                        }`}
                        >
                            <img
                                src={img}
                                alt={label}
                                style={{ 
                                    width: "30px", 
                                    height: "32px",
                                    filter: activeSubCategory === label 
                                        ? "invert(98%) sepia(0%) saturate(0%) hue-rotate(290deg) brightness(104%) contrast(101%)" 
                                        : "none"
                                }}
                                className="object-contain mb-1 flex-shrink-0"
                                onError={(e) => { e.target.style.visibility = "hidden"; }}
                            />
                            <span className="text-[13px]  tracking-wider leading-2">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
CasinoSubTabs.displayName = "CasinoSubTabs";

export default CasinoSubTabs;