import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';

import css from './delete.module.scss';

export const Delete = () => {
  const navigate = useNavigate();

  const backToPerviousPage = () => {
    navigate('/jobs');
  };

  const navigateToPassword = () => {
    navigate('../password');
  };

  const cancel = () => {
    navigate('/jobs');
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
