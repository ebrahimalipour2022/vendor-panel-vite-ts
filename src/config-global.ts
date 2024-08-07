// routes
import { paths } from 'src/routes/paths';
import { ILocation, IMapPosition } from '@/types';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.settings.orderAddress; // as '/dashboard'

export const DEFAULT_POSITION: IMapPosition = { lat: 35.75753482568149, lng: 51.40995708465471 };
