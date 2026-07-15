/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F172A', light: '#1E3A8A', dark: '#0B1120' },
        gold: { DEFAULT: '#C9A227', hover: '#B8860B', light: '#D4AF37' },
        cream: '#F8FAFC',
        surface: '#FFFFFF',
        text: { primary: '#1E293B', secondary: '#64748B' },
        border: '#E2E8F0',
        success: '#10B981',
        error: '#DC2626',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 3s infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.7s ease-out',
        'slideUp': 'slideUp 0.7s ease-out',
        'slideDown': 'slideDown 0.4s ease-out',
        'ripple': 'ripple 0.6s linear',
        'spin-slow': 'spin 12s linear infinite',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'scaleIn': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-24px)' } },
        fadeIn: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        ripple: { to: { transform: 'scale(4)', opacity: '0' } },
        goldPulse: { '0%, 100%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.2)' }, '50%': { boxShadow: '0 0 40px rgba(201, 162, 39, 0.4)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
