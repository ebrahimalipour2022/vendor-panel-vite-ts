// Third-party Imports
import classnames from 'classnames';

// Type Imports
import Typography from '@mui/material/Typography';

import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Util Imports
import { useTranslation } from 'react-i18next';
import { AuthBackground, LogoZapBlue } from '@/assets/icons';
import ZapLogo from '@/assets/icons/Logo';

const AuthLayout = (props: ChildrenType) => {
  const { t } = useTranslation();
  // Props
  const { children } = props;

  // Hooks
  const { settings } = useSettings();

  return (
    <div className="flex bs-full justify-center">
      <div className="flex justify-center items-center bs-full min-is-full p-6 md:!min-is-[unset] md:py-12 md:px-[10%] md:is-[50dvw]">
        <div className="flex flex-col gap-5 is-full sm:is-auto md:is-full max-is-[400px]">
          <div className={'flex flex-col items-center justify-center is-full gap-2 mb-10'}>
            <div className={'w-[11rem]'}>
              <ZapLogo />
            </div>
            <Typography variant="h4">{`${t('authLogin.welcome', {
              value: t('brandTitle'),
            })} 👋`}</Typography>
          </div>
          {children}
        </div>
      </div>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered',
          }
        )}
      >
        <div
          className={
            'flex flex-1 h-full bg-primary relative rounded-[2rem] overflow-hidden pt-[20dvh]'
          }
        >
          <div className={'flex flex-col items-center space-y-2 w-full'}>
            <div className={'w-[270px]'}>
              <LogoZapBlue />
            </div>
            <Typography color={'white'} component={'h1'} variant={'h4'}>
              {t('brandTitle')}
            </Typography>
            <Typography color={'white'} component={'h2'} variant={'caption'}>
              {t('brandSubtitle')}
            </Typography>
          </div>
          <div className={'absolute  md:-bottom-[1%] lg:-bottom-[5%] xl:-bottom-[10%] is-full'}>
            <AuthBackground />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
