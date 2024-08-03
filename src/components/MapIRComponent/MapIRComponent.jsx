import React from 'react';
import Mapir from 'mapir-react-component';
import Box from '@mui/material/Box';
// import { map_ir_api_code } from '../../utils/cores/defaults';
// import Pin from '../../assets/imgs/pin.png';

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url,
      headers: {
        'MapIr-SDK': 'reactjs',
        'x-api-key':
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViYWE5NzQ0YjRmZmJkZDcxZTIxY2NiN2UwMjZhOGQ0MjY1MzY5Mzg1YTAzYjdmMmM5NjYzNWNmNGMxODVlYTZiMzdmMDNkYTYxM2QwNTVmIn0.eyJhdWQiOiIyODI4OSIsImp0aSI6IjViYWE5NzQ0YjRmZmJkZDcxZTIxY2NiN2UwMjZhOGQ0MjY1MzY5Mzg1YTAzYjdmMmM5NjYzNWNmNGMxODVlYTZiMzdmMDNkYTYxM2QwNTVmIiwiaWF0IjoxNzIyNjE4MjM4LCJuYmYiOjE3MjI2MTgyMzgsImV4cCI6MTcyNTIxMDIzOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.fq5cV31Fwk9W3YUz5Ku2xtI7bfXf2Vcta1D-GLoPbVaYbMeuV1VGnntn8Q1zWyHkBDzwKmpMm0PrrwhNIgy3UsT4vt2xk-TX_FUYtA3wbxiJfjhb24D_cb3Tmbe-lB1nCTpJ2XbwHbHt-VnPA0RJ8oX_YLpw-aZc-au-qLEGcvT_DMOffx8OqMnGvicyBtekIIgbadDe4nSAnIHH8onkg-iAlkyjXYeBBa9OUrUv-f24UbP0oUZHfRuLyp4w03H0J-TlZbAqH1ATjO3o5l4EUkYomL2PKi6Rab7iawEaERtKDutthaWgoLDOWYi2Bpe-pXuXiFanOStCApUiudqQGA',
      },
    };
  },
});

const MapIRComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { lat = 0, lng = 0, zoom = 14, onClick = null } = props;

  return (
    <Box
      component={'div'}
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        '& .mapboxgl-canvas-container': {
          height: '100%',
        },
        '& .mapboxgl-map': {
          width: '100% !important',
          height: '100% !important',
          outline: 'none',
        },
        '& canvas': {
          outline: 'none',
          width: '100% !important',
          height: '100% !important',
          position: 'relative !important;',
        },
      }}
    >
      <Mapir Map={Map} zoom={[zoom]} center={[lng, lat]}>
        <Mapir.Marker
          coordinates={[lng, lat]}
          anchor="bottom"
          // Image={Pin}
        />
      </Mapir>
    </Box>
  );
};

export default React.memo(MapIRComponent);
