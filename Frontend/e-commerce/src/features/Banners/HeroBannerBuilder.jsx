import HeroBannerForm from "./components/HeroBannerForm";
import HeroBannerPreview from "./components/HeroBannerPreview";

export default function HeroBannerBuilder({ heroData, onInputChange, onImageChange, onSave, isLoading }) {
  return (
    <div className="mb-12 sm:mb-20">
      <div className="mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Hero Banner</h2>
        <p className="text-xs sm:text-sm text-gray-600">Create your main hero banner with image and text</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <HeroBannerForm heroData={heroData} onInputChange={onInputChange} onImageChange={onImageChange} onSave={onSave} isLoading={isLoading} />
        <HeroBannerPreview heroData={heroData} />
      </div>
    </div>
  );
}
