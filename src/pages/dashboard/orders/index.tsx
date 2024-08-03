import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import MapComponent from '@/components/map/map';
import MapIRComponent from '@/components/MapIRComponent/MapIRComponent';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
// sections

// ----------------------------------------------------------------------

export default function Page() {
  const theme = useTheme();
  const { t } = useTranslation();
  const onClick = (value: any) => {
    console.log('onClick', value);
  };
  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.orders')}</title>
      </Helmet>
      <Box className={'w-full h-full'}>
        {/*<MapComponent />*/}
        <MapIRComponent lat={35.72} lng={51.42} onClick={onClick} />
      </Box>
    </>
  );
}
