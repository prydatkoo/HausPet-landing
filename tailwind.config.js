module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a202c',
        'light-gray': '#f8f9fa',
        'light-blue': '#edf2f7',
        primary: {
          from: '#4a90e2',
          to: '#50e3c2',
        },
        accent: {
          red: '#ff5a5f',
        },
      },
      borderRadius: {
        card: '1.5rem',
        button: '0.75rem',
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
  },
  plugins: [],
};
