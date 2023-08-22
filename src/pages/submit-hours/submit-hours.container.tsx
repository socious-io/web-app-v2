import { isTouchDevice } from 'src/core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const SubmitHours = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
