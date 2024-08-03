import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import MapComponent from '@/components/neshan-map/neshan-map';
import MapLocation from '@/assets/icons/MapLocation';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.orders')}</title>
      </Helmet>
      <MapComponent />
    </>
  );
}
