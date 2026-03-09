import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";

export default function HeroBannerForm({ heroData, onInputChange, onImageChange, onSave, isLoading }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Banner Content</h3>

      <div className="space-y-3 sm:space-y-5">
        <ImageUpload label="Banner Image" image={heroData.heroImage} onChange={onImageChange} defaultImage={null} />

        <TextInput label="Top Text" placeholder="e.g., Welcome to our store" value={heroData?.titleTop || ""} onChange={onInputChange} name="titleTop" />

        <TextInput label="Main Title" placeholder="e.g., Summer Collection 2024" value={heroData?.titleMiddle || ""} onChange={onInputChange} name="titleMiddle" required size="lg" />

        <TextInput label="Bottom Text" placeholder="e.g., Up to 50% off" value={heroData?.titleBottom || ""} onChange={onInputChange} name="titleBottom" />

        <button onClick={onSave} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm sm:text-base py-2 sm:py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
          {isLoading ? "Saving..." : "Save Hero Banner"}
        </button>
      </div>
    </div>
  );
}
