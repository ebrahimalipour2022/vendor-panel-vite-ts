import { LegacyRef, useEffect, useRef, useState } from 'react';
import L, { LatLngExpression, Map } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ILocation, IMapPosition, MapReverseAddressRes } from '@/types';
import classnames from 'classnames';
import MapLocation from '@/assets/icons/MapLocation';
import axios from 'axios';
import ZapLogo from '@/assets/icons/Logo';
import './style.css';
import { DEFAULT_POSITION } from '@/config-global';

type Props = {
  position?: ILocation | null;
  setAddress?: (address: MapReverseAddressRes) => void;
  onlyView?: boolean;
  zoom?: number;
};

const VITE_NESHAN_MAP_API_KEY = import.meta.env.VITE_NESHAN_MAP_API_KEY;

const getAddressByLatLng = async ({ lat, lng }: { lat: number; lng: number }) => {
  return axios({
    url: `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
    headers: {
      'Api-Key': VITE_NESHAN_MAP_API_KEY,
      Authorization: null,
    },
  });
};
const LeafletMapComponent = ({
  position = null,
  setAddress,
  onlyView = false,
  zoom = 16,
}: Props) => {
  const mapRef = useRef<LegacyRef<Map> | undefined>();
  const [center, setCenter] = useState<LatLngExpression>([
    DEFAULT_POSITION.lat,
    DEFAULT_POSITION.lng,
  ]); // Default center position

  async function handleDragEnd({ lat, lng }: IMapPosition) {
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
  }

  function GetMapCenterOnDrag() {
    const map = useMapEvents({
      dragend() {
        const center = map.getCenter();
        handleDragEnd(center);
      },
    });
    return null;
  }

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Check if we're on the first render and the position is defined
    if (isFirstRender && position && mapRef.current) {
      //@ts-ignore
      mapRef.current.setView([position.latitude, position.longitude], 16);
      setIsFirstRender(false); // Set to false so it doesn't run again
    }
  }, [isFirstRender, position]);
  return (
    <div
      className={classnames(' h-full w-full relative', {
        'user-select-none pointer-events-none overflow-hidden': onlyView,
      })}
    >
      <MapContainer
        // @ts-ignore
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
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
      <div className={'logo-icon hidden md:block'}>
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

//=========================================================

//latitude=35.69978885094379&longitude=51.33797040739728
//latitude=35.75753482568149&longitude=51.40995708465471

// Define the coordinates for the two points
// const point1: LatLngExpression = [51.40995708465471, 35.75753482568149]; // Example coordinates (latitude, longitude)
// const point2: LatLngExpression = [51.41423155947801, 35.762504043673815]; // Another set of coordinates
// const positions: LatLngExpression[] = [point1, point2];

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

// toast.error('آدرس یافت نشد ، لطفا مجدد تلاش نمائید');
// toast.error('مختصات یافت نشد، لطفا مجدد تلاش نمائید');
// 51.36281969540723, 35.69672648316882
