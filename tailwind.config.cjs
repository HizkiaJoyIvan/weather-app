module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }