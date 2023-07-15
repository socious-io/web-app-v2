import { IdentityReq } from 'src/core/types';

export type SwitchAccountProps = {
  open: boolean;
  identity?: IdentityReq;
  onClose: () => void;
};
