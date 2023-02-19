import { get, post } from '../../../../core/http';
import { CategoriesResp, Cities, CreatePostPayload, Pagination } from '../../../../core/types';

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
}

export async function getCityList(countryCode: string): Promise<Pagination<Cities[]>> {
  return get(`/geo/locations/country/${countryCode}?limit=1200`).then(({ data }) => data);
}

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
}

// {
//     "title": "title c",
//     "description": "decs c",
//     "remote_preference": "ONSITE",
//     "country": "IR",
//     "project_type": "PART_TIME",
//     "project_length": "LESS_THAN_A_DAY",
//     "payment_type": "VOLUNTEER",
//     "causes_tags": [
//         "BLACK_LIVES_MATTER"
//     ],
//     "skills": [
//         ".NET_FRAMEWORK"
//     ],
//     "status": "ACTIVE",
//     "experience_level": 0,
//     "job_category_id": "92cbe41e-cfaf-4dd5-8afd-31d6dfa28629",
//     "payment_scheme": "FIXED",
//     "city": "Abadeh, Fars Province",
//     "payment_currency": "AED"
// }
