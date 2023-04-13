import {ImpactBarSimple} from '../../../components/atoms/impact-bar-simple/impact-bar-simple';
import {LevelBadge} from '../../../components/atoms/level-badge/level-badge';
import css from './header.module.scss';
import {HeaderProps} from './header.types';

export const Header = (props: HeaderProps): JSX.Element => (
  <div className={css.container}>
    <LevelBadge level={1} size="l" />
    <div className={css.label}>Level {1}</div>
    <ImpactBarSimple maxWidth="25rem" start={0} end={350} current={280} />
  </div>
);
