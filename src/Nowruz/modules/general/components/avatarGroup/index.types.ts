import { Identity } from 'src/core/api';

export interface AvatarGroupProps {
  identities: Identity[];
  length?: number;
  size?: string;
  customStyle?: string;
}
