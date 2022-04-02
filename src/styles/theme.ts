const theme = {
  colors: {
    bg: '#FFF',
    'bg-alpha-1': '#ffffffc9',
    text: '#333',
    primary: '#92162d',
    'primary-light': '#be1d3b',
    'primary-dark': '#660f1f',
    foreground: '#9f9d9d',
    'foreground-light': '#e1dddd',
  },
  radii: {
    sm: '3px',
    md: '6px',
    lg: '9px',
  },
  shadows: {
    sm: '0 0 2px $colors$foreground',
    md: '0 0 8px $colors$foreground',
  },
  transitions: {
    fast: 'all 0.1s',
    smooth: 'all 0.2s',
  },
  zIndices: {
    toolbar: 2000,
    toolbar2: 2001,
    videoSelector: 1000,
    video: 800,
    dialog: 2500,
    termsConfirmationPopup: 2500,
  },
  fontSizes: {
    xs: '0.8rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
  sizes: {},
};

export default theme;
