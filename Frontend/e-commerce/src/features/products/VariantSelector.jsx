import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function VariantSelector({ variants, setVariants }) {
  // Current variant being added
  const [current, setCurrent] = useState({
    typeValues: {},
    stock: "",
    price: "",
  });

  
  const variantTypes = ["Size", "Color", "Material"];

  const handleTypeChange = (key, value) => {
    setCurrent(prev => ({
      ...prev,
      typeValues: { ...prev.typeValues, [key]: value }
    }));
  };

  const addVariant = () => {
    if (!current.stock || !current.price) {
      return alert("Stock and Price are required!");
    }
    // Prevent adding duplicate variants
    const duplicate = variants.some(v =>
      JSON.stringify(v.typeValues) === JSON.stringify(current.typeValues)
    );
    if (duplicate) {
      return alert("This variant combination already exists!");
    }

    setVariants(prev => [...prev, current]);
    setCurrent({ typeValues: {}, stock: "", price: "" });
  };

  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border p-4 rounded-xl mt-4 bg-gray-50 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Variants</h2>

      {/* Variant input fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {variantTypes.map(type => (
          <div key={type} className="flex flex-col">
            <label className="font-medium mb-1">{type}</label>
            <input
              type="text"
              value={current.typeValues[type] || ""}
              onChange={(e) => handleTypeChange(type, e.target.value)}
              className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder={`Enter ${type}`}
            />
          </div>
        ))}
      </div>

      {/* Stock & Price */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="number"
          className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Stock"
          value={current.stock}
          onChange={(e) => setCurrent({ ...current, stock: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Price"
          value={current.price}
          onChange={(e) => setCurrent({ ...current, price: e.target.value })}
        />
      </div>

      <button
      type="button"
        onClick={addVariant}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <Plus size={16} /> Add Variant
      </button>

      {/* Existing variants list */}
      <div className="mt-5 space-y-3">
        {variants.length === 0 && <p className="text-gray-500">No variants added yet.</p>}

        {variants.map((v, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <p className="font-medium">
                {Object.entries(v.typeValues)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" • ")}
              </p>
              <p className="text-sm text-gray-600">
                Stock: {v.stock} • Price: ${v.price}
              </p>
            </div>
            <button
            type="submit"
              onClick={() => removeVariant(index)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
