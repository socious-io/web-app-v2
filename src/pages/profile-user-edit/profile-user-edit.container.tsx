import { Mobile } from './mobile/mobile';
import { isTouchDevice } from '../../core/device-type-detector';

export const ProfileUserEditContainer = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
