import { isTouchDevice } from 'src/core/device-type-detector';
import { Desktop } from './overview/desktop/desktop';
import { Mobile } from './overview/mobile/mobile';

export const JobOfferReject = () => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
