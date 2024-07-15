import { Button } from 'src/modules/general/components/Button';

import css from './fallback.module.scss';

const FallBack = () => {
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className={css.container}>
      <div className={css.errorCode}>500</div>
      <div className={css.errorMsg}>Internal Server Error</div>
      <div className={css.errorDetails}>We apologize for the inconvenience. Please try again later</div>
      <div className={css.buttonContainer}>
        <Button color="primary" variant="outlined" className={css.button}>
          <a href="/" className={css.link}>
            Home Page
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FallBack;
