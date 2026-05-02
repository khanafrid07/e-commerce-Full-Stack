import BannerSlot from "../../../Banners/components/BannerSlot";
import { useGetBannerQuery } from "../../../Banners/BannerSlice";
export default function AccessoriesHero() {
  const { data, isLoading } = useGetBannerQuery({ type: "category", category: "accessories" })
  if (isLoading) return <p>Loading...</p>
  return (
    <section className="w-full  md:pl-3 overflow-hidden ">

      <BannerSlot banners={data || []} placement={"home_top"} />
    </section>
  );
}
