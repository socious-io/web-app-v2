import { Pagination, GetJobs, CategoriesResp } from '../../../core/types';

export type MyJobsResolver = {
  activeJobs: Pagination<GetJobs[]>;
  draftJobs: Pagination<GetJobs[]>;
  jobCategories?: CategoriesResp['categories'];
};

export type MyJobs = 'Created' | 'Archived';