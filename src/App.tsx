// scroll bar
// import 'simplebar-react/dist/simplebar.min.css';

// lazy image
// import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
// routes
import Router from 'src/routes/sections';
// theme
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
// import ProgressBar from 'src/components/progress-bar';
// import MotionLazy from 'src/components/animate/motion-lazy';
// auth
import { AuthConsumer, AuthProvider } from '@/auth/context/jwt';
import ReduxProvider from '@/redux/redux-provider';
import { LocalizationProvider } from '@/locales/localization-provider';
import { I18nProvider } from '@/locales/i18n';
import { VerticalNavProvider } from '@/layouts/materialize-layout/@menu/contexts/verticalNavContext';
import { SettingsProvider } from '@/layouts/materialize-layout/@core/contexts/settingsContext';
import ThemeProvider from '@/layouts/materialize-layout/components/theme';
import AppReactToastify from '@/layouts/materialize-layout/libs/styles/AppReactToastify';
import {
  getDemoName,
  getMode,
  getSettingsFromCookie,
  getSystemMode,
} from '@/layouts/materialize-layout/@core/utils/serverHelpers';
// ----------------------------------------------------------------------

export default function App() {
  console.log(`                      
                       ░░  
       ▓          ▓     ▓  
       ▓▓▓▓▓▓▓▓▓▓▓▓     ▓      
          ██ ██      ▓▓▓▓ 
            ██   
  `);

  const direction = 'rtl';
  const mode = getMode();
  const settingsCookie = getSettingsFromCookie();
  const demoName = getDemoName();
  const systemMode = getSystemMode();

  useScrollToTop();

  return (
    <I18nProvider>
      <LocalizationProvider>
        <AuthProvider>
          <VerticalNavProvider>
            <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
              <ThemeProvider direction={direction} systemMode={systemMode}>
                <ReduxProvider>
                  <AuthConsumer>
                    <Router />
                    <AppReactToastify direction={direction} hideProgressBar />
                  </AuthConsumer>
                </ReduxProvider>
              </ThemeProvider>
            </SettingsProvider>
          </VerticalNavProvider>
        </AuthProvider>
      </LocalizationProvider>
    </I18nProvider>
  );
}
