
import TrendingProducts from "../section/TrendingProducts";
import AccessoriesHero from "./Accessories/AccessoriesHero";
import AccessoriesCategories from "./Accessories/AccessoriesCategories";
import { ArrowRight } from "lucide-react";
import EmptyState from "../../../components/common/EmptyState";

export default function AccessoriesSection() {
  return (
    <div className="bg-base-50 min-h-screen ">
      <AccessoriesHero />

      {/* Main Container */}
      <div className="max-w-full px-4  sm:pl-4 ">

        {/* Most Desired / Trending */}
        <section className="mt-4 sm:mt-8">
          <TrendingProducts category={"Accessories"} />
        </section>


        <AccessoriesCategories />
      </div>
      <EmptyState />
    </div>
  );
}