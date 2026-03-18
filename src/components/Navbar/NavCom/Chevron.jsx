import { memo } from "react";
import { FaChevronDown } from "react-icons/fa";

const Chevron = memo(({ open }) => (
    <FaChevronDown
        className={`   transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    />
));
Chevron.displayName = "Chevron";

export default Chevron;
