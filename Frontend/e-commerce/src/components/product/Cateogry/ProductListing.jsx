import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Funnel, X } from "lucide-react";
import { useGetProductsQuery } from "../../../features/products/productSlice";
import LandingCard from "../LandingCard";

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
    type: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFilter({
      gender: genderParam || "",
      category: categoryParam || "",
      price: priceParam || "",
      discount: discountParam || "",
      type: typeParam || "",
    });
  }, [genderParam, categoryParam, priceParam, discountParam, typeParam]);

  const subCategories = {
    clothes: {
      men: ["T-Shirts", "Jeans", "Jacket", "Shirts", "Hoodies"],
      women: ["Tops", "Dresses", "Jeans", "Shirts"],
    },
    footwear: {
      men: ["Sneakers", "Boots", "Formal Shoes"],
      women: ["Sandals", "Boots", "Sneakers"],
    },
    beauty: ["Skincare", "Makeup", "Haircare", "Fragrance"],
    accessories: {
      men: ["Belt", "Watches", "Perfumes", "Sunglasses", "Rings"],
      women: ["Bags", "Watches", "Perfumes", "Rings"],
    },
  };

  const paramsObject = Object.fromEntries(searchParams.entries());
  const { data, isLoading } = useGetProductsQuery(paramsObject);

  function handleFilterChange(key, value) {
    const newParams = new URLSearchParams(searchParams);

    // reset dependent filters
    if (key === "category") {
      newParams.delete("type");

      // beauty has no gender-based subcategory
      if (value === "beauty") {
        newParams.delete("gender");
      }
    }

    if (key === "gender") {
      newParams.delete("type");
    }

    if (value) {
      newParams.set(key, value.toLowerCase());
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  }

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!data) return null;

  const { allProducts } = data;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 h-full bg-white w-[80%] md:w-[260px]
        shadow-xl md:shadow-none p-4
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <X className="md:hidden cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* Category */}
        <Section title="Category">
          {Object.keys(subCategories).map((cat) => (
            <Radio
              key={cat}
              name="category"
              label={cat}
              checked={filter.category === cat}
              onChange={() => handleFilterChange("category", cat)}
            />
          ))}
        </Section>

        {/* Gender */}
        {filter.category !== "beauty" && (
          <Section title="Gender">
            {["men", "women"].map((g) => (
              <Radio
                key={g}
                name="gender"
                label={g}
                checked={filter.gender === g}
                onChange={() => handleFilterChange("gender", g)}
              />
            ))}
          </Section>
        )}

        {/* Type */}
        <Section title="Type">
          {filter.category &&
            (filter.gender
              ? subCategories[filter.category]?.[filter.gender]
              : subCategories[filter.category]
            )?.map((t) => (
              <Radio
                key={t}
                name="type"
                label={t}
                checked={filter.type === t.toLowerCase()}
                onChange={() => handleFilterChange("type", t.toLowerCase())}
              />
            ))}
        </Section>

        {/* Price */}
        <Section title="Price">
          {["low", "high"].map((p) => (
            <Radio
              key={p}
              name="price"
              label={p === "low" ? "Low to High" : "High to Low"}
              checked={filter.price === p}
              onChange={() => handleFilterChange("price", p)}
            />
          ))}
        </Section>

        {/* Discount */}
        <Section title="Discount">
          {["10", "20", "30", "40", "50", "60", "80"].map((d) => (
            <Radio
              key={d}
              name="discount"
              label={`${d}% & above`}
              checked={filter.discount === d}
              onChange={() => handleFilterChange("discount", d)}
            />
          ))}
        </Section>
      </div>

      {/* Products */}
      <div className="flex-1 p-4">

        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow"
          >
            <Funnel size={18} /> Filters
          </button>
        </div>

        <LandingCard products={allProducts} />
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

function Radio({ label, checked, onChange, name }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm hover:text-black">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-black"
      />
      {label}
    </label>
  );
}
