import CategoryBannerForm from "./components/CategoryBannerForm";
import CategoryBannerPreview from "./components/CategoryBannerPreview";

export default function CategoryBannerBuilder({ category, bannerInfo, onInputChange, onImageChange, onSave, isLoading, colorGradient }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
        <CategoryBannerForm category={category} bannerInfo={bannerInfo} onInputChange={onInputChange} onImageChange={onImageChange} onSave={onSave} isLoading={isLoading} />
        <CategoryBannerPreview bannerInfo={bannerInfo} colorGradient={colorGradient} category={category} />
      </div>
    </div>
  );
}
