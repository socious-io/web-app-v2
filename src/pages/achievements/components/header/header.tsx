import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { ImpactBarLevel } from 'src/components/atoms/impact-bar-level/impact-bar-level';
import { printWhen } from 'src/core/utils';

import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const { proofspace_connect_id } = useParams();
  const navigate = useNavigate();
  const claimPointsSentenceJSX = (
    <div className={css.impactPointDescLink}>Claim impact points as verifiable credentials to receive rewards</div>
  );

  const whatIsImpactPointsJSX = <div className={css.impactPointDescLink}>What is impact points?</div>;

  const claimNowBtnJSX = (
    <div className={css.buttonContainer}>
      <Button onClick={props.onClaimNow} color="white" width="9.35rem">
        Claim now
      </Button>
    </div>
  );

  const checkRewardBtnJSX = (
    <div className={css.buttonContainer}>
      <Button onClick={props.onCheckRewards} color="white" width="9.35rem">
        Check rewards
      </Button>
    </div>
  );

  return (
    <div className={css.container}>
      <img onClick={() => navigate(-1)} className={css.chevron} src="/icons/chevron-left.svg" />
      <div className={css.impactPointsContainer}>
        <div className={css.impactPoints}>{Math.ceil(props.point)}</div>
        <div className={css.impactPointsLabel}>Impact Points</div>
      </div>

      <ImpactBarLevel
        start={props.tier.prevPoint}
        end={props.tier.nextPoint}
        current={props.tier.currentPoint}
        currentLevel={`Tier ${props.tier.current}`}
        prevLevel={`Tier ${props.tier.prev}`}
        nextLevel={`Tier ${props.tier.next}`}
        minWidth="14.4rem"
        marginTop="3.5rem"
      />

      {printWhen(claimPointsSentenceJSX, proofspace_connect_id === null)}
      {printWhen(claimNowBtnJSX, proofspace_connect_id === null)}
      {printWhen(checkRewardBtnJSX, proofspace_connect_id !== null)}
      {printWhen(whatIsImpactPointsJSX, proofspace_connect_id !== null)}
    </div>
  );
};
