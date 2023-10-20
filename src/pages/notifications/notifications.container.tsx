import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';
import { isTouchDevice } from '../../core/device-type-detector';

export const Notifications = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
