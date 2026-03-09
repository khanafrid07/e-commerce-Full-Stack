import { useGetBannerQuery, useUpdateBannerStatusMutation, useDeleteBannerMutation } from "./BannerSlice";
import { useState } from "react";
import { Trash2, Eye, EyeOff, AlertCircle, Plus } from "lucide-react";
import Banner from "./Banner";

export default function BannerManagement() {
  const { data: banners = [], isLoading, error } = useGetBannerQuery();
  const [updateBannerStatus] = useUpdateBannerStatusMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  console.log(banners, "nanners ")

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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
              Banner Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">Manage and display banners on your website</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            <Plus size={18} className="sm:w-5" />
            <span className="hidden sm:inline">{showCreateForm ? "View Banners" : "Create New Banner"}</span>
            <span className="sm:hidden">{showCreateForm ? "View" : "Create"}</span>
          </button>
        </div>
      </div>

      {/* Create Banner Form */}
      {showCreateForm && (
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
          <Banner onFormSubmit={() => setShowCreateForm(false)} />
        </div>
      )}

      {!showCreateForm && (
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          {/* Active Hero Banner Card */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg sm:rounded-2xl p-4 sm:p-8 border border-blue-200 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <AlertCircle className="text-blue-600 w-6 sm:w-7" size={24} />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Currently Active Banner</h2>
                <p className="text-xs sm:text-sm text-gray-600">This is what your customers see</p>
              </div>
            </div>

            {activeBanner ? (
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <span className="inline-flex items-center gap-1 sm:gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    <Eye size={14} className="sm:w-4" />
                    Active
                  </span>
                  <span className="inline-flex items-center gap-1 sm:gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    Hero Banner
                  </span>
                </div>
                <div>
                  {activeBanner.titleTop && (
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">{activeBanner.titleTop}</p>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{activeBanner.titleMiddle}</h3>
                  {activeBanner.titleBottom && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{activeBanner.titleBottom}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 text-center">
                <p className="text-gray-500 text-lg">No hero banner is currently active. Create one to display it to customers.</p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
              <p className="text-red-700 font-semibold text-sm sm:text-base">Error loading banners</p>
              <p className="text-red-600 text-xs sm:text-sm">{error?.data?.message || error.message}</p>
            </div>
          )}

          {/* Hero Banners Section */}
          {!isLoading && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Hero Banners ({heroBanners.length})</h2>
              {heroBanners.length === 0 ? (
                <div className="bg-white rounded-lg sm:rounded-2xl border-2 border-dashed border-gray-300 p-6 sm:p-12 text-center">
                  <p className="text-gray-600 text-base sm:text-lg">No hero banners yet</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Click "Create New Banner" to make one</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6">
                  {heroBanners.map((banner) => (
                    <div
                      key={banner._id}
                      className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className={`h-32 sm:h-40 md:h-48 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden flex items-center justify-center ${banner.image?.url ? "p-2 sm:p-4" : ""}`}>
                        {banner.image?.url && (
                          <img
                            src={banner.image.url}
                            alt="banner"
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                          />
                        )}
                        <div className="relative z-10 text-center text-white px-2 sm:px-4">
                          {banner.titleTop && (
                            <p className="text-xs sm:text-sm font-semibold opacity-90 mb-1 sm:mb-2">{banner.titleTop}</p>
                          )}
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{banner.titleMiddle}</h3>
                          {banner.titleBottom && (
                            <p className="text-xs sm:text-sm font-semibold opacity-90">{banner.titleBottom}</p>
                          )}
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            {banner.isActive && (
                              <span className="inline-flex items-center gap-1 sm:gap-2 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                                <Eye size={14} />
                                Active
                              </span>
                            )}
                            <p className="text-xs text-gray-500">
                              Created: {new Date(banner.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => handleToggleStatus(banner)}
                              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-xs sm:text-sm font-medium text-gray-700"
                            >
                              {banner.isActive ? (
                                <>
                                  <EyeOff size={14} className="sm:w-4" />
                                  <span className="hidden sm:inline">Deactivate</span>
                                  <span className="sm:hidden">Off</span>
                                </>
                              ) : (
                                <>
                                  <Eye size={14} className="sm:w-4" />
                                  <span className="hidden sm:inline">Activate</span>
                                  <span className="sm:hidden">On</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(banner._id)}
                              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition text-xs sm:text-sm font-medium text-red-700"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Category Banners Section */}
          {!isLoading && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Category Banners ({categoryBanners.length})</h2>
              {categoryBanners.length === 0 ? (
                <div className="bg-white rounded-lg sm:rounded-2xl border-2 border-dashed border-gray-300 p-6 sm:p-12 text-center">
                  <p className="text-gray-600 text-base sm:text-lg">No category banners yet</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Click "Create New Banner" to make one</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {categoryBanners.map((banner) => (
                    <div
                      key={banner._id}
                      className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Category Banner Preview */}
                      <div className="h-40 sm:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex items-center justify-center">
                        {banner.image?.url && (
                          <img
                            src={banner.image.url}
                            alt="banner"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                        )}
                        <div className="relative z-10 text-center text-white px-4">
                          {banner.titleTop && (
                            <p className="text-xs font-semibold opacity-90 mb-1">{banner.titleTop}</p>
                          )}
                          <h3 className="text-xl sm:text-2xl font-bold mb-1">{banner.titleMiddle}</h3>
                          {banner.titleBottom && (
                            <p className="text-xs font-semibold opacity-90">{banner.titleBottom}</p>
                          )}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="mb-4">
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">
                            {banner.category}
                          </span>
                          {banner.isActive && (
                            <span className="inline-block ml-2 bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold">
                              <Eye size={12} className="inline mr-1" />
                              Active
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mb-4">
                          Created: {new Date(banner.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleStatus(banner)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded border border-gray-300 hover:bg-gray-50 transition text-xs font-medium text-gray-700"
                          >
                            {banner.isActive ? (
                              <>
                                <EyeOff size={14} />
                                Off
                              </>
                            ) : (
                              <>
                                <Eye size={14} />
                                On
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(banner._id)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-red-50 hover:bg-red-100 border border-red-200 transition text-xs font-medium text-red-700"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">Delete Banner?</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
              This action cannot be undone. Are you sure you want to delete this banner?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-semibold text-sm sm:text-base text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBanner(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold text-sm sm:text-base text-white"
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
