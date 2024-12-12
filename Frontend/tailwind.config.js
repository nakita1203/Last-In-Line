/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sapphire: '#375AAA',
        egyptianBlue: '#2E3A99',
        resolutionBlue: '#2C2480',
        persianIndigo: '#3A1769',
        claret: '#760532',
        burgundy: '#94002F',
        cardinal: '#C31D3E',
        antiFlashWhite: '#E9E8EC',
        lavenderWeb: '#DDDEE8',
        periwinkle: '#CCCCEE',
        thistle: '#D0C2E2',
        mimiPink: '#EAD5DD',
        lavenderBlush: '#F1DFE4',
        snow: '#FDF4F6'
      },
    },
  },
  plugins: [],
}