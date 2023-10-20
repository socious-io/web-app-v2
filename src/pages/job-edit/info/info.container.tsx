import { isTouchDevice } from 'src/core/device-type-detector';

import { Mobile } from './mobile/mobile';

export const Info = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
