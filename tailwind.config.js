/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: 'var(--primary-red)',
          'red-hover': 'var(--primary-red-hover)',
        },
        accent: {
          gold: 'var(--accent-gold)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          light: 'var(--text-light)',
        },
        bg: {
          light: 'var(--bg-light)',
          white: 'var(--bg-white)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
        },
      },
    },
  },
  plugins: [],
}
