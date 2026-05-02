import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-4 border-b border-gray-100 last:border-none">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full mb-0 group"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-300 group-hover:text-gray-400 transition-colors">
          {title}
        </span>
        <ChevronDown size={12} className={`text-gray-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}