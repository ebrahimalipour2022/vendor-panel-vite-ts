// @mui
import { BoxProps } from '@mui/material/Box';
//
import { LogoZapBlue, SplashBgIcon } from '@/assets/icons';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  const { t } = useTranslation();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplashScreen(false);
    }, 900); // 900 milliseconds (0.9 seconds)

    return () => clearTimeout(timeout);
  }, []);
  return (
    <AnimatePresence>
      <m.div
        animate={{ opacity: showSplashScreen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={classnames(
          'md:hidden w-full bs-full fixed z-[9999] items-center justify-center bg-[--mui-palette-primary-main] right-0 bottom-0',
          {
            hidden: !showSplashScreen,
            flex: showSplashScreen,
          }
        )}
      >
        <>
          <div className={'flex bs-full items-center justify-center flex-1  relative'}>
            <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2">
              <div className={'flex flex-col items-center space-y-2 w-full z-[9999]'}>
                <div className={'w-[90px]'}>
                  <LogoZapBlue />
                </div>
                <Typography color={'white'} component={'h2'} variant={'body1'}>
                  {t('brandSubtitle')}
                </Typography>
              </div>
            </div>
            {/*<div className={'absolute bs-full'}>{<SplashBgIcon />}</div>*/}
          </div>
        </>
      </m.div>
    </AnimatePresence>
  );
}
