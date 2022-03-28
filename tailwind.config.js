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
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  important: true,
}
