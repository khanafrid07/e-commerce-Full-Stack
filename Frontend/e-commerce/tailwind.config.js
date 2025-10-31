/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#f97316",
        background: "#f9fafb",
        card: "#ffffff",
        text: "#1f2937",
        "text-secondary": "#6b7280",
        border: "#e5e7eb",
        info: "#3b82f6",
        success: "#10b981",
        warning: "#fbbf24",
        error: "#ef4444",
        muted: "#f3f4f6",
        "primary-hover": "#1d4ed8"

      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2563eb",
          "secondary": "#f97316",
          "accent": "#3b82f6",
          "neutral": "#1f2937",
          "base-100": "#ffffff", // 👈 set your background color here
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
      },
    ],
  },
};
