import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../atoms/button/button';
import { Input } from '../../../../atoms/input/input';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { Divider } from '../../../../templates/divider/divider';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
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
        <div className={css.limitStatement}>Fill the required fields</div>
      </div>
      <div className={css.main}>
        <Divider title="Basic info" divider="space">
          <div className={css.formContainer}>
            <Input label="Organization name" placeholder="Organization name" />
            <Textarea label="Bio" placeholder="Your organization's bio" />
          </div>
        </Divider>
        <Divider title="Contact" divider="space">
          <div className={css.formContainer}>
            <Input label="Organization email" placeholder="Organization email" />
            <Input label="Country" placeholder="Country" />
            <Input label="City" placeholder="City" />
            <Input optional label="Address" placeholder="Address" />
            <Input optional label="Website" placeholder="Website" />
          </div>
        </Divider>
      </div>
      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../mission' })}>Continue</Button>
      </div>
    </div>
  );
};
