import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/achievements';
import { isTouchDevice } from '../../core/device-type-detector';

export const AchievementsContainer = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};
