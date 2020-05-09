module.exports = {
  theme: {
    fontFamily: {
      sans: ['Muli', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
};
