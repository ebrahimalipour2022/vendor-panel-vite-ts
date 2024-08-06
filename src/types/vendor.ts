import { ILocation } from '@/types/address';

export interface IStore {
  vendorId: number;
  serviceRadius: number;
  storeId: number;
  address: string;
  location: ILocation;
  title: string;
  phone: string;
  vendorCode: string;
}
