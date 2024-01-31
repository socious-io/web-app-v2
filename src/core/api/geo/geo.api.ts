import { CityRes, LocationRes } from './geo.types';
import { get } from '../http';

export async function cities(countryCode: string): Promise<CityRes> {
  return (await get<CityRes>(`/geo/locations/country/${countryCode}?limit=301000`)).data;
}

export async function searchLocation(search: string, limit = 20): Promise<LocationRes> {
  return (await get<LocationRes>(`/geo/locations?search=${search}&limit=${limit}&page=1`)).data;
}
