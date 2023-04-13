import { isTouchDevice } from '../../core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const Sidebar = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
