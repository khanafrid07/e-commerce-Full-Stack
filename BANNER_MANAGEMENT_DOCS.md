# Modern Banner Management System - Documentation

## Overview

A comprehensive, modern banner management system has been built for your e-commerce platform. This system allows admins to create, edit, delete, and manage banners with full customization of content, styling, and placement.

## Features

### 1. **Dashboard & Statistics**
- **Quick Stats**: View total banners, active banners, hero banners, promo banners, and category banners
- **Engagement Rate**: Automatic calculation of active vs. inactive banners
- **Real-time Updates**: Stats update automatically when banners are modified

### 2. **Banner Management Table**
- **Search Functionality**: Filter banners by title
- **Type Filtering**: Filter by banner type (Hero, Category, Promo)
- **Status Management**: Toggle banner active/inactive status with visual indicators
- **Quick Actions**: Edit and delete buttons for each banner
- **Image Thumbnails**: See banner images in the list view
- **Sorting**: Banners sorted by priority and creation date

### 3. **Rich Banner Creation/Editing**
The banner form features three tabs for organized customization:

#### **Content Tab**
- Title (required)
- Heading text
- Sub-heading text
- Call-to-action (CTA) text and link
- Image upload with drag-and-drop support

#### **Styling Tab**
- **Color Picker**: Customize text colors and backgrounds
  - Title color
  - Heading color
  - Sub-heading color
  - CTA text color
  - CTA background color
  - Overlay color
- **Text Sizing**: Choose from 5 size levels (Small to 2X-Large)
- **Text Weights**: 5 weight options (Normal to Extra Bold)
- **Overlay Opacity**: Adjustable from 0-100%

#### **Settings Tab**
- Banner Type: Hero, Category, or Promo
- Category Selection: For category banners (Fashion, Beauty, Footwear, Accessories)
- Placement: Home Top, Middle, or Bottom
- Horizontal Position: Left, Center, or Right
- Vertical Position: Top, Center, or Bottom
- Priority: Control display order (higher = more prominent)
- Date Range: Set active period for banners
- Active Status: Enable/disable banner visibility

### 4. **Live Preview**
- **Desktop View**: See how banner looks on desktop (16:9 aspect ratio)
- **Mobile View**: Preview mobile appearance (1:1 aspect ratio)
- **Real-time Updates**: Preview updates instantly as you modify styling
- **Responsive Test**: Test both layouts simultaneously

## API Endpoints

### Base URL: `http://localhost:8080/api/banners`

### 1. GET All Banners
```
GET /banners?type=hero&category=Fashion&isAdmin=true
```
Query Parameters:
- `type`: Filter by banner type (hero, category, promo)
- `category`: Filter by category
- `isAdmin`: Include inactive banners (admin only)

Response: Array of banner objects

### 2. GET Banner by ID
```
GET /banners/:id
```
Response: Single banner object

### 3. CREATE Banner
```
POST /banners
```
Body: FormData with 'data' (JSON string) and 'img' (file)
Returns: Created banner object

### 4. UPDATE Banner
```
PUT /banners/:id
```
Body: FormData with 'data' (JSON string) and optional 'img' (file)
Returns: Updated banner object

### 5. DELETE Banner
```
DELETE /banners/:id
```
Returns: Success message

### 6. UPDATE Banner Status
```
PATCH /banners/:id/status
```
Body: `{ isActive: boolean }`
Returns: Updated banner object

## Database Schema

