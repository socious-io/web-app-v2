import { get, post } from '../../../core/http';
import { CategoriesResp, Cities, CreatePostPayload, Pagination } from '../../../core/types';

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
}

export async function getCityList(countryCode: string): Promise<Pagination<Cities[]>> {
  return get(`/geo/locations/country/${countryCode}?limit=5200`).then(({ data }) => data);
}

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
}
