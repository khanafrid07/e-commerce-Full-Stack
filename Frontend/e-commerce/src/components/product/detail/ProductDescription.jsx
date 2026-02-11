import { Package } from "lucide-react";

export default function ProductDescription({ description }) {
  if (!description) return null;

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-xl">
      <input type="checkbox" defaultChecked /> 
      <div className="collapse-title text-lg font-semibold flex items-center gap-2">
        <Package size={20} />
        Product Description
      </div>
      <div className="collapse-content">
        <p className="text-base-content/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
