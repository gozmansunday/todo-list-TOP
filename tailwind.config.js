/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.{html,js}',
    './src/**/*.{html,js}',
  ],

  important: true,
  
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
        dark: "#222222",
        mid: "#DADADA",
        light: "#EEEEEE",
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        // 'card': '0 12px 12px -3px rgba(0, 0, 0, 0.3)',
        'card': '0px 5px 15px rgba(0, 0, 0, 0.35)',
      },
    },
    deliciousHamburgers: {
      size: '30px', // must be in px.
      color: '#586061',
      colorLight: '#fff8f4',
      padding: '0px', // must be in px.
      animationSpeed: 1,
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
