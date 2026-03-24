export const SUB_TYPES = {
  clothes: {
    men:   ["T-Shirts", "Jeans", "Jacket", "Shirts", "Hoodies"],
    women: ["Tops", "Dresses", "Jeans", "Shirts"],
  },
  footwear: {
    men:   ["Sneakers", "Boots", "Formal Shoes"],
    women: ["Sandals", "Boots", "Sneakers"],
  },
  beauty: {
    product:     ["Skincare", "Makeup", "Haircare", "Fragrance"],
    skinConcern: ["Acne", "Dry", "Oily", "Sensitive", "Pigmentation", "Anti-aging", "Dark spots"],
  },
  accessories: {
    men:   ["Belt", "Watches", "Perfumes", "Sunglasses", "Rings"],
    women: ["Bags", "Watches", "Perfumes", "Rings"],
  },
};

export const CATEGORIES  = Object.keys(SUB_TYPES);
export const GENDERS     = ["men", "women"];
export const DISCOUNTS   = ["10", "20", "30", "40", "50", "60", "80"];
export const PRICE_OPTS  = [{ value: "low", label: "Low → High" }, { value: "high", label: "High → Low" }];