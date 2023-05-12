import { isTouchDevice } from '../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/achievements';

export const AchievementsContainer = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
