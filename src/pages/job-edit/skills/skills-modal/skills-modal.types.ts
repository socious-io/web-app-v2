import { Job } from 'src/components/organisms/job-list/job-list.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface SkillsModalProps extends Omit<ModalProps, 'children'> {
  onDone: (newJob:any) => void;
  onBack: () => void;
  jobOverview: Job;
}
