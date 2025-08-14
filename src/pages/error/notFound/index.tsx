import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';

import styles from './index.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <h1 className={styles['header']}>{translate('general-error-not-found.header')}</h1>
      <p className={styles['subheader']}>
        {translate('general-error-not-found.subheader')}
        <span className={styles['brand']}> {'Socious'}</span>.
      </p>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('general-error-not-found.go-to-home-btn')}
      </Button>
    </div>
  );
};
