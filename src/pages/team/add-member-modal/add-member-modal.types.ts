import { ContactItem } from 'src/components/molecules/contact-item/contact-item.types';
import { ModalProps } from 'src/components/templates/modal/modal.types';
import { MemberIdentity } from 'src/core/types';

export interface AddMemberModalProps extends Omit<ModalProps, 'children'> {
  memberList: ContactItem[];
  acceptedMembers: MemberIdentity[];
  onSearch: (value: string) => void;
  onAddMember: (id: string) => void;
}
