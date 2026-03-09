import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";

export default function CategoryBannerForm({ category, bannerInfo, onInputChange, onImageChange, onSave, isLoading }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{category} Banner</h3>
        <p className="text-xs sm:text-sm text-gray-600">Configure your {category.toLowerCase()} category banner</p>
      </div>

      <ImageUpload label="Banner Image" image={bannerInfo.img} defaultImage={bannerInfo.defaultImage} onChange={(e) => onImageChange(e.target.files[0])} />

      <div className="space-y-2 sm:space-y-3">
        <TextInput label="Top Text" placeholder="e.g., Welcome To" value={bannerInfo.titleTop} onChange={(e) => onInputChange("titleTop", e.target.value)} size="sm" />

        <TextInput label="Main Title" placeholder={`e.g., ${category}`} value={bannerInfo.titleMiddle} onChange={(e) => onInputChange("titleMiddle", e.target.value)} size="sm" />

        <TextInput label="Bottom Text" placeholder="e.g., Discover Items" value={bannerInfo.titleBottom} onChange={(e) => onInputChange("titleBottom", e.target.value)} size="sm" />
      </div>

      <button onClick={onSave} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-300">
        {isLoading ? "Saving..." : `Save ${category}`}
      </button>
    </div>
  );
}
