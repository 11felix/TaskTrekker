/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "theme-gray": '#f1f5f9',
        "theme-primary": "#6366f1",
        "theme-primary-dark": "#5661b3",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

