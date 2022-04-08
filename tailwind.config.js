const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#6200EE',
      'primary-variant': '#3700B3',
      secondary: '#03DAC6',
      'secondary-variant': '#018786',
      background: colors.white,
      surface: colors.white,
      error: '#B20020',
      'on-primary': colors.white,
      'on-secondary': colors.black,
      'on-background': colors.black,
      'on-surface': colors.black,
      'on-error': colors.white,
    },
  },
  plugins: [],
};
