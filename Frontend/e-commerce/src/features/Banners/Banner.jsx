import fashionBanner from "../../assets/bannerFashion.png";
import beautyBanner from "../../assets/beautyBanner.png";
import accessoriesBanner from "../../assets/accessoriesBanner.png";
import footwearBanner from "../../assets/footwearBanner.webp";
import { useCreateBannerMutation } from "./BannerSlice";
import { useState } from "react";
import HeroBannerBuilder from "./HeroBannerBuilder";
import CategoryBannerBuilder from "./CategoryBannerBuilder";
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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
          Banner Creator
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Design and preview banners exactly as they'll appear to your customers
        </p>
      </div>

      {/* Toast Notifications */}
      <div className="mb-6 sm:mb-8 max-w-7xl mx-auto space-y-2 sm:space-y-3">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Hero Banner Section */}
        <HeroBannerBuilder
          heroData={heroData}
          onInputChange={handleHeroInputChange}
          onImageChange={handleHeroImageChange}
          onSave={handleHeroSave}
          isLoading={isLoading}
        />

        {/* Category Banners Section */}
        <div>
          <div className="mb-4 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Category Banners</h2>
            <p className="text-xs sm:text-sm text-gray-600">Create banners for each product category</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {categoryBanners.map((cat) => (
              <CategoryBannerBuilder
                key={cat.name}
                category={cat.name}
                bannerInfo={bannersInfo[cat.name]}
                onInputChange={(field, value) =>
                  handleCategoryInputChange(cat.name, field, value)
                }
                onImageChange={(file) => handleCategoryImageChange(cat.name, file)}
                onSave={() => handleCategorySave(cat.name)}
                isLoading={isLoading}
                colorGradient={cat.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}