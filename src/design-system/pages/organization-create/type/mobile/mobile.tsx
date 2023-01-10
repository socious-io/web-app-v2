import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../atoms/button/button';
import { Steps } from '../../../../atoms/steps/steps';
import { TypeSelector } from '../../../../atoms/type-selector/type-selector';
import { ORGANIZATION_TYPE } from '../type.services';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps length={5} current={1} />
        </div>
      </div>
      <div className={css.question}>What type of organization?</div>
      <div className={css.main}>
        <TypeSelector padding="2rem 1rem" onChange={console.log} list={ORGANIZATION_TYPE} />
      </div>
      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
      </div>
    </div>
  );
};
