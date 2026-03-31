# Banner Management System - Modular & Reusable Architecture

## Overview

The banner management system has been completely refactored into a modular, reusable architecture with the following benefits:

- **Composable Components**: Small, focused components that can be used independently
- **Custom Hooks**: Reusable state management logic
- **Utility Functions**: Helper functions for common operations
- **Constants Management**: Centralized configuration
- **Easy Integration**: Import what you need, use anywhere

## Directory Structure

```
src/features/Banners/
├── hooks/
│   ├── useBannerForm.js       # Custom form state hook
│   └── index.js               # Hook exports
├── utils/
│   ├── bannerConstants.js     # All constants
│   ├── bannerHelpers.js       # Helper functions
│   └── index.js               # Utility exports
├── components/
│   ├── form/
│   │   ├── TextInput.jsx      # Reusable text input
│   │   ├── SelectField.jsx    # Reusable select
│   │   ├── ColorPickerField.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── RangeField.jsx
│   │   ├── CheckboxField.jsx
│   │   ├── BannerPreview.jsx  # Standalone preview
│   │   ├── FormTabs.jsx       # Tab navigation
│   │   ├── ContentTab.jsx     # Content section
│   │   ├── StylingTab.jsx     # Styling section
│   │   ├── SettingsTab.jsx    # Settings section
│   │   ├── FormActions.jsx    # Submit/Reset buttons
│   │   └── index.js           # Component exports
│   ├── BannerForm.jsx         # Main form (refactored)
│   ├── BannerData.jsx         # Table component
│   └── BannerStats.jsx        # Stats component
├── BannerSlice.js             # Redux slice
├── Banner.jsx                 # Main page
└── BannerCreateEdit.jsx       # Create/Edit wrapper
```

## Custom Hooks

### `useBannerForm(initialData)`

Manages all banner form state and logic.

```javascript
import { useBannerForm } from "@/features/Banners/hooks";

export default function MyComponent() {
  const {
    formData,
    imageFile,
    imagePreview,
    activeTab,
    setActiveTab,
    handleInputChange,
    updateFormFields,
    updateField,
    handleImageChange,
    resetForm,
    hasChanged,
  } = useBannerForm(initialData);

  return (
    // Your form JSX
  );
}
```

#### Returns:

- **formData**: Current form state object
- **imageFile**: File object from upload
- **imagePreview**: Image preview URL
- **activeTab**: Current active tab
- **setActiveTab**: Tab switch function
- **handleInputChange**: Standard input change handler
- **updateFormFields**: Update multiple fields at once
- **updateField**: Update single field
- **handleImageChange**: Image selection handler
- **resetForm**: Reset to initial state
- **hasChanged**: Check if form has modifications

### `useBannerFormWithValidation(initialData)`

Extended hook with built-in validation.

```javascript
import { useBannerFormWithValidation } from "@/features/Banners/hooks";

const {
  // ... all useBannerForm properties
  errors,
  validate,
  clearErrors,
  setFieldError,
} = useBannerFormWithValidation(initialData);
```

## Reusable Form Components

### Basic Field Components

#### TextInput
```javascript
import { TextInput } from "@/features/Banners/components/form";

<TextInput
  label="Title"
  name="title"
  value={formData.title}
  onChange={handleInputChange}
  placeholder="Enter title"
  required={true}
  type="text"
  error={errors.title}
/>
```

#### SelectField
```javascript
import { SelectField } from "@/features/Banners/components/form";

<SelectField
  label="Banner Type"
  name="type"
  value={formData.type}
  onChange={handleInputChange}
  options={[
    { value: "hero", label: "Hero" },
    { value: "promo", label: "Promo" },
  ]}
  required
  error={errors.type}
/>
```

#### ColorPickerField
```javascript
import { ColorPickerField } from "@/features/Banners/components/form";

<ColorPickerField
  label="Title Color"
  name="titleColor"
  value={formData.titleColor}
  onChange={handleInputChange}
  error={errors.titleColor}
/>
```

#### ImageUpload
```javascript
import { ImageUpload } from "@/features/Banners/components/form";

<ImageUpload
  label="Banner Image"
  imagePreview={imagePreview}
  onImageChange={handleImageChange}
  required
  error={errors.image}
/>
```

#### RangeField
```javascript
import { RangeField } from "@/features/Banners/components/form";

<RangeField
  label="Opacity"
  name="opacity"
  value={formData.opacity}
  onChange={handleInputChange}
  min={0}
  max={100}
  unit="%"
/>
```

#### CheckboxField
```javascript
import { CheckboxField } from "@/features/Banners/components/form";

<CheckboxField
  label="Active"
  name="isActive"
  checked={formData.isActive}
  onChange={handleInputChange}
/>
```

### Complex Components

#### BannerPreview
```javascript
import { BannerPreview } from "@/features/Banners/components/form";

<BannerPreview
  formData={formData}
  imagePreview={imagePreview}
/>
```

Shows desktop and mobile previews in real-time.

#### FormTabs
```javascript
import { FormTabs } from "@/features/Banners/components/form";

<FormTabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

#### ContentTab / StylingTab / SettingsTab
```javascript
import { ContentTab, StylingTab, SettingsTab } from "@/features/Banners/components/form";

{activeTab === "content" && (
  <ContentTab
    formData={formData}
    onInputChange={handleInputChange}
    onImageChange={handleImageChange}
    imagePreview={imagePreview}
    errors={errors}
  />
)}
```

## Constants & Helpers

### Using Constants

```javascript
import {
  BANNER_TYPES,
  BANNER_CATEGORIES,
  BANNER_PLACEMENTS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  DEFAULT_BANNER_FORM,
} from "@/features/Banners/utils";

