import { memo } from "react";
import { TICKER } from "./navData";

const TickerText = memo(() => (
    <div className="ticker-run">
        <span className="text-white text-xs xl:text-[14px] font-bold   italic tracking-wider">
            {TICKER}{TICKER}
        </span>
    </div>
));
TickerText.displayName = "TickerText";

export default TickerText;
