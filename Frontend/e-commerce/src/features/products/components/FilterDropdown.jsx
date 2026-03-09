import { ChevronDown } from "lucide-react";

export default function FilterDropdown({
  label ="",
  options=[],
  onSelect
}) {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 flex items-center gap-2 bg-white shadow-sm border"
      >
        {label} <ChevronDown size={16} />
      </div>

      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-md z-10"
      >
        {options.map((opt) => (
          <li key={opt.label}>
            <button
              onClick={() => onSelect(opt.value)}
              className={opt.className}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}