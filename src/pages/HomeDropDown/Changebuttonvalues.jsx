import { memo, useState, useCallback } from "react";

const DEFAULT_VALUES = [100, 200, 300, 400, 500, 1000, 2000, 5000];

const ChangeButtonValues = memo(() => {
    const [values, setValues] = useState(
        DEFAULT_VALUES.map((v) => ({ label: String(v), price: String(v) }))
    );

    const handleChange = useCallback((index, field, val) => {
        setValues((prev) =>
            prev.map((item, i) => i === index ? { ...item, [field]: val } : item)
        );
    }, []);

    const handleUpdate = useCallback(() => {
        alert("Button values updated!");
    }, [values]);

    return (
        <div className="min-h-screen bg-[#FFFFFF] md:bg-[#787878] md:p-1">
            <div className="w-full">
                <div className="md:border md:border-[#696868] md:rounded-sm overflow-hidden">

                    {/* ── Header ── */}
                    <div className="bg-[#383838] md:bg-[#1a6b4a] px-4 py-1">
                        <h2 className="text-white text-lg md:text-2xl tracking-wide">
                            Change Button Values
                        </h2>
                    </div>

                    {/* ── Form ── */}
                    <div className="bg-[#FFFFFF] md:bg-[#787878] px-2 md:px-1 pt-4 pb-5">

                        {/* Column headings */}
                        <div className="flex gap-3 mb-1">
                            <div className="flex-1">
                                <span className="text-gray-800 md:text-white text-sm md:text-md font-bold">
                                    Price Label
                                </span>
                            </div>
                            <div className="flex-1">
                                <span className="text-gray-800 md:text-white text-sm md:text-md font-bold">
                                    Price Value
                                </span>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="flex flex-col gap-1">
                            {values.map((item, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <input
                                        type="text"
                                        value={item.label}
                                        onChange={(e) => handleChange(i, "label", e.target.value)}
                                        className="flex-1 border border-[#ccc] bg-white rounded-sm
                                                   px-3 py-2 text-sm text-gray-800 outline-none
                                                   focus:border-[#1a6b4a]"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleChange(i, "price", e.target.value)}
                                        className="flex-1 border border-[#ccc] bg-white rounded-sm
                                                   px-3 py-2 text-sm text-gray-800 outline-none
                                                   focus:border-blue-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Update button */}
                        <button
                            onClick={handleUpdate}
                            className="mt-3 w-full md:w-auto bg-[#126E51] md:bg-[#1a6b4a]
                                       hover:bg-[#0f5a42] md:hover:bg-[#155a3e]
                                       text-white text-sm md:text-md px-3 py-2 rounded-sm transition-colors"
                        >
                            Update
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
});
ChangeButtonValues.displayName = "ChangeButtonValues";

export default ChangeButtonValues;