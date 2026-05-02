export default function FashionTab({ activeTab, setActiveTab }) {
  const tabs = ["men", "women"];

  return (
    <div className="flex flex-col items-center gap-2 py-4">

      {/* Label */}
      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
        Browse Collection
      </p>

      {/* Tab Switch */}
      <div className="relative flex items-center bg-gray-100 rounded-full p-1 gap-1">

        {/* Sliding Indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-slate-900 transition-transform duration-300 ease-out"
          style={{
            width: "calc(50% - 4px)",
            transform: activeTab === "men"
              ? "translateX(4px)"
              : "translateX(calc(100% + 4px))",
          }}
        />

        {/* Buttons */}
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative z-10 px-10 py-2.5 text-sm font-bold rounded-full capitalize transition-colors duration-200 ${activeTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-800"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Decorative underline accent */}
      <div className="flex items-center gap-2 mt-1">
        <span className="w-6 h-0.5 bg-slate-300 rounded-full" />
        <span className="w-2 h-2 rounded-full bg-slate-900" />
        <span className="w-6 h-0.5 bg-slate-300 rounded-full" />
      </div>

    </div>
  );
}