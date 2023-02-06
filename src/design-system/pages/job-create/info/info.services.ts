import { get } from '../../../../core/http';
import { CategoriesResp } from '../../../../core/types';

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
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
      {
        validation: '^[a-zA-Z]{7}$',
        errorMsg: 'bla mal pla is wrong',
      },
    ],
    required: true,
  },
  paymentTerms: {
    value: '',
    validations: [],
    required: true,
  },
};
