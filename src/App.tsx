// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
// auth
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';
import ReduxProvider from '@/redux/redux-provider';
import { LocalizationProvider } from '@/locales/localization-provider';
import { I18nProvider } from '@/locales/i18n';

// ----------------------------------------------------------------------

export default function App() {
  console.log(`   
      ░░░░░░░░░░          
             ░░ 
           ▒▒       
         ▒▒         
       ▓▓          
      ▓▓████████    
   
                     
                       ░░  
       ▓          ▓     ▓  
       ▓▓▓▓▓▓▓▓▓▓▓▓     ▓      
          ██ ██      ▓▓▓▓
            ██   
  `);

  useScrollToTop();

  return (
    <I18nProvider>
      <LocalizationProvider>
        <AuthProvider>
          <ReduxProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'rtl', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SettingsDrawer />
                  <ProgressBar />
                  <AuthConsumer>
                    <Router />
                  </AuthConsumer>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </ReduxProvider>
        </AuthProvider>
      </LocalizationProvider>
    </I18nProvider>
  );
}
