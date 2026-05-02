import BannerFilters from "./BannerFilter";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function BannerData({
  bannerCounts = {},
  isLoading,
  isError,
  banners = [],
  filters,
  setFilters,
}) {
  const navigate = useNavigate()
  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(bannerCounts).map(([key, val]) => (
          <div
            key={key}
            className="rounded-2xl bg-white shadow-sm border p-4 md:p-5"
          >
            <p className="text-xs md:text-sm text-gray-500 capitalize">
              {key} Banners
            </p>
            <h2 className="text-xl md:text-2xl font-semibold mt-1">
              {val}
            </h2>
          </div>
        ))}
      </div>

      <BannerFilters filters={filters} setFilters={setFilters} />


      {isLoading && (
        <div className="text-center text-gray-400">Loading...</div>
      )}
      {isError && (
        <div className="text-center text-red-400">Failed to load</div>
      )}


      <div className="md:hidden space-y-4">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="bg-white rounded-xl p-4 shadow border space-y-3"
          >
            {/* Top */}
            <div className="flex items-center gap-3">
              <img
                src={banner?.image?.url}
                className="w-16 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="text-sm font-semibold">
                  {banner.title || "Untitled"}
                </h3>
                <p className="text-xs text-gray-500">
                  {banner.placement?.replace("_", " ")}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <span>Type: {banner.type}</span>
              <span>Template: {banner.template}</span>
              <span>Category: {banner.category || "-"}</span>
            </div>

            {/* Status + Actions */}
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 text-xs rounded-full ${banner.isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {banner.isActive ? "Active" : "Inactive"}
              </span>

              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Pencil size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
           DESKTOP TABLE
         ========================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow border overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-8 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-3">
          <div>Title</div>
          <div>Image</div>
          <div>Placement</div>
          <div>Type</div>
          <div>Template</div>
          <div>Category</div>
          <div>Status</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Rows */}
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="grid grid-cols-8 items-center px-4 py-3 border-t hover:bg-gray-50"
          >
            <div className="text-sm font-medium">
              {banner.title || "Untitled"}
            </div>

            <img
              src={banner?.image?.url}
              className="w-16 h-10 object-cover rounded-md border"
            />

            <div className="text-sm capitalize">
              {banner.placement?.replace("_", " ")}
            </div>

            <div className="text-sm capitalize">{banner.type}</div>

            <div className="text-sm">{banner.template}</div>

            <div className="text-sm">{banner.category || "-"}</div>

            <div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${banner.isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {banner.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex justify-center gap-3">
              <button onClick={() => navigate(`${banner._id}/edit`)} className="p-2 hover:bg-gray-100 rounded">
                <Pencil size={16} />
              </button>
              <button className="p-2 hover:bg-red-50 rounded">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}