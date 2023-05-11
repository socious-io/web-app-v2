import { isTouchDevice } from '../../core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const ProfileUserEditContainer = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
