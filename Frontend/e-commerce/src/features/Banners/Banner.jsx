import fashionBanner from "../../assets/bannerFashion.png";
import beautyBanner from "../../assets/beautyBanner.png";
import accessoriesBanner from "../../assets/accessoriesBanner.png";
import footwearBanner from "../../assets/footwearBanner.webp";
import { useCreateBannerMutation,  } from "./BannerSlice";
import { useState } from "react";
import HeroBannerForm from "./HeroBannerForm";
import CategoryBannerSection from "./CategoryBannerSection";
import ToastNotification from "./ToastNotification";

export default function Banner({ onFormSubmit }) {
  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const [showSuccess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");

  const [bannersInfo, setBannersInfo] = useState({
    Fashion: {
      titleTop: "WELCOME TO",
      titleMiddle: "FASHION",
      titleBottom: "DISCOVER Items",
      img: null,
      defaultImage: fashionBanner,
    },
    Beauty: {
      titleTop: "WELCOME TO",
      titleMiddle: "BEAUTY",
      titleBottom: "DISCOVER Items",
      img: null,
      defaultImage: beautyBanner,
    },
    Accessories: {
      titleTop: "WELCOME TO",
      titleMiddle: "ACCESSORIES",
      titleBottom: "DISCOVER Items",
      img: null,
      defaultImage: accessoriesBanner,
    },
    Footwear: {
      titleTop: "WELCOME TO",
      titleMiddle: "FOOTWEAR",
      titleBottom: "DISCOVER Items",
      img: null,
      defaultImage: footwearBanner,
    },
  });

  const [heroData, setHeroData] = useState({
    titleTop: "",
    titleMiddle: "",
    titleBottom: "",
    heroImage: null,
  });

  const categoryBanners = [
    { name: "Fashion", color: "from-pink-400 to-purple-500" },
    { name: "Beauty", color: "from-blue-400 to-cyan-500" },
    { name: "Accessories", color: "from-yellow-400 to-orange-500" },
    { name: "Footwear", color: "from-green-400 to-teal-500" },
  ];

  // Hero Banner Handlers
  const handleHeroInputChange = (e) => {
    setHeroData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroData((prev) => ({
      ...prev,
      heroImage: file,
    }));
  };

  const handleHeroSave = async () => {
    if (!heroData.titleMiddle) {
      setShowError("Please fill in the main title");
      setTimeout(() => setShowError(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        titleTop: heroData.titleTop,
        titleMiddle: heroData.titleMiddle,
        titleBottom: heroData.titleBottom,
        type: "hero",
      })
    );

    if (heroData.heroImage) {
      formData.append("img", heroData.heroImage);
    }

    try {
      await createBanner(formData).unwrap();
      setShowSuccess("Hero Banner Created Successfully!");
      setTimeout(() => setShowSuccess(""), 3000);
      setHeroData({
        titleTop: "",
        titleMiddle: "",
        titleBottom: "",
        heroImage: null,
      });
      onFormSubmit?.();
    } catch (err) {
      console.log("error occurred creating banner", err);
      setShowError("Failed to create banner");
      setTimeout(() => setShowError(""), 3000);
    }
  };

  // Category Banner Handlers
  const handleCategoryInputChange = (cat, field, value) => {
    setBannersInfo((prev) => ({
      ...prev,
      [cat]: { ...prev[cat], [field]: value },
    }));
  };

  const handleCategoryImageChange = (cat, file) => {
    if (!file) return;
    setBannersInfo((prev) => ({
      ...prev,
      [cat]: { ...prev[cat], img: file },
    }));
  };

  const handleCategorySave = async (cat) => {
    const data = bannersInfo[cat];

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        titleTop: data.titleTop,
        titleMiddle: data.titleMiddle,
        titleBottom: data.titleBottom,
        type: "category",
      })
    );
    formData.append("img", data.img);
    formData.append("category", cat);

    try {
      await createBanner(formData).unwrap();
      setShowSuccess(`${cat} Banner Created Successfully!`);
      setTimeout(() => setShowSuccess(""), 3000);
      setBannersInfo((prev) => ({
        ...prev,
        [cat]: {
          titleTop: "WELCOME TO",
          titleMiddle: cat.toUpperCase(),
          titleBottom: "DISCOVER Items",
          img: null,
          defaultImage: prev[cat].defaultImage,
        },
      }));
      onFormSubmit?.();
    } catch (err) {
      console.log("error occurred creating banner", err);
      setShowError("Failed to create banner");
      setTimeout(() => setShowError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Banner Creator
        </h1>
        <p className="text-gray-600">
          Create and manage stunning banners for your store
        </p>
      </div>

      {/* Toast Notifications */}
      <div className="mb-6 space-y-3">
        <ToastNotification
          type="success"
          message={showSuccess}
          isVisible={!!showSuccess}
        />
        <ToastNotification
          type="error"
          message={showError}
          isVisible={!!showError}
        />
      </div>

      {/* Hero Banner Section */}
      <HeroBannerForm
        heroData={heroData}
        onInputChange={handleHeroInputChange}
        onImageChange={handleHeroImageChange}
        onSave={handleHeroSave}
        isLoading={isLoading}
      />

      {/* Category Banners Section */}
      <CategoryBannerSection
        categoryBanners={categoryBanners}
        bannersInfo={bannersInfo}
        onCategoryInputChange={handleCategoryInputChange}
        onCategoryImageChange={handleCategoryImageChange}
        onCategorySave={handleCategorySave}
        isLoading={isLoading}
      />
    </div>
  );
}