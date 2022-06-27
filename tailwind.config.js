module.exports = {
  purge: ['./index.html', './src/**/*.{html,vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    colors: {
      'main-text-color': '#f24139',
      'secondary-text-color': '#f24139',
      'secondary-background-color': '#fff7ea'
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
  },
  plugins: []
};
