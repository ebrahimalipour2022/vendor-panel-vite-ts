import Mapir from 'mapir-react-component';
import 'mapir-react-component/dist/index.css';

import './style.css';

const Map = Mapir.setToken({
  transformRequest: (url) => {
    // console.log('url map :', url);
    return {
      url,
      headers: {
        'MapIr-SDK': 'reactjs',
        'x-api-key': import.meta.env.VITE_IR_MAP_API_KEY,
      },
    };
  },
});
const IRMapComponent = () => {
  return (
    <Mapir
      userLocation
      center={[51.42047, 35.729054]}
      minZoom={[13]}
      scrollZoom={false}
      hash={true}
      Map={Map}
      interactive={true}
    />
  );
};

export default IRMapComponent;
