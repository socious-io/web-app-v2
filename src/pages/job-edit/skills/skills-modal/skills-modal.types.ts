import { Job } from '@organisms/job-list/job-list.types';
import { ModalProps } from '@templates/modal/modal.types';

export interface SkillsModalProps extends Omit<ModalProps, 'children'> {
  onDone: (newJob:any) => void;
  onBack: () => void;
  jobOverview: Job;
}
