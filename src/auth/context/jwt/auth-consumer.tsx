// components
import { SplashScreen } from '@/components/loading-screen';
//
import type { ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function AuthConsumer({ children }: Props) {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading && isMobileSize ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}
