import { Job } from 'src/components/organisms/job-list/job-list.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface SocialCausesModalProps extends Omit<ModalProps, 'children'> {
  jobOverview: Job;
  onDone: (newJob: any) => void;
}
