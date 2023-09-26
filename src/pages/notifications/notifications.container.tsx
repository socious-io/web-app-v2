import { isTouchDevice } from '../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const Notifications = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
