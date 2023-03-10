import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { Steps } from '../../../../components/atoms/steps/steps';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
        <div className={css.header}>
          <div className={css.chevron} onClick={() => navigate({ to: '../profile' })}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={4} />
          </div>
          <div className={css.skip}>Skip</div>
        </div>
        <div className={css.question}>What's your organization's mission?</div>
        <div className={css.main}>
          <Textarea variant="outline" placeholder="Your organization's mission" />
        </div>
        <div className={css.bottom}>
          <Button onClick={() => navigate({ to: '../culture' })}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
