// Next Imports
// import localFont from 'next/font/local'

// MUI Imports
import type { Theme } from '@mui/material/styles';

// Type Imports

import type { Settings } from '@/layouts/materialize-layout/@core/contexts/settingsContext';
import type { Skin, SystemMode } from '@/layouts/materialize-layout/@core/types';

// Theme Options Imports
import overrides from './overrides';
import colorSchemes from './colorSchemes';
import spacing from './spacing';
import shadows from './shadows';
import customShadows from './customShadows';
import typography from './typography';

// const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] })

const theme = (settings: Settings, mode: SystemMode, direction: Theme['direction']): Theme => {
  return {
    direction,
    components: overrides(settings.skin as Skin),
    colorSchemes: colorSchemes(settings.skin as Skin),
    ...spacing,
    shape: {
      borderRadius: 10,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
      },
    },
    shadows: shadows(mode),
    typography: typography(''),
    customShadows: customShadows(mode),
    mainColorChannels: {
      // light: '38 43 67',
      // dark: '234 234 255',
      // light: '104 104 107',
      // dark: '20 20 20',
      dark: '104 104 107',
      light: '20 20 20',
      lightShadow: '38 43 67',
      darkShadow: '16 17 33',
      surface0: '#FFFFFF',
      surface1: '#FAFAFE',
      surface2: '#F7F7FE',
      surface3: '#E1E1E7',
      surface4: '#68686B',
      surface5: '#141414',
    },
  } as unknown as Theme;
};

export default theme;
