/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.{html,js}', './src/**/*.{html,js}'],

  // important: true,

  theme: {
    screens: {
      xs: '356px',
      sm: '400px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1800px',
    },
    extend: {
      colors: {
        brand: '#15D155',
        dark: '#222222',
        mid: '#DADADA',
        light: '#EEEEEE',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'show-side-bar': 'slide-out 200ms ease-out 0s 1 normal none',
        'hide-side-bar': 'slide-in 200ms ease-out 0s 1 normal none',
      },
      keyframes: {
        'slide-out': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        card: '0px 5px 15px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
