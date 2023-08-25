import { ContactItem } from '@molecules/contact-item/contact-item.types';
import { ModalProps } from '@templates/modal/modal.types';

export interface CreateChatModalProps extends Omit<ModalProps, 'children'> {
  userList: ContactItem[];
  onSearch: (value: string) => void;
  onCreateChat: (id: string) => void;
}
