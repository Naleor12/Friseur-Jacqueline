/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
      },
      colors: {
        branding: '#d3b5b7',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        fadeInDelayed: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '50%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 10s ease-in-out infinite',
        fadeIn: 'fadeIn 1.2s ease-out forwards',
        fadeInDelayed: 'fadeInDelayed 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
