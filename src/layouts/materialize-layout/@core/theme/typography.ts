// MUI Imports
import type { Theme } from '@mui/material/styles';

const typography = (fontFamily: string): Theme['typography'] =>
  ({
    fontFamily:
      typeof fontFamily === 'undefined' || fontFamily === ''
        ? [
            'Inter',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(',')
        : fontFamily,
    fontSize: 16, // Base font size
    fontWeightLight: 300, // Light font weight
    fontWeightRegular: 400, // Regular font weight
    fontWeightMedium: 450, // Medium font weight
    fontWeightBold: 600, // Bold font weight
    h1: {
      // fontSize: '3rem',
      fontSize: 'clamp(2rem, 5vw + 1rem, 3rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      // fontSize: '2.5rem',
      fontSize: 'clamp(1.75rem, 4vw + 0.75rem, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      // fontSize: '2rem',
      fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      // fontSize: '1.75rem',
      fontSize: 'clamp(1.25rem, 2.5vw + 0.25rem, 1.75rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      // fontSize: '1.5rem',
      fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      // fontSize: '1.25rem',
      fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    subtitle1: {
      // fontSize: '1rem',
      fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1rem)',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      // fontSize: '0.875rem',
      fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 0.875rem)',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      // fontSize: '1rem',
      fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1rem)',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      // fontSize: '0.875rem',
      fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 0.875rem)',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      // fontSize: '0.875rem',
      fontSize: 'clamp(0.75rem, 1.5vw + 0.25rem, 0.875rem)',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    caption: {
      // fontSize: '0.75rem',
      // fontSize: 'clamp(0.625rem, 0.75vw + 0.25rem, 0.75rem)',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      // fontSize: '0.75rem',
      // fontSize: 'clamp(0.625rem, 0.75vw + 0.25rem, 0.75rem)',
      fontWeight: 400,
      lineHeight: 1.66,
      textTransform: 'uppercase',
    },
  } as Theme['typography']);

export default typography;
