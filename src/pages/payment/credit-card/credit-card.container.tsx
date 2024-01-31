import { isTouchDevice } from 'src/core/device-type-detector';

import { Mobile } from './mobile/mobile';

export const CreditCard = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};
