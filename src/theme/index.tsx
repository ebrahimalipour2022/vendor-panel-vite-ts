import merge from 'lodash/merge';
import { useMemo } from 'react';
// @mui
import { createTheme, ThemeOptions } from '@mui/material/styles';
// components
import { useSettingsContext } from 'src/components/settings';
// system
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  StyledEngineProvider,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import spacing from '@/theme/spacing';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
// options
import { presets } from './options/presets';
import { darkMode } from './options/dark-mode';
import { contrast } from './options/contrast';
import RTL, { direction } from './options/right-to-left';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const settings = useSettingsContext();

  const darkModeOption = darkMode(settings.themeMode);

  const presetsOption = presets(settings.themeColorPresets);

  const contrastOption = contrast(settings.themeContrast === 'bold', settings.themeMode);

  const directionOption = direction(settings.themeDirection);

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      // shape: { borderRadius: 8 },
      ...spacing,
      shape: {
        borderRadius: 8,
        customBorderRadius: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
          xl: 10,
        },
      },
    }),

    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Direction: remove if not in use
        directionOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
        // Contrast: remove if not in use
        contrastOption.theme
      ),
    [baseOption, directionOption, darkModeOption, presetsOption, contrastOption.theme]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrastOption.components);

  const _theme = extendTheme(theme);
  return (
    <StyledEngineProvider injectFirst>
      <RTL themeDirection={settings.themeDirection}>
        <CssVarsProvider
          theme={_theme}
          defaultMode="light"
          // modeStorageKey={`${themeConfig.templateName
          //   .toLowerCase()
          //   .split(' ')
          //   .join('-')}-mui-template-mode`}
        >
          <>
            <CssBaseline />
            {children}
          </>
        </CssVarsProvider>
      </RTL>
    </StyledEngineProvider>
  );
}
