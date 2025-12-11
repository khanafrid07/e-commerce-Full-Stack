import { Star } from "lucide-react";

export default function VariantSelector({ 
  variantTypes, 
  selectedVariant, 
  onVariantChange, 
  getAvailableOptions 
}) {
  if (variantTypes.length === 0) return null;

  return (
    <div className="space-y-4 bg-base-200 p-4 sm:p-6 rounded-2xl">
      <h3 className="text-base sm:text-lg font-bold text-base-content flex items-center gap-2">
        <Star size={20} className="text-primary" />
        Select Options
      </h3>
      {variantTypes.map((type) => {
        const options = getAvailableOptions(type);
        
        return (
          <div key={type} className="space-y-2">
            <label className="text-sm font-semibold text-base-content/80 uppercase tracking-wide">
              {type}
            </label>
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const isSelected = selectedVariant[type] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onVariantChange(type, opt)}
                    className={`btn btn-sm sm:btn-md ${
                      isSelected
                        ? "btn-primary"
                        : "btn-outline btn-primary"
                    } hover:scale-105 transition-transform`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
