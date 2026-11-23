/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        cream: "#FAF7F4",
        sand: "#F2ECE6",
        linen: "#E5DCD4",
        espresso: "#1C1917",
        bark: "#292421",
        ink: "#4E4640",
        taupe: "#857970",
        branding: {
          DEFAULT: "#D5B6B8",
          50: "#FAF5F5",
          100: "#F3E8E9",
          200: "#E7D3D5",
          300: "#D5B6B8",
          400: "#C29B9E",
          500: "#A87D81",
          600: "#8C6166",
          700: "#724C51",
          800: "#593A3E",
          900: "#422B2E",
        },
      },
      letterSpacing: {
        editorial: "0.18em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
