import BannerRenderer from "./BannerRenderer";
import BannerCarousel from "./BannerCarousel";
export default function BannerSlot({ placement, banners = [], rounded = true }) {

  const filtered = banners?.filter(
    (b) => b.placement === placement && b.isActive
  );

  if (!filtered.length) return null;

  return (
    <>
      {filtered.length > 1 ? (
        <BannerCarousel banners={filtered} rounded={rounded} />
      ) : (
        <BannerRenderer key={filtered[0]._id} banner={filtered[0]} rounded={rounded} />
      )}
    </>
  );
}