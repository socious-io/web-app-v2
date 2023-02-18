import { MakeGenerics } from '@tanstack/react-location';
import { Job } from '../../organisms/job-list/job-list.types';

export type JobDetailProps = {};

export type Loader = MakeGenerics<{
  LoaderData: Job;
}>;
