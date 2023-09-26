import { Button } from '../../../components/atoms/button/button';
import css from './delete.module.scss';

export const Delete = () => {
  const navigate = {};

  const backToPerviousPage = () => {
    navigate({ to: '../../jobs' });
  };

  const navigateToPassword = () => {
    navigate({ to: '../password' });
  };

  const cancel = () => {
    navigate({ to: '../../jobs' });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={backToPerviousPage}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.content}>
          <span className={css.title}>Are you sure? </span>
          <span className={css.text}>
            Deleting your account will erase all your existing activity on Socious, including connections you've made,
            and jobs you've contributed to.
          </span>
          <br />
          <span>This action is irreversible.</span>
        </div>
      </div>
      <div className={css.footer}>
        <Button color="blue" onClick={navigateToPassword}>
          Continue
        </Button>
        <Button color="white" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
