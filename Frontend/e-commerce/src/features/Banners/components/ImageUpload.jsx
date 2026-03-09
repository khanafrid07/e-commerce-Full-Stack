import { Image, Upload } from "lucide-react";

export default function ImageUpload({ label, image, defaultImage, onChange, preview = true }) {
  const displayImage = image ? URL.createObjectURL(image) : defaultImage;

  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">{label}</label>
      <div className="relative group cursor-pointer">
        <div className="h-32 sm:h-40 md:h-48 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-500 transition">
          {displayImage ? (
            <img src={displayImage} className="w-full h-full object-cover" alt="preview" />
          ) : (
            <div className="flex flex-col items-center gap-1 sm:gap-2 text-gray-400">
              <Image size={24} className="sm:w-8" />
              <span className="text-xs sm:text-sm">No image selected</span>
            </div>
          )}
        </div>
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition cursor-pointer rounded-lg sm:rounded-xl">
          <input type="file" onChange={onChange} className="hidden" accept="image/*" />
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <Upload className="text-white" size={20} />
            <span className="text-white font-semibold text-xs sm:text-sm">Change Image</span>
          </div>
        </label>
      </div>
    </div>
  );
}
