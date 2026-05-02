export const SUB_TYPES = {
  clothing: {
    men: ["T-Shirts", "Jeans", "Jacket", "Shirts", "Hoodies", "Shorts", "Pants", "TrackPants", "Kurtas"],
    women: ["Tops", "Dresses", "Jeans", "Shirts", "Jacket", "Shorts", "Pants", "TrackPants", "Kurtas"],
  },
  footwear: {
    men: ["Sneakers", "Boots", "Formal Shoes"],
    women: ["Sandals", "Boots", "Sneakers"],
  },
  beauty: {
    product: ["Skincare", "Makeup", "Haircare", "Fragrance", "Bodycare", "Lipcare", "EyeCare"],
    skinConcern: ["Acne", "Dry", "Oily", "Sensitive", "Pigmentation", "Anti-aging", "Dark spots"],
  },
  accessories: {
    men: ["Belts", "Watches", "Perfumes", "Sunglasses", "Rings", "Bags", "Wallets"],
    women: ["Bags", "Watches", "Perfumes", "Rings", "Sunglasses", "Belts"],
    unisex: ["Perfumes", "Watches", "Sunglasses", "Bags", "Rings"]
  },
};

export const CATEGORIES = Object.keys(SUB_TYPES);
export const GENDERS = ["men", "women", "unisex"];
export const DISCOUNTS = ["10", "20", "30", "40", "50", "60", "80"];
export const PRICE_OPTS = [{ value: "low", label: "Low → High" }, { value: "high", label: "High → Low" }];