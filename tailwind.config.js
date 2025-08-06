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
        'primary-red': '#b91c1c',
        'primary-red-hover': '#991b1b',
        'primary-red-light': '#f7dada',
        'text-dark': '#1f2937',
        'text-medium': '#444',
        'text-light': '#6b7280',
        'background-light': '#f7f7f7',
        'gold': '#fbbf24',
      },
    },
  },
  plugins: [],
}
