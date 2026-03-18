import { memo, useState, useEffect, useRef, useCallback } from "react";
import { BANNERS } from "./sbData";

// Clone list: [...BANNERS, BANNERS[0]] so last→first wraps seamlessly
const SLIDES = [...BANNERS, BANNERS[0]];
const TOTAL  = BANNERS.length;

const SBBanner = memo(() => {
    const [index,      setIndex]      = useState(0);
    const [transition, setTransition] = useState(true);
    const touchStartX  = useRef(null);
    const autoRef      = useRef(null);

    // After sliding to the clone (index === TOTAL), silently jump to real index 0
    const handleTransitionEnd = () => {
        if (index === TOTAL) {
            setTransition(false);
            setIndex(0);
        }
    };

    // Re-enable transition after the silent jump
    useEffect(() => {
        if (!transition) {
            const id = requestAnimationFrame(() => {
                requestAnimationFrame(() => setTransition(true));
            });
            return () => cancelAnimationFrame(id);
        }
    }, [transition]);

    const nextSlide = useCallback(() => {
        setTransition(true);
        setIndex(i => i + 1); // goes to clone when i === TOTAL-1
    }, []);

    const prevSlide = useCallback(() => {
        setTransition(true);
        setIndex(i => (i - 1 + TOTAL) % TOTAL);
    }, []);

    const startAuto = useCallback(() => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(nextSlide, 3000);
    }, [nextSlide]);

    useEffect(() => {
        startAuto();
        return () => clearInterval(autoRef.current);
    }, [startAuto]);

    // Touch swipe
    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd   = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? nextSlide() : prevSlide();
            startAuto();
        }
        touchStartX.current = null;
    };

    // Dot click — real index only
    const goTo = (i) => {
        setTransition(true);
        setIndex(i);
        startAuto();
    };

    // Dot active index (clamp clone back to 0)
    const activeIndex = index === TOTAL ? 0 : index;

    return (
        <div
            className="relative overflow-hidden h-28 md:h-43 flex-shrink-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Slides */}
            <div
                className="flex h-full"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: transition ? "transform 0.4s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {SLIDES.map((banner, i) => (
                    <div
                        key={i}
                        className="min-w-full h-full flex flex-col items-center justify-center text-white p-8"
                        style={{ background: banner.bg }}
                    >
                        <h2 className="text-2xl font-black text-center leading-tight mb-2">
                            {banner.title}
                        </h2>
                        <p className="text-sm opacity-80">{banner.sub}</p>
                    </div>
                ))}
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            i === activeIndex ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
});

SBBanner.displayName = "SBBanner";
export default SBBanner;