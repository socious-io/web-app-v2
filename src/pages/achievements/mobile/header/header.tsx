import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { ImpactBarLevel } from 'src/components/atoms/impact-bar-level/impact-bar-level';
import { hapticsImpactLight } from 'src/core/haptic/haptic';

import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const navigate = useNavigate();
  function onBack() {
    hapticsImpactLight();
    navigate(-1);
  }
  return (
    <div className={css.container}>
      <img onClick={onBack} className={css.chevron} src="/icons/chevron-left.svg" />
      <div className={css.impactPointsContainer}>
        <div className={css.impactPoints}>{Math.ceil(props.point)}</div>
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

      <div className={css.impactPointDescLink}>Claim impact points as verifiable credentials to receive rewards</div>
      <div className={css.buttonContainer}>
        <Button onClick={props.onClaimNow} color="white" width="9.35rem">
          Claim now
        </Button>
      </div>
    </div>
  );
};
