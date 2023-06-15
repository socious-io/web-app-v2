import { ModalProps } from 'src/components/templates/modal/modal.types';

export interface UnfollowModalProps extends Omit<ModalProps, 'children'> {
  selectedUserName: string;
  onUnfollow: () => void;
}
