import { ModalProps } from '@templates/modal/modal.types';
import { CardInfoResp } from '@core/types';

export interface AddCardModalProps extends Omit<ModalProps, 'children'> {
  setCardsList: (list: CardInfoResp) => void;
  currency?: string;
}
