import PromotionalBanner from "../../PromotionalBanner";
import TrendingProducts from "../../TrendingProducts";
import AccessoriesHero from "./Accessories/AccessoriesHero";
import AccessoriesCategories from "./Accessories/AccessoriesCategories";
import { ArrowRight } from "lucide-react";

export default function AccessoriesSection() {
  return (
    <div className="bg-base-50 min-h-screen pb-16">
      <AccessoriesHero />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Most Desired / Trending */}
        <section className="mb-16 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-14 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-base-content mb-2 sm:mb-4">
                Most Desired
              </h2>
              <p className="text-base-content/60 text-sm sm:text-xl font-light">
                The pieces everyone is talking about.
              </p>
            </div>
            <button className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-base-content hover:text-primary transition-colors flex items-center gap-2 group w-fit">
              View All 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <TrendingProducts />
        </section>

        {/* Dynamic Promotional Banner */}
        <div className="mb-16 md:mb-32 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm border border-base-content/5">
          <PromotionalBanner />
        </div>

        <AccessoriesCategories />
      </div>
    </div>
  );
}