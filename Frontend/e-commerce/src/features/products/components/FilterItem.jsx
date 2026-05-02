export default function FilterItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-150 group capitalize
        ${active ? "bg-gray-900" : "hover:bg-gray-50"}`}
    >
      <span className={`text-[13px] transition-colors ${active ? "text-white font-medium" : "text-gray-500 group-hover:text-gray-800"}`}>
        {label}
      </span>
      <span className={`w-4 h-4 rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-all
        ${active ? "bg-white border-white" : "border-gray-200"}`}
      >
        {active && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
    </button>
  );
}