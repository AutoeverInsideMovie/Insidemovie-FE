/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'navy-radial': 'radial-gradient(circle at top center, #0b0f3a, #050a1a)',
      },
    },
  },
  plugins: [],
}

