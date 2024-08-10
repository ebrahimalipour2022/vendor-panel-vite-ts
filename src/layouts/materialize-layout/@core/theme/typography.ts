// MUI Imports
import type { Theme } from '@mui/material/styles';
import {
  pxToRem,
  responsiveFontSizes,
} from '@/layouts/materialize-layout/@core/utils/serverHelpers';

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
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '3rem',
      fontSize: pxToRem(48),
      ...responsiveFontSizes({ xs: 38, sm: 42, md: 46, lg: 48 }),
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '2.5rem',
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ xs: 28, sm: 32, md: 36, lg: 40 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '2rem',
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ xs: 20, sm: 24, md: 28, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '1.75rem',
      fontSize: pxToRem(28),
      ...responsiveFontSizes({ xs: 18, sm: 20, md: 24, lg: 28 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '1.5rem',
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ xs: 18, sm: 20, md: 22, lg: 24 }),
    },
    h6: {
      fontWeight: 700,
      lineHeight: 1.2,
      // fontSize: '1.25rem',
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ xs: 16, sm: 18, md: 18, lg: 20 }),
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
      // fontSize: '1rem',
      fontSize: pxToRem(16),
      ...responsiveFontSizes({ xs: 14, sm: 15, md: 16, lg: 16 }),
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.5,
      // fontSize: '1rem',
      fontSize: pxToRem(16),
      ...responsiveFontSizes({ xs: 14, sm: 15, md: 16, lg: 16 }),
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      textTransform: 'uppercase',
    },
  } as Theme['typography']);

export default typography;
