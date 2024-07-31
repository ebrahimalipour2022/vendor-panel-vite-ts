/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */

// MUI Imports
import { deepmerge } from '@mui/utils';
import type { Theme } from '@mui/material/styles';

// Core Theme Imports
import coreTheme from '@/layouts/materialize-layout/@core/theme';
import { Settings } from '@/layouts/materialize-layout/@core/contexts/settingsContext';
import { SystemMode } from '@/layouts/materialize-layout/@core/types';

const mergedTheme = (settings: Settings, mode: SystemMode, direction: Theme['direction']) => {
  // Vars
  const userTheme = {
    // Write your overrides here.
  } as Theme;

  return deepmerge(coreTheme(settings, mode, direction), userTheme);
};

export default mergedTheme;
