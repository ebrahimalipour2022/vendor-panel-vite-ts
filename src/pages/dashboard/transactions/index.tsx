import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import KitchenSink from '@/components/react-table/KitchenSink';

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.transactions')}</title>
      </Helmet>
      <KitchenSink />;
    </>
  );
}
