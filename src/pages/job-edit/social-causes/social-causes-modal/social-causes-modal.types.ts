import { Job } from '@organisms/job-list/job-list.types';
import { ModalProps } from '@templates/modal/modal.types';

export interface SocialCausesModalProps extends Omit<ModalProps, 'children'> {
  jobOverview: Job;
  onDone: (newJob: any) => void;
}
