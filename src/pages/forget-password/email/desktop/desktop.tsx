import { Card } from 'src/components/atoms/card/card';
import { Input } from 'src/components/atoms/input/input';
import { Button } from 'src/components/atoms/button/button';
import { useEmailShared } from '../email.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const { backToPerviousPage, form, navigateToOtp } = useEmailShared();

  return (
    <div className={css.container}>
      <Card className={css.card}>
        <div className={css.header}>
          <img
            src="/icons/chevron-left.svg"
            alt="back-icon"
            className={css.icon}
            onClick={backToPerviousPage}
          />
        </div>
        <div className={css.main}>
          <div className={css.title}>Forget your password?</div>
          <div className={css.input}>
            <Input register={form} name="email" variant="outline" placeholder="Email" label="Email" />
          </div>
        </div>
        <div className={css.footer}>
          <Button color="blue" onClick={navigateToOtp} disabled={!form.isValid}>
            Get a verification code
          </Button>
        </div>
      </Card>
    </div>
  );
};
