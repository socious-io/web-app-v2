// @ts-nocheck
import css from './level-item.module.scss';
import {ImpactBar} from '../../atoms/impact-bar/impact-bar';
import {Typography} from '../../atoms/typography/typography';
import {LevelsProps} from '../../../../src/design-system/pages/levels/levels.types';
import {LevelBadge} from '../../../../src/design-system/atoms/level-badge/level-badge';

export const LevelItem = ({level}: LevelsProps): JSX.Element => {
  return (
    <div className={css.container}>
      <LevelBadge level={level} size="s" />
      {/* <div className={css.impactBarContainer}>
        <ImpactBar start={0} end={100} current={50} />
      </div> */}
      <Typography className={css.label} type="body" size="s">
        Level {level}
      </Typography>
    </div>
  );
};
