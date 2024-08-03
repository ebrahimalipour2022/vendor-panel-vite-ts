import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.orders')}</title>
      </Helmet>
      <Box className={'w-full h-full'}>{/*<MapComponent />*/}</Box>
    </>
  );
}
