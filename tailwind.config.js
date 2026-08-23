/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: '#F9CDAD',
          50: '#FFFFFF',
          100: '#FFF8F3',
          200: '#FDECE0',
          300: '#FBDECB',
          400: '#FAD4BD',
          500: '#F9CDAD',
          600: '#E8B690',
          700: '#D09A72',
        },
        coral: {
          DEFAULT: '#FF9E9D',
          50: '#FFF6F6',
          100: '#FFF0EE',
          200: '#FFE2E0',
          300: '#FFC8C7',
          400: '#FFB3B2',
          500: '#FF9E9D',
          600: '#E87C7B',
          700: '#CC5C5B',
        },
        plum: {
          DEFAULT: '#452632',
          50: '#F7EFF3',
          100: '#EEDEE6',
          200: '#DCBDCD',
          300: '#C296AC',
          400: '#9E6A85',
          500: '#75475E',
          600: '#5C3347',
          700: '#452632',
          800: '#341A24',
          900: '#220E16',
        },
        berry: {
          DEFAULT: '#91204D',
          50: '#FDF2F6',
          100: '#FBE6ED',
          200: '#F6C2D4',
          300: '#EE94B3',
          400: '#E05C89',
          500: '#BF3369',
          600: '#91204D',
          700: '#73163A',
          800: '#570D29',
        },
        mauve: {
          DEFAULT: '#A46583',
          50: '#FAF5F7',
          100: '#F3E8EE',
          200: '#E4CDD9',
          300: '#D1ABC0',
          400: '#BC87A3',
          500: '#A46583',
          600: '#8A4E6C',
          700: '#703A55',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 8px 24px -4px rgba(69, 38, 50, 0.12), 0 3px 8px -2px rgba(69, 38, 50, 0.06)',
        'cute-lg': '0 16px 36px -6px rgba(69, 38, 50, 0.18), 0 6px 16px -3px rgba(69, 38, 50, 0.08)',
        'cute-tab': '0 -4px 12px -2px rgba(69, 38, 50, 0.06)',
        'glow-coral': '0 0 25px -4px rgba(255, 158, 157, 0.5)',
        'glow-berry': '0 0 25px -4px rgba(145, 32, 77, 0.4)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'bounce-soft': 'bounceSoft 2.4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
