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
