import { useMatch, useNavigate, useRouter } from '@tanstack/react-location';
import { Button } from '@atoms/button/button';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const queryParams = useMatch().search as { company?: string };

  return (
    <div className={css.container}>
      <div className={css.main}>
        <div className={css.title}>Application sent!</div>
        <p className={css.message}>
          <span className={css.companyName}>{queryParams?.company}</span> has received your
          application to review. Wait for them to respond to you.
        </p>
      </div>
      <div className={css.btnContainer}>
        <Button onClick={() => navigate({ to: '/jobs' })}>Back to jobs</Button>
      </div>
    </div>
  );
};
