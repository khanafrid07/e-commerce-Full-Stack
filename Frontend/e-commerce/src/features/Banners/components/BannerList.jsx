import React from "react";
import BannerItem from "./BannerItem";

const BannerList = ({ banners, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="space-y-4">
      {banners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No banners available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <BannerItem
              key={banner._id}
              banner={banner}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
