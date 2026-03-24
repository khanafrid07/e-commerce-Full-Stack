import { X, SlidersHorizontal } from "lucide-react";
import FilterSection from "./FilterSection";
import FilterItem from "./FilterItem";
import DiscountItem from "./DiscountItem";
import { CATEGORIES, GENDERS, DISCOUNTS, SUB_TYPES } from "./filterConfig";

export default function FilterSidebar({ filters, onChange, open, onClose }) {
  const { category, gender, type, sort, discount } = filters;

  const types = (() => {
    if (!category) return [];
    if (category === "beauty") return SUB_TYPES.beauty.product;
    if (gender) return SUB_TYPES[category]?.[gender] ?? [];
    return [];
  })();

  const skinConcerns = category === "beauty" ? SUB_TYPES.beauty.skinConcern : [];
  const hasActive = Object.values(filters).some(Boolean);

  function toggle(key, value) {
    onChange(key, filters[key] === value.toLowerCase() ? "" : value);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed md:static top-0 left-0 z-50 h-full
        w-64 md:w-[220px] bg-white border-r border-gray-100
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-gray-400" />
            <span className="font-syne text-[15px] font-bold text-gray-900">Filter</span>
          </div>
          <div className="flex items-center gap-3">
            {hasActive && (
              <button
                onClick={() => ["category","gender","type","price","discount","search"].forEach(k => onChange(k,""))}
                className="text-[10px] text-gray-300 hover:text-red-400 transition-colors"
              >
                Clear all
              </button>
            )}
            <button onClick={onClose} className="md:hidden text-gray-300 hover:text-gray-600 transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto px-4">

          <FilterSection title="Category">
            {CATEGORIES.map(c => (
              <FilterItem key={c} label={c} active={category === c} onClick={() => toggle("category", c)} />
            ))}
          </FilterSection>

          {category !== "beauty" && (
            <FilterSection title="Gender">
              {GENDERS.map(g => (
                <FilterItem key={g} label={g} active={gender === g} onClick={() => toggle("gender", g)} />
              ))}
            </FilterSection>
          )}

          {types.length > 0 && (
            <FilterSection title="Type">
              {types.map(t => (
                <FilterItem key={t} label={t} active={type === t.toLowerCase()} onClick={() => toggle("type", t)} />
              ))}
            </FilterSection>
          )}

          {skinConcerns.length > 0 && (
            <FilterSection title="Skin Concern">
              {skinConcerns.map(s => (
                <FilterItem key={s} label={s} active={type === s.toLowerCase()} onClick={() => toggle("type", s)} />
              ))}
            </FilterSection>
          )}

          <FilterSection title="Price">
            <FilterItem label="Low → High" active={sort === "priceLow"}  onClick={() => toggle("price", "low")} />
            <FilterItem label="High → Low" active={sort === "priceHigh"} onClick={() => toggle("price", "high")} />
          </FilterSection>

          <FilterSection title="Discount" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {DISCOUNTS.map(d => (
                <DiscountItem key={d} label={`${d}%+`} active={discount === d} onClick={() => toggle("discount", d)} />
              ))}
            </div>
          </FilterSection>

        </div>
      </aside>
    </>
  );
}