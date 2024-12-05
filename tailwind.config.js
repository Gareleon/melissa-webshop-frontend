/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC300",
        secondary: "#10b981", //"#2D6A4F",
        bglight: "##F4F4F2",
        favorites: "#FF5841",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
      },
      backgroundImage: {
        "banner-bg": "url('./assets/photos/pexels-kelly-1179532-2453551.jpg')",
        "gradient-primary-secondary":
          "linear-gradient(90deg, rgba(255, 195, 0, 0.8), rgba(16, 185, 129, 0.8))", // replace with your actual colors
        "footer-bg": "url('./assets/photos/pexels-kelly-1179532-2453551.jpg')",
      },
    },
  },
  plugins: [],
};
