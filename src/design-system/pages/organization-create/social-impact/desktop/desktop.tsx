import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../atoms/button/button';
import { Card } from '../../../../atoms/card/card';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
        <div className={css.header}>
          <div className={css.chevron}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={5} current={5} />
          </div>
          <div className={css.skip}>Skip</div>
        </div>
        <div className={css.question}>What social impact has your organization made?</div>
        <div className={css.main}>
          <Textarea variant="outline" placeholder="Your organization's achievements" />
        </div>
        <div className={css.bottom}>
          <Button onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
