/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
      colors: {
        branding: {
          DEFAULT: "#d5b6b8",
          50: "#f7f2f3",
          100: "#efe7e9",
          200: "#e3d4d6",
          300: "#d8c2c5",
          400: "#ceb1b5",
          500: "#d5b6b8",
          600: "#c09ea0",
          700: "#a78489",
          800: "#8c6c71",
          900: "#72585c",
        },
        "branding-light": "#e0c8ca", // Für Gülnar
        "branding-dark": "#b99fa1",  // Für Evelina
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        fadeInDelayed: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "50%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 10s ease-in-out infinite",
        fadeIn: "fadeIn 1.2s ease-out forwards",
        fadeInDelayed: "fadeInDelayed 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};