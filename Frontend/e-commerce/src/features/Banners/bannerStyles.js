// Pre-configured styles for each template - lightweight & DRY
// All CSS classes are Tailwind classes (already loaded)

export const TEMPLATE_STYLES = {
  none: {
    overlay: "bg-transparent",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-xl sm:text-4xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    containerClass: "flex flex-col justify-center items-center text-center px-4",
  },
  "light-overlay": {
    overlay: "bg-white/50",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-xl sm:text-4xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    containerClass: "flex flex-col justify-center items-center text-center px-4",
  },
  "dark-overlay": {
    overlay: "bg-black/60",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-xl sm:text-4xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    containerClass: "flex flex-col justify-center items-center text-center px-4",
  },
  "left-dark": {
    overlay: "bg-black/50",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-xl sm:text-4xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    position: "left-6 sm:left-10 top-1/2 -translate-y-1/2 max-w-lg",
  },
  "center-light": {
    overlay: "bg-white/40",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-xl sm:text-4xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    containerClass: "flex flex-col justify-center items-center text-center px-4",
  },
  "overlay-gradient": {
    overlay: "bg-gradient-to-r from-black/70 to-transparent",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-2xl sm:text-5xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    position: "left-6 sm:left-10 top-1/2 -translate-y-1/2 max-w-lg",
  },
  "gradient-right": {
    overlay: "bg-gradient-to-l from-black/70 to-transparent",
    titleClass: "text-2xl sm:text-5xl font-extrabold",
    headingClass: "text-2xl sm:text-5xl font-bold",
    subHeadingClass: "text-xs sm:text-lg",
    position: "right-6 sm:right-10 top-1/2 -translate-y-1/2 max-w-lg text-right",
  },
  "card-overlay": {
    overlay: "bg-black/40",
    titleClass: "text-2xl sm:text-4xl font-extrabold",
    headingClass: "text-lg sm:text-3xl font-bold",
    subHeadingClass: "text-xs sm:text-base opacity-90",
    cardStyle: "bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 sm:p-8",
    position: "left-6 sm:left-10 top-1/2 -translate-y-1/2 max-w-sm",
  },
  minimal: {
    overlay: "bg-black/30",
    titleClass: "text-2xl sm:text-4xl font-extrabold",
    headingClass: "text-xl sm:text-2xl font-semibold",
    subHeadingClass: "text-xs sm:text-base",
    containerClass: "flex flex-col justify-center items-center text-center px-4",
  },
};

// Color options for customization
export const COLOR_PRESETS = {
  textColor: [
    { value: "white", label: "White", class: "text-white" },
    { value: "dark", label: "Dark", class: "text-gray-900" },
    { value: "gray", label: "Gray", class: "text-gray-300" },
  ],
  ctaButtonColor: [
    { value: "blue", label: "Blue", class: "bg-blue-600 hover:bg-blue-700" },
    { value: "red", label: "Red", class: "bg-red-600 hover:bg-red-700" },
    { value: "green", label: "Green", class: "bg-green-600 hover:bg-green-700" },
    { value: "purple", label: "Purple", class: "bg-purple-600 hover:bg-purple-700" },
    { value: "black", label: "Black", class: "bg-black hover:bg-gray-900" },
  ],
};

// Get styles for a template
export function getTemplateStyles(templateName) {
  return TEMPLATE_STYLES[templateName] || TEMPLATE_STYLES["left-dark"];
}

// Get color class
export function getColorClass(colorType, colorValue) {
  const preset = COLOR_PRESETS[colorType]?.find(c => c.value === colorValue);
  return preset?.class || COLOR_PRESETS[colorType][0].class;
}
