import { get } from '../../../../core/http';
import { CategoriesResp, Cities, Pagination } from '../../../../core/types';

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
}

export async function getCityList(countryCode: string): Promise<Pagination<Cities[]>> {
  return get(`/geo/locations/country/${countryCode}?limit=1200`).then(({ data }) => data);
}

export const formModel = {
  jobCategory: {
    value: '',
    validations: [
      {
        validation: '^[a-zA-Z]{7}$',
        errorMsg: 'length should be 7',
      },
    ],
    required: true,
  },
  jobTitle: {
    value: '',
    validations: [
      //   {
      //     validation: '^[a-zA-Z]{7}$',
      //     errorMsg: 'bla mal pla is wrong',
      //   },
    ],
    required: true,
  },
  paymentTerms: {
    value: '',
    validations: [],
    required: true,
  },
};
