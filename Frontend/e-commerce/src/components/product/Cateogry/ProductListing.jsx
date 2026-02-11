import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Funnel, X } from "lucide-react";

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();

  const genderParam = searchParams.get("gender");
  const categoryParam = searchParams.get("category");
  const priceParam = searchParams.get("price");
  const discountParam = searchParams.get("discount");
  const typeParam = searchParams.get("type");

  const [filter, setFilter] = useState({
    gender: "",
    category: "",
    price: "",
    discount: "",
    type: ""
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilter({
      gender: genderParam || "",
      category: categoryParam || "",
      price: priceParam || "",
      discount: discountParam || "",
      type: typeParam || ""
    });
  }, [genderParam, categoryParam, priceParam, discountParam, typeParam]);

  const subCategories = {
    clothes: {
      men: ["T-Shirts", "Jeans", "Jacket", "Shirts", "Hoodies"],
      women: ["Tops", "Dresses", "Jeans", "Shirts"]
    },
    footwear: {
      men: ["Sneakers", "Boots", "Formal Shoes"],
      women: ["Sandals", "Boots", "Sneakers"]
    },
    beauty: ["Skincare", "Makeup", "Haircare"],
    accessories: {
      men: ["Belt", "Watches", "Perfumes", "Sunglasses", "Rings"],
      women: ["Bags", "Watches", "Perfumes", "Rings"]
    }
  };

  function handleFilterChange(key, value) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value.toLowerCase());
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      
      <div
        className={`
          fixed md:static top-0 left-0 z-50 h-full bg-white w-[80%] md:w-[260px]
          shadow-xl md:shadow-none p-4
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
      
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <X className="md:hidden cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        
        <Section title="Category">
          {Object.keys(subCategories).map((cat) => (
            <Radio
              key={cat}
              label={cat}
              checked={filter.category === cat}
              onChange={() => handleFilterChange("category", cat)}
            />
          ))}
        </Section>

       
        <Section title="Gender">
          {["men", "women"].map((g) => (
            <Radio
              key={g}
              label={g}
              checked={filter.gender === g}
              onChange={() => handleFilterChange("gender", g)}
            />
          ))}
        </Section>

        <Section title="Type">
          {filter.category &&
            (filter.gender
              ? subCategories[filter.category]?.[filter.gender]
              : subCategories[filter.category]
            )?.map((t) => (
              <Radio
                key={t}
                label={t}
                checked={filter.type === t.toLowerCase()}
                onChange={() => handleFilterChange("type", t)}
              />
            ))}
        </Section>

        
        <Section title="Price">
          {["low", "high"].map((p) => (
            <Radio
              key={p}
              label={p === "low" ? "Low to High" : "High to Low"}
              checked={filter.price === p}
              onChange={() => handleFilterChange("price", p)}
            />
          ))}
        </Section>

       
        <Section title="Discount">
          {["10", "20", "30", "40", "50", "60", "80"].map((d) => (
            <Radio
              key={d}
              label={`${d}% & above`}
              checked={filter.discount === d}
              onChange={() => handleFilterChange("discount", d)}
            />
          ))}
        </Section>
      </div>

    
      <div className="flex-1 p-4">

      
        <div className="md:hidden mb-4 flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow"
          >
            <Funnel size={18} /> Filters
          </button>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-40 bg-white shadow rounded-xl flex items-center justify-center">
            Product 1
          </div>
          <div className="h-40 bg-white shadow rounded-xl flex items-center justify-center">
            Product 2
          </div>
          <div className="h-40 bg-white shadow rounded-xl flex items-center justify-center">
            Product 3
          </div>
          <div className="h-40 bg-white shadow rounded-xl flex items-center justify-center">
            Product 4
          </div>
        </div>
      </div>
    </div>
  );
}



function Section({ title, children }) {
  return (
    <div className="mb-4 border-b pb-3">
      <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Radio({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm hover:text-black">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="accent-black"
      />
      {label}
    </label>
  );
}
