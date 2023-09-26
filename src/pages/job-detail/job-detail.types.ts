import { Job } from '../../components/organisms/job-list/job-list.types';
import { QuestionsRes } from 'src/core/types';

export type JobDetailProps = {};

export type Loader = MakeGenerics<{
  LoaderData: Job;
}>;

export type Resolver = {
  jobDetail: Job;
  screeningQuestions: QuestionsRes;
};
