import css from './desktop.module.scss';
import { Input } from '../../../../components/atoms/input/input';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { Divider } from '../../../../components/templates/divider/divider';
import { Card } from '../../../../components/atoms/card/card';
import { Steps } from '../../../../components/atoms/steps/steps';
import { Button } from '../../../../components/atoms/button/button';
import { useNavigate } from '@tanstack/react-location';

const sharedProps: Record<string, string> = {
  className: css.input,
  variant: 'outline',
};

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <Card padding="0" className={css.card}>
        <div className={css.header}>
          <div className={css.chevron} onClick={() => navigate({ to: '../social-causes' })}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={3} />
          </div>
        </div>
        <div className={css.questionContainer}>
          <div className={css.question}>Organization profile</div>
          <div className={css.limitStatement}>
            [todo] Select up to 5 social causes that you are passionate about
          </div>
        </div>
        <div className={css.main}>
          <Divider title="Basic info" divider="space">
            <Input {...sharedProps} label="Organization name" placeholder="Organization name" />
            <Textarea {...sharedProps} label="Bio" placeholder="Your organization's bio" />
          </Divider>
          <Divider title="Contact" divider="space">
            <Input {...sharedProps} label="Organization email" placeholder="Organization email" />
            <Input {...sharedProps} label="Country" placeholder="Country" />
            <Input {...sharedProps} label="City" placeholder="City" />
            <Input {...sharedProps} label="Address" placeholder="Address" />
            <Input {...sharedProps} label="Website" placeholder="Website" />
          </Divider>
        </div>
        <div className={css.bottom}>
          <Button onClick={() => navigate({ to: '../mission' })}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};
