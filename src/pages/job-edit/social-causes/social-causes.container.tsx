import { Mobile } from './mobile/mobile';
import { isTouchDevice } from '../../../core/device-type-detector';

export const SocialCauses = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
