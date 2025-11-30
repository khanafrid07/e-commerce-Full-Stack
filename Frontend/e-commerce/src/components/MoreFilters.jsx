import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Funnel } from "lucide-react";

export default function MoreFilters({ onApply }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    paymentMethod: "",
    startDate: "",
    endDate: "",
    customer: "",
    product: "",
    minPrice: "",
    maxPrice: "",
  });

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onApply(filters);
    setOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      paymentMethod: "",
      startDate: "",
      endDate: "",
      customer: "",
      product: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
     
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-background text-text font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-shadow shadow-sm"
      >
        <Funnel size={18}/>
        More Filters
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

   
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Filters</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

        
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={filters.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">Order Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="w-1/2 rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="w-1/2 rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Customer */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer</label>
            <input
              type="text"
              name="customer"
              value={filters.customer}
              onChange={handleChange}
              placeholder="Name or email"
              className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Product */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">Product</label>
            <input
              type="text"
              name="product"
              value={filters.product}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price"
              className="w-1/2 rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
              className="w-1/2 rounded-md px-3 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
