import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AddressesView from '@/sections/settings/addresses';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.settings.ordersAddress')}</title>
      </Helmet>
      <AddressesView />
    </>
  );
}
