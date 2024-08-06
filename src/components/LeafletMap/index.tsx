// MapComponent.js
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import classnames from 'classnames';
import { ILocation, IrMapCoordinates, MapReverseAddressRes } from '@/types';
import MapLocation from '@/assets/icons/MapLocation';
import './style.css';
import ZapLogo from '@/assets/icons/Logo';
import axios from 'axios';
//==========================================================
// میدان آزادی
// latitude=35.69978885094379&longitude=51.33797040739728
//==========================================================

// میدان ونک
//latitude=35.75753482568149&longitude=51.40995708465471
//==========================================================

// default location => آزادی
// useLocation mobile gps
// web default location

type Props = {
  position?: ILocation | null;
  setAddress?: (address: MapReverseAddressRes) => void;
  onlyView?: boolean;
  zoom?: number;
};

// toast.error('آدرس یافت نشد ، لطفا مجدد تلاش نمائید');
// toast.error('مختصات یافت نشد، لطفا مجدد تلاش نمائید');
// 51.36281969540723, 35.69672648316882

// GET:
//     https://api.neshan.org/v5/reverse?lat=LATITUDE&lng=LONGITUDE
// Headers:
//  Api-Key: YOUR_API_KEY

//"Api-Key": "service.2Tcr0E5K6MnKAosDGYbmTb5aMiABrcviqDrXcuwU",

const getAddressByLatLng = async ({ lat, lng }: { lat: number; lng: number }) => {
  return axios({
    url: `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
    headers: {
      'Api-Key': 'service.2Tcr0E5K6MnKAosDGYbmTb5aMiABrcviqDrXcuwU',
      Authorization: null,
    },
  });
};
const DEFAULT_POSITION: LatLngExpression = [35.75753482568149, 51.40995708465471];
const LeafletMapComponent = ({
  position = null,
  setAddress,
  onlyView = false,
  zoom = 16,
}: Props) => {
  //latitude=35.75753482568149&longitude=51.40995708465471

  const [center, setCenter] = useState<LatLngExpression>(
    ([position?.latitude, position?.longitude] as LatLngExpression) || DEFAULT_POSITION
  ); // Default center position

  // useEffect(() => {
  //   if (position) {
  //     setCenter([position.latitude, position.longitude]);
  //   }
  // }, [position]);

  const handleDragEnd = async ({ lat, lng }: IrMapCoordinates) => {
    if (lat && lng) {
      setCenter([lat, lng]);
      await getAddressByLatLng({ lat, lng })
        .then((res) => {
          if (res?.data) {
            if (setAddress) {
              setAddress({
                ...res.data,
                location: { latitude: lat, longitude: lng },
              });
            }
          }
        })
        .catch((err) => {});
    }
  };

  // latitude=35.69978885094379&longitude=51.33797040739728
  //latitude=35.75753482568149&longitude=51.40995708465471

  // Define the coordinates for the two points
  const point1: LatLngExpression = [51.40995708465471, 35.75753482568149]; // Example coordinates (latitude, longitude)
  const point2: LatLngExpression = [51.41423155947801, 35.762504043673815]; // Another set of coordinates
  const positions: LatLngExpression[] = [point1, point2];

  function GetMapCenterOnDrag() {
    const map = useMapEvents({
      dragend() {
        const center = map.getCenter();
        handleDragEnd(center);
      },
    });
    return null;
  }
  return (
    <div
      className={classnames(' h-full w-full relative', {
        'user-select-none pointer-events-none overflow-hidden': onlyView,
      })}
    >
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <GetMapCenterOnDrag />
        {/*<MarkersRandom />*/}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <div className={'location-icon'}>
        <MapLocation />
      </div>
      <div className={'logo-icon'}>
        <ZapLogo />
      </div>
    </div>
  );
};

export default LeafletMapComponent;

export const customMarkerUserPos = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
  iconSize: [15, 20],
  iconAnchor: [5, 20],
  popupAnchor: [2, -40],
});
