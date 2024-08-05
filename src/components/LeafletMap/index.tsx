// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import classnames from 'classnames';
import { ILocation, MapIRRes } from '@/types';
import MapLocation from '@/assets/icons/MapLocation';
import './style.css';
import { LogoZapBlue } from '@/assets/icons';
import ZapLogo from '@/assets/icons/Logo';
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
  center: ILocation | null;
  setCenter: (address: MapIRRes) => void;
  onlyView: boolean;
};

const GetMapCenterOnDrag = () => {
  const map = useMap();

  const handleDragEnd = () => {
    const center = map.getCenter();
    console.log('Center after drag:', center.lat, center.lng);
    // Here, you can also pass the center to a function or state
  };

  map.on('dragend', handleDragEnd);

  return null; // This component does not render anything
};
// toast.error('آدرس یافت نشد ، لطفا مجدد تلاش نمائید');
// toast.error('مختصات یافت نشد، لطفا مجدد تلاش نمائید');
// 51.36281969540723, 35.69672648316882
const LeafletMapComponent = ({ center = null, setCenter, onlyView = false }: Props) => {
  const position: LatLngExpression = [35.75753482568149, 51.40995708465471]; // Default center position
  const zoom = 16;

  return (
    <div
      className={classnames(' h-full w-full relative', {
        ' user-select-none pointer-events-none overflow-hidden': onlyView,
      })}
    >
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
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
    </div>
  );
};

export default LeafletMapComponent;
