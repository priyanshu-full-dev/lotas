import { memo, useState } from "react";
import { FaChevronUp, FaChevronDown, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RULES = [
    {
        id: 1, title: "Speed Cash", defaultOpen: true,
        rules: [
            "The customer is receiving plus on both selections, making him eligible for 'Speed Cash'.",
            "Once a customer uses 'Speed Cash', their existing book will be settled, after which they will need to place bets again by playing.",
            "A customer wins 110 points on player A and 100 points on player B. After deducting 3% from the smaller winning amount, the customer will use 'Speed Cash' and can add 97 points to their main balance.",
            "The difference between Player A winning points & Player B winning points must not be greater than 10. Ex: Player A = 110, Player B = 130 Diff = 20 which is > 10 so, this is not eligible for speed cash.",
            "If you use 'Speed Cash' and the match result is tied or Abandoned, your main balance won't be affected.",
        ],
    },
    { id: 2,  title: "Football Fancy",         defaultOpen: false, rules: ["Football fancy bets are settled based on official match results.", "In case of match abandonment, all bets will be voided."] },
    { id: 3,  title: "BBL SPECIAL",             defaultOpen: false, rules: ["BBL Special rules apply to all Big Bash League matches.", "All bets are settled at the end of the match."] },
    { id: 4,  title: "Women's Big Bash League", defaultOpen: false, rules: ["All WBBL rules follow standard cricket betting guidelines.", "In case of weather interruption, DLS method applies."] },
    { id: 5,  title: "Lunch Favourite",         defaultOpen: false, rules: ["Lunch favourite bets are settled at lunch break scores.", "All bets are subject to match completion."] },
    { id: 6,  title: "Bookmaker",               defaultOpen: false, rules: ["Bookmaker bets follow standard exchange rules.", "Minimum bet amount applies."] },
    { id: 7,  title: "Politics",                defaultOpen: false, rules: ["Political event bets are settled on official results.", "In case of postponement, bets remain open."] },
    { id: 8,  title: "Genie Combo Special",     defaultOpen: false, rules: ["Genie Combo bets require all selections to win.", "Maximum payout limits apply."] },
    { id: 9,  title: "Fancy Market",            defaultOpen: false, rules: ["Fancy market rules apply to all session bets.", "All fancy bets are settled at the end of innings."] },
];

// ── Mobile Rule Section ───────────────────────────────────────────────────────
const MobileRuleSection = memo(({ section }) => {
    const [open, setOpen] = useState(section.defaultOpen);
    return (
        <div className="border border-gray-200 mb-0.5">
            <button
                onClick={() => setOpen(p => !p)}
                className={`w-full flex items-center justify-between px-4.5 py-3.5 transition-colors
                            ${open ? "bg-[#383838] text-white" : "bg-[#383838] text-white "}`}
            >
                <span className="text-md ">{section.title}</span>
            </button>
            {open && (
                <div className="bg-white border-t px-4 py-3 border-gray-200">
                    <ol className="list-decimal list-inside border-t border-gray-300 border-r border-l  ">
                        {section.rules.map((rule, i) => (
                            <li key={i} className="text-xs text-[#DC4C68] border-b border-gray-300 leading-relaxed pl-1">{rule}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
});
MobileRuleSection.displayName = "MobileRuleSection";

// ── Desktop Rule Row ──────────────────────────────────────────────────────────
const DesktopRuleRow = memo(({ section }) => {
    const [open, setOpen] = useState(section.defaultOpen);
    return (
        <div>
            <button
                onClick={() => setOpen(p => !p)}
                className="w-full text-left px-4 py-3 text-white text-sm font-medium
                           bg-[#126E51] border-b border-[#0d4f3a]"
            >
                {section.title}
            </button>
            {open && (
                <div className="bg-[#787878] border-b border-[#555] px-7 py-3">
                    <ol className="list-decimal list-inside border-t border-gray-300 border-r border-l">
                        {section.rules.map((rule, i) => (
                            <li key={i} className="text-md text-[#DC4C68] border-b py-2 px-2 border-gray-300 leading-4.5">{rule}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
});
DesktopRuleRow.displayName = "DesktopRuleRow";

// ── Rules Page ────────────────────────────────────────────────────────────────
const Rules = memo(() => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen md:p-1 bg-[#f0f0f0] md:bg-[#787578]">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-1.5 py-2 md:px-4 md:py-1
                            bg-[#383838] md:bg-[#126E51]">
                <h2 className="text-white text-[17px] md:text-2xl  tracking-wide">Rules</h2>
                <button onClick={() => navigate(-1)}
                    className="text-gray-400 hover:text-white transition-colors">
                    <FaTimes className="text-sm" />
                </button>
            </div>

            {/* ── Mobile layout ── */}
            <div className="md:hidden bg-[#f0f0f0] mt-3 p-1">
                {RULES.map(section => (
                    <MobileRuleSection key={section.id} section={section} />
                ))}
            </div>

            {/* ── Desktop layout ── */}
            <div className="hidden   md:block">
                {/* Gray bar below header */}
                <div className="h-5 mb-2 " />
                {RULES.map(section => (
                    <DesktopRuleRow key={section.id} section={section} />
                ))}
            </div>

        </div>
    );
});
Rules.displayName = "Rules";

export default Rules;