import React, { useEffect, useState } from 'react';

import { Marker, useMap } from 'react-leaflet';
import L, { LatLngExpression, curve } from 'leaflet';
import '@elfalem/leaflet-curve';

// Define the coordinates for the two points
const point1: LatLngExpression = [35.75753482568149, 51.40995708465471]; // Example coordinates (latitude, longitude)
const point2: LatLngExpression = [35.762504043673815, 51.41423155947801]; // Another set of coordinates

const MarkersRandom: React.FC<any> = () => {
  const [markerList] = useState<LatLngExpression[]>([point1, point2]);
  const map = useMap();

  const latlng1: [number, number] = [35.75753482568149, 51.40995708465471];
  const latlng2: [number, number] = [35.762504043673815, 51.41423155947801];

  const offsetX = latlng2[1] - latlng1[1];
  const offsetY = latlng2[0] - latlng1[0];

  const r = Math.sqrt(offsetX ** 2 + offsetY ** 2);
  const theta = Math.atan2(offsetY, offsetX);

  const thetaOffset = 3.14 / 10;

  const r2 = r / 2 / Math.cos(thetaOffset);
  const theta2 = theta + thetaOffset;

  const midpointX = r2 * Math.cos(theta2) + latlng1[1];
  const midpointY = r2 * Math.sin(theta2) + latlng1[0];

  const midpointLatLng: [number, number] = [midpointY, midpointX];

  useEffect(() => {
    const pathFive = curve(['M', latlng1, 'Q', midpointLatLng, latlng2], {
      color: 'blue',
      fill: false,
      animate: { duration: 3000, iterations: 1 },
    });
    pathFive.addTo(map);
    const timer = setTimeout(() => {
      pathFive.remove();
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {markerList.length !== 0 &&
        markerList?.map((position, index) => {
          const iconPerson = new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
            // iconRetinaUrl: '../../../../static/img/leaflet/marker-icon-2x.png',
            iconAnchor: [12.5, 41],
            popupAnchor: undefined,
            shadowUrl: '',
            shadowSize: undefined,
            shadowAnchor: undefined,
            iconSize: new L.Point(25, 41),
          });
          return position && <Marker key={index} position={position} icon={iconPerson} />;
        })}
    </>
  );
};

export default MarkersRandom;
