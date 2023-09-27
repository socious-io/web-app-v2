import { QuestionsRes } from 'src/core/types';

import { Job } from '../../components/organisms/job-list/job-list.types';

export type JobDetailProps = {};

export type Loader = MakeGenerics<{
  LoaderData: Job;
}>;

export type Resolver = {
  jobDetail: Job;
  screeningQuestions: QuestionsRes;
};
