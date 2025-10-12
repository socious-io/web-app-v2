import { User, Organization } from 'src/core/api';

export interface ShareProfileProps {
  open: boolean;
  handleClose: () => void;
  identity: User | Organization;
}
