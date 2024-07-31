import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS
// SURFACE
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const SURFACE = {
  surface0: '#FFFFFF',
  surface1: '#FAFAFE',
  surface2: '#F7F7FE',
  surface3: '#E1E1E7',
  surface4: '#68686B',
  surface5: '#141414',
};

const PRIMARY = {
  lighter: 'rgba(183, 212, 255, 1)',
  light: 'rgba(22, 115, 255, 1)',
  main: 'rgba(18, 92, 204, 1)',
  dark: 'rgba(17, 86, 191, 1)',
  darker: 'rgba(13, 69, 153, 1)',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: SURFACE.surface2,
  light: SURFACE.surface3,
  main: SURFACE.surface4,
  dark: SURFACE.surface5,
  darker: '#000000',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: 'rgba(182, 236, 224, 1)',
  light: 'rgba(97, 215, 189, 1)',
  main: 'rgba(19, 195, 156, 1)',
  dark: 'rgba(17, 177, 142, 1)',
  darker: 'rgba(13, 138, 111, 1)',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: 'rgba(254, 236, 194, 1)',
  light: 'rgba(255, 249, 235, 1)',
  main: 'rgba(252, 215, 123, 1)',
  dark: 'rgba(228, 177, 53, 1)',
  darker: 'rgba(178, 138, 41, 1)',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: 'rgba(251, 184, 199, 1)',
  light: 'rgba(246, 101, 134, 1)',
  main: 'rgba(242, 25, 74, 1)',
  dark: 'rgba(220, 23, 67, 1)',
  darker: 'rgba(172, 18, 53, 1)',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  // divider: alpha(GREY[500], 0.2),
  divider: SURFACE.surface3,
  action: {
    hover: SURFACE.surface3,
    selected: SURFACE.surface2,
    disabled: SURFACE.surface2,
    disabledBackground: SURFACE.surface2,
    focus: SURFACE.surface3,
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: {
      default: SURFACE.surface2,
      paper: '#FFFFFF',
      neutral: SURFACE.surface2,
    },
    action: {
      ...COMMON.action,
      active: SURFACE.surface3,
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  };

  return mode === 'light' ? light : dark;
}
