import { useGetBannerQuery, useUpdateBannerStatusMutation, useDeleteBannerMutation } from "./BannerSlice";
import { useState } from "react";
import { Trash2, Eye, EyeOff, AlertCircle } from "lucide-react";
import Banner from "./Banner";

export default function BannerManagement() {
  const { data: banners = [], isLoading, error } = useGetBannerQuery();
  const [updateBannerStatus] = useUpdateBannerStatusMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleToggleStatus = async (banner) => {
    try {
      await updateBannerStatus({
        id: banner._id,
        isActive: !banner.isActive,
      }).unwrap();
    } catch (error) {
      console.error("Error updating banner status:", error);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner(id).unwrap();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const heroBanners = banners.filter((b) => b.type === "hero");
  const categoryBanners = banners.filter((b) => b.type === "category");
  const activeBanner = heroBanners.find((b) => b.isActive);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Banner Management</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn btn-primary"
        >
          {showCreateForm ? "View Banners" : "Create New Banner"}
        </button>
      </div>

      {/* Create Banner Form */}
      {showCreateForm && (
        <div className="border-2 border-primary rounded-lg p-6">
          <Banner onFormSubmit={() => setShowCreateForm(false)} />
        </div>
      )}

      {/* Hero Banner Status */}
      {!showCreateForm && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-blue-900">Active Hero Banner</h2>
          </div>
          {activeBanner ? (
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {activeBanner.type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Title:</strong> {activeBanner.titleMiddle}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {activeBanner.titleTop && `"${activeBanner.titleTop}"`}
                {activeBanner.titleTop && activeBanner.titleMiddle && " - "}
                {activeBanner.titleMiddle}
              </p>
              {activeBanner.titleBottom && (
                <p className="text-sm text-gray-600">
                  {activeBanner.titleBottom}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-blue-700">No active hero banner set</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>Error loading banners: {error?.data?.message || error.message}</span>
        </div>
      )}

      {/* Hero Banners Section */}
      {!showCreateForm && !isLoading && (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-4">Hero Banners</h2>
            {heroBanners.length === 0 ? (
              <div className="bg-base-200 rounded-lg p-8 text-center">
                <p className="text-gray-600">No hero banners created yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroBanners.map((banner) => (
                  <div
                    key={banner._id}
                    className={`bg-base-100 rounded-lg shadow-lg p-4 border-2 transition ${
                      banner.isActive ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    {banner.isActive && (
                      <div className="mb-3 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold w-fit">
                        <Eye size={16} />
                        Active
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <strong>ID:</strong> {banner._id.slice(0, 8)}...
                      </p>
                      <p className="text-lg font-bold">{banner.titleMiddle}</p>
                      <p className="text-sm text-gray-600">{banner.titleTop}</p>
                      <p className="text-sm text-gray-600">{banner.titleBottom}</p>
                      {banner.link && (
                        <p className="text-sm text-blue-600">
                          <strong>Link:</strong> {banner.link}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        Created: {new Date(banner.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(banner)}
                        className="btn btn-sm btn-outline flex-1"
                      >
                        {banner.isActive ? (
                          <>
                            <EyeOff size={16} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye size={16} />
                            Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(banner._id)}
                        className="btn btn-sm btn-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Banners Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Category Banners</h2>
            {categoryBanners.length === 0 ? (
              <div className="bg-base-200 rounded-lg p-8 text-center">
                <p className="text-gray-600">No category banners created yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryBanners.map((banner) => (
                  <div
                    key={banner._id}
                    className={`bg-base-100 rounded-lg shadow-lg p-4 border-2 transition  ${
                      banner.isActive ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    {banner.isActive && (
                      <div className="mb-3 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold w-fit ">
                        <Eye size={16} />
                        Active
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                        <img className=" object-contain h-[10rem]" src={banner.image.url}/>
                        </div>

                    <div className="space-y-2">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold w-fit">
                        {banner.category}
                      </div>
                      <p className="text-lg font-bold">{banner.titleMiddle}</p>
                      <p className="text-sm text-gray-600">{banner.titleTop}</p>
                      <p className="text-sm text-gray-600">{banner.titleBottom}</p>
                      <p className="text-xs text-gray-400">
                        Created: {new Date(banner.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(banner)}
                        className="btn btn-sm btn-outline flex-1"
                      >
                        {banner.isActive ? (
                          <>
                            <EyeOff size={16} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye size={16} />
                            Activate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(banner._id)}
                        className="btn btn-sm btn-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="font-bold text-lg mb-3">Delete Banner?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Are you sure you want to delete this banner?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBanner(deleteConfirm)}
                className="btn btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
