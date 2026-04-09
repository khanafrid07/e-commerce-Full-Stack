import BannerSlot from "../../../../features/Banners/BannerSlot";
import { useGetBannerQuery } from "../../../../features/Banners/BannerSlice";
export default function AccessoriesHero() {
  const {data, isLoading} = useGetBannerQuery({type:"category", category:"accessories"})
  if(isLoading) return <p>Loading...</p>
  return (
    <section className="w-full p-2 md:pl-3 overflow-hidden ">
      
      <BannerSlot banners={data || []} placement={"home_top"} rounded={false}/>
    </section>
  );
}
