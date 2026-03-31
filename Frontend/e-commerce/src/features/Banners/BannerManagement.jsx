import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetBannerQuery,
  useDeleteBannerMutation,
  useUpdateBannerStatusMutation,
} from "./BannerSlice";
import BannerList from "./components/BannerList";

const BannerManagement = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");

  // Fetch banners
  const { data: banners = [], isLoading, refetch } = useGetBannerQuery(
    { type: filterType === "all" ? null : filterType, isAdmin: true },
    { refetchOnMountOrArgChange: true }
  );

  // Mutations
  const [deleteBanner] = useDeleteBannerMutation();
  const [updateStatus] = useUpdateBannerStatusMutation();

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete banner");
      }
    }
  };

  // Handle status toggle
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await updateStatus({ id, isActive: !currentStatus }).unwrap();
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Banner Management</h1>
          <button
            onClick={() => navigate("/dashboard/banners/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add Banner
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {[
            { label: "All", value: "all" },
            { label: "Home Banners", value: "hero" },
            { label: "Promo Banners", value: "promo" },
            { label: "Category Banners", value: "category" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilterType(btn.value)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterType === btn.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Banners List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading banners...</p>
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No banners found</p>
          </div>
        ) : (
          <BannerList
            banners={banners}
            onEdit={(banner) => navigate(`/dashboard/banners/edit/${banner._id}`)}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
