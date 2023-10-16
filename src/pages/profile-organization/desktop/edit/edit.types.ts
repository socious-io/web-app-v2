import { ModalProps } from 'src/components/templates/modal/modal.types';
import { Organization } from 'src/core/api';

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

export interface EditProps extends MakeOptional<ModalProps, 'children'> {
  updateOrganization: (params: Organization) => void;
}
