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
import ReduxProvider from '@/store/redux-provider';
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
import { SplashScreen } from '@/components/loading-screen';
import MotionLazy from '@/components/animate/motion-lazy';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// ----------------------------------------------------------------------

export default function App() {
  // console.log(`
  //                       ░░
  //      ▓           ▓     ▓
  //      ▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓
  //          ██ ██      ▓▓▓▓
  //            ██
  // `);
  const theme = useTheme();
  const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
  const direction = 'rtl';
  const mode = getMode();
  const settingsCookie = getSettingsFromCookie();
  const demoName = getDemoName();
  const systemMode = getSystemMode();

  useScrollToTop();

  return (
    <AuthProvider>
      <ReduxProvider>
        <I18nProvider>
          <LocalizationProvider>
            <VerticalNavProvider>
              <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
                <ThemeProvider direction={direction} systemMode={systemMode}>
                  <MotionLazy>
                    <AuthConsumer>
                      <Router />
                      <AppReactToastify direction={direction} hideProgressBar />
                      {isMobileBreakpoint && <SplashScreen />}
                    </AuthConsumer>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </VerticalNavProvider>
          </LocalizationProvider>
        </I18nProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}

// <AuthProvider>
//   <ReduxProvider>
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <SettingsProvider
//         defaultSettings={{
//           themeMode: 'light', // 'light' | 'dark'
//           themeDirection: 'ltr', //  'rtl' | 'ltr'
//           themeContrast: 'default', // 'default' | 'bold'
//           themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
//           themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
//           themeStretch: false,
//         }}
//       >
//         <ThemeProvider>
//           <MotionLazy>
//             <SnackbarProvider>
//               <SettingsDrawer />
//               <ProgressBar />
//               <AuthConsumer>
//                 <Router />
//               </AuthConsumer>
//             </SnackbarProvider>
//           </MotionLazy>
//         </ThemeProvider>
//       </SettingsProvider>
//     </LocalizationProvider>
//   </ReduxProvider>
// </AuthProvider>
