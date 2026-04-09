import PromotionalBanner from "../../PromotionalBanner";
import TrendingProducts from "../../TrendingProducts";
import AccessoriesHero from "./Accessories/AccessoriesHero";
import AccessoriesCategories from "./Accessories/AccessoriesCategories";
import { ArrowRight } from "lucide-react";

export default function AccessoriesSection() {
  return (
    <div className="bg-base-50 min-h-screen ">
      <AccessoriesHero />

      {/* Main Container */}
      <div className="max-w-8xl p-2 sm:p-8 ">
        
        {/* Most Desired / Trending */}
        <section className="">
          <TrendingProducts />
        </section>

      
        <AccessoriesCategories />
      </div>
    </div>
  );
}