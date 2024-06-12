/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#25ae9c', // Change primary color
        secondary: '#3e79f7', // Change secondary color
        success: '#004ECD', // Change success color
        error: '#ff6b72',
        warning: '#ffc542',
        normal: '#fafafb',
        // Add more custom colors if needed
      },
      backgroundImage: {
        'login-bg': "url('/images/img-22.png')", // Update the path to your image
      },
    },
  },
  plugins: [],
};
