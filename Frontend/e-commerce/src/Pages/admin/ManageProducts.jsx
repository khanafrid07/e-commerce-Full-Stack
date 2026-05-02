import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { Layers, PackageSearch, Layers2, BookAlert } from "lucide-react";
import { useState, useMemo } from "react";
import useDashboardStats from "../../hooks/useDashboardStats";
import ProductStats from "../../features/Dashboard/shared/ProductsStats";
import FilterDropdown from "../../features/Dashboard/shared/FilterDropdown";
import SearchInput from "../../features/Dashboard/shared/SearchInput";
import { notifyError, notifySuccess } from "../../utils/notify";

/* ---------- HELPERS ---------- */
const getTotalStock = (product) => {
  if (!product.variants?.length) return product.stock || 0;
  return product.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
};

const getStockStatus = (stock) => {
  if (stock === 0)
    return { label: "Out of Stock", className: "bg-red-100 text-red-600" };
  if (stock < 10)
    return { label: `Low (${stock})`, className: "bg-yellow-100 text-yellow-600" };
  return { label: `In Stock (${stock})`, className: "bg-green-100 text-green-600" };
};

export default function ManageProducts() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const navigate = useNavigate();
  const { totalProduct } = useDashboardStats();

  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");


  const { filteredProducts, stats } = useMemo(() => {
    const products = data?.allProducts || [];

    let out = 0,
      low = 0,
      inS = 0;

    const enriched = products.map((p) => {
      const totalStock = getTotalStock(p);

      if (totalStock === 0) out++;
      else if (totalStock < 10) low++;
      else inS++;

      return { ...p, totalStock };
    });

    let filtered = enriched;

    if (stockFilter !== "all") {
      filtered = filtered.filter((p) => {
        if (stockFilter === "out") return p.totalStock === 0;
        if (stockFilter === "low") return p.totalStock > 0 && p.totalStock < 10;
        if (stockFilter === "in") return p.totalStock >= 10;
        return true;
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(term) ||
        (Array.isArray(p.description)
          ? p.description.join(" ").toLowerCase().includes(term)
          : p.description?.toLowerCase()?.includes(term))
      );
    }

    return {
      filteredProducts: filtered,
      stats: { outOfStock: out, lowStock: low, inStock: inS },
    };
  }, [data, stockFilter, searchTerm]);

  /* ---------- STATS ---------- */
  const productDetail = [
    {
      name: "Total Products",
      count: totalProduct || 0,
      bgColor: "bg-blue-200",
      icon: <PackageSearch size={50} className="text-primary" />,
    },
    {
      name: "Out of Stock",
      count: stats.outOfStock,
      bgColor: "bg-yellow-200",
      icon: <Layers size={50} className="text-warning" />,
    },
    {
      name: "In Stock",
      count: stats.inStock,
      bgColor: "bg-green-200",
      icon: <Layers2 size={50} color="green" />,
    },
    {
      name: "Low Stock",
      count: stats.lowStock,
      bgColor: "bg-red-200",
      icon: <BookAlert size={50} color="red" />,
    },
  ];


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id).unwrap();
      notifySuccess("Product deleted");
    } catch {
      notifyError("Delete failed");
    }
  };

  /* ---------- STATES ---------- */
  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  if (error)
    return <p className="p-6 text-center text-red-500">Error loading products</p>;

  return (
    <div className="p-5 bg-background text-text">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <ProductStats productStats={productDetail} />

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <FilterDropdown
          label="Stock Status"
          onSelect={setStockFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Out of Stock", value: "out" },
            { label: "Low Stock", value: "low" },
            { label: "In Stock", value: "in" },
          ]}
        />

        <div className="w-full sm:w-72">
          <SearchInput
            value={searchTerm}
            handleChange={setSearchTerm}
            placeholder="Search product..."
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products found
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block mt-4 bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Stock</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((p) => {
                  const status = getStockStatus(p.totalStock);

                  return (
                    <tr key={p._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={p.images?.[0]?.url}
                          className="w-14 h-14 object-cover rounded"
                        />
                      </td>

                      <td className="p-3 font-medium">{p.title}</td>

                      <td className="p-3 text-center">
                        <span className={`px-3 py-1 text-xs rounded-full ${status.className}`}>
                          {status.label}
                        </span>
                      </td>

                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/update-product/${p._id}`)
                          }
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          disabled={deleting}
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="grid md:hidden gap-4 mt-4">
            {filteredProducts.map((p) => {
              const status = getStockStatus(p.totalStock);

              return (
                <div key={p._id} className="p-4 bg-white rounded-xl shadow">
                  <div className="flex gap-3">
                    <img
                      src={p.images?.[0]?.url}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{p.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-product/${p._id}`)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      disabled={deleting}
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}