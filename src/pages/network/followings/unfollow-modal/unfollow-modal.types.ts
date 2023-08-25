import { ModalProps } from '@templates/modal/modal.types';

export interface UnfollowModalProps extends Omit<ModalProps, 'children'> {
  selectedUserName: string;
  onUnfollow: () => void;
}
