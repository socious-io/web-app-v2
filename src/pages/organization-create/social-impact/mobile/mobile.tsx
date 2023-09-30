import { Button } from 'src/components/atoms/button/button';
import { Steps } from 'src/components/atoms/steps/steps';
import { Textarea } from 'src/components/atoms/textarea/textarea';

import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = {};

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../culture' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={6} />
        </div>
        <div className={css.skip}>Skip</div>
      </div>
      <div className={css.question}>What social impact has your organization made?</div>
      <div className={css.main}>
        <Textarea placeholder="Your organization's achievements" />
      </div>
      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../succeed' })}>Continue</Button>
      </div>
    </div>
  );
};
