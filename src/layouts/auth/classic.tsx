// @mui
import Typography from '@mui/material/Typography';
// auth
// routes
// hooks
// theme
// components
import Logo from 'src/components/logo';
import { AuthBackground, LogoZapBlue } from 'src/assets/icons';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
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
    <Box display="flex" height="100vh" justifyContent="center">
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '2rem',
          [theme.breakpoints.up('md')]: {
            padding: '4rem 10%',
            minHeight: 'unset',
            paddingTop: '12rem',
            paddingBottom: '12rem',
            width: '50vw',
          },
        }}
      >
        <Grid
          container
          direction="column"
          spacing={3}
          sx={{
            maxWidth: 400,
            [theme.breakpoints.up('sm')]: { maxWidth: 'auto' },
            [theme.breakpoints.up('md')]: { maxWidth: '100%' },
          }}
        >
          <Grid item container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <Logo />
            </Grid>
            <Grid item>
              <Typography variant="h4">{`${t('authLogin.welcome', {
                value: t('brandTitle'),
              })} 👋`}</Typography>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Container>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          position: 'relative',
          padding: '2rem',
          [theme.breakpoints.down('md')]: { display: 'none' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            height: '100%',
            backgroundColor: 'primary.main',
            borderRadius: 2,
            overflow: 'hidden',
            paddingTop: '20vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <Box sx={{ width: 270 }}>
              <LogoZapBlue />
            </Box>
            <Typography color="white" variant="h4" component="h1">
              {t('brandTitle')}
            </Typography>
            <Typography color="white" variant="caption" component="h2">
              {t('brandSubtitle')}
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '-1%', md: '-1%', lg: '-5%', xl: '-10%' },
              width: '100%',
            }}
          >
            <AuthBackground />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthClassicLayout;
