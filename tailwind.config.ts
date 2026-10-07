import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#1F1F1F',
          cream: '#FDF8E8',
          yellow: '#FFD84D',
          salmon: '#FF8579',
          lavender: '#B8A4E8',
          softblue: '#9BC5E8',
          mint: '#A8E6A3',
          pink: '#FFC4D6',
          sand: '#F0E6D2'
        }
      },
      fontFamily: {
        body: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        brutal: '5px 5px 0 0 #1F1F1F',
        'brutal-sm': '3px 3px 0 0 #1F1F1F'
      }
    }
  },
  plugins: []
};

export default config;
