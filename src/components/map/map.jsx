import React, { useState } from 'react';
import Mapir from 'mapir-react-component';
import './map.style.css';
import Box from '@mui/material/Box';

const MAP_API_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViYWE5NzQ0YjRmZmJkZDcxZTIxY2NiN2UwMjZhOGQ0MjY1MzY5Mzg1YTAzYjdmMmM5NjYzNWNmNGMxODVlYTZiMzdmMDNkYTYxM2QwNTVmIn0.eyJhdWQiOiIyODI4OSIsImp0aSI6IjViYWE5NzQ0YjRmZmJkZDcxZTIxY2NiN2UwMjZhOGQ0MjY1MzY5Mzg1YTAzYjdmMmM5NjYzNWNmNGMxODVlYTZiMzdmMDNkYTYxM2QwNTVmIiwiaWF0IjoxNzIyNjE4MjM4LCJuYmYiOjE3MjI2MTgyMzgsImV4cCI6MTcyNTIxMDIzOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.fq5cV31Fwk9W3YUz5Ku2xtI7bfXf2Vcta1D-GLoPbVaYbMeuV1VGnntn8Q1zWyHkBDzwKmpMm0PrrwhNIgy3UsT4vt2xk-TX_FUYtA3wbxiJfjhb24D_cb3Tmbe-lB1nCTpJ2XbwHbHt-VnPA0RJ8oX_YLpw-aZc-au-qLEGcvT_DMOffx8OqMnGvicyBtekIIgbadDe4nSAnIHH8onkg-iAlkyjXYeBBa9OUrUv-f24UbP0oUZHfRuLyp4w03H0J-TlZbAqH1ATjO3o5l4EUkYomL2PKi6Rab7iawEaERtKDutthaWgoLDOWYi2Bpe-pXuXiFanOStCApUiudqQGA';
const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url,
      headers: {
        'MapIr-SDK': 'reactjs',
        'x-api-key': MAP_API_KEY,
      },
    };
  },
});
export default function MapComponent() {
  const [markerArray, setMarkerArray] = useState([]);
  const [coord, setCoord] = useState([51.42, 35.72]);

  function reverseFunction(map, e) {
    const url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': MAP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    const array = [];
    array.push(<Mapir.Marker key={e.lngLat.lng} coordinates={[e.lngLat.lng, e.lngLat.lat]} />);
    setMarkerArray(array);
  }
  return (
    <div className="App">
      <Mapir
        onClick={reverseFunction}
        userLocation
        center={coord}
        // center={[51.42047, 35.729054]}
        minZoom={[35]}
        scrollZoom={false}
        hash={true}
        Map={Map}
        interactive={true}
      >
        {markerArray}
      </Mapir>
    </div>
  );
}
