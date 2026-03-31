import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBannerByIdQuery } from "./BannerSlice";
import BannerForm from "./components/BannerForm";

const BannerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch banner if editing
  const { data: banner, isLoading } = useGetBannerByIdQuery(id, {
    skip: !id, // Skip if not editing
  });

  const handleFormClose = () => {
    navigate("/dashboard/banners");
  };

  const handleFormSuccess = () => {
    navigate("/dashboard/banners");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {id ? "Edit Banner" : "Create New Banner"}
            </h1>
            <button
              onClick={handleFormClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-light"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        {id && isLoading ? (
          <div className="px-8 py-12">
            <p className="text-center text-gray-600">Loading banner...</p>
          </div>
        ) : (
          <div className="px-8 py-6">
            <BannerForm
              banner={banner}
              onClose={handleFormClose}
              onSuccess={handleFormSuccess}
              isFullPage={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerFormPage;
