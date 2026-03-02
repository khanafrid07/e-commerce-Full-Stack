import CategoryBannerCard from "./CategoryBannerCard";

export default function CategoryBannerSection({
  categoryBanners,
  bannersInfo,
  onCategoryInputChange,
  onCategoryImageChange,
  onCategorySave,
  isLoading,
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-gray-900">Category Banners</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryBanners.map((cat) => (
          <CategoryBannerCard
            key={cat.name}
            category={cat.name}
            bannerInfo={bannersInfo[cat.name]}
            onInputChange={(field, value) =>
              onCategoryInputChange(cat.name, field, value)
            }
            onImageChange={(file) => onCategoryImageChange(cat.name, file)}
            onSave={() => onCategorySave(cat.name)}
            isLoading={isLoading}
            colorGradient={cat.color}
          />
        ))}
      </div>
    </div>
  );
}
