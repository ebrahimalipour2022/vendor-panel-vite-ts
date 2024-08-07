export interface ILocation {
  latitude: number;
  longitude: number;
}
export interface IOrderAddress {
  id?: string;
  storeBranch: {
    label: string;
    value: string;
  };
  title: string;
  fullName: string;
  clientAddress: string;
  plaque: string;
  unit: string;
  floor: string;
  location: ILocation | null;
  mobile: string;
  // postalCode?: string // new
}

export interface IOrderAddressListReq {
  id: string;
  query?: string;
}

//================== MAP TYPES===================
export interface IMapPosition {
  lat: number;
  lng: number;
}
export interface MapReverseAddressRes {
  status: string;
  neighbourhood: string;
  municipality_zone: string;
  state: string;
  city: string;
  in_traffic_zone: boolean;
  in_odd_even_zone: boolean;
  route_name: string;
  route_type: string;
  place: null;
  district: string;
  formatted_address: string;
  village: null;
  county: string;
  location?: ILocation;
}
