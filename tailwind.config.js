/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-01': '#004a46',
        'off-white-01': '#f8f8f8',
        'gray-01': '#808289',
        'gray-02': '#a2a6b6',
        'gray-03': '#bec0c7',
        'gray-04': '#e4e6ed',
        'border-gray-01': '#e2e2e2',
      },
      spacing: {
        'safe-area': '8rem',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      l: '1.5rem',
      xl: '2.25rem',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
