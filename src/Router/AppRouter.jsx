import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "../components/PageLoader";

// ── Layouts ───────────────────────────────────────────────────────────────────
const AuthLayout          = lazy(() => import("../layout/AuthLayout"));
const HomeLayout          = lazy(() => import("../layout/HomeLayout"));

// ── Pages ─────────────────────────────────────────────────────────────────────
const Home                = lazy(() => import("../pages/home/Home"));
const Casino              = lazy(() => import("../pages/casino/Casino"));
const Gamelist            = lazy(() => import("../pages/Gamelist"));
const SportsBook          = lazy(() => import("../pages/SportsBook/Sportsbook"));
const Sports              = lazy(() => import("../pages/mobile/Sports"));
const HorseRacing         = lazy(() => import("../pages/Racing/Horseracing"));
const GreyhoundRacing     = lazy(() => import("../pages/Racing/Greyhoundracing"));
const AccountStatement    = lazy(() => import("../pages/HomeDropDown/Accountstatement"));
const ProfitLoss          = lazy(() => import("../pages/HomeDropDown/Profitloss"));
const BetHistory          = lazy(() => import("../pages/HomeDropDown/Bethistory"));
const UnSettledBet        = lazy(() => import("../pages/HomeDropDown/Unsettledbet"));
const ChangePassword      = lazy(() => import("../pages/HomeDropDown/Changepassword"));
const ChangeButtonValues  = lazy(() => import("../pages/HomeDropDown/Changebuttonvalues"));
const Rules               = lazy(() => import("../pages/HomeDropDown/Rules"));

// ── Wrap helper ───────────────────────────────────────────────────────────────
const S = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: S(AuthLayout),
    },
    {
        path: "/home",
        element: S(HomeLayout),
        children: [
            { index: true,                   element: S(Home) },
            { path: "casino",                element: S(Casino) },
            { path: "sports-book",           element: S(SportsBook) },
            { path: "gamelist/:games",       element: S(Gamelist) },
            { path: "sports",                element: S(Sports) },
            { path: "horse-racing",          element: S(HorseRacing) },
            { path: "greyhound-racing",      element: S(GreyhoundRacing) },

            // ── Dropdown menu pages ───────────────────────────────────────────
            { path: "account-statement",     element: S(AccountStatement) },
            { path: "profit-loss",           element: S(ProfitLoss) },
            { path: "bet-history",           element: S(BetHistory) },
            { path: "unsettled-bet",         element: S(UnSettledBet) },
            { path: "change-password",       element: S(ChangePassword) },
            { path: "change-button-values",  element: S(ChangeButtonValues) },
            { path: "rule",                  element: S(Rules) },
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;