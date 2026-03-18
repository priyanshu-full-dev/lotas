import { useState, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = memo(() => (
    <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
));
Spinner.displayName = "Spinner";

// ── Arrow Icon ────────────────────────────────────────────────────────────────
const LoginArrow = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
));
LoginArrow.displayName = "LoginArrow";

// ── Input Field — bottom border only, matching screenshot ─────────────────────
const InputField = memo(({ type, placeholder, value, onChange, autoComplete, error }) => (
    <div className="flex flex-col gap-1">
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            className={`w-full px-2 py-2 bg-transparent md:-mt-1.5 text-gray-600 placeholder-gray-500
                        text-[16px] outline-none border-b transition-all duration-200
                        ${error
                            ? "border-red-400"
                            : "border-gray-900 focus:border-[#126E51]"
                        }`}
        />
        <span className={`text-red-400 text-xs font-medium transition-all duration-200 overflow-hidden
                          ${error ? "max-h-6 opacity-100" : "max-h-0 opacity-0"}`}>
            This field is required
        </span>
    </div>
));
InputField.displayName = "InputField";

// ── Auth Button ───────────────────────────────────────────────────────────────
const AuthButton = memo(({ label, onClick, disabled, isLoading }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center  justify-center px-5 py-2 
                   bg-[#126E51] hover:bg-[#0d5a42] active:bg-[#0a4a36]
                   text-white  text-[15px] font-semibold tracking-wide
                   transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                   focus:outline-none"
    >
        <span className={`transition-opacity duration-200 ${isLoading ? "opacity-70" : "opacity-100"}`}>
            {label}
        </span>
        <span className="w-5 h-5 flex items-center justify-center">
            {isLoading ? <Spinner /> : <LoginArrow />}
        </span>
    </button>
));
AuthButton.displayName = "AuthButton";

// ── Login Page ────────────────────────────────────────────────────────────────
export default function Login() {
    const navigate = useNavigate();

    const [username,   setUsername]   = useState("");
    const [password,   setPassword]   = useState("");
    const [loadingBtn, setLoadingBtn] = useState(null);
    const [errors,     setErrors]     = useState({ username: false, password: false });

    const isAnyLoading = loadingBtn !== null;

    const handleUsername = useCallback((e) => {
        setUsername(e.target.value);
        if (e.target.value) setErrors(prev => ({ ...prev, username: false }));
    }, []);

    const handlePassword = useCallback((e) => {
        setPassword(e.target.value);
        if (e.target.value) setErrors(prev => ({ ...prev, password: false }));
    }, []);

    const handleLogin = useCallback(async () => {
        const newErrors = { username: !username.trim(), password: !password.trim() };
        setErrors(newErrors);
        if (newErrors.username || newErrors.password) return;
        setLoadingBtn("login");
        await new Promise(r => setTimeout(r, 1500));
        setLoadingBtn(null);
        navigate("/home");
    }, [username, password, navigate]);

    const handleDemoLogin = useCallback(async () => {
        setLoadingBtn("demo");
        await new Promise(r => setTimeout(r, 1500));
        setLoadingBtn(null);
        navigate("/home");
    }, [navigate]);

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:py-10"
            style={{ background: "linear-gradient(to bottom, #136D51 0%, #255344 50%, #31413C 100%)" }}
        >
            <div className="w-full max-w-[300px] ]">

                {/* Logo */}
                <div className="flex justify-center  md:mb-4">
                    <h1 className="  md:text-[3.5rem] font-black tracking-tight select-none leading-none">
                        <img className="w-[255px] mb-4 md:mb-0" src="../../../public/logo/99lotus.com.png" alt="" />
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-white flex flex-col gap-3 md:gap-0 rounded-md px-4 py-5.5  md:space-y-5">

                    <InputField
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsername}
                        autoComplete="username"
                        error={errors.username}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                        autoComplete="current-password"
                        error={errors.password}
                    />

                    <div className="space-y-1 pt-1">
                        <AuthButton label="Login" onClick={handleLogin}
                            disabled={isAnyLoading} isLoading={loadingBtn === "login"} />
                        <AuthButton label="Login with Demo ID" onClick={handleDemoLogin}
                            disabled={isAnyLoading} isLoading={loadingBtn === "demo"} />
                    </div>

                    <div className="pt-1 text-start -mt-2 md:-mt-5 space-y-1">
                        <p className="text-gray-800 md:text-[10px] text-[11px] leading-relaxed">
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>{" "}and{" "}
                            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> apply.
                        </p>
                        <a href="mailto:99lotusoffic@gmail.com" className="block mt-2 text-center text-blue-600  text-[12px] hover:underline">
                            99lotusoffic@gmail.com
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}