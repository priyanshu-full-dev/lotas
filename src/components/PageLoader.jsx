// src/components/PageLoader.jsx
import { memo } from "react";

// ✅ Use a lookup object — Tailwind can see all class names at build time
const sizeMap = {
  md:  "w-6 h-6",
  md:  "w-8 h-8",   // default
  lg:  "w-12 h-12",
};

const PageLoader = memo(({ fullScreen = true, size = "md" }) => (
  <div className={`flex items-center justify-center bg-transparent
                   ${fullScreen ? "min-h-screen" : "py-10"}`}>
    <svg
      className={`${sizeMap[size] ?? sizeMap.md} animate-spin text-green-400`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>
));

PageLoader.displayName = "PageLoader";
export default PageLoader;
