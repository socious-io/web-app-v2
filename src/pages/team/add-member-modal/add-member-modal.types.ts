import { ContactItem } from '@molecules/contact-item/contact-item.types';
import { ModalProps } from '@templates/modal/modal.types';
import { MemberIdentity } from '@core/types';

export interface AddMemberModalProps extends Omit<ModalProps, 'children'> {
  memberList: ContactItem[];
  acceptedMembers: MemberIdentity[];
  onSearch: (value: string) => void;
  onAddMember: (id: string) => void;
}
