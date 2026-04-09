import BannerRenderer from "./BannerRenderer";

export default function BannerSlot({ placement, banners = [], rounded = true }) {
    console.log(banners )
  const filtered = banners?.filter(
    (b) => b.placement === placement && b.isActive
  );

  if (!filtered.length) return null;

  return (
    <>
      {filtered.map((banner) => (
        <BannerRenderer key={banner._id} banner={banner} rounded={rounded}/>
      ))}
    </>
  );
}