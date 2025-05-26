/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          soft: '#F4F4F4',
          beige: '#F3EDE3',
        },
        text: {
          charcoal: '#333333',
        },
        border: {
          light: '#D9D9D9',
        },
        accent: {
          gold: '#F6BE00',
          blue: '#007AFF',
          red: '#E03E36',
          green: '#00C48C',
        },
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-l': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-m': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        '2xs': '4px',
        'xs': '8px',
        's': '12px',
        'm': '16px',
        'l': '24px',
        'xl': '32px',
      },
    },
  },
  plugins: [],
};