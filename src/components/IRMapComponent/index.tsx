// @ts-ignore
import Mapir from 'mapir-react-component';
import 'mapir-react-component/dist/index.css';
import './style.css';
import MapLocation from '@/assets/icons/MapLocation';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ILocation, MapIRRes } from '@/types';
import classnames from 'classnames';
import axios from 'axios';

const VITE_IR_MAP_API_KEY = import.meta.env.VITE_IR_MAP_API_KEY;
const Map = Mapir.setToken({
  transformRequest: (url: string) => {
    return {
      url,
      headers: {
        'x-api-key': VITE_IR_MAP_API_KEY,
        'MapIr-SDK': 'reactjs',
      },
    };
  },
});

type Props = {
  center: ILocation | null;
  setCenter: (address: MapIRRes) => void;
  onlyView: boolean;
};
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

const IRMapComponent = ({ center = null, setCenter, onlyView = false }: Props) => {
  const [fetching, setFetching] = useState(false);
  const [innerState, setInnerState] = useState<ILocation>({
    latitude: 35.75753482568149,
    longitude: 51.40995708465471,
  });

  useEffect(() => {
    if (center?.latitude && center?.longitude) {
      setInnerState(center);
    }
  }, [center]);

  // with fetch
  const _reverseFunction = async ({ lat, lng }: { lat: number; lng: number }) => {
    const url = `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`;
    return await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': VITE_IR_MAP_API_KEY,
      },
    });
  };
  // with axios
  const reverseFunction = async ({ lat, lng }: { lat: number; lng: number }) => {
    const url = `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`;
    return axios({
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': VITE_IR_MAP_API_KEY,
        Authorization: null,
      },
    });
  };
  const handleMapDragEnd = async (event: any) => {
    // console.log('event :', event);
    if (!onlyView) {
      if (event?.transform?._center) {
        console.log('New Center :', event.transform._center); // For debugging
        setFetching(true);
        const longitude = event.transform._center.lng;
        const latitude = event.transform._center.lat;
        setInnerState({
          latitude,
          longitude,
        });
        await reverseFunction({ lat: latitude, lng: longitude })
          .then(({ data }: { data: MapIRRes }) => {
            if (data) {
              console.log('address data:', data);
              setCenter(data);
            }
          })
          .catch((err) => {
            console.log('address err:', err);
            toast.error('آدرس یافت نشد ، لطفا مجدد تلاش نمائید');
          })
          .finally(() => {
            setFetching(false);
          });
      } else {
        toast.error('مختصات یافت نشد، لطفا مجدد تلاش نمائید');
      }
    }
  };

  return (
    <>
      <div
        className={classnames({
          'user-select-none pointer-events-none overflow-hidden': onlyView,
        })}
      >
        <Mapir
          center={[innerState?.latitude, innerState?.longitude]}
          zoom={[15]}
          hash={true}
          Map={Map}
          userLocation={!onlyView}
          scrollZoom={!onlyView}
          interactive={!onlyView}
          onDragEnd={handleMapDragEnd}
          // onRender={(value: any) => console.log('render', value)}
          // onError={(value: any) => console.log('error', value)}
        >
          {!onlyView && <Mapir.ZoomControl position={'top-left'} />}
        </Mapir>

        <div className={'location-icon'}>
          <MapLocation />
        </div>
      </div>
    </>
  );
};

export default IRMapComponent;
