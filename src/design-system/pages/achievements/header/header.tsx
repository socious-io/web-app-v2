import {Button} from '../../../../../src/design-system/atoms/button/button';
import {ImpactBarLevel} from '../../../../../src/design-system/atoms/impact-bar-level/impact-bar-level';
import css from './header.module.scss';
import {HeaderProps} from './header.types';

export const Header = (props: HeaderProps): JSX.Element => (
  <div className={css.container}>
    <div className={css.impactPointsContainer}>
      <div className={css.impactPoints}>{props.point}</div>
      <div className={css.impactPointsLabel}>Impact Points</div>
    </div>

    <ImpactBarLevel
      start={400}
      end={450}
      current={440}
      currentLevel="Level 3"
      prevLevel="Level 2"
      nextLevel="Level 4"
      minWidth="14.4rem"
      marginTop="3.5rem"
    />

    <div className={css.buttonContainer}>
      <Button color="white" width="9.35rem">
        Check rewards
      </Button>
    </div>
    <div className={css.impactPointDescLink}>
      <span>What are impact points?</span>
    </div>
  </div>
);
