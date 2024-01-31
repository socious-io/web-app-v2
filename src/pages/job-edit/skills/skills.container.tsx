import { Mobile } from './mobile/mobile';
import { isTouchDevice } from '../../../core/device-type-detector';

export const Skills = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
