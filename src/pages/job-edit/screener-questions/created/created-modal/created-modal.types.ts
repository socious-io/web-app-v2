import { ModalProps } from 'src/components/templates/modal/modal.types';
import { QuestionsRes } from 'src/core/types';

export interface CreatedModalProps extends Omit<ModalProps, 'children'> {
  userQuestions: QuestionsRes[];
  projectIds: { projectId: string; identityId: string };
  onBack: () => void;
  onDone: () => void;
}
