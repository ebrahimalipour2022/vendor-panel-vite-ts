export interface ILocation {
  latitude: string
  longitude: string
}
export interface IOrderAddress {
  id?: string
  storeId: string
  title: string
  fullName: string
  clientAddress: string
  plaque: string
  unit: string
  floor: string
  location: ILocation | null
  mobile: string
  // postalCode?: string // new
}

export interface IOrderAddressListReq {
  id: string
  query?: string
}
