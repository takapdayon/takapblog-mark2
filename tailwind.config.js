module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: [
        'Noto Sans JP',
        'sans-serif',
      ]
    },
    container: {
      center: true,
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#CBD5E0'
    }),
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  important: true,
}
