import { isTouchDevice } from 'src/core/device-type-detector';
import { Mobile } from './mobile/mobile';
import { Desktop } from './desktop/desktop';

export const ApplicantDetail = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
