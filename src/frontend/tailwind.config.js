/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts,css}"
     ],
  theme: {
    extend: {
      colors: {
        vermelhoInstitucional: '#B20000',
        vermelhoEscuro: '#7E0000',
        vermelhoClaro: '#B13535',
        preto: '#333333',
        branco: '#F6F4F4',
        cinza: '#E2E2E2',
        cinzaEscuro: '#B9B9B9',
        verde: '#0E6053',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        leagueSpartan: ['League Spartan', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

