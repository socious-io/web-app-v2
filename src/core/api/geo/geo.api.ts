import { CityRes } from './geo.types';
import { get } from '../http';

export async function cities(countryCode: string): Promise<CityRes> {
  return (await get<CityRes>(`/geo/locations/country/${countryCode}?limit=301000`)).data;
}
