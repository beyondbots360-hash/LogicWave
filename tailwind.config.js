/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50:  'var(--brand-blue-50)',
            100: 'var(--brand-blue-100)',
            200: 'var(--brand-blue-200)',
            300: 'var(--brand-blue-300)',
            400: 'var(--brand-blue-400)',
            500: 'var(--brand-blue-500)',
            600: 'var(--brand-blue-600)',
            700: 'var(--brand-blue-700)',
            800: 'var(--brand-blue-800)',
            900: 'var(--brand-blue-900)',
          },
          yellow: {
            50:  'var(--brand-yellow-50)',
            100: 'var(--brand-yellow-100)',
            200: 'var(--brand-yellow-200)',
            300: 'var(--brand-yellow-300)',
            400: 'var(--brand-yellow-400)',
            500: 'var(--brand-yellow-500)',
            600: 'var(--brand-yellow-600)',
            700: 'var(--brand-yellow-700)',
            800: 'var(--brand-yellow-800)',
            900: 'var(--brand-yellow-900)',
          },
          bg: 'var(--brand-bg)',
          text: 'var(--brand-text)',
          muted: 'var(--brand-muted)',
          border: 'var(--brand-border)',
          surface: 'var(--brand-surface)',
          slate: {
            50:  '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #191A66 0%, #050514 100%)',
        'soft-gradient': 'linear-gradient(180deg, #ececfa 0%, #ffffff 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
