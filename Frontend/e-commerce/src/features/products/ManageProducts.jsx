import { useGetProductsQuery, useDeleteProductMutation } from "./productSlice";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function ManageProducts() {
  const { data, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    if (data?.allProducts) setAllProducts(data.allProducts);
  }, [data]);

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Loading products...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">Error loading products.</p>;

  const filteredProducts = () => {
    let products = allProducts;
    if (stockFilter === "out") products = products.filter((p) => p.stock === 0);
    else if (stockFilter === "low") products = products.filter((p) => p.stock > 0 && p.stock < 10);
    else if (stockFilter === "in") products = products.filter((p) => p.stock >= 10);

    if (searchTerm.trim()) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(p.description)
          ? p.description.join(" ").toLowerCase()
          : p.description?.toLowerCase()?.includes(searchTerm.toLowerCase()))
      );
    }
    return products;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        alert("Product deleted successfully!");
      } catch {
        alert("Error deleting product.");
      }
    }
  };

  return (
    <div className="p-5 bg-background text-text">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Stock dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 flex items-center gap-2 bg-white shadow-sm border"
            >
              Stock Status <ChevronDown size={16} />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-md z-10"
            >
              <li><button onClick={() => setStockFilter("all")}>All</button></li>
              <li><button onClick={() => setStockFilter("out")} className="text-red-600">Out of Stock</button></li>
              <li><button onClick={() => setStockFilter("low")} className="text-yellow-600">Low Stock</button></li>
              <li><button onClick={() => setStockFilter("in")} className="text-green-600">In Stock</button></li>
            </ul>
          </div>

          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded-lg px-2 w-full md:w-80 bg-white">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full p-2 outline-none bg-transparent text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="ml-2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Product List - Desktop */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts().map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={product.images?.[0]?.url || "https://via.placeholder.com/80"}
                    alt={product.title}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                </td>
                <td className="p-3 text-sm truncate max-w-[150px]">{product._id}</td>
                <td className="p-3 font-medium">{product.title}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.stock === 0
                        ? "bg-red-100 text-red-600"
                        : product.stock < 10
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : product.stock < 10
                      ? `Low (${product.stock})`
                      : `In Stock (${product.stock})`}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts().length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {filteredProducts().map((product) => (
          <div
            key={product._id}
            className="p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={product.images?.[0]?.url || "https://via.placeholder.com/80"}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div>
                <h3 className="font-semibold text-base truncate">{product.title}</h3>
                <p className="text-xs text-gray-500 truncate">{product._id}</p>
              </div>
            </div>

            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                product.stock === 0
                  ? "bg-red-100 text-red-600"
                  : product.stock < 10
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : product.stock < 10
                ? `Low (${product.stock})`
                : `In Stock (${product.stock})`}
            </span>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
