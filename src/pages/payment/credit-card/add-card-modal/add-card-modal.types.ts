import { ModalProps } from 'src/components/templates/modal/modal.types';
import { CardInfoResp } from 'src/core/types';

export interface AddCardModalProps extends Omit<ModalProps, 'children'> {
  setCardsList: (list: CardInfoResp) => void;
  currency?: string;
}
