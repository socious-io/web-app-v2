import { isTouchDevice } from '../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/achievements';

export const Achievements = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
