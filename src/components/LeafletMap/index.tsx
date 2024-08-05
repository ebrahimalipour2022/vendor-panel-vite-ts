// MapComponent.js
import { Suspense, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import classnames from 'classnames';
import { ILocation, MapReverseAddressRes } from '@/types';
import MapLocation from '@/assets/icons/MapLocation';
import './style.css';
import ZapLogo from '@/assets/icons/Logo';
import { LoadingScreen } from '@/components/loading-screen';
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

  const [center, setCenter] = useState<LatLngExpression>(DEFAULT_POSITION); // Default center position

  useEffect(() => {
    if (position) {
      setCenter([position.latitude, position.longitude]);
    }
  }, [position]);
  const GetMapCenterOnDrag = () => {
    const map = useMap();
    const handleDragEnd = async () => {
      const center = map.getCenter();
      console.log('Center after drag:', center.lat, center.lng);
      if (center) {
        setCenter([center.lat, center.lng]);
        await getAddressByLatLng({ lat: center.lat, lng: center.lng })
          .then((res) => {
            if (res?.data) {
              console.log('address res :', res.data);
              if (setAddress) {
                setAddress({
                  ...res.data,
                  location: { latitude: center.lat, longitude: center.lng },
                });
              }
            }
          })
          .catch((err) => {
            console.log('address err :', err);
          });
      }
    };

    map.on('dragend', handleDragEnd);

    return null; // This component does not render anything
  };

  return (
    <div
      className={classnames(' h-full w-full relative', {
        ' user-select-none pointer-events-none overflow-hidden': onlyView,
      })}
    >
      <Suspense
        fallback={
          <div className={'absolute inset-0 z-1'}>
            <LoadingScreen />
          </div>
        }
      >
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <GetMapCenterOnDrag />
        </MapContainer>
        <div className={'location-icon'}>
          <MapLocation />
        </div>
        <div className={'logo-icon'}>
          <ZapLogo />
        </div>
      </Suspense>
    </div>
  );
};

export default LeafletMapComponent;
