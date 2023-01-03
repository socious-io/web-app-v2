import {TwoThird} from '../../../../src/design-system/templates/two-third/two-third';
import {AchievementsProps} from './achievements.types';
import {Body} from './body/body';
import {Header} from './header/header';

export const Achievements = (props: AchievementsProps): JSX.Element => {
  return <TwoThird top={<Header point={35} />} bottom={<Body />} />;
};
