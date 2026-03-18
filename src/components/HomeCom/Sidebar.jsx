import { memo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaCircle } from "react-icons/fa";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { BsFillCaretRightFill } from "react-icons/bs";

// ── Data — change paths here anytime ─────────────────────────────────────────
const OTHERS_ITEMS = [
    { label: "TP T20", path: "/home/others/tp-t20" },
    { label: "TP 1 DAY", path: "/home/others/tp-1-day" },
    { label: "TP TEST", path: "/home/others/tp-test" },
    { label: "DT 1 DAY", path: "/home/others/dt-1-day" },
    { label: "32 CARDS", path: "/home/others/32-cards" },
    { label: "HI LOW", path: "/home/others/hi-low" },
    { label: "POKER", path: "/home/others/poker" },
    { label: "QUEEN", path: "/home/others/queen" },
    { label: "BACCARAT", path: "/home/others/baccarat" },
    { label: "AMAR AKBAR ANTHONY", path: "/home/others/amar-akbar-anthony" },
    { label: "BOLLYWOOD", path: "/home/others/bollywood" },
    { label: "TRIO", path: "/home/others/trio" },
    { label: "ANDAR BAHAR", path: "/home/others/andar-bahar" },
    { label: "MUFLIS TP", path: "/home/others/muflis-tp" },
    { label: "ROULETTE", path: "/home/others/roulette" },
    { label: "WORLI MATKA", path: "/home/others/worli-matka" },
];

const SPORTS_TREE = [
    {
        label: "Cricket",
        path: "/home/cricket",

        children: [
            {
                label: "ICC Men's T20 World ",
                path: "/home/cricket/icc-t20-world-cup",
                children: [
                    { label: "ICC Men's T20 World Cup", path: "/home/cricket/icc-t20-world-cup/tournament" },
                    { label: "India v New Zealand", path: "/home/cricket/icc-t20-world-cup/ind-vs-nz" },
                ],
            },
            {
                label: "Others", path: "/home/cricket/others", children: [
                    { label: "ICC Men's T20 World Cup", path: "/home/cricket/icc-t20-world-cup/tournament" },
                    { label: "India v New Zealand", path: "/home/cricket/icc-t20-world-cup/ind-vs-nz" },
                ],
            },

        ],
    },
    {
        label: "Football",
        path: "/home/football",
        children: [
            { label: "UEFA Champions League", path: "/home/football/ucl", children: [
                    { label: "ICC Men's T20 World Cup", path: "/home/cricket/icc-t20-world-cup/tournament" },
                    { label: "India v New Zealand", path: "/home/cricket/icc-t20-world-cup/ind-vs-nz" },
                ], },
            ,
        ],
    },
];

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = memo(({ label, open, onToggle }) => (
    <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-1.5 py-0.5
               bg-[#126E51] text-white text-lg  text-[17.5px]  tracking-wide
               "
    >
        <span>{label}</span>
        {open

            ? <FaChevronDown className="text-xs text-white flex-shrink-0" />
            : <FaChevronRight className="text-xs text-white flex-shrink-0" />
        }
    </button>
));
SectionHeader.displayName = "SectionHeader";

// ── Recursive Tree Node ───────────────────────────────────────────────────────
const TreeNode = memo(({ node, depth = 0, onSelect }) => {
    const location = useLocation();
    const hasChildren = node.children && node.children.length > 0;
    const [open, setOpen] = useState(false);

    // ✅ Active = current URL matches node path
    const isActive = location.pathname === node.path;

    const handleSelect = useCallback(() => {
        if (hasChildren) setOpen((p) => !p);  // toggle expand
        else onSelect(node.path);             // navigate to path
    }, [hasChildren, node.path, onSelect]);

    const paddingLeft = `${0.75 + depth * 0.9}rem`;

    return (
        <div>
            <button
                onClick={handleSelect}
                className={`w-full flex items-center gap-1.5  pr-2 text-[15.5px] 
                    text-left transition-colors duration-150
                    ${isActive
                        ? "bg-[green-900/60] text-yellow-400"
                        : "text-white hover:bg-white/5"
                    }`}
                style={{ paddingLeft }}
            >
                {hasChildren ? (
                    open
                        ? <AiOutlineMinusSquare className=" text-white flex-shrink-0  text-md" />
                        : <AiOutlinePlusSquare className="text-white  flex-shrink-0  text-md" />
                ) : (
                    depth >= 2
                        ? <BsFillCaretRightFill className="text-green-500 flex-shrink-0 text-[9px]" />
                        : <FaCircle className="text-[4px] hidden  flex-shrink-0" />
                )}

                {depth === 0 && node.icon && (
                    <span className="text-green-400 flex-shrink-0">{node.icon}</span>
                )}

                <span className="leading-tight">{node.label}</span>
            </button>

            {hasChildren && open && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.label}
                            node={child}
                            depth={depth + 1}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});
TreeNode.displayName = "TreeNode";

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const [othersOpen, setOthersOpen] = useState(true);
    const [allSportsOpen, setAllSportsOpen] = useState(true);

    const toggleOthers = useCallback(() => setOthersOpen((p) => !p), []);
    const toggleAllSports = useCallback(() => setAllSportsOpen((p) => !p), []);

    // ✅ Single navigate handler — passed down to all nodes
    const handleSelect = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    return (
        <aside className="hidden md:flex flex-col w-[205px] flex-shrink-0
                      bg-[#494949] border-r border-green-900/40 overflow-y-auto">

            {/* ── Others Section ── */}
            <SectionHeader label="Others" open={othersOpen} onToggle={toggleOthers} />
            {othersOpen && (
                <div className="flex flex-col">
                    {OTHERS_ITEMS.map(({ label, path }) => (
                        <button
                            key={label}
                            onClick={() => handleSelect(path)}
                            className={`w-full flex items-center gap-2 px-4 py-0.5 border-gray-400 border-b-1 text-[13.5px] 
                          text-left transition-colors duration-150
                          ${location.pathname === path   // ✅ active from URL
                                    ? "bg-green-900/60 text-yellow-400"
                                    : "text-white hover:bg-white/5 "
                                }`}
                        >

                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* ── All Sports Section ── */}
            <SectionHeader label="All Sports" open={allSportsOpen} onToggle={toggleAllSports} />
            {allSportsOpen && (
                <div className="flex flex-col">
                    {SPORTS_TREE.map((node) => (
                        <TreeNode
                            key={node.label}
                            node={node}
                            depth={0}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            )}

        </aside>
    );
});
Sidebar.displayName = "Sidebar";

export default Sidebar;