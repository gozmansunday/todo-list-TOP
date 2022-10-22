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
        'colorName': '#color',
      },
      fontFamily: {
        fontName: ['Font Official Name', 'font-type'],
      },
      boxShadow: {
        'shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
      },
    },
  },
  plugins: [],
}
