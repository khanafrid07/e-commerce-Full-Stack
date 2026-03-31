# Quick Reference - Banner System Components

## One-Liner Imports

```javascript
// All form components
import { TextInput, SelectField, ColorPickerField, ImageUpload, RangeField, CheckboxField, BannerPreview, FormTabs, ContentTab, StylingTab, SettingsTab, FormActions } from "@/features/Banners/components/form";

// All constants
import { BANNER_TYPES, BANNER_CATEGORIES, TEXT_SIZES, TEXT_WEIGHTS, DEFAULT_BANNER_FORM } from "@/features/Banners/utils";

// All helpers
import { createBannerFormData, getPreviewAlignment, validateBannerForm } from "@/features/Banners/utils";

// Custom hook
import { useBannerForm, useBannerFormWithValidation } from "@/features/Banners/hooks";
```

## Component Reference

### Form Fields (All reusable)

| Component | Props | Example |
|-----------|-------|---------|
| `TextInput` | label, name, value, onChange, type, required, error | Text, email, number, date inputs |
| `SelectField` | label, name, value, onChange, options, required, error | Dropdowns |
| `ColorPickerField` | label, name, value, onChange, error | Color pickers |
| `ImageUpload` | label, imagePreview, onImageChange, required, error | File uploads |
| `RangeField` | label, name, value, onChange, min, max, unit | Sliders |
| `CheckboxField` | label, name, checked, onChange | Toggles |

### Complex Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `BannerPreview` | formData, imagePreview | Desktop/mobile preview |
| `FormTabs` | activeTab, onTabChange | Tab navigation |
| `ContentTab` | formData, onInputChange, onImageChange, imagePreview, errors | Content section |
| `StylingTab` | formData, onInputChange, errors | Styling section |
| `SettingsTab` | formData, onInputChange, errors | Settings section |
| `FormActions` | isLoading, onSubmit, onReset, showReset | Submit buttons |

## Hook Reference

### useBannerForm
```javascript
const {
  formData,              // Current form state
  imageFile,             // Selected image file
  imagePreview,          // Image preview URL
  activeTab,             // Current tab (content/styling/settings)
  setActiveTab,          // Tab switcher
  handleInputChange,     // Standard input handler
  updateFormFields,      // Update multiple fields
  updateField,           // Update single field
  handleImageChange,     // Image selection handler
  resetForm,             // Reset to initial state
  hasChanged,            // Check if modified
} = useBannerForm(initialData);
```

### useBannerFormWithValidation
```javascript
const {
  // All useBannerForm properties plus:
  errors,                // Validation errors object
  validate,              // Validate function
  clearErrors,           // Clear all errors
  setFieldError,         // Set single field error
} = useBannerFormWithValidation(initialData);
```

## Constants Reference

```javascript
// Lists
BANNER_TYPES = [{ value: "hero", label: "Hero" }, ...]
BANNER_CATEGORIES = [{ value: "Fashion", label: "Fashion" }, ...]
BANNER_PLACEMENTS = [{ value: "home_top", label: "Home - Top" }, ...]
HORIZONTAL_POSITIONS = [{ value: "left", label: "Left" }, ...]
VERTICAL_POSITIONS = [{ value: "top", label: "Top" }, ...]
TEXT_SIZES = [{ value: "text-lg sm:text-xl", label: "Small" }, ...]
TEXT_WEIGHTS = [{ value: "font-normal", label: "Normal" }, ...]

// Fields
COLOR_FIELDS = [{ name: "titleColor", label: "Title Color" }, ...]
TEXT_SIZE_FIELDS = [{ name: "titleSize", label: "Title Size" }, ...]
TEXT_WEIGHT_FIELDS = [{ name: "titleWeight", label: "Title Weight" }, ...]

// Default form data
DEFAULT_BANNER_FORM = { title: "", heading: "", ... }
```

## Helpers Reference

```javascript
// Create FormData for submission
createBannerFormData(formData, imageFile)
// Returns: FormData object ready for API

// Get preview alignment
getPreviewAlignment(position, vertical)
// Returns: { justifyContent, alignItems }

// Format date
formatBannerDate(dateString)
// Returns: "3/31/2026, 10:30:45 AM"

// Validate form
validateBannerForm(formData)
// Returns: { title: "error message", ... }

// Get stat colors
getStatColor(type)
// Returns: { bg: "...", text: "...", border: "..." }

// Calculate engagement rate
calculateEngagementRate(total, active)
// Returns: 75 (percentage)
```

## Common Patterns

### Pattern 1: Simple Form
```javascript
const { formData, handleInputChange } = useBannerForm();
<TextInput name="title" value={formData.title} onChange={handleInputChange} />
```

### Pattern 2: Form with Validation
```javascript
const { formData, handleInputChange, validate, errors } = useBannerFormWithValidation();
const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) { /* submit */ }
};
```

### Pattern 3: Multi-Tab Form
```javascript
const { formData, handleInputChange, activeTab, setActiveTab } = useBannerForm();
<FormTabs activeTab={activeTab} onTabChange={setActiveTab} />
{activeTab === "content" && <ContentTab formData={formData} {...props} />}
```

### Pattern 4: Form with Preview
```javascript
const { formData, imagePreview } = useBannerForm();
<BannerPreview formData={formData} imagePreview={imagePreview} />
```

### Pattern 5: Reusing in Other Features
```javascript
// In a different feature file
import { TextInput } from "@/features/Banners/components/form";
<TextInput label="Name" name="name" value={value} onChange={handler} />
```

## File Locations

```
banners/ (main components)
├── components/
│   ├── form/ (reusable fields)
│   │   ├── TextInput.jsx
│   │   ├── SelectField.jsx
│   │   ├── ColorPickerField.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── RangeField.jsx
│   │   ├── CheckboxField.jsx
│   │   ├── BannerPreview.jsx
│   │   ├── FormTabs.jsx
│   │   ├── ContentTab.jsx
│   │   ├── StylingTab.jsx
│   │   ├── SettingsTab.jsx
│   │   ├── FormActions.jsx
│   │   └── index.js (exports)
│   ├── BannerForm.jsx (main form)
│   ├── BannerData.jsx (table)
│   └── BannerStats.jsx (stats)
├── hooks/
│   ├── useBannerForm.js
│   └── index.js (exports)
├── utils/
│   ├── bannerConstants.js
│   ├── bannerHelpers.js
│   └── index.js (exports)
├── BannerSlice.js
├── Banner.jsx
└── BannerCreateEdit.jsx
```

## Tips & Tricks

1. **Use default props** - Most components have sensible defaults
2. **Import from index files** - Much cleaner than specifying full paths
3. **Batch updates** - Use `updateFormFields()` for multiple field updates
4. **Reuse everywhere** - These components work in any feature
5. **Constants first** - Always use constants instead of hardcoding values
6. **Validate early** - Use validation hook to catch errors upfront
7. **Helper functions** - Use them to avoid code duplication

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Component not found | Check import path, verify file exists |
| State not updating | Use `handleInputChange`, not direct `setFormData` |
| Validation not working | Use `useBannerFormWithValidation` hook |
| Image not previewing | Pass `imagePreview` to component |
| TabsError | Ensure `activeTab` state exists |

---

This quick reference should help you uses the reusable components efficiently! 🚀
