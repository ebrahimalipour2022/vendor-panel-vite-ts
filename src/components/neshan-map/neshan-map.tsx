import { useEffect, useRef, useState } from 'react';
import '@neshan-maps-platform/react-openlayers/dist/style.css';

// @ts-ignore
import NeshanMap, { NeshanMapRef, OlMap, Ol } from '@neshan-maps-platform/react-openlayers';
import Box from '@mui/material/Box';

const YOUR_MAP_KEY = 'web.5221f4ae219e439db0d07510c8481fbe';
function MapComponent() {
  const mapRef = useRef<NeshanMapRef | null>(null);

  const [ol, setOl] = useState<Ol>();
  const [olMap, setOlMap] = useState<OlMap>();

  const onInit = (ol: Ol, map: OlMap) => {
    setOl(ol);
    setOlMap(map);

    setTimeout(() => {
      const view = map.getView();
      view.animate({
        center: ol.proj.fromLonLat([51.36281969540723, 35.69672648316882]),
        zoom: 12,
        duration: 1000,
      });
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType('standard-night');
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        // pointerEvents: 'none',
        '& .mapboxgl-map': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100% !important',
          height: '100% !important',
          outline: 'none',
        },
        '& canvas': {
          outline: 'none',
          position: 'absolute !important',
          left: 0,
          top: 0,
        },
      }}
      id={'neshan-map'}
    >
      <NeshanMap
        mapKey={YOUR_MAP_KEY}
        defaultType="neshan"
        center={{ latitude: 35.7665394, longitude: 51.4749824 }}
        style={{ height: '700px', width: '100%' }}
        // @ts-ignore
        onInit={onInit}
        zoom={13}
      />
    </Box>
  );
}

export default MapComponent;
