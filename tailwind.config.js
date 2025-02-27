// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Dark mode enabled via 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      // Enhanced color palette with better dark mode support
      colors: {
        // Primary / Brand color: Magic Blue
        brand: {
          DEFAULT: '#5E6AD2', // Magic Blue
          50: '#F6F7FC',
          100: '#E9EAFA',
          200: '#C7C9EB',
          300: '#A4A8E1',
          400: '#8287D7',
          500: '#5E6AD2', // same as DEFAULT
          600: '#4B54AC',
          700: '#3A4186',
          800: '#292E60',
          900: '#181B3A',
        },

        // Background colors: Mercury White (light) & Enhanced Dark for dark mode
        background: {
          DEFAULT: '#F4F5F8', // Mercury White
          light: '#F4F5F8',   // For clarity, same as DEFAULT
          dark: '#000000',    // Deeper dark for true black theme
        },

        // Text colors: high contrast text
        text: {
          DEFAULT: '#222326', // Dark text on light backgrounds
          light: '#222326',   // same as default
          dark: '#F4F5F8',    // Light text on dark backgrounds
        },

        // Enhanced dark mode tokens
        dark: {
          bg: {
            primary: '#000000',     // True black
            secondary: '#080808',   // Slightly lighter black
            tertiary: '#101010',    // Even lighter for hierarchy
          },
          text: {
            primary: '#F4F5F8',     // White text
            secondary: '#E2E3E5',   // Very light gray
            tertiary: '#ADB0B3',    // Light gray
          },
          border: {
            primary: '#2A2A2E',     // Dark gray
            secondary: '#323236',   // Medium gray
          },
          accent: {
            primary: '#5E6AD2',     // Brand color
            glow: 'rgba(94, 106, 210, 0.15)' // Glow effect color
          }
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-in',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseSlow: {
          '0%, 100%': { 
            opacity: 0.4,
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: 0.8,
            transform: 'scale(1.05)'
          },
        },
        glow: {
          '0%, 100%': { 
            filter: 'brightness(1) saturate(1)'
          },
          '50%': { 
            filter: 'brightness(1.2) saturate(1.2)'
          },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'transform': 'transform',
        'opacity': 'opacity',
        'colors': 'background-color, border-color, color, fill, stroke',
        'filter': 'filter, backdrop-filter'
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-border': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-spotlight': 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), var(--tw-gradient-stops))',
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'light-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'brand': '0 0 15px rgba(94, 106, 210, 0.5)',
        'brand-sm': '0 0 10px rgba(94, 106, 210, 0.3)',
        'inner-glow': 'inset 0 0 20px 5px rgba(94, 106, 210, 0.15)',
      },
      scale: {
        '98': '.98',
        '102': '1.02',
      },
      backdropBlur: {
        'xs': '2px',
      },
      // Add custom blur classes
      blur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover'],
      textColor: ['dark', 'dark-hover'],
      borderColor: ['dark', 'dark-hover'],
      opacity: ['dark'],
      scale: ['hover', 'active'],
      boxShadow: ['dark', 'dark-hover'],
      ringWidth: ['dark', 'dark-hover'],
      ringColor: ['dark', 'dark-hover'],
    },
  },
  plugins: [],
};
