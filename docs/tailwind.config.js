module.exports = {
  theme: {
    screens: {
      'sm': '419px',
      // => @media (min-width: 419px) { ... }

      'md': '719px',
      // => @media (min-width: 719px) { ... }

      'lg': '959px',
      // => @media (min-width: 9594px) { ... }

    },
    borderColor: {
      'primary': 'var(--border-color)',
      'accent': 'var(--accent-color)',
    },
    extend: {},
    colors: {
      background: {
        primary: 'var(--bg-color)',
        content: 'var(--bg-content-color)',
        code: 'var(--bg-code)',
        accent: 'var(--accent-color)',
      },
      primary: 'var(--body-color)',
      accent: 'var(--accent-color)',
      accenthover: 'var(--accent-hover)',
      title: 'var(--title-color)',
      bg: 'var(--bg-color)',
      red: {
        '100': '#FFF5F5',
        '400': '#FC8181',
        '700': '#C53030'
      },
      gray: {
        'dark': '#121212'
      }
    },
    fontFamily: {
      sans: [
        'Roboto',
        'Nunito Sans',        
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  variants: {},
  plugins: []
}
