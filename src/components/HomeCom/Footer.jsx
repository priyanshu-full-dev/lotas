import { memo } from "react";

const IMAGES = {
    sslBadge:     "/../../public/footer/ssl.png",
    badge18Plus:  "/../../public/footer/18plus.png",
    gamCareBadge: "/../../public/footer/gamecare.png",
    gtBadge:      "/../../public/footer/gt.png",
};

const Footer = memo(() => (
    <footer className="w-full bg-[#126E51] border-t-2 border-gray-700">

        {/* ════════ DESKTOP (sm+) ════════ */}
        <div className="hidden md:flex items-center justify-between px-4 pl-5 gap-2">
            <div className="flex flex-col items-start flex-shrink-0">
                <img src={IMAGES.sslBadge} alt="Secure SSL Encryption"
                     className="h-25 h-14 w-auto object-contain" />
                <div className="flex flex-col leading-tight">
                    <span className="text-white font-black text-md leading-3 tracking-wide">
                        100% SAFE
                    </span>
                    <span className="text-white text-md font-medium">
                        Protected connection and encrypted data.
                    </span>
                </div>
            </div>
            <div className="flex items-center flex-shrink-0">
                <img src={IMAGES.badge18Plus}  alt="18+"     className="h-12 w-12 object-contain" />
                <img src={IMAGES.gamCareBadge} alt="GamCare" className="h-12 w-12 object-contain" />
                <img src={IMAGES.gtBadge}      alt="GT"      className="h-12 w-12 object-contain" />
            </div>
        </div>
        <div className="hidden md:block text-center leading-4 pb-2">
            <span className="text-white text-[16px]">
                © Copyright 2026. All Rights Reserved.
            </span>
        </div>

        {/* ════════ MOBILE ════════ */}
        <div className="md:hidden flex flex-col items-center bg-white px-2 pt-10 pb-3 gap-4">

            {/* Row 1: SSL badge left + safe text right */}
            <div className="flex items-center justify-center gap-10 w-full">
                <img
                    src={IMAGES.sslBadge}
                    alt="Secure SSL Encryption"
                    className="h-12 w-auto object-contain flex-shrink-0"
                />
                <div className="flex flex-col text-center  gap-1">
                    <span className="text-black font-black text-sm tracking-wide">
                        100% SAFE
                    </span>
                    <span className="text-black text-[10px] font-medium leading-snug">
                        Protected connection and encrypted <br /> data.
                    </span>
                </div>
            </div>

            {/* Row 2: 18+ / GamCare / GT — centered */}
            <div className="flex items-center justify-center gap-3">
                <img src={IMAGES.badge18Plus}  alt="18+"     className="h-9 w-9 object-contain" />
                <img src={IMAGES.gamCareBadge} alt="GamCare" className="h-9 w-9 object-contain" />
                <img src={IMAGES.gtBadge}      alt="GT"      className="h-9 w-9 object-contain" />
            </div>

            {/* Row 3: copyright */}
            <span className="text-black text-[12px] -mt-3  text-center">
                © Copyright 2026. All Rights Reserved.
            </span>

        </div>

    </footer>
));
Footer.displayName = "Footer";

export default Footer;