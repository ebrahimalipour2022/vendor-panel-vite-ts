// Your imports
import { MapComponent, MapTypes } from '@neshan-maps-platform/mapbox-gl-react';
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import Box from '@mui/material/Box';

const YOUR_MAP_KEY = 'web.5221f4ae219e439db0d07510c8481fbe';
// eslint-disable-next-line @typescript-eslint/no-redeclare
function NeshanMapComponent() {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        width: '100%',
        '& .mapboxgl-map': {
          overflow: 'unset',
          width: '100%',
          height: '100%',
        },
        '& .mapboxgl-canvas': {
          // width: '100% !important',
          // height: '100% !important',
        },
      }}
    >
      {/*// @ts-ignore*/}
      <MapComponent options={{ mapKey: YOUR_MAP_KEY, mapType: MapTypes.neshanRaster }} />
    </Box>
  );
}

export default NeshanMapComponent;
