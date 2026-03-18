import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS = [
    { label: "Account Statement",  path: "/home/account-statement"    },
    { label: "Profit Loss Report", path: "/home/profit-loss"          },
    { label: "Bet History",        path: "/home/bet-history"          },
    { label: "Unsetteled Bet",     path: "/home/unsettled-bet"        },
    { label: "Set Button Values",  path: "/home/change-button-values" },
    { label: "Change Password",    path: "/home/change-password"      },
];

const DropdownMenu = memo(({ open, onClose }) => {
    const navigate = useNavigate();

    const handleClick = useCallback((path) => {
        navigate(path);
        onClose?.();
    }, [navigate, onClose]);

    const handleSignout = useCallback(() => {
        navigate("/");
        onClose?.();
    }, [navigate, onClose]);

    if (!open) return null;

    return (
        <div className="absolute right-0 top-full mt-1 w-40 shadow-2xl z-50 overflow-hidden
                        bg-[#383838]">

            {/* Main menu items */}
            {MENU_ITEMS.map((item) => (
                <button
                    key={item.label}
                    onClick={() => handleClick(item.path)}
                    className="w-full text-left px-2 text-[13px] text-white font-medium
                               hover:underline transition-colors"
                >
                    {item.label}
                </button>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-800 mt-5" />

            {/* Signout */}
            <button
                onClick={handleSignout}
                className="w-full text-left px-2 pt-5 pb-2 text-[13px] text-white font-medium
                           hover:underline transition-colors"
            >
                Signout
            </button>

        </div>
    );
});
DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;