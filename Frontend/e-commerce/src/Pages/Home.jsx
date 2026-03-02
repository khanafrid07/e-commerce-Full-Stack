import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProduct from "../components/FeaturedProduct";
import TrendingProducts from "../components/TrendingProducts";
import NewArrivals from "../components/NewArrivals";
import ViewedProduct from "../components/ViewedProduct";


export default function Home(){


    return(
        <>
        
        <Hero/>
        <CategorySection/>
        <FeaturedProduct/>
        <TrendingProducts/>
        <ViewedProduct/>
        <NewArrivals/>
        </>
    )
}