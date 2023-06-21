import { ButtonProps } from 'src/components/atoms/button/button.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';

export type Rate = 'satisfactory' | 'unsatisfactory';

export interface FeedbackModalProps extends Omit<ModalProps, 'children'> {
  buttons: ButtonProps[];
  selectedRate: Rate;
  onChangeTextHandler: (value: string) => void;
  onRate: (value: string) => void;
}
