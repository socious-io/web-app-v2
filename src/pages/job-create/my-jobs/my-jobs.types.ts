import { Pagination, GetJobs } from '../../../core/types';

export type MyJobsResolver = {
  activeJobs: Pagination<GetJobs[]>;
  draftJobs: Pagination<GetJobs[]>;
};

export type MyJobs = 'Created' | 'Archived';