```javascript
{
  title: String (required),
  image: String (URL to uploaded image),
  heading: String,
  subHeading: String,
  ctaText: String,
  ctaLink: String,
  
  // Sizing
  titleSize: String,
  titleWeight: String,
  headingSize: String,
  headingWeight: String,
  subHeadingSize: String,
  subHeadingWeight: String,
  
  // Colors
  titleColor: String (hex),
  headingColor: String (hex),
  subHeadingColor: String (hex),
  ctaTextColor: String (hex),
  ctaBgColor: String (hex),
  overlayColor: String (hex),
  overlayOpacity: Number (0-100),
  
  // Settings
  type: Enum ["hero", "category", "promo"],
  category: Enum ["Fashion", "Beauty", "Footwear", "Accessories"],
  placement: Enum ["home_top", "home_middle", "home_bottom"],
  position: Enum ["left", "center", "right"],
  vertical: Enum ["top", "center", "bottom"],
  priority: Number,
  isActive: Boolean,
  startDate: Date,
  endDate: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## File Structure

### Backend Files
- `Backend/models/banner.js` - Banner schema with all fields
- `Backend/routes/bannerRoutes.js` - Complete CRUD API endpoints
- `Backend/config/multer.js` - File upload configuration

### Frontend Files
- `Frontend/e-commerce/src/features/Banners/Banner.jsx` - Main banner management page
- `Frontend/e-commerce/src/features/Banners/BannerCreateEdit.jsx` - Create/edit page wrapper
- `Frontend/e-commerce/src/features/Banners/BannerSlice.js` - Redux RTK Query slice
- `Frontend/e-commerce/src/features/Banners/components/BannerForm.jsx` - Rich form with preview
- `Frontend/e-commerce/src/features/Banners/components/BannerData.jsx` - Table view
- `Frontend/e-commerce/src/features/Banners/components/BannerStats.jsx` - Statistics dashboard
- `Frontend/e-commerce/src/features/Banners/ToastNotification.jsx` - Notification component

## Routes

```
/dashboard/banners              - Display all banners with table and stats
/dashboard/banners/create       - Create new banner form
/dashboard/banners/edit/:id     - Edit existing banner
```

## Usage Examples

### Creating a Banner
1. Click "Create New" button
2. Fill in the title and other content
3. Move to "Styling" tab to customize colors, sizes, and weights
4. Go to "Settings" tab to configure placement and other options
5. Check live preview on the right side
6. Click "Save Banner" to create

### Editing a Banner
1. Find banner in the list
2. Click the edit icon (pencil)
3. Modify any fields (content, styling, settings)
4. Click "Save Banner" to update

### Toggling Banner Status
- Each banner has an Active/Inactive button in the status column
- Click to toggle visibility instantly without editing

### Deleting a Banner
1. Find banner in the list
2. Click the delete icon (trash bin)
3. Confirm deletion
4. Banner is removed from the system

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Middleware: Express Error Handler, Async Wrapper, Validators

### Frontend
- React 19
- Redux Toolkit with RTK Query
- React Router v7
- Tailwind CSS + DaisyUI
- Lucide React icons
- Framer Motion for animations

## Key Features Implemented

✅ Full CRUD operations for banners
✅ Advanced filtering and search
✅ Live preview with responsive layouts (desktop & mobile)
✅ Rich text styling customization
✅ Image upload with validation
✅ Status management (active/inactive)
✅ Priority-based sorting
✅ Date range scheduling
✅ Automatic error handling with toast notifications
✅ Redux state management with RTK Query
✅ Responsive design with modern UI
✅ Category-specific banners
✅ Multiple placement options
✅ Comprehensive statistics dashboard

## Error Handling

The system includes comprehensive error handling:
- Form validation
- Image file type and size validation
- API error responses with meaningful messages
- Toast notifications for all operations
- Automatic error recovery

## Performance Optimizations

- Lazy loading of banner images
- Optimized API queries with caching
- Efficient re-renders with React optimization
- Batch operations support
- Responsive image handling

## Future Enhancements

Potential additions to the system:
- Banner analytics (click tracking, impressions)
- A/B testing for different banner versions
- Scheduled banner rotations
- Banner templates
- Advanced image editing
- Bulk operations
- Export/import functionality
- Banner preview for different devices

## Troubleshooting

### Images not uploading
- Check multer configuration in `Backend/config/multer.js`
- Verify uploads folder has write permissions
- Ensure image file size is under 10MB

### Form not submitting
- Check browser console for validation errors
- Verify title field is filled (required)
- Check Redux DevTools for action dispatches

### Styles not applying
- Clear browser cache
- Verify Tailwind CSS configuration
- Check color values are valid hex codes

## Support

For issues or questions about the banner management system, refer to the component source code which includes detailed comments and documentation.
