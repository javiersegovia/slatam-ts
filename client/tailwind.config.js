module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        google: '#4285f4',
        apple: '#000',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
