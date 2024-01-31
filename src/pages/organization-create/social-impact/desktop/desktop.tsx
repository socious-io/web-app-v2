import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Steps } from 'src/components/atoms/steps/steps';
import { Textarea } from 'src/components/atoms/textarea/textarea';

import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
        <div className={css.header}>
          <div className={css.chevron} onClick={() => navigate('../culture')}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={6} />
          </div>
          <div className={css.skip}>Skip</div>
        </div>
        <div className={css.question}>What social impact has your organization made?</div>
        <div className={css.main}>
          <Textarea variant="outline" placeholder="Your organization's achievements" />
        </div>
        <div className={css.bottom}>
          <Button onClick={() => navigate('../succeed')}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
