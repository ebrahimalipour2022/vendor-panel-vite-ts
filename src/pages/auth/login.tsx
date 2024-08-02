import { Helmet } from 'react-helmet-async';
// sections
import { JwtLoginView } from '@/sections/auth/jwt';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.login')}</title>
      </Helmet>
      <JwtLoginView />
    </>
  );
}
