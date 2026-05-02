import HeroDark from "../templates/HeroDark";
import LeftOverlay from "../templates/LeftOverlay";
import CenterMinimal from "../templates/CenterMinimal";
import GradientPromo from "../templates/GradientPromo";
import { CleanImage } from "../templates/CleanImage";
import { SplitBanner } from "../templates/SplitBanner";

export default function BannerRenderer({ banner, rounded }) {
  switch (banner?.template) {
    case "hero_dark":
      return <HeroDark banner={banner} rounded={rounded} />

    case "left_overlay":
      return <LeftOverlay banner={banner} rounded={rounded} />

    case "center_minimal":
      return <CenterMinimal banner={banner} rounded={rounded} />

    case "gradient_promo":
      return <GradientPromo banner={banner} rounded={rounded} />

    case "clean_image":
      return <CleanImage banner={banner} rounded={rounded} />
    case "split_banner":
      return <SplitBanner banner={banner} rounded={rounded} />


    default:
      return <None />
  }
}