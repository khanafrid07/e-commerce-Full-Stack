import React from "react";

const BannerPreview = ({ formData }) => {
  const getTextColorClass = (color) => {
    switch (color) {
      case "white":
        return "text-white";
      case "dark":
        return "text-gray-900";
      case "gray":
        return "text-gray-600";
      default:
        return "text-white";
    }
  };

  const getButtonColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700";
      case "red":
        return "bg-red-600 hover:bg-red-700";
      case "green":
        return "bg-green-600 hover:bg-green-700";
      case "purple":
        return "bg-purple-600 hover:bg-purple-700";
      case "black":
        return "bg-black hover:bg-gray-900";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  const getOverlayClass = (template) => {
    switch (template) {
      case "none":
        return "bg-transparent";
      case "light-overlay":
        return "bg-white/50";
      case "dark-overlay":
        return "bg-black/60";
      case "left-dark":
        return "bg-black/50";
      case "center-light":
        return "bg-white/40";
      case "overlay-gradient":
        return "bg-gradient-to-r from-black/70 to-transparent";
      case "gradient-right":
        return "bg-gradient-to-l from-black/70 to-transparent";
      case "card-overlay":
        return "bg-black/80";
      case "minimal":
        return "bg-black/30";
      default:
        return "bg-black/50";
    }
  };

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Preview</h3>

      {/* Banner Preview */}
      <div className="relative h-48 bg-gray-300 rounded-lg overflow-hidden">
        {formData.imagePreview && (
          <img
            src={formData.imagePreview}
            alt="Banner Preview"
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 ${getOverlayClass(formData.template)}`} />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2
              className={`text-3xl font-bold mb-2 ${getTextColorClass(
                formData.textColor
              )}`}
            >
              {formData.heading || "Banner Heading"}
            </h2>
            <p
              className={`text-lg mb-4 ${getTextColorClass(
                formData.textColor
              )}`}
            >
              {formData.subHeading || "Banner subheading"}
            </p>
            {formData.ctaText && (
              <button
                className={`px-6 py-2 text-white font-semibold rounded-lg ${getButtonColorClass(
                  formData.ctaButtonColor
                )}`}
              >
                {formData.ctaText}
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        This is a preview of how your banner will appear
      </p>
    </div>
  );
};

export default BannerPreview;
