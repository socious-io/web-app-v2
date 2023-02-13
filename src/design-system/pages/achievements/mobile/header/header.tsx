import { Button } from '../../../../atoms/button/button';
import { ImpactBarLevel } from '../../../../atoms/impact-bar-level/impact-bar-level';
import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => (
  <div className={css.container}>
    <div className={css.impactPointsContainer}>
      <div className={css.impactPoints}>{props.point.toLocaleString('en-US')}</div>
      <div className={css.impactPointsLabel}>Impact Points</div>
    </div>

    <ImpactBarLevel
      start={props.tier.prevPoint}
      end={props.tier.nextPoint}
      current={props.tier.currentPoint}
      currentLevel={`Level ${props.tier.current}`}
      prevLevel={`Level ${props.tier.prev}`}
      nextLevel={`Level ${props.tier.next}`}
      minWidth="14.4rem"
      marginTop="3.5rem"
    />

    <div className={css.buttonContainer}>
      <Button color="white" width="9.35rem">
        Check rewards
      </Button>
    </div>
    <div className={css.impactPointDescLink}>What are impact points?</div>
  </div>
);
