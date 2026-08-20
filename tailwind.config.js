/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          focus: '#0071e3',
          'on-dark': '#2997ff'
        },
        ink: {
          DEFAULT: '#1d1d1f',
          muted: '#cccccc',
          'muted-80': '#333333',
          'muted-48': '#7a7a7a'
        },
        surface: {
          canvas: '#ffffff',
          parchment: '#f5f5f7',
          pearl: '#fafafc',
          'tile-1': '#272729',
          'tile-2': '#2a2a2c',
          'tile-3': '#252527',
          black: '#000000',
          'chip-translucent': 'rgba(210, 210, 215, 0.64)'
        },
        divider: {
          soft: '#f0f0f0',
          hairline: '#e0e0e0'
        }
      },
      fontFamily: {
        display: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '17px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '80px',
      },
      borderRadius: {
        none: '0px',
        xs: '5px',
        sm: '8px',
        md: '11px',
        lg: '18px',
        pill: '9999px',
        full: '9999px',
      }
    },
  },
  plugins: [],
}
