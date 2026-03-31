# Banner Management System - Setup Guide

## Overview
A simple, modular banner management system for your dashboard to manage **Home Banners (Hero)**, **Promo Banners**, and **Category Banners**.

## Components

### 1. **BannerManagement.jsx** (Main Page)
- Displays list of all banners
- Filter banners by type (All, Hero, Promo, Category)
- Add new banner button
- Edit, delete, and toggle status for each banner

### 2. **BannerForm.jsx** (Add/Edit Form)
- Modal form for creating and editing banners
- Simple form with intuitive fields:
  - Type (Hero, Promo, Category)
  - Template design options
  - Heading & Sub-heading
  - CTA button text and link
  - Image upload with preview
  - Text and button color options
  - Priority and active status
  - Optional date ranges

### 3. **BannerList.jsx** (List Display)
- Grid view of all banners
- Responsive layout (1 col mobile, 2 col tablet, 3 col desktop)

### 4. **BannerItem.jsx** (Banner Card)
- Individual banner card with:
  - Banner image preview
  - Type and status badges
  - Quick info (heading, template, placement)
  - Edit, Activate/Deactivate, Delete buttons

### 5. **BannerPreview.jsx** (Optional Preview)
- Visual preview of how banner will look
- Can be integrated in the form for live preview

## Supported Banner Types

| Type | Use Case |
|------|----------|
| **Hero** | Large banners for home page sections |
| **Promo** | Promotional banners (sales, offers) |
| **Category** | Category-specific banners |

## Supported Placements (Home Banners)
- `home_top` - Top of homepage
- `home_middle` - Middle of homepage
- `home_bottom` - Bottom of homepage

## Supported Templates
1. **none** - No overlay
2. **light-overlay** - White/light overlay
3. **dark-overlay** - Dark overlay (best contrast)
4. **left-dark** - Dark overlay on left side
5. **center-light** - Light overlay centered
6. **overlay-gradient** - Left to right gradient
7. **gradient-right** - Right to left gradient
8. **card-overlay** - Card-style overlay
9. **minimal** - Minimal dark overlay

## Color Options
- **Text Colors**: White, Dark, Gray
- **Button Colors**: Blue, Red, Green, Purple, Black

## Integration Steps

### 1. Import in Your Dashboard
```jsx
import BannerManagement from '@/features/Banners/BannerManagement';

// In your dashboard route
<Route path="/dashboard/banners" element={<BannerManagement />} />
```

### 2. Ensure Redux Store is Set Up
The component uses Redux RTK Query from `BannerSlice.js`:
```jsx
// In your Redux store
import { bannerApi } from '@/features/Banners/BannerSlice';

// Add to configureStore
export const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bannerApi.middleware),
});
```

### 3. API Endpoints Used
- `GET /api/banners` - Fetch all banners
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create banner (multipart FormData)
- `PUT /api/banners/:id` - Update banner (multipart FormData)
- `PATCH /api/banners/:id/status` - Toggle active status
- `DELETE /api/banners/:id` - Delete banner

## Features

✅ Create new banners with image upload
✅ Edit existing banners
✅ Delete banners
✅ Toggle active/inactive status
✅ Filter by banner type
✅ Priority management
✅ Optional date scheduling
✅ Live image preview before save
✅ Responsive design
✅ Simple, clean UI

## Backend Model Fields

```javascript
{
  title: String,
  heading: String,
  subHeading: String,
  image: String (URL), // Required
  ctaText: String,
  ctaLink: String,
  type: String (enum: ["hero", "promo", "category"]), // Required
  placement: String (enum: ["home_top", "home_middle", "home_bottom"]),
  category: String, // For category banners
  template: String (enum: [templates...]), // Required
  priority: Number (default: 0),
  startDate: Date, // Optional
  endDate: Date, // Optional
  isActive: Boolean (default: true),
  textColor: String (enum: ["white", "dark", "gray"]),
  ctaButtonColor: String (enum: ["blue", "red", "green", "purple", "black"]),
  timestamps: { createdAt, updatedAt }
}
```

## Tips for Best Results

1. **Image Size**: Use images 1920x600px or similar 16:9 ratio for best quality
2. **Templates**: Use "dark-overlay" for text visibility on bright images
3. **Priority**: Higher number = displays first. Set same priority for multiple banners
4. **Category Banners**: Leave placement empty, set category name instead
5. **CTA Link**: Can be relative (/products) or absolute path
6. **Date Scheduling**: Optional - leave empty to always show

## Example Banner Data

### Home Hero Banner
```json
{
  "heading": "Summer Sale",
  "subHeading": "Up to 70% off",
  "ctaText": "Shop Now",
  "ctaLink": "/sale",
  "type": "hero",
  "placement": "home_top",
  "template": "dark-overlay",
  "textColor": "white",
  "ctaButtonColor": "red",
  "priority": 1
}
```

### Promo Banner
```json
{
  "heading": "Flash Sale",
  "subHeading": "Limited time offer",
  "ctaText": "Buy Now",
  "ctaLink": "/flash-sale",
  "type": "promo",
  "placement": "home_middle",
  "template": "overlay-gradient",
  "textColor": "white",
  "ctaButtonColor": "green",
  "priority": 2
}
```

### Category Banner
```json
{
  "heading": "Electronics",
  "subHeading": "Explore our collection",
  "ctaText": "View",
  "ctaLink": "/category/electronics",
  "type": "category",
  "category": "Electronics",
  "template": "center-light",
  "textColor": "dark",
  "ctaButtonColor": "blue",
  "priority": 0
}
```

## Tailwind CSS Required

Make sure your project has Tailwind CSS configured, as all styling uses Tailwind classes.

## Future Enhancements (Optional)

- Add banner copy feature
- Batch actions (select multiple delete)
- Advanced scheduling
- A/B testing metrics
- Banner analytics view
