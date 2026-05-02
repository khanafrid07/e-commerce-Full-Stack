import { useParams, useNavigate } from "react-router-dom";
import BeautySection from "./BeautySection";
import AccessoriesSection from "./AccessoriesSection";
import FootwearSection from "./FootwearSection";
import FashionSection from "./FashionSection";
export default function CategoryFilter() {
  const { category } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {category == "Fashion" && (
        <FashionSection />
      )}

      {category === "Beauty" && (
        <BeautySection />
      )}
      {category == "Accessories" && (
        <AccessoriesSection />
      )}
      {category == "Footwear" && (
        <FootwearSection />
      )}

    </div>


  );
}