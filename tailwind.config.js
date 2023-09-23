/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#48a800",
        primary50: "#48a8001a",
      },
    },
  },
  plugins: [],
};
