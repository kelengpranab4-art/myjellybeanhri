/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twilight: {
          950: '#070814',
          900: '#0b0e24',
          850: '#101435',
          800: '#161a45',
          700: '#232966',
        },
        velvet: {
          950: '#12081d',
          900: '#1d0e30',
          800: '#2b1646',
          700: '#43236e',
        },
        dustypink: {
          50: '#fdf4f6',
          100: '#fbe8ec',
          200: '#f8d4dc',
          300: '#f2b1c0',
          400: '#e7859d',
          500: '#d95d7e',
          600: '#c54165',
        },
        lavender: {
          50: '#f6f4fe',
          100: '#eeeafe',
          200: '#dfd8fd',
          300: '#c6b7fc',
          400: '#a78bf9',
          500: '#8b63f4',
          600: '#7543ea',
        },
        peach: {
          50: '#fff7f2',
          100: '#feeddf',
          200: '#fdd9c0',
          300: '#fcbd97',
          400: '#f99767',
          500: '#f36e37',
        },
        parchment: {
          50: '#fcfaf5',
          100: '#f8f4e9',
          200: '#f1e8d4',
          300: '#e7d8bb',
          400: '#dac39f',
          800: '#5c4d36',
          900: '#3d3324',
        },
        starlight: '#fff3d1',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(244, 114, 182, 0.45)',
        'glow-lavender': '0 0 25px -5px rgba(167, 139, 249, 0.45)',
        'glow-gold': '0 0 25px -5px rgba(253, 224, 71, 0.45)',
        'glow-rose': '0 0 35px -5px rgba(225, 29, 72, 0.5)',
        'vintage': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 2px 8px -2px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'sway-soft': 'sway 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
