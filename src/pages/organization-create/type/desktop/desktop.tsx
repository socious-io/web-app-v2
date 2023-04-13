import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { Steps } from '../../../../components/atoms/steps/steps';
import { TypeSelector } from '../../../../components/atoms/type-selector/type-selector';
import { ORGANIZATION_TYPE } from '../type.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
        <div className={css.header}>
          <div className={css.chevron} onClick={() => navigate({ to: '/jobs' })}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={1} />
          </div>
        </div>
        <div className={css.question}>What type of organization?</div>
        <div className={css.main}>
          <TypeSelector onChange={console.log} list={ORGANIZATION_TYPE} />
        </div>
        <div className={css.buttonContainer}>
          <Button onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
