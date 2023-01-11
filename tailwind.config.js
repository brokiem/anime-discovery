/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,js,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'grey': '#313131'
      }
    },
  },
  plugins: [],
}
