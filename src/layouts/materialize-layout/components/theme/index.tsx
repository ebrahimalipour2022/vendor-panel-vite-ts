// React Imports
import { useMemo } from 'react';

// MUI Imports
import { deepmerge } from '@mui/utils';
import {
  darken,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  lighten,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Third-party Imports
import { useMedia } from 'react-use';

// Type Imports
// import type { ChildrenType, Direction, SystemMode } from '@core/types'
// Component Imports
// Config Imports
// import themeConfig from '@configs/themeConfig'
// Hook Imports
// import { useSettings } from '@core/hooks/useSettings'
// Core Theme Imports
import defaultCoreTheme from '@/layouts/materialize-layout/@core/theme';
import type { ChildrenType, Direction, SystemMode } from '@/layouts/materialize-layout/@core/types';
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';
import RTL from '@/layouts/materialize-layout/components/theme/right-to-left';
import { StyledEngineProvider } from '@mui/material';
import ModeChanger from './ModeChanger';

type Props = ChildrenType & {
  direction: Direction;
  systemMode: SystemMode;
};

const ThemeProvider = (props: Props) => {
  // Props
  const { children, direction, systemMode } = props;

  // Hooks
  const { settings } = useSettings();
  const isDark = useMedia('(prefers-color-scheme: dark)', false);

  // Vars
  const isServer = typeof window === 'undefined';
  let currentMode: SystemMode;

  if (isServer) {
    currentMode = systemMode;
  } else if (settings.mode === 'system') {
    currentMode = isDark ? 'dark' : 'light';
  } else {
    currentMode = settings.mode as SystemMode;
  }

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1),
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1),
            },
          },
        },
      },
    };

    const coreTheme = deepmerge(defaultCoreTheme(settings, currentMode, direction), newColorScheme);

    return extendTheme(coreTheme);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.primaryColor, settings.skin, currentMode]);

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={systemMode}
      modeStorageKey={`${themeConfig.templateName
        .toLowerCase()
        .split(' ')
        .join('-')}-mui-template-mode`}
    >
      <StyledEngineProvider injectFirst>
        <>
          <ModeChanger />
          <CssBaseline />
          <RTL themeDirection={theme.direction}>{children}</RTL>
        </>
      </StyledEngineProvider>
    </CssVarsProvider>
  );
};

export default ThemeProvider;
