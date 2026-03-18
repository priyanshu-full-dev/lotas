import { memo, useState, useCallback } from "react";

const ChangePassword = memo(() => {
    const [form,  setForm]  = useState({ current: "", newPass: "", confirm: "" });
    const [error, setError] = useState("");

    const handleChange = useCallback((field, val) => {
        setForm((prev) => ({ ...prev, [field]: val }));
        setError("");
    }, []);

    const handleSubmit = useCallback(() => {
        if (!form.current || !form.newPass || !form.confirm) {
            setError("All fields are required."); return;
        }
        if (form.newPass !== form.confirm) {
            setError("New password and confirm password do not match."); return;
        }
        alert("Password changed successfully!");
        setForm({ current: "", newPass: "", confirm: "" });
    }, [form]);

    return (
        <div className="min-h-screen bg-[#FFFFFF] md:bg-[#787878] md:p-1">
            <div className="w-full">
                <div className="md:border md:border-[#696868] md:rounded-sm overflow-hidden">

                    {/* ── Header ── */}
                    <div className="bg-[#383838] md:bg-[#126E51] px-4 py-1">
                        <h2 className="text-white text-lg md:text-2xl tracking-wide">
                            Change Password
                        </h2>
                    </div>

                    {/* ── Form ── */}
                    <div className="bg-[#FFFFFF] md:bg-[#787878] px-3 md:px-1 pt-4 pb-6 flex flex-col gap-4">

                        {/* Current Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 md:text-white text-sm md:text-md font-medium">
                                Current Password
                            </label>
                            {/* Mobile: bottom border only | Desktop: full border */}
                            <input
                                type="password"
                                value={form.current}
                                onChange={(e) => handleChange("current", e.target.value)}
                                className="w-full md:w-96 py-2 text-sm text-gray-800 outline-none
                                           border-b border-gray-300 bg-transparent
                                           md:border md:border-[#ccc] md:bg-white md:rounded-sm md:px-3
                                           focus:border-[#126E51]"
                            />
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 md:text-white text-sm md:text-md font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={form.newPass}
                                onChange={(e) => handleChange("newPass", e.target.value)}
                                className="w-full md:w-96 py-2 text-sm text-gray-800 outline-none
                                           border-b border-gray-300 bg-transparent
                                           md:border md:border-[#ccc] md:bg-white md:rounded-sm md:px-3
                                           focus:border-[#126E51]"
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-700 md:text-white text-sm md:text-md font-medium">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={form.confirm}
                                onChange={(e) => handleChange("confirm", e.target.value)}
                                className="w-full md:w-96 py-2 text-sm text-gray-800 outline-none
                                           border-b border-gray-300 bg-transparent
                                           md:border md:border-[#ccc] md:bg-white md:rounded-sm md:px-3
                                           focus:border-[#126E51]"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 md:text-red-300 text-xs">{error}</p>
                        )}

                        {/* Change Password button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full md:w-fit bg-[#126E51] md:bg-[#1a6b4a]
                                       hover:bg-[#0f5a42] md:hover:bg-[#155a3e]
                                       text-white text-sm md:text-md px-3 py-2.5 rounded-sm transition-colors"
                        >
                            Change Password
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
});
ChangePassword.displayName = "ChangePassword";

export default ChangePassword;