// Next Imports
import Cookies from 'js-cookie';
// Type Imports
import type { Settings } from '@/layouts/materialize-layout/@core/contexts/settingsContext';
import type { DemoName, SystemMode } from '@/layouts/materialize-layout/@core/types';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';
import demoConfigs from '@/layouts/materialize-layout/configs/demoConfigs';

export const getDemoName = (): DemoName => {
  // const headersList = headers()
  //
  // return headersList.get('X-server-header') as DemoName | null
  return 'demo-1';
};

export const getSettingsFromCookie = (): Settings => {
  // const cookieStore = cookies()

  const demoName = getDemoName();

  const cookieName = demoName
    ? themeConfig.settingsCookieName.replace('demo-1', demoName)
    : themeConfig.settingsCookieName;

  return JSON.parse(Cookies.get(cookieName) || '{}');
};

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie();

  const demoName = getDemoName();

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || (demoName && demoConfigs[demoName].mode) || themeConfig.mode;

  return _mode;
};

export const getSystemMode = (): SystemMode => {
  // const cookieStore = cookies()
  const mode = getMode();

  const colorPrefCookie = (Cookies.get('colorPref') || 'light') as SystemMode;

  return (mode === 'system' ? colorPrefCookie : mode) || 'light';
};

export const getServerMode = () => {
  const mode = getMode();
  const systemMode = getSystemMode();

  return mode === 'system' ? systemMode : mode;
};

export const getSkin = () => {
  const settingsCookie = getSettingsFromCookie();

  return settingsCookie.skin || 'default';
};

//============= font utils =================
export const mediaQueries = {
  upXs: '@media (min-width:0px)',
  upSm: '@media (min-width:600px)',
  upMd: '@media (min-width:900px)',
  upLg: '@media (min-width:1200px)',
  upXl: '@media (min-width:1536px)',
  up2Xl: '@media (min-width:1920px)',
};

/**
 * Converts px to rem
 */
export function pxToRem(value: number) {
  return `${value / 16}rem`;
}
/**
 * Responsive font sizes
 */
// @ts-ignore
export function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    [mediaQueries.upXs]: { fontSize: pxToRem(xs) },
    [mediaQueries.upSm]: { fontSize: pxToRem(sm) },
    [mediaQueries.upMd]: { fontSize: pxToRem(md) },
    [mediaQueries.upLg]: { fontSize: pxToRem(lg) },
  };
}
