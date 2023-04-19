import { isTouchDevice } from 'src/core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const Settings = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
