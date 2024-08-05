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

//==================IR MAP===================
export interface IrMapCoordinates {
  lat: number;
  lng: number;
}
export interface MapIRRes {
  address: string;
  address_compact: string;
  city: string;
  country: string;
  county: string;
  district: string;
  geom: { type: string; coordinates: string[] };
  last: string;
  name: string;
  neighbourhood: string;
  plaque: string;
  poi: string;
  postal_address: string;
  postal_code: string;
  primary: string;
  province: string;
  region: string;
  rural_district: string;
  village: string;
}
