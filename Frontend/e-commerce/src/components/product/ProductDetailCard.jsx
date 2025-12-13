import { useState, useEffect } from "react";
import { useAddToCartMutation } from "../../features/cart/cart";
import ProductImageGallery from "./detail/ProductImageGallery";
import ProductInfo from "./detail/ProductInfo";
import ProductDescription from "./detail/ProductDescription";
import VariantSelector from "./detail/VariantSelector";
import AddToCartSection from "./detail/AddToCartSection";
import TrustBadges from "./detail/TrustBadges";

export default function ProductDetailCard({ data }) {
  if (!data) return null;

  const [addToCart, { isLoading }] = useAddToCartMutation();

  // Base Variant + Additional Variants
  const baseVariant = data.baseVariant || { typeValues: {}, price: data.basePrice, stock: data.stock };
  const additionalVariants = data.variants || [];
  const allVariants = [baseVariant, ...additionalVariants];

  // Get all variant types
  const variantTypes = baseVariant.typeValues ? Object.keys(baseVariant.typeValues) : [];

  // State
  const [selectedVariant, setSelectedVariant] = useState({});
  const [price, setPrice] = useState(baseVariant.price || data.basePrice || 0);
  const [stock, setStock] = useState(baseVariant.stock || data.stock || 0);
  const [discount, setDiscount] = useState(data.discount || 0);
  const [quantity, setQuantity] = useState(1);

  // Initialize selected variant on mount
  useEffect(() => {
    if (baseVariant.typeValues) {
      // Only set if all values are non-empty
      const hasAllValues = Object.values(baseVariant.typeValues).every(v => v && v !== "" && v !== "None");
      if (hasAllValues) {
        setSelectedVariant(baseVariant.typeValues);
      }
    }
  }, []);

  // Images
  const productImages = data.images || [];
  const mainImage = productImages.find((img) => img.isMain)?.url || productImages[0]?.url || "/placeholder.png";
  const [previewImage, setPreviewImage] = useState(mainImage);
  const [currentImages, setCurrentImages] = useState(productImages);

  // Get available options based on current selection
  const getAvailableOptions = (type) => {
    const otherTypes = variantTypes.filter(t => t !== type);
    
    if (otherTypes.every(t => !selectedVariant[t])) {
      return [...new Set(allVariants.map(v => v.typeValues?.[type]).filter(Boolean))];
    }

    const matchingVariants = allVariants.filter(variant => {
      return otherTypes.every(t => {
        return !selectedVariant[t] || variant.typeValues?.[t] === selectedVariant[t];
      });
    });

    return [...new Set(matchingVariants.map(v => v.typeValues?.[type]).filter(Boolean))];
  };

  // Smart variant selection
  const handleVariantChange = (type, value) => {
    console.log(`🔄 Changing ${type} to ${value}`);
    
    const newSelection = { ...selectedVariant, [type]: value };
    console.log("📝 New selection:", newSelection);
    
    const exists = allVariants.some(v =>
      Object.entries(newSelection).every(([k, val]) => v.typeValues?.[k] === val)
    );

    if (exists) {
      console.log("✅ Exact match found, setting variant");
      setSelectedVariant(newSelection);
    } else {
      console.log("⚠️ No exact match, adjusting selection");
      const adjustedSelection = { ...newSelection };
      
      variantTypes.forEach(otherType => {
        if (otherType !== type) {
          const available = allVariants.filter(v =>
            Object.entries(adjustedSelection)
              .filter(([k]) => k === type || k === otherType)
              .every(([k, val]) => v.typeValues?.[k] === val || k === otherType)
          );
          
          if (available.length > 0) {
            adjustedSelection[otherType] = available[0].typeValues?.[otherType];
          }
        }
      });
      
      console.log("📝 Adjusted selection:", adjustedSelection);
      setSelectedVariant(adjustedSelection);
    }
  };

  // Update price, stock, discount, and images when variant changes
  useEffect(() => {
    const isBaseVariant = Object.entries(selectedVariant).every(
      ([key, val]) => baseVariant.typeValues?.[key] === val
    );

    if (isBaseVariant) {
      setPrice(baseVariant.price || data.basePrice);
      setStock(baseVariant.stock || data.stock);
      setDiscount(data.discount || 0);
      setCurrentImages(productImages);
      setPreviewImage(mainImage);
    } else {
      const matched = additionalVariants.find((v) =>
        Object.entries(selectedVariant).every(([key, val]) => v.typeValues?.[key] === val)
      );

      if (matched) {
        setPrice(matched.price);
        setStock(matched.stock);
        setDiscount(matched.discount || 0);
        
        const variantImages = matched.images?.length > 0 ? matched.images : productImages;
        setCurrentImages(variantImages);
        
        const thumbnail = variantImages[matched.thumbnailIndex]?.url || variantImages[0]?.url || mainImage;
        setPreviewImage(thumbnail);
      } else {
        setPrice(data.basePrice);
        setStock(0);
        setDiscount(data.discount || 0);
        setCurrentImages(productImages);
        setPreviewImage(mainImage);
      }
    }
    
    setQuantity(1);
  }, [selectedVariant, baseVariant, additionalVariants, productImages, mainImage, data]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    if (stock <= 0) {
      alert("❌ This variant is out of stock");
      return;
    }

    const cartData = {
      productId: data._id,
      quantity,
      variants: selectedVariant, 
      price: finalPrice,
    };

    console.log("🛒 Adding to cart:", cartData);

    try {
      await addToCart(cartData).unwrap();
      
      console.log("✅ Successfully added to cart");
      alert("✅ Product added to cart successfully!");
    } catch (err) {
      console.error("❌ Add to cart error:", err);
      alert("❌ Error adding product to cart");
    }
  };

  const finalPrice = price - (price * discount) / 100;
  const savings = price - finalPrice;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left Side - Image Gallery */}
          <div>
            <ProductImageGallery
              images={currentImages}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              featured={data.featured}
              discount={discount}
            />
            <TrustBadges />
          </div>

          {/* Right Side - Product Info */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col space-y-4 sm:space-y-6">
            <ProductInfo
              title={data.title}
              category={data.category}
              price={price}
              finalPrice={finalPrice}
              discount={discount}
              savings={savings}
              stock={stock}
            />

            <ProductDescription description={data.description} />

            <VariantSelector
              variantTypes={variantTypes}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
              getAvailableOptions={getAvailableOptions}
            />

            <AddToCartSection
              quantity={quantity}
              setQuantity={setQuantity}
              stock={stock}
              finalPrice={finalPrice}
              onAddToCart={handleAddToCart}
              isLoading={isLoading}
            />

            <TrustBadges mobile />
          </div>
        </div>
      </div>
    </div>
  );
}