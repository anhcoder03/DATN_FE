/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#48a800",
        primary50: "#48a8001a",
        gray4B: "#4b4b5a",
        grayF3: "#f3f4f7",
        gray16: "#16181b",
        gray81: "#8181a5",
      },
    },
  },
  plugins: [],
};
