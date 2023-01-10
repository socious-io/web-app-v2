import { Button } from '../../../../atoms/button/button';
import { Card } from '../../../../atoms/card/card';
import { Steps } from '../../../../atoms/steps/steps';
import { TypeSelector } from '../../../../atoms/type-selector/type-selector';
import { ORGANIZATION_TYPE } from '../type.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
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
          <TypeSelector onChange={console.log} list={ORGANIZATION_TYPE} />
        </div>
        <div className={css.buttonContainer}>
          <Button>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
