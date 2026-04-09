import Hero from "../components/Hero";
import PromotionalBanner from "../components/PromotionalBanner";
import CategorySection from "../components/CategorySection";
import FeaturedProduct from "../components/FeaturedProduct";
import TrendingProducts from "../components/TrendingProducts";
import NewArrivals from "../components/NewArrivals";
import ViewedProduct from "../components/ViewedProduct";
import DiscoverCollections from "../components/DiscoverCollection";
import FashionCollection from "../components/FashionCollection";
import OfferSignup from "../components/OfferSignup";

export default function Home() {


    return (
        <>

            <Hero />
            <CategorySection />
            <FeaturedProduct/>
          
            <TrendingProducts />
            <FashionCollection />
            <NewArrivals />
           
           

            <ViewedProduct />
            <OfferSignup />

        </>
    )
}