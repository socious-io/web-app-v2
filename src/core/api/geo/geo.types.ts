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

export interface Location {
  id: number;
  name: string;
  type: string;
  population: number;
  country_code: string;
  alternate_name: string;
  alt_language: string;
  is_historic: boolean;
  is_colloquial: boolean;
  is_short_name: boolean;
  region_id: string;
  subregion_id: string | null;
  region_name: string;
  region_iso: string;
  subregion_name: string | null;
  subregion_iso: string | null;
}

export interface LocationRes extends PaginateRes {
  items: Location[];
}
