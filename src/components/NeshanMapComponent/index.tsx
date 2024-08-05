// Your imports
import { MapComponent, MapTypes } from '@neshan-maps-platform/mapbox-gl-react';
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import './style.css';

function NeshanMap() {
  // Your Code
  return (
    <MapComponent
      options={{ mapKey: 'web.5221f4ae219e439db0d07510c8481fbe', mapType: MapTypes.neshanRaster }}
    />
  );
}

export default NeshanMap;
