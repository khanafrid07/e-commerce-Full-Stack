export default function DiscountItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 rounded-lg border-[1.5px] text-center text-[11px] font-bold transition-all font-syne
        ${active
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-600"
        }`}
    >
      {label}
    </button>
  );
}