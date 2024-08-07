import { Helmet } from 'react-helmet-async';
// sections
import { NotFoundView } from 'src/sections/error';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.notFound')}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
