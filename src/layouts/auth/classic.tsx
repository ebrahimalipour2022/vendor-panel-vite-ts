// @mui
// auth
// routes
// hooks
// theme
// components
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { getSystemMode } from '@/layouts/materialize-layout/@core/utils/serverHelpers';

import BlankLayout from '@/layouts/materialize-layout/@layouts/BlankLayout';
import AuthLayout from '@/layouts/materialize-layout/@layouts/AuthLayout';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const systemMode = getSystemMode();
  return (
    <BlankLayout systemMode={systemMode}>
      <AuthLayout>{children}</AuthLayout>
    </BlankLayout>
  );
}

export default AuthClassicLayout;
