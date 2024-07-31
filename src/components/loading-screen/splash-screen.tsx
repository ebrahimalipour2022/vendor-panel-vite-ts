// @mui
import Box, { BoxProps } from '@mui/material/Box';
//
import { LogoZapBlue, SplashBgIcon } from '@/assets/icons';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',

        ...sx,
      }}
      {...other}
    >
      <>
        {/*<m.div*/}
        {/*  animate={{*/}
        {/*    scale: [1, 0.9, 0.9, 1, 1],*/}
        {/*    opacity: [1, 0.48, 0.48, 1, 1],*/}
        {/*  }}*/}
        {/*  transition={{*/}
        {/*    duration: 2,*/}
        {/*    ease: 'easeInOut',*/}
        {/*    repeatDelay: 1,*/}
        {/*    repeat: Infinity,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Logo disabledLink sx={{ width: { xs: 90, md: 158 }, height: { xs: 32, md: 56 } }} />*/}
        {/*</m.div>*/}

        <div className={'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative'}>
          <div
            className={
              'flex flex-1 h-full bg-primary relative rounded-[2rem] overflow-hidden pt-[20dvh] px-5'
            }
          >
            <div className={'flex flex-col items-start space-y-2 w-full z-[9999]'}>
              <div className={'w-[90px] '}>
                <LogoZapBlue />
              </div>
              <Typography color={'white'} component={'h2'} variant={'body1'}>
                {t('brandSubtitle')}
              </Typography>
            </div>
          </div>
          <div className={'absolute is-full'}>
            <SplashBgIcon />
          </div>
        </div>

        {/*<Box*/}
        {/*  component={m.div}*/}
        {/*  animate={{*/}
        {/*    scale: [1.6, 1, 1, 1.6, 1.6],*/}
        {/*    rotate: [270, 0, 0, 270, 270],*/}
        {/*    opacity: [0.25, 1, 1, 1, 0.25],*/}
        {/*    borderRadius: ['25%', '25%', '50%', '50%', '25%'],*/}
        {/*  }}*/}
        {/*  transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}*/}
        {/*  sx={{*/}
        {/*    width: 100,*/}
        {/*    height: 100,*/}
        {/*    position: 'absolute',*/}
        {/*    border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,*/}
        {/*  }}*/}
        {/*/>*/}

        {/*<Box*/}
        {/*  component={m.div}*/}
        {/*  animate={{*/}
        {/*    scale: [1, 1.2, 1.2, 1, 1],*/}
        {/*    rotate: [0, 270, 270, 0, 0],*/}
        {/*    opacity: [1, 0.25, 0.25, 0.25, 1],*/}
        {/*    borderRadius: ['25%', '25%', '50%', '50%', '25%'],*/}
        {/*  }}*/}
        {/*  transition={{*/}
        {/*    ease: 'linear',*/}
        {/*    duration: 3.2,*/}
        {/*    repeat: Infinity,*/}
        {/*  }}*/}
        {/*  sx={{*/}
        {/*    width: 120,*/}
        {/*    height: 120,*/}
        {/*    position: 'absolute',*/}
        {/*    border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,*/}
        {/*  }}*/}
        {/*/>*/}
      </>
    </Box>
  );
}
