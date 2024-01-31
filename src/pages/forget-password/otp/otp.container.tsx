import { isTouchDevice } from 'src/core/device-type-detector';

import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const Otp: React.FC = () => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
