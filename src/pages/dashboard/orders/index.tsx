import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// sections
// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.orders')}</title>
      </Helmet>
      {/*<MapComponent />*/}
      <div>
        <div className={'w-full h-[70vh]'} />
      </div>
    </>
  );
}
