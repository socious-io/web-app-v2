import { Job } from '@organisms/job-list/job-list.types';
import { QuestionsRes } from 'src/core/types';

export type Resume = { name: string; file: File | null };

export type ApplyApplicationPayload = {
  cover_letter: string;
  cv_link: string;
  cv_name: string;
  share_contact_info: boolean;
  answers: { id: string; answer: string }[];
  attachment?: string;
};

export type Resolver = {
  screeningQuestions: QuestionsRes;
  jobDetail: Job;
};
