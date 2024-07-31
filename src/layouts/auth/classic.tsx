// @mui
import Typography from '@mui/material/Typography';
// auth
// routes
// hooks
// theme
// components
import Logo from 'src/components/logo';
import { AuthBackground, LogoZapBlue } from 'src/assets/icons';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div className="flex bs-full justify-center">
      <div className="flex justify-center items-center bs-full min-is-full p-6 md:!min-is-[unset] md:py-12 md:px-[10%] md:is-[50dvw]">
        <div className="flex flex-col gap-5 is-full sm:is-auto md:is-full max-is-[400px]">
          <div className={'flex flex-col items-center justify-center is-full gap-2 mb-10'}>
            <div className={'w-[11rem]'}>
              <Logo />
            </div>
            <Typography variant="h4">{`${t('authLogin.welcome', {
              value: t('brandTitle'),
            })} 👋`}</Typography>
          </div>
          {children}
        </div>
      </div>
      <div
        className={
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden'
        }
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
}

export default AuthClassicLayout;
