import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import IRMapComponent from '@/components/IRMapComponent';
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
      <div className={'grow flex flex-col overflow-y-auto'}>
        <div className={'grow flex flex-col p-0'}>
          <div className={'h-full flex flex-col'}>
            <div className={'h-full grow relative'}>
              <IRMapComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
