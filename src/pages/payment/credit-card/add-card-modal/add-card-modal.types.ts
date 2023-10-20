import { ModalProps } from 'src/components/templates/modal/modal.types';
import { CardsRes } from 'src/core/api';

export interface AddCardModalProps extends Omit<ModalProps, 'children'> {
  setCardsList: (list: CardsRes) => void;
  currency?: string;
}
