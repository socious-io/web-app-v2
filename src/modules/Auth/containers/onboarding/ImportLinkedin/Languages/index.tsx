import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { UpdateLanguages } from 'src/modules/userProfile/components/updateLanguages';

import styles from './index.module.scss';
import { useLanguages } from './useLanguages';

const Languages = () => {
  const {
    data: { languages },
    operations: { onNextStep, setLanguages },
  } = useLanguages();

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['main__content']}>
          <div className={styles['main__header']}>
            <span className={styles['main__title']}>Languages open doors</span>
            List your language skills to find job opportunities worldwide.
          </div>
          <UpdateLanguages languages={languages} setLanguages={setLanguages} />
        </div>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={onNextStep}>
          {translate('onboarding-next-social-causes')}
        </Button>
      </div>
    </>
  );
};

export default Languages;
