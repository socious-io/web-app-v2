import { ModalProps } from 'src/components/templates/modal/modal.types';
import { CreatedQuestionsType } from 'src/store/reducers/createQuestionWizard.reducer';

export interface CreatedModalProps extends Omit<ModalProps, 'children'> {
  onBack: () => void;
  onDone: () => void;
  onEdit: (question: CreatedQuestionsType) => void;
}
