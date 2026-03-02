import { Upload } from "lucide-react";
import homeBanner from "../../assets/hero.png";

export default function HeroBannerForm({
  heroData,
  onInputChange,
  onImageChange,
  onSave,
  isLoading,
}) {
  return (
    <div className="mb-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-gray-900">Hero Banner</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Hero Image Upload */}
          <div className="flex flex-col gap-6">
            <div className="relative group cursor-pointer h-80 rounded-xl overflow-hidden">
              <img
                src={
                  heroData.heroImage
                    ? URL.createObjectURL(heroData.heroImage)
                    : homeBanner
                }
                className="w-full h-full object-cover transition group-hover:scale-105"
                alt="Hero Banner"
              />
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <input
                  type="file"
                  name="heroImage"
                  onChange={onImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Upload className="text-white" size={28} />
                </div>
                <span className="text-white font-semibold">
                  Click to Upload Image
                </span>
                <span className="text-white/80 text-sm">
                  or drag and drop
                </span>
              </label>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Banner Content
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Top Title
                  </label>
                  <input
                    type="text"
                    onChange={onInputChange}
                    value={heroData?.titleTop || ""}
                    name="titleTop"
                    placeholder="e.g., Welcome to our store"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Title *
                  </label>
                  <input
                    type="text"
                    onChange={onInputChange}
                    value={heroData?.titleMiddle || ""}
                    name="titleMiddle"
                    placeholder="e.g., Summer Collection"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bottom Title
                  </label>
                  <input
                    type="text"
                    onChange={onInputChange}
                    value={heroData?.titleBottom || ""}
                    name="titleBottom"
                    placeholder="e.g., Up to 50% off"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={onSave}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </span>
              ) : (
                "Save Hero Banner"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
