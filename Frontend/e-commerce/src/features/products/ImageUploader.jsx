import { Plus, Trash2 } from "lucide-react";

export default function ImageUploader({ existingImages=[], setExistingImages, newFiles=[], setNewFiles }) {

  // Handle new uploads
  function handleNewFiles(e) {
    const files = Array.from(e.target.files);
    setNewFiles(prev => [...prev, ...files].slice(0, 4)); // max 4 new files
  }

  // Remove image (existing or new)
  function handleRemove(idx, type) {
    if (type === "existing") {
      setExistingImages(prev => prev.filter((_, i) => i !== idx));
    } else {
      setNewFiles(prev => prev.filter((_, i) => i !== idx));
    }
  }

  // Helper for preview URL
  function getImageUrl(fileOrObj) {
    return fileOrObj instanceof File ? URL.createObjectURL(fileOrObj) : fileOrObj.url;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-text font-semibold text-xl">Product Images</h2>

      {/* Main Preview */}
      <div className="w-72 h-72 border rounded-xl overflow-hidden flex justify-center items-center bg-gray-50">
        {(existingImages[0] || newFiles[0]) ? (
          <img
            className="w-full h-full object-cover"
            src={getImageUrl(existingImages[0] || newFiles[0])}
            alt="main"
          />
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-gray-500">
            <Plus size={36} />
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleNewFiles} />
          </label>
        )}
      </div>

      {/* Thumbnails */}
      <div className="w-full flex flex-wrap gap-3">
        {existingImages.map((img, idx) => (
          <div key={`ex-${idx}`} className="relative w-20 h-20 rounded-lg overflow-hidden border bg-gray-100 group">
            <img src={getImageUrl(img)} alt={`existing-${idx}`} className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
              onClick={() => handleRemove(idx, "existing")}
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}

        {newFiles.map((file, idx) => (
          <div key={`new-${idx}`} className="relative w-20 h-20 rounded-lg overflow-hidden border bg-gray-100 group">
            <img src={getImageUrl(file)} alt={`new-${idx}`} className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
              onClick={() => handleRemove(idx, "new")}
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}

        {/* Add More Button */}
        {(existingImages.length + newFiles.length) < 4 && (
          <label className="w-20 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-500 cursor-pointer bg-gray-50">
            <Plus size={20} />
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleNewFiles} />
          </label>
        )}
      </div>
    </div>
  );
}
