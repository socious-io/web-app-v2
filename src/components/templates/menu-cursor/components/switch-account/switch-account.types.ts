import { CurrentIdentity } from 'src/core/api';

export type SwitchAccountProps = {
  open: boolean;
  identity?: CurrentIdentity;
  onClose: () => void;
};
