/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.{html,js}',
    './src/**/*.{html,js}',
  ],
  
  theme: {
    screens: {
      sm: '412px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1800px',
    },
    extend: {
      colors: {
        brand: "#15D155",
        dark: "#000000",
        mid: "#E4E4E7",
        light: "#F8FAFC"
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
      },
    },
  },
  plugins: [],
}