// or use shorthand
import * as BannerConstants from "@/features/Banners/utils";
```

### Helper Functions

```javascript
import {
  createBannerFormData,
  getPreviewAlignment,
  validateBannerForm,
  calculateEngagementRate,
} from "@/features/Banners/utils";

// Create FormData for API submission
const formData = createBannerFormData(bannerData, imageFile);

// Get alignment styles for preview
const { justifyContent, alignItems } = getPreviewAlignment(position, vertical);

// Validate form data
const errors = validateBannerForm(formData);

// Calculate stats
const rate = calculateEngagementRate(totalBanners, activeBanners);
```

## Usage Examples

### Example 1: Simple Banner Form Only

```javascript
import { useBannerForm } from "@/features/Banners/hooks";
import { TextInput, SelectField } from "@/features/Banners/components/form";

export default function SimpleBannerForm() {
  const { formData, handleInputChange } = useBannerForm();

  return (
    <form>
      <TextInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <SelectField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        options={[
          { value: "hero", label: "Hero" },
          { value: "promo", label: "Promo" },
        ]}
      />
    </form>
  );
}
```

### Example 2: Custom Banner Manager

```javascript
import { useBannerFormWithValidation } from "@/features/Banners/hooks";
import { TextInput, BannerPreview, FormActions } from "@/features/Banners/components/form";
import { createBannerFormData } from "@/features/Banners/utils";

export default function CustomBannerManager() {
  const {
    formData,
    imagePreview,
    handleInputChange,
    handleImageChange,
    validate,
    resetForm,
    errors,
  } = useBannerFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = createBannerFormData(formData);
      // Submit to API
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <form onSubmit={handleSubmit} className="col-span-2 space-y-4">
        <TextInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
        />
        {/* More fields */}
        <FormActions
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
      </form>
      <BannerPreview formData={formData} imagePreview={imagePreview} />
    </div>
  );
}
```

### Example 3: Using Components in Other Features

```javascript
// In a different feature, reuse the form components
import { TextInput, SelectField, ImageUpload } from "@/features/Banners/components/form";

export default function ProductFeature() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: null,
  });

  return (
    <>
      <TextInput
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <SelectField
        label="Category"
        name="category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        options={[
          { value: "electronics", label: "Electronics" },
          { value: "clothing", label: "Clothing" },
        ]}
      />
      <ImageUpload
        imagePreview={formData.image}
        onImageChange={(e) => {
          // Handle image
        }}
      />
    </>
  );
}
```

## Best Practices

### 1. Import What You Need

```javascript
// ✅ Good - Import only what you need
import { TextInput, SelectField } from "@/features/Banners/components/form";
import { useBannerForm } from "@/features/Banners/hooks";

// ❌ Avoid - Importing entire modules
import * as Banner from "@/features/Banners";
```

### 2. Use Hooks for State Management

```javascript
// ✅ Good - Use custom hook
const { formData, handleInputChange } = useBannerForm(initialData);

// ❌ Avoid - Duplicating state logic
const [formData, setFormData] = useState(initialData);
```

### 3. Centralize Your Constants

```javascript
// ✅ Good - Use constants
import { BANNER_TYPES } from "@/features/Banners/utils";

// ❌ Avoid - Hardcoding values
<option value="hero">Hero</option>
```

### 4. Use Helper Functions

```javascript
// ✅ Good - Use helpers
const errors = validateBannerForm(formData);

// ❌ Avoid - Duplicating validation logic
if (!formData.title) errors.title = "Required";
```

## Extending the System

### Adding a New Field Type

1. Create component in `components/form/NewField.jsx`
2. Export in `components/form/index.js`
3. Use in your components

```javascript
// components/form/DateRangeField.jsx
export default function DateRangeField({ label, startValue, endValue, onStartChange, onEndChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type="date" value={startValue} onChange={onStartChange} />
      <input type="date" value={endValue} onChange={onEndChange} />
    </div>
  );
}
```

### Adding a New Hook

1. Create in `hooks/useNewFeature.js`
2. Export in `hooks/index.js`
3. Use in components

```javascript
// hooks/useBannerValidation.js
export const useBannerValidation = () => {
  const validate = (formData) => { /* ... */ };
  return { validate };
};
```

## Testing Reusable Components

```javascript
import { render, screen } from "@testing-library/react";
import { TextInput } from "@/features/Banners/components/form";

describe("TextInput", () => {
  it("renders with label and placeholder", () => {
    render(
      <TextInput
        label="Test Label"
        name="test"
        placeholder="Test Placeholder"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });
});
```

## Performance Considerations

- Components use React.memo by default (can be added if needed)
- Hooks handle state efficiently with minimal re-renders
- Constants are imported once at module level
- FormData creation is optimized with helper functions

## Summary of Reusable Parts

| Component | Purpose | Reusable | Use Case |
|-----------|---------|----------|----------|
| TextInput | Text field wrapper | ✅ Yes | Any text input |
| SelectField | Dropdown wrapper | ✅ Yes | Any selection |
| ColorPickerField | Color selection | ✅ Yes | Color input |
| ImageUpload | Image upload | ✅ Yes | Image fields |
| RangeField | Range slider | ✅ Yes | Number ranges |
| BannerPreview | Preview renderer | ✅ Yes | Visual preview |
| useBannerForm | Form state | ✅ Yes | Form management |
| Constants | Config values | ✅ Yes | Options lists |
| Helpers | Utilities | ✅ Yes | Common operations |

---

This architecture makes the banner system highly modular and ready for expansion or integration into other features!
