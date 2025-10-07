import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';

import styles from './fallback.module.scss';

const FallBack = () => {
  const navigate = useNavigate();
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['error__code']}>500</div>
      <div className={styles['error__msg']}>{translate('general-error-internal.header')}</div>
      <div className={styles['error__details']}>{translate('general-error-internal.subheader')}</div>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('general-error-internal.home-btn')}
      </Button>
    </div>
  );
};

export default FallBack;
