import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PROVIDERS = [
    { id: 1, label: "MAC88 VIRTUAL GAMES", img: "/games/providers/mac88-virtual.png", path: "/home/casino/mac88-virtual" },
    { id: 2, label: "MAC88 CASINO", img: "/games/providers/mac88-virtual.png", path: "/home/casino/mac88-casino" },
    { id: 3, label: "MAC EXCITE", img: "/games/providers/mac88-virtual.png", path: "/home/casino/mac-excite" },
    { id: 4, label: "CREED", img: "/games/providers/mac88-virtual.png", path: "/home/casino/creed" },
    { id: 5, label: "EZUGI", img: "/games/providers/mac88-virtual.png", path: "/home/casino/ezugi" },
    { id: 6, label: "SMARTSOFT GAMING", img: "/games/providers/mac88-virtual.png", path: "/home/casino/smartsoft" },
    { id: 7, label: "TURBO GAMES", img: "/games/providers/mac88-virtual.png", path: "/home/casino/turbo-games" },
    { id: 8, label: "SPRIBE", img: "/games/providers/mac88-virtual.png", path: "/home/casino/spribe" },
    { id: 9, label: "VIVO GAMING", img: "/games/providers/mac88-virtual.png", path: "/home/casino/vivo-gaming" },
    { id: 10, label: "EVOLUTION", img: "/games/providers/mac88-virtual.png", path: "/home/casino/evolution" },
    { id: 11, label: "JILI", img: "/games/providers/mac88-virtual.png", path: "/home/casino/jili" },
    { id: 12, label: "BOMBAY LIVE", img: "/games/providers/mac88-virtual.png", path: "/home/casino/bombay-live" },
];

const CSS = `
  .provider-thumb img {
    transition: transform 0.22s ease;
  }
  .provider-thumb:hover img {
    transform: scale(1.05);
  }
`;

// ✅ Named function — HMR works
function ProviderCard({ provider, onClick }) {
    return (
        <div
            className="provider-thumb cursor-pointer overflow-hidden "
            onClick={() => onClick(provider.path)}
        >
            <div className="relative h-18 md:h-42 overflow-hidden" >
                <img
                    src={provider.img}
                    alt={provider.label}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

// ✅ Named function — HMR works
function OurProviders() {
    const navigate = useNavigate();
    const handleClick = useCallback((path) => navigate(path), [navigate]);

    return (
        <div className="w-full ">
            <style>{CSS}</style>

            <div className="flex items-center md:mb-0.5     bg-[#383838] gap-2 " style={{ height: "30px", overflow: "hidden" }}>
                <motion.span
                    animate={{
                        scale: [1, 1.08, 1],
                        color: ["#ADE8FF", "#ffffff", "#ADE8FF"],

                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="font-black px-3 tracking-widest uppercase"
                    style={{ display: "inline-block" }}
                >
                    OUR PROVIDERS
                </motion.span>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 p-0.5 md:p-0 gap-0.5">
                {PROVIDERS.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
}

export default OurProviders;