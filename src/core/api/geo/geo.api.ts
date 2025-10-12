import { CityRes, LocationsRes } from './geo.types';
import { get } from '../http';

export async function cities(countryCode: string): Promise<CityRes> {
  return (await get<CityRes>(`/geo/locations/country/${countryCode}?limit=301000`)).data;
}

export async function searchLocation(search: string, limit = 20): Promise<LocationsRes> {
  return (await get<LocationsRes>(`/geo/locations?search=${search}&limit=${limit}&page=1`)).data;
}
