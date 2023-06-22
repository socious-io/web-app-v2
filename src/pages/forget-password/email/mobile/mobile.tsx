import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';
import { useEmailShared } from '../email.shared';
import css from './mobile.module.scss';

export const Mobile = () => {
  const { backToPerviousPage, form, navigateToOtp } = useEmailShared();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <img onClick={backToPerviousPage} src="/icons/chevron-left.svg" alt="" />
      </div>
      <div className={css.main}>
        <div className={css.forgetPass}>
          <div className={css.title}>Forget your password?</div>
          <div className={css.input}>
            <Input register={form} name="email" variant="outline" placeholder="Email" label="Email" />
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Button color="blue" onClick={navigateToOtp} disabled={!form.isValid}>
          Get a verification code
        </Button>
      </div>
    </div>
  );
};
