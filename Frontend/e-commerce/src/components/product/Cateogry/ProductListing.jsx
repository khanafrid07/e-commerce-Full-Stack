import { useState, useEffect } from "react";
import {
  FilterIcon,
  Venus,
  ChartBarStacked,
  BadgePercent,
  BadgeDollarSign,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../features/products/productSlice";
import LandingCard from "../LandingCard";

export default function ProductListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  /* ---------------- URL PARAMS ---------------- */
  const genderParam = searchParams.get("gender");
  const categoryParam = searchParams.get("category");
  const typeParam = searchParams.get("type");
  const priceParam = searchParams.get("price");
  const discountParam = searchParams.get("discount");

  /* ---------------- FILTER STATE ---------------- */
  const [filter, setFilter] = useState({
    gender: null,
    type: null,
    category: null,
    price: "all prices",
    discount: "all",
  });

  /* -------- URL -> STATE SYNC (IMPORTANT) -------- */
  useEffect(() => {
    setFilter({
      gender: genderParam?.toLowerCase() || null,
      type: typeParam?.toLowerCase() || null,
      category: categoryParam || null,
      price: priceParam?.toLowerCase() || "all prices",
      discount: discountParam?.toLowerCase() || "all",
    });
  }, [genderParam, typeParam, categoryParam, priceParam, discountParam]);

  /* ---------------- API ---------------- */
  const { data } = useGetProductsQuery({
    category: filter.category,
    gender: filter.gender,
    type: filter.type,
  });

  const allProducts = data?.allProducts ?? [];

  /* ---------------- FILTER CHANGE ---------------- */
  const onFilterChange = (key, value) => {
    const newFilter = { ...filter, [key]: value.toLowerCase() };
    setFilter(newFilter);

    const cleaned = Object.entries(newFilter).filter(([_, v]) => v);
    navigate(`/products?${new URLSearchParams(cleaned).toString()}`);
  };

  /* ---------------- CATEGORY DATA ---------------- */
  const subCategories = {
    clothes: {
      men: ["T-Shirts", "Jeans", "Jacket", "Shirts", "Hoodies"],
      women: ["Tops", "Dresses", "Jeans", "Shirts"],
    },
    footwear: {
      men: ["Sneakers", "Boots", "Formal Shoes"],
      women: ["Sandals", "Boots", "Sneakers"],
    },
    beauty: ["Skincare", "Makeup", "Haircare"],
  };

  const categoryList = (() => {
    const subCat = subCategories[filter.category];
    if (!subCat) return [];
    if (typeof subCat === "object") {
      return filter.gender
        ? subCat[filter.gender]
        : [...new Set(Object.values(subCat).flat())];
    }
    return subCat;
  })();

  /* ---------------- FILTER UI ---------------- */
  const FilterContent = () => (
    <>
      {/* GENDER */}
      <div className="collapse collapse-arrow border mb-3">
        <input type="checkbox" defaultChecked />
        <h2 className="collapse-title font-bold flex gap-2 justify-center">
          <Venus /> Gender
        </h2>
        <div className="collapse-content">
          {["MEN", "WOMEN", "UNISEX"].map((g) => (
            <label key={g} className="flex gap-3 mt-2">
              <input
                type="radio"
                name="gender-filter"
                className="radio"
                checked={filter.gender === g.toLowerCase()}
                onChange={() => onFilterChange("gender", g)}
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* TYPE */}
      <div className="collapse collapse-arrow border mb-3">
        <input type="checkbox" defaultChecked />
        <h2 className="collapse-title font-bold flex gap-2 justify-center">
          <ChartBarStacked /> Categories
        </h2>
        <div className="collapse-content">
          {categoryList.map((c) => (
            <label key={c} className="flex gap-3 mt-2">
              <input
                type="radio"
                name="type-filter"
                className="radio"
                checked={filter.type === c.toLowerCase()}
                onChange={() => onFilterChange("type", c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className="collapse collapse-arrow border mb-3">
        <input type="checkbox" defaultChecked />
        <h2 className="collapse-title font-bold flex gap-2 justify-center">
          <BadgeDollarSign /> Price
        </h2>
        <div className="collapse-content">
          {["All Prices", "Price Low to High", "Price High to Low"].map((p) => (
            <label key={p} className="flex gap-3 mt-2">
              <input
                type="radio"
                name="price-filter"
                className="radio"
                checked={filter.price === p.toLowerCase()}
                onChange={() => onFilterChange("price", p)}
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      {/* DISCOUNT */}
      <div className="collapse collapse-arrow border">
        <input type="checkbox" defaultChecked />
        <h2 className="collapse-title font-bold flex gap-2 justify-center">
          <BadgePercent /> Discount
        </h2>
        <div className="collapse-content">
          {["All", "High To Low", "Best Selling"].map((d) => (
            <label key={d} className="flex gap-3 mt-2">
              <input
                type="radio"
                name="discount-filter"
                className="radio"
                checked={filter.discount === d.toLowerCase()}
                onChange={() => onFilterChange("discount", d)}
              />
              {d}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      {/* MOBILE TOP BAR */}
      <div className="flex gap-4 lg:hidden p-2">
        <button
          className="btn btn-primary"
          onClick={() => setShowFilters(true)}
        >
          <FilterIcon />
        </button>
      </div>

      {/* FILTER SIDEBAR (SINGLE INSTANCE ✅) */}
      <div
        className={`
          fixed lg:static inset-0 lg:inset-auto z-50
          ${showFilters ? "block" : "hidden"}
          lg:block bg-white
        `}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />

        {/* Panel */}
        <div className="relative w-[70%] lg:w-full h-full p-4 overflow-y-auto">
          <button
            className="btn btn-sm mb-4 lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            Close
          </button>

          <FilterContent />
        </div>
      </div>

      {/* PRODUCTS */}
      <LandingCard
        name={filter.gender ? filter.gender.toUpperCase() : "Products"}
        products={allProducts}
      />
    </div>
  );
}
