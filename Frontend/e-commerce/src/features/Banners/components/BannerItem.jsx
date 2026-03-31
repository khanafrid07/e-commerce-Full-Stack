import React from "react";

const BannerItem = ({ banner, onEdit, onDelete, onToggleStatus }) => {
  const getBadgeColor = (type) => {
    switch (type) {
      case "hero":
        return "bg-blue-100 text-blue-800";
      case "promo":
        return "bg-red-100 text-red-800";
      case "category":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "hero":
        return "Hero";
      case "promo":
        return "Promo";
      case "category":
        return "Category";
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Banner Image */}
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <img
          src={banner.image}
          alt={banner.heading}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(banner.type)}`}>
            {getTypeLabel(banner.type)}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              banner.isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {banner.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Heading */}
        <h3 className="font-bold text-gray-800 text-sm truncate">
          {banner.heading || "No heading"}
        </h3>

        {/* Sub details */}
        <p className="text-xs text-gray-500 mt-1 truncate">
          {banner.subHeading || "No subheading"}
        </p>

        {/* Template & Placement */}
        <div className="flex gap-2 mt-3 text-xs">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {banner.template}
          </span>
          {banner.placement && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {banner.placement.replace("_", " ")}
            </span>
          )}
        </div>

        {/* Category if exists */}
        {banner.category && (
          <div className="mt-2 text-xs text-gray-600">
            <span className="font-semibold">Category:</span> {banner.category}
          </div>
        )}

        {/* Priority */}
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-semibold">Priority:</span> {banner.priority}
        </div>

        {/* CTA Link if exists */}
        {banner.ctaLink && (
          <div className="mt-2 text-xs text-blue-600 truncate">
            Link: {banner.ctaLink}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(banner)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm font-semibold transition"
          >
            Edit
          </button>

          <button
            onClick={() => onToggleStatus(banner._id, banner.isActive)}
            className={`flex-1 py-1 px-2 rounded text-sm font-semibold transition ${
              banner.isActive
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {banner.isActive ? "Deactivate" : "Activate"}
          </button>

          <button
            onClick={() => onDelete(banner._id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
