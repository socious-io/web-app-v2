import { MakeGenerics } from '@tanstack/react-location';
import { Job } from '../../components/organisms/job-list/job-list.types';

export type JobDetailProps = {};

export type Loader = MakeGenerics<{
  LoaderData: Job;
}>;
