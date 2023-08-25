import { printWhen } from 'src/core/utils';
import { Button } from '@atoms/button/button';
import { ImpactBarLevel } from '@atoms/impact-bar-level/impact-bar-level';
import css from './header.module.scss';
import { HeaderProps } from './header.types';
import { useMatch } from '@tanstack/react-location';

export const Header = (props: HeaderProps): JSX.Element => {
  const connectId = useMatch().search.proofspace_connect_id;
  const claimPointsSentenceJSX = (
    <div className={css.impactPointDescLink}>Claim impact points as verifiable credentials to receive rewards</div>
  );

  const whatIsImpactPointsJSX = <div className={css.impactPointDescLink}>What is impact points?</div>;

  const claimNowBtnJSX = (
    <div className={css.buttonContainer}>
      <Button onClick={props.onClaimNow} color="white" className="w9-35">
        Claim now
      </Button>
    </div>
  );

  const checkRewardBtnJSX = (
    <div className={css.buttonContainer}>
      <Button onClick={props.onCheckRewards} color="white" className="w9-35">
        Check rewards
      </Button>
    </div>
  );

  return (
    <div className={css.container}>
      <img onClick={() => history.back()} className={css.chevron} src="/icons/chevron-left.svg" />
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

      {printWhen(claimPointsSentenceJSX, connectId === null)}
      {printWhen(claimNowBtnJSX, connectId === null)}
      {printWhen(checkRewardBtnJSX, connectId !== null)}
      {printWhen(whatIsImpactPointsJSX, connectId !== null)}
    </div>
  );
};
