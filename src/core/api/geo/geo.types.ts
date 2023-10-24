import { PaginateRes } from '../types';

export interface City {
  country_code: string;
  id: number;
  name: string;
  population: number;
  region_id: string;
  region_iso: string;
  region_name: string;
  subregion_id: string;
  subregion_iso: string;
  subregion_name: string;
  type: string;
}

export interface CityRes extends PaginateRes {
  items: City[];
}
