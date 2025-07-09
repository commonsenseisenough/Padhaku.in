// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // update as per your file structure
  ],
  theme: {
    extend: {
      colors: {
        richblack: {
          5: "#f1f2f6",
          25: "#e2e4e9",
          50: "#c3c6cf",
          100: "#a3a7b3",
          200: "#888c9d",
          400: "#2c333f",
          500: "#161d29",
          600: "#0e121a",
          700: "#000814",
          800: "#000509",
        },
        yellow: {
          25: "#fffbea",
          50: "#fff3c4",
          100: "#fce588",
          200: "#fadb5f",
          300: "#f7c948",
          400: "#f0b429",
          500: "#de911d",
          600: "#cb6e17",
          700: "#b44d12",
          800: "#8d2b0b",
          900: "#5c1d0f",
        },
        // Add any other custom colors you use here
      },
    },
  },
  plugins: [],
}
