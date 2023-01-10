import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../atoms/button/button';
import { Input } from '../../../../atoms/input/input';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';
import css from './mobile.module.scss';

const sharedProps: Record<string, string> = {
  className: css.input,
  variant: 'outline',
};

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={5} current={3} />
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
        <Button onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
      </div>
    </div>
  );
};
