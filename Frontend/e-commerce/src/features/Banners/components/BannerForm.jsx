import React, { useState, useEffect } from "react";
import { useCreateBannerMutation, useUpdateBannerMutation } from "../BannerSlice";
import BannerPreview from "./BannerPreview";

const BANNER_TYPES = [
  { value: "hero", label: "Hero Banner" },
  { value: "promo", label: "Promo Banner" },
  { value: "category", label: "Category Banner" },
];

const PLACEMENTS = [
  { value: "home_top", label: "Home - Top" },
  { value: "home_middle", label: "Home - Middle" },
  { value: "home_bottom", label: "Home - Bottom" },
];

const TEMPLATES = [
  { value: "none", label: "None" },
  { value: "light-overlay", label: "Light Overlay" },
  { value: "dark-overlay", label: "Dark Overlay" },
  { value: "left-dark", label: "Left Dark" },
  { value: "center-light", label: "Center Light" },
  { value: "overlay-gradient", label: "Overlay Gradient" },
  { value: "gradient-right", label: "Gradient Right" },
  { value: "card-overlay", label: "Card Overlay" },
  { value: "minimal", label: "Minimal" },
];

const TEXT_COLORS = [
  { value: "white", label: "White" },
  { value: "dark", label: "Dark" },
  { value: "gray", label: "Gray" },
];

const BUTTON_COLORS = [
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "black", label: "Black" },
];

const BannerForm = ({ banner, onClose, onSuccess, isFullPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    subHeading: "",
    ctaText: "",
    ctaLink: "",
    type: "hero",
    placement: "home_top",
    category: "",
    template: "dark-overlay",
    priority: 0,
    isActive: true,
    textColor: "white",
    ctaButtonColor: "blue",
    startDate: "",
    endDate: "",
    image: null,
    imagePreview: "",
  });

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [error, setError] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (banner) {
      setFormData((prev) => ({
        ...prev,
        title: banner.title || "",
        heading: banner.heading || "",
        subHeading: banner.subHeading || "",
        ctaText: banner.ctaText || "",
        ctaLink: banner.ctaLink || "",
        type: banner.type || "hero",
        placement: banner.placement || "home_top",
        category: banner.category || "",
        template: banner.template || "dark-overlay",
        priority: banner.priority || 0,
        isActive: banner.isActive !== undefined ? banner.isActive : true,
        textColor: banner.textColor || "white",
        ctaButtonColor: banner.ctaButtonColor || "blue",
        startDate: banner.startDate ? banner.startDate.split("T")[0] : "",
        endDate: banner.endDate ? banner.endDate.split("T")[0] : "",
        imagePreview: banner.image || "",
      }));
    }
  }, [banner]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
      setError("");
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.type || !formData.template) {
      setError("Type and Template are required");
      return;
    }

    if (!banner && !formData.image) {
      setError("Image is required for new banners");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Create data object for backend
      const data = {
        title: formData.title,
        heading: formData.heading,
        subHeading: formData.subHeading,
        ctaText: formData.ctaText,
        ctaLink: formData.ctaLink,
        type: formData.type,
        placement: formData.placement,
        category: formData.category,
        template: formData.template,
        priority: parseInt(formData.priority),
        isActive: formData.isActive,
        textColor: formData.textColor,
        ctaButtonColor: formData.ctaButtonColor,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      formDataToSend.append("data", JSON.stringify(data));

      if (formData.image) {
        formDataToSend.append("img", formData.image);
      }

      if (banner) {
        // Update
        await updateBanner({
          id: banner._id,
          formData: formDataToSend,
        }).unwrap();
      } else {
        // Create
        await createBanner(formDataToSend).unwrap();
      }

      onSuccess();
    } catch (err) {
      setError(err.data?.message || "Failed to save banner");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className={!isFullPage ? "p-6" : ""}>
      <div className={!isFullPage ? "flex justify-between items-center mb-6 border-b pb-4" : "flex justify-between items-center mb-6"}>
        <h2 className="text-2xl font-bold text-gray-800">
          {banner ? "Edit Banner" : "Create New Banner"}
        </h2>
        {!isFullPage && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type & Template (2 columns) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BANNER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Template *
            </label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TEMPLATES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Heading & Subheading */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="e.g., Summer Collection"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sub Heading
          </label>
          <input
            type="text"
            name="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            placeholder="e.g., Up to 50% off"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CTA Text & Link */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CTA Button Text
            </label>
            <input
              type="text"
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              placeholder="e.g., Shop Now"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CTA Link
            </label>
            <input
              type="text"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              placeholder="e.g., /products"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Placement & Category */}
        {formData.type !== "category" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Placement
            </label>
            <select
              name="placement"
              value={formData.placement}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PLACEMENTS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.type === "category" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Electronics"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Image {!banner && "*"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="mt-3 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">
                Active
              </span>
            </label>
          </div>
        </div>

        {/* Text & Button Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Text Color
            </label>
            <select
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TEXT_COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Button Color
            </label>
            <select
              name="ctaButtonColor"
              value={formData.ctaButtonColor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BUTTON_COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Preview */}
        {formData.imagePreview && <BannerPreview formData={formData} />}

        {/* Submit Buttons */}
        <div className={`flex gap-3 justify-end pt-4 ${!isFullPage ? "border-t" : "border-t mt-6 pt-6"}`}>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold"
          >
            {isLoading ? "Saving..." : banner ? "Update Banner" : "Create Banner"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